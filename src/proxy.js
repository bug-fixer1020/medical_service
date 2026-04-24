import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Role-based protection
    if (path.startsWith("/admin-dashboard") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    if (path.startsWith("/doctor-dashboard") && token?.role !== "doctor") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/sign-in",
    },
  }
);

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/doctor-dashboard/:path*",
    "/user-profile/:path*",
    "/dashboard/:path*",
  ],
};
