import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req:NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  try {
    if (!token && isAdminRoute && req.nextUrl.pathname !== "/admin/login") {

      return NextResponse.redirect(new URL("/admin/login", req.url));
    } else if (token && isAdminRoute) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    }
    return NextResponse.next();
  } catch {
    if (isAdminRoute && req.nextUrl.pathname !== "/admin/login") {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.set("token", "", { path: "/", expires: new Date(0) });
      return res;
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
