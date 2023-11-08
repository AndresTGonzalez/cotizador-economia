"use client";
import AdminForm from "@/components/ProductForm";
import { Reorder } from "framer-motion";
import Image from "next/image";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (

    <main className="flex w-screen h-screen items-center justify-center bg-neutral-100">
      <div className="w-3/4 h-4/5 bg-white rounded-xl shadow-lg flex flex-row">
        <div className="w-full h-full flex flex-col items-center justify-center rounded-r-xl">
        <AdminForm />
        </div>
      </div>
    </main>

    
  );
}
