import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import  { Toaster } from 'react-hot-toast';




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cotizador de créditos",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
        <Providers>{children}</Providers>

      </body>
    </html>
  );
}
