import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log('Middleware executed')
    const authToken = request.cookies.get("authToken")?.value;
    console.log(authToken);

    const loggedInUserNotAccessPaths = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/start-journey";
    if(loggedInUserNotAccessPaths) {
        if(authToken) {
            NextResponse.redirect(new URL("/verification", request.url))
        }
    }
  //return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: [
    "/login",
    "/start-journey",
    "/verification",
    "/dashboard",
]
}