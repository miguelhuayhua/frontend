import { Persona } from "@/app/dashboard/personal/agregar/data";
import { Usuario } from "@/app/dashboard/usuarios/data";
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions: AuthOptions = {
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                let usuario = user as unknown as { id_persona: string, usuario: string; fotografia: string; id_usuario: string; estado: number }
                token.usuario = usuario;
            }
            return token;
        }
        , async session({ session, token }) {
            session.user = token.usuario!;
            return session;
        }
    },
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            name: 'Iniciar Sesión',
            credentials: {
                usuario: { label: 'usuario', type: 'text', placeholder: 'Introduzca su nombre de usuario' },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                let res = await axios.post<Usuario>(process.env.BACKEND_URL + '/usuario/auth', {
                    usuario: credentials?.usuario,
                    password: credentials?.password
                });
                if (res.data) {
                    let persona = await axios.post<Persona>(process.env.BACKEND_URL + "/persona/get", { id_persona: res.data.id_persona })
                    return { id: '', usuario: { ...res.data, password: "" }, persona: persona.data }
                }
                else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }


