import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/fr", req.url));
    }

    return NextResponse.next();
}
