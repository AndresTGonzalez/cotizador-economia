"use client";

import { Input, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/react";
export default function Drop() {

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Opciones</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Link Actions">
        <DropdownItem key="about" href="/">
          Configurar empresa
        </DropdownItem>
        <DropdownItem key="about" href="/">
          Visualizar cotizador
        </DropdownItem>
        <DropdownItem key="home" href="/home">
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}