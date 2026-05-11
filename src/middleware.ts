import { NextResponse, NextRequest } from "next/server";

const adminRoutes = ["/admin", "/factor"];
const authRoutes = ["/signin"];

type Role =
  | "admin"
  | "super_admin"
  | "user"
  | "accountant"
  | "manager"
  | "warehouse_manager"
  | "staff";

type JwtPayload = { role?: Role; sub?: number; exp?: number };

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function isPanelRole(role: Role | undefined): boolean {
  return !!role && role !== "user";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isAdminRoute = adminRoutes.some((r) => pathname.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

  if (isAdminRoute && !refreshToken) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && refreshToken) {
    const payload = accessToken ? decodeJwtPayload(accessToken) : decodeJwtPayload(refreshToken);
    if (isPanelRole(payload?.role)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (isAdminRoute && refreshToken) {
    const payload = accessToken ? decodeJwtPayload(accessToken) : decodeJwtPayload(refreshToken);
    if (!isPanelRole(payload?.role)) {
      const url = new URL("/signin", request.url);
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/factor/:path*", "/signin"],
};
