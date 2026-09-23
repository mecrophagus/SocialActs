import type { Metadata } from "next";
import { indexable, siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lolitas | Experiencias y compañía",
    template: "%s | Lolitas",
  },
  description: "Experiencias y compañía en Madrid para mayores de 18 años.",
  robots: { index: indexable, follow: indexable },
  icons: { icon: "/brand/favicon.svg", apple: "/brand/apple-touch-icon.png" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
