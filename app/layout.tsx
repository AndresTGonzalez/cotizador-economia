import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

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
      <body className={`${inter.className} h-screen w-screen flex flex-col`}>
        <Toaster position="top-right" reverseOrder={false} />
        <nav className="w-screen h-20 bg-cyan-900 flex flex-row items-center p-10">
          <h1 className="text-white font-medium text-lg">NOMBRE DE LA EMPRESA</h1>
        </nav>
        <div className="bg-white flex-1 flex">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
