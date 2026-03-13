import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password harus diisi" }, { status: 400 });
    }

    const admin = await db.admin.findFirst({
      where: { username: username, isActive: true },
    });

    if (!admin) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    const hashedPassword = hashPassword(password);
    if (hashedPassword !== admin.password) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db.adminSession.create({
      data: { adminId: admin.id, token, expiresAt },
    });

    await db.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, username: admin.username, name: admin.name, role: admin.role },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat login" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.json({ authenticated: false });

    const session = await db.adminSession.findFirst({
      where: { 
        token: token,
        expiresAt: { gt: new Date() }
      },
    });

    if (!session) {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.delete("admin_token");
      return response;
    }

    const admin = await db.admin.findUnique({
      where: { id: session.adminId },
      select: { id: true, username: true, name: true, role: true },
    });

    if (!admin) {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.delete("admin_token");
      return response;
    }

    return NextResponse.json({ authenticated: true, admin: admin });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    
    if (token) {
      try {
        await db.adminSession.deleteMany({ 
          where: { token: token } 
        });
      } catch {
        // Ignore error
      }
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });
    return response;
  }
}
