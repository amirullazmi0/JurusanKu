'use server'
import { NextResponse, NextRequest } from "next/server";
import Cookies from 'js-cookie'

export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('access_token')
    let level: any = request.cookies.get('level')
    if (!cookie) {
        if (request.nextUrl.pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL("/login/admin", request.url))
        } else if ("/student") {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
}

export const config = {
    matcher: ["/admin/:path*", "/student/:path*"],
}