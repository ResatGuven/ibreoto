import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminPath = req.nextUrl.pathname.startsWith("/ibreoto-yonetim-2025");

    if (isAdminPath && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/ibreoto-yonetim-2025/:path*", "/api/admin/:path*"],
};
