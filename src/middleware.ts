import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/admin", "/factor"];
const adminRoutes = ["/admin", "/factor"];
const authRoutes = ["/signin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;
  const refresh = request.cookies.get("refresh_token")?.value;
  const role = "admin";

  if (!refresh) {
    if (
      protectedRoutes.some((route) => pathname.startsWith(route)) ||
      adminRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/signin",
  ],
};
