import { cookies } from "next/headers";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "jancy@2026";
const AUTH_COOKIE_NAME = "jb_office_auth";
const AUTH_TOKEN = "jb_staff_authenticated_session_verified";

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSCODE;
}

export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    return token === AUTH_TOKEN;
  } catch {
    return false;
  }
}

export function getAuthCookieHeader(): { name: string; value: string; options: any } {
  return {
    name: AUTH_COOKIE_NAME,
    value: AUTH_TOKEN,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    },
  };
}
