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
                const user = { id: "1", usuario: "Admin", password: '' };
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


