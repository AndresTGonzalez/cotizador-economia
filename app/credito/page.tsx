"use client";
import { useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Button
} from "@nextui-org/react";
export default function Page() {
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
    {
      key: "5",
      name: "John Doe",
      role: "Designer",
      status: "Active",
    },
    {
      key: "6",
      name: "Emily Smith",
      role: "Marketing Manager",
      status: "Paused",
    },
    {
      key: "7",
      name: "Sarah Johnson",
      role: "Front-end Developer",
      status: "Active",
    },
    {
      key: "8",
      name: "Michael Brown",
      role: "HR Specialist",
      status: "Vacation",
    },
    {
      key: "9",
      name: "Linda Wilson",
      role: "Product Manager",
      status: "Active",
    },
    {
      key: "10",
      name: "Robert Davis",
      role: "Sales Representative",
      status: "Paused",
    },
    {
      key: "11",
      name: "Amanda Anderson",
      role: "Data Analyst",
      status: "Active",
    },
    {
      key: "12",
      name: "James Taylor",
      role: "QA Tester",
      status: "Vacation",
    },
    {
      key: "13",
      name: "Emma White",
      role: "Content Writer",
      status: "Active",
    },
    {
      key: "14",
      name: "Mark Johnson",
      role: "Backend Developer",
      status: "Paused",
    },
    {
      key: "15",
      name: "Olivia Wilson",
      role: "Customer Support",
      status: "Active",
    },
    {
      key: "16",
      name: "Richard Moore",
      role: "Financial Analyst",
      status: "Vacation",
    },
    {
      key: "17",
      name: "Sophia Clark",
      role: "IT Specialist",
      status: "Active",
    },
    {
      key: "18",
      name: "Matthew Lewis",
      role: "Project Manager",
      status: "Paused",
    },
    {
      key: "19",
      name: "Grace Turner",
      role: "Graphic Designer",
      status: "Active",
    },
    {
      key: "20",
      name: "Daniel Hall",
      role: "Network Engineer",
      status: "Vacation",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  const amortizaciones = [
    {
      key: 1,
      label: "Alemana",
    },
    {
      key: 2,
      label: "Francesa",
    },
  ];

  const [monto, setMonto] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const [amortizacion, setAmortizacion] = useState(0);

  const isValid = (monto: number) => {
    return monto >= 1000 && monto <= 50000;
  };

  const amortizacionChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    console.log(newValue);
    setAmortizacion(Number(newValue));
  };

  return (
    <main className="grid grid-cols-3 gap-4 p-8 h-full w-screen bg-slate-50">
      <div className="bg-white shadow-xl rounded-2xl h-full p-8 max-h-[80vh] overflow-auto">
        <h2 className="text-neutral-800 text-2xl font-medium">
          Credito automotriz
        </h2>
        <Input
          type="number"
          placeholder="Monto a solicitar"
          pattern="[0-9]*"
          isInvalid={isInvalid}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMonto(value);
            setIsInvalid(!isValid(value));
          }}
          errorMessage={
            isInvalid && "Ingrese un monto valido entre 1000 y 50000"
          }
          max={50000}
          min={1000}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
        <Select
          placeholder="Tipo de amortización"
          variant="soft"
          onChange={amortizacionChange}
        >
          {amortizaciones.map((amortizacion) => (
            <Option key={amortizacion.key} value={amortizacion.key}>
              {amortizacion.label}
            </Option>
          ))}
        </Select>
        <Button
          className="mt-4"
          
          color="primary"
          onClick={() => console.log(amortizacion)}
        />
      </div>
      <div className="bg-orange-300 col-span-2 max-h-full rounded-2xl overflow-auto flex items-center justify-center">
        <Table
          aria-label="Example table with client side pagination"
          className="max-h-[80vh]"
        >
          <TableHeader>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="role">ROLE</TableColumn>
            <TableColumn key="status">STATUS</TableColumn>
          </TableHeader>
          <TableBody items={rows}>
            {(item: any) => (
              <TableRow key={item.name}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
