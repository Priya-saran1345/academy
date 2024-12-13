import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const protectedPaths = [
        '/dashboard',
        '/dashboard/certificate',
        '/dashboard/mycourses',
        '/dashboard/allcourses',
        '/dashboard/profile',
        '/dashboard/support',
        '/dashboard/updates',
        '/dashboard/enroll'   ,
        '/dashboard/mycourses/:path*',


    ];
    const authPaths = ['/login', '/signup'];
    const token = request.cookies.get('login_access_token');
console.log(token)
    if (protectedPaths.includes(path) && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (authPaths.includes(path) && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/login',
        '/signup',
        '/profile',
        '/dashboard/mycourses',
        '/dashboard/allcourses',
        '/dashboard/certificate',
        '/dashboard/profile',
        '/dashboard/support',
        '/dashboard/updates',
        '/dashboard/enroll'   ,
        
'/dashboard/mycourses/:id*',
       '/contact',
       '/courses',
       '/course/:id*'

    ]
};