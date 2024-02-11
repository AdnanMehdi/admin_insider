import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import router from 'next/router'

// import Navigation from './navigation/vertical/index'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const token = request.cookies.get('token')
    const {pathname} = request.nextUrl
    const response = NextResponse.next()
    const Secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const apiArray = ['/api/login/','/api/blog/','/api/video/','/api/videos/','/api/photo/','/api/admin/','/reset-password/']

    const shouldIgnore = apiArray.includes(pathname)

    if(shouldIgnore){
        return
    }



    if(token){

        try{
            var verifyToken = await jwtVerify(token,Secret)
            const role = verifyToken.payload.role
            
            if(verifyToken && pathname.startsWith('/login/')){
                // const requestHeaders = new Headers(request.headers)
                // requestHeaders.set('X-Header', 'hello')

                return NextResponse.redirect(new URL(`/dashboard/`,request.url))
            }else if(role !== "root" && pathname === "/members/"){
                return NextResponse.redirect(new URL('/dashboard',request.url))
            }else if(verifyToken){
                return response
            }

        }catch(e){
            if(!verifyToken && pathname !== '/login/'){
                request.cookies.delete('token')
                
                return NextResponse.redirect(new URL('/login',request.url))
            }
        }
    }else if(!token && pathname !== '/login/'){
        return NextResponse.redirect(new URL('/login',request.url))
    }


    
    // try{

    //     const shouldIgnore = arrayString.includes(pathname)

    //     console.log({shouldIgnore,pathname})

    //     if(!shouldIgnore){

    //         var verifyToken = await jwtVerify(token,Secret)
    //         if(verifyToken && pathname === '/login/'){
    //             console.log("shit here..")

    //             return NextResponse.redirect('/dashboard')
    //         }else{
    //             console.log("shit here2..")

    //             return NextResponse.next()
    //         }            

    //     }
    //     console.log("shit here3..")

    //     return NextResponse.next()


        
    // }catch(e){
    //     if(!verifyToken && pathname !== '/login/'){
    //         return NextResponse.redirect('/login')
    //     }
    // }

    return response
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard/:path*', '/account-settings/:path*',
    '/members/:path*','/blogs/:path*',
    '/gallery/:path*','/videos/:path*',
    '/questions/:path*','/login','/'],
}
  