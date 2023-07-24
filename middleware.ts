import { withAuth } from "next-auth/middleware"

// i used advanced middleware configuration
export default withAuth(
  function middleware(req) {
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // verify token and return a boolean
        if (token) return true;
        else return false;
      },
    },
  }
)
export const config = {
  matcher: ["/dashboard/:path*"]
}
