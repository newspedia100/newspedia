import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

// ============================================
// Authentication API Route
// ============================================

// Password hashing
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Generate token
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Create default admin lazily
let adminEnsured = false;
async function ensureDefaultAdmin() {
  if (adminEnsured) return;
  adminEnsured = true;
  
  try {
    // Use raw query to check admin count
    const result = await db.$queryRaw`SELECT COUNT(*) as count FROM admins`;
    const count = Number((result as Array<{ count: bigint }>)[0]?.count || 0);
    
    if (count === 0) {
      const hashedPassword = hashPassword("admin123");
      await db.$executeRaw`INSERT INTO admins (id, username, password, name, role, isActive, createdAt, updatedAt) 
        VALUES (${crypto.randomUUID()}, 'admin', ${hashedPassword}, 'Administrator', 'admin', 1, datetime('now'), datetime('now'))`;
      console.log("Default admin created: username=admin, password=admin123");
    }
  } catch (error) {
    console.error("Error ensuring default admin:", error);
  }
}

// POST - Login
export async function POST(request: NextRequest) {
  try {
    // Ensure admin exists
    await ensureDefaultAdmin();
    
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password harus diisi" },
        { status: 400 }
      );
    }

    // Find admin using raw query
    const admins = await db.$queryRaw`SELECT * FROM admins WHERE username = ${username} AND isActive = 1 LIMIT 1`;
    const admin = (admins as Array<{
      id: string;
      username: string;
      password: string;
      name: string | null;
      role: string;
      isActive: boolean;
      lastLogin: Date | null;
    }>)[0];

    if (!admin) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    // Verify password
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== admin.password) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    // Create session
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db.$executeRaw`INSERT INTO admin_sessions (id, adminId, token, expiresAt, createdAt) 
      VALUES (${crypto.randomUUID()}, ${admin.id}, ${token}, ${expiresAt.toISOString()}, datetime('now'))`;

    // Update last login
    try {
      await db.$executeRaw`UPDATE admins SET lastLogin = datetime('now') WHERE id = ${admin.id}`;
    } catch {
      // Ignore update error
    }

    // Set cookie and return success
    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
      },
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
    return NextResponse.json(
      { error: "Terjadi kesalahan saat login" },
      { status: 500 }
    );
  }
}

// GET - Check session
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    // Validate session using raw query
    const sessions = await db.$queryRaw`
      SELECT s.*, a.id as adminId, a.username, a.name, a.role
      FROM admin_sessions s
      JOIN admins a ON s.adminId = a.id
      WHERE s.token = ${token} AND s.expiresAt > datetime('now')
      LIMIT 1
    `;

    const session = (sessions as Array<{
      adminId: string;
      username: string;
      name: string | null;
      role: string;
    }>)[0];

    if (!session) {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.delete("admin_token");
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: session.adminId,
        username: session.username,
        name: session.name,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}

// DELETE - Logout
export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    
    if (token) {
      try {
        await db.$executeRaw`DELETE FROM admin_sessions WHERE token = ${token}`;
      } catch {
        // Session might not exist
      }
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete("admin_token");
    
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: true });
  }
}
