import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { jwtVerify } from 'jose'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const token = request.cookies['token']
    const {pathname} = request.nextUrl

    if(token){
        var verifyToken = await jwtVerify(token,new TextEncoder().encode(process.env.JWT_SECRET))
    }else{
        NextResponse.next().clearCookie('token')
    }

    // console.log(verifyToken)
    // const userLoggedIn = pathname.includes('/login')

    // if(userLoggedIn){
    //     if(verifyToken){
    //         return NextResponse.redirect('/dashboard')
    //     }
    // }else{
    //     if(!verifyToken && pathname !== '/login'){
    //         return NextResponse.redirect('/login')
    //     }
    // }

    // if(!verifyToken && pathname !== '/login'){
    //     return NextResponse.redirect('/dashboard')
    // }else{
    //     return NextResponse.redirect('/login')
    // }

    

    // excluding login api for login admins...//
    // if(pathname === '/api/login'){
    //     return
    // }

//   return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/blogs/:path*','/gallery/:path*','/videos/:path*','/questions/:path*','/api/:path*',
//   '/account-settings/:path*'],
// }