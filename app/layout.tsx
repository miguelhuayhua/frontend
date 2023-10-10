import "./globals.scss";
import { NextAuthProvider } from "./NextAuthProvider";

export const metadata = {
  title: "Unidad Adultos Mayores - GAMEA",
  description: "Unidad de denuncia para adultos mayores del Gobierno Municipal de El Alto",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = async ({ children }) => {
  return (
    <html lang="es">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
