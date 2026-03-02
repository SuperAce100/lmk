import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/" && request.method === "POST") {
    return NextResponse.rewrite(new URL("/text", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
