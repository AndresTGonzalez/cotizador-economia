import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

type Company = {
  name: string;
  logo: string;
  secure: string;
};

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
        <NavBar />
        <div className="bg-white flex-1 flex">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
