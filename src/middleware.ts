import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => Boolean(token?.apiToken)
  },
  pages: {
    signIn: '/auth/login'
  }
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/serviceReceiver/:path*',
    '/institution/:path*',
    '/landing/institution/:id/show/:path*',
    '/user/:path*'
  ]
}
