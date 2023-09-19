import axios from "axios";
import { withAuth } from "next-auth/middleware"
import { Usuario } from "./app/dashboard/usuarios/data";

// i used advanced middleware configuration
export default withAuth(
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // verify token and return a boolean
        if (token) {

          return true;
        }


        else return false;
      },
    }
  }
)
export const config = {
  matcher: ["/dashboard/:path*"]
}
