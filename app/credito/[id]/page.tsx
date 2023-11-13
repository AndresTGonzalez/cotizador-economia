"use client";
import { useState, useEffect, SetStateAction } from "react";
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
import {
  calcularAmortizacionAlemana,
  calcularAmortizacionFrancesa,
} from "@/logic/amortizaciones";
import { Cuota } from "@/models/Cuota";
import { columnasAmortizacion } from "@/data/columnasAmortizacion";
import { amortizaciones } from "@/data/tiposAmortizacion";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { database } from "@/app/firebase";
import { Spinner } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";

type Product = {
  id: string;
  name: string;
  description: string;
  percent: number;
  image: string;
};

type Company = {
  id: string;
  name: string;
  logo: string;
  secure: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const [monto, setMonto] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidTime, setIsInvalidTime] = useState(false);
  const [amortizacion, setAmortizacion] = useState(0);
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [tiempo, setTiempo] = useState(6);
  const [tasa, setTasa] = useState(0);
  const [seguro, setSeguro] = useState(600);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchSecure() {
    setLoading(true);
    const productsCollection = collection(database, "company");
    const productQuery = query(productsCollection);
    const querySnapshot = await getDocs(productQuery);
    const fetchedData: Array<Company> = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as Company);
    });
    setSeguro(Number(fetchedData[0].secure));
    setLoading(false);
  }

  async function fetchData() {
    setLoading(true);
    const productsCollection = collection(database, "products");
    const productDoc = doc(productsCollection, params.id);
    const docSnapshot = await getDoc(productDoc);

    if (docSnapshot.exists()) {
      const fetchedData = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as Product;
      setNombre(fetchedData.name);
      setTasa(fetchedData.percent);
      setLoading(false);
    } else {
      console.log("No existe un producto con ese ID");
    }
  }

  useEffect(() => {
    fetchData();
    fetchSecure();
  }, []);

  const isValid = (monto: number) => {
    return monto >= 1000 && monto <= 50000;
  };

  const isValidTiempo = (tiempo: number) => {
    return tiempo >= 6 && tiempo <= 60;
  };

  const calcularCuotas = () => {
    if (amortizacion === 1) {
      console.log("Amortizacion Alemana");
      const tabla = calcularAmortizacionAlemana(monto, tasa, tiempo, seguro);
      console.log(tabla);
      return tabla;
    } else if (amortizacion === 2) {
      const tabla = calcularAmortizacionFrancesa(monto, tasa, tiempo, seguro);
      return tabla;
    }
  };

  const handleCalcular = () => {
    setCuotas(calcularCuotas()!);
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmortizacion(Number(e.target.value));
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full w-screen">
          <Spinner />
        </div>
      ) : (
        <main className="grid grid-cols-3 gap-4 p-8 h-full w-screen bg-neutral-100">
          <div className="bg-white shadow-xl rounded-2xl h-full p-8 max-h-[80vh] overflow-auto">
            <div className="w-full h-2/3 flex flex-col justify-between items-start">
              <h2 className="text-neutral-800 text-2xl font-medium">
                {nombre}
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
                label="Tipo de amortización"
                fullWidth
                onChange={handleSelectionChange}
              >
                {amortizaciones.map((amortizacion) => (
                  <SelectItem key={amortizacion.key} value={amortizacion.key}>
                    {amortizacion.label}
                  </SelectItem>
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
                  <p className="text-small text-neutral-500">
                    Seguro: {seguro}
                  </p>
                </div>
                <div className="w-full h-fit flex justify-end">
                  <Link
                    href="#"
                    size="sm"
                    onClick={() => {
                      window.print();
                    }}
                  >
                    Imprimir la simulación
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-2 max-h-full rounded-2xl overflow-auto flex flex-col items-start justify-start">
            <Table aria-label="Tabla de cuotas" className="max-h-[80vh]">
              <TableHeader>
                {columnasAmortizacion.map((column) => (
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
      )}
    </>
  );
}
