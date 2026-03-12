import crypto from "crypto";
import { db } from "@/lib/db";

// ============================================
// Authentication Utilities for Admin Dashboard
// ============================================

// Simple password hashing using SHA-256
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Verify password
export function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword;
}

// Generate session token
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Create session
export async function createSession(adminId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

  await db.adminSession.create({
    data: {
      adminId,
      token,
      expiresAt,
    },
  });

  return token;
}

// Validate session
export async function validateSession(token: string) {
  if (!token) return null;

  try {
    const session = await db.adminSession.findUnique({
      where: { token },
      include: { admin: true },
    });

    if (!session) return null;
    if (session.expiresAt < new Date()) {
      await db.adminSession.delete({ where: { id: session.id } });
      return null;
    }

    return session.admin;
  } catch {
    return null;
  }
}

// Delete session (logout)
export async function deleteSession(token: string) {
  try {
    await db.adminSession.delete({ where: { token } });
  } catch {
    // Session might not exist
  }
}

// Get admin by username
export async function getAdminByUsername(username: string) {
  try {
    return await db.admin.findUnique({
      where: { username },
    });
  } catch {
    return null;
  }
}

// Create default admin if none exists
export async function ensureDefaultAdmin() {
  try {
    const adminCount = await db.admin.count();
    if (adminCount === 0) {
      await db.admin.create({
        data: {
          username: "admin",
          password: hashPassword("admin123"),
          name: "Administrator",
          role: "admin",
        },
      });
      console.log("Default admin created: username=admin, password=admin123");
    }
  } catch (error) {
    console.error("Error ensuring default admin:", error);
  }
}
