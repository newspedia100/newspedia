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

    // Try to find admin
    let admin;
    try {
      admin = await db.admin.findFirst({
        where: { username: username, isActive: true },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Kesalahan koneksi database" }, { status: 500 });
    }

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

    // Create session
    try {
      await db.adminSession.create({
        data: { adminId: admin.id, token, expiresAt },
      });
    } catch (sessionError) {
      console.error("Session creation error:", sessionError);
      // Continue anyway, session is not critical for login
    }

    // Update last login
    try {
      await db.admin.update({
        where: { id: admin.id },
        data: { lastLogin: new Date() },
      });
    } catch {
      // Ignore update error
    }

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, username: admin.username, name: admin.name, role: admin.role },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat login: " + (error instanceof Error ? error.message : "Unknown error") }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.json({ authenticated: false });

    let session;
    try {
      session = await db.adminSession.findFirst({
        where: {
          token: token,
          expiresAt: { gt: new Date() }
        },
      });
    } catch {
      return NextResponse.json({ authenticated: false });
    }

    if (!session) {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
      return response;
    }

    let admin;
    try {
      admin = await db.admin.findUnique({
        where: { id: session.adminId },
        select: { id: true, username: true, name: true, role: true },
      });
    } catch {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
      return response;
    }

    if (!admin) {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
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
      secure: true,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
    return response;
  }
}
