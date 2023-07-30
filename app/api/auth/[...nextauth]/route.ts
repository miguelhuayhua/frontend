import axios from "axios";
import bcrypt from 'bcryptjs';
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            name: 'Iniciar Sesión',
            credentials: {
                usuario: { label: 'usuario', type: 'text', placeholder: 'Introduzca su nombre de usuario' },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                let salt = bcrypt.genSaltSync(10);

                axios.post(process.env.BACKEND_URL + 'usuario/auth', {

                    usuario: credentials?.usuario,
                    password: credentials?.password
                }).then(res => {
                    console.log(res.data)
                })
                const user = { id: "1", usuario: "Admin", password: bcrypt.hash(credentials?.password!, salt) };
                return user;

            }
        })
    ],
    pages: {
        signIn: '/login',
    }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


