import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lolitas | Experiencias y compañía",
  description:
    "Descubre experiencias, planes y compañía en un entorno cuidado, discreto y pensado para mayores de 18 años.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}