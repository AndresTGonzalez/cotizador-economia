"use client";

import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
export default function AdminForm() {
 
  return (
    <form
      action=""
      className="w-3/4 h-72 flex flex-col items-center justify-between mb-60"
    >
      <h2 className="text-2xl font-light mb-4">Ingresar tipo de crédito</h2>
      <div className="mb-4 w-full md:w-96">
        <Input type="text" label="Nombre" fullWidth className="mb-4"/>
        <Input type="text" label="Descripción" fullWidth className="mb-4"/>
        <Input type="text" label="Porcentaje" fullWidth className="mb-4"/>
        <Input type="text" label="Imágen" fullWidth className="mb-4"/>
      </div>
      
      <div className="mb-4 w-full md:w-96" >
        <Button color="success" fullWidth>
            Aceptar
        </Button>
      </div>
      
    </form>
  );
}
