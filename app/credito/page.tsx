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
  Button,
  Link,
} from "@nextui-org/react";

interface Cuota {
  key: number;
  numero: number;
  cuota: Number;
  interes: Number;
  seguro: Number;
  capital: Number;
  saldo: Number;
}

function calcularCuotaAmortizacionFrancesa(
  principal: number, // Monto principal del préstamo
  tasaInteresAnual: number, // Tasa de interés anual (porcentaje)
  plazoMeses: number // Número de meses del préstamo
): number {
  const tasaInteresMensual = tasaInteresAnual / 12 / 100; // Tasa de interés mensual
  const cuotas = plazoMeses; // Número de cuotas
  const factor =
    (tasaInteresMensual * Math.pow(1 + tasaInteresMensual, cuotas)) /
    (Math.pow(1 + tasaInteresMensual, cuotas) - 1);
  const cuotaMensual = principal * factor;
  return cuotaMensual;
}

export default function Page() {
  // const cuotas: Cuota[] = [];
  const columns = [
    {
      key: "numero",
      label: "N°",
    },
    {
      key: "cuota",
      label: "Cuota",
    },
    {
      key: "interes",
      label: "Interes",
    },
    {
      key: "seguro",
      label: "Seguro",
    },
    {
      key: "capital",
      label: "Capital",
    },
    {
      key: "saldo",
      label: "Saldo",
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
  const [isInvalidTime, setIsInvalidTime] = useState(false);
  const [amortizacion, setAmortizacion] = useState(0);
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [tiempo, setTiempo] = useState(6);
  const [tasa, setTasa] = useState(14);
  const [seguro, setSeguro] = useState(600);

  const isValid = (monto: number) => {
    return monto >= 1000 && monto <= 50000;
  };

  const isValidTiempo = (tiempo: number) => {
    return tiempo >= 6 && tiempo <= 60;
  };

  const calcularCuotas = () => {
    if (amortizacion === 1) {
      return amortizacionAlemana();
    } else if (amortizacion === 2) {
      return amortizacionFrancesa();
    }
  };

  const amortizacionFrancesa = () => {
    const cuotas: Cuota[] = [];
    let saldo = monto;
    const seguroMensual = seguro / tiempo;
    const cuotaMensual =
      calcularCuotaAmortizacionFrancesa(monto, tasa, tiempo) + seguroMensual;
    for (let i = 1; i <= tiempo; i++) {
      let interes = saldo * (tasa / 100 / 12);
      const capital = cuotaMensual - interes - seguroMensual;
      saldo = saldo - capital;
      cuotas.push({
        key: i,
        numero: i,
        cuota: Number(cuotaMensual.toFixed(2)),
        seguro: Number(seguroMensual.toFixed(2)),
        interes: Number(interes.toFixed(2)),
        capital: Number(capital.toFixed(2)),
        saldo: Number(saldo.toFixed(2)),
      });
    }
    setCuotas(cuotas);
    return cuotas;
  };

  const amortizacionAlemana = () => {
    const cuotas: Cuota[] = [];
    let saldo = monto;
    let capital = monto / tiempo;
    const seguroMensual = seguro / tiempo;
    for (let i = 1; i <= tiempo; i++) {
      let interes = saldo * (tasa / 100 / 12);
      saldo = saldo - capital;
      let cuota = interes + capital + seguroMensual;
      cuotas.push({
        key: i,
        numero: i,
        cuota: Number(cuota.toFixed(2)),
        seguro: Number(seguroMensual.toFixed(2)),
        interes: Number(interes.toFixed(2)),
        capital: Number(capital.toFixed(2)),
        saldo: Number(saldo.toFixed(2)),
      });
    }
    setCuotas(cuotas);
    return cuotas;
  };

  const handleCalcular = () => {
    const cuotas = calcularCuotas();
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
        <div className="w-full h-2/3 flex flex-col justify-between items-start">
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
          <Input
            type="number"
            placeholder="Tiempo de credito"
            pattern="[0-9]*"
            isInvalid={isInvalid}
            onChange={(e) => {
              const value = Number(e.target.value);
              setTiempo(value);
              setIsInvalidTime(!isValidTiempo(value));
            }}
            errorMessage={
              isInvalidTime && "Ingrese un tiempo valido entre 6 y 60 meses"
            }
            max={60}
            min={6}
          />
          <Select
            placeholder="Tipo de amortización"
            variant="soft"
            onChange={amortizacionChange}
            className="w-full"
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
            fullWidth
            onClick={handleCalcular}
          >
            Calcular
          </Button>
        </div>
        <div className="h-1/3 w-full py-3">
          <div className="flex flex-col items-start justify-between">
            <h3 className="text-large text-neutral-700">Información</h3>
            <div>
              <p className="text-small text-neutral-500">
                Monto solicitado: ${monto}
              </p>
              <p className="text-small text-neutral-500">
                Tiempo de credito: {tiempo} meses
              </p>
              <p className="text-small text-neutral-500">
                Tasa de interes: {tasa} %
              </p>
              <p className="text-small text-neutral-500">Seguro: {seguro}</p>
            </div>
            <div className="w-full h-fit flex justify-end">
              <Link href="#" size="sm">
                Generar PDF de la simulación
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-span-2 max-h-full rounded-2xl overflow-auto flex flex-col items-start justify-start">
        <Table
          aria-label="Example table with client side pagination"
          className="max-h-[80vh]"
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={cuotas}>
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
