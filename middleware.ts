import { NextResponse } from "next/server";
import { auth } from "~/server/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAccountRoute = nextUrl.pathname.startsWith("/account");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  if ((isAccountRoute || isAdminRoute) && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
