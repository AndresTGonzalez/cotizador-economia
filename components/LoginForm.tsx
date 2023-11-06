"use client";

import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      action=""
      className="w-3/4 h-72 flex flex-col items-center justify-between"
    >
      <h2 className="text-2xl font-light">Bienvenido</h2>
      <Input type="email" label="Email" fullWidth />
      <Input type="password" label="Contraseña" fullWidth />
      <Button color="success" fullWidth>
        Ingresar
      </Button>
    </form>
  );
}
