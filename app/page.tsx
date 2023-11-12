"use client";

import CreditoCard from "@/components/CreditoCard";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "./firebase";
import { Spinner } from "@nextui-org/react";

type Product = {
  id: string;
  name: string;
  description: string;
  percent: number;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    setLoading(true);
    const productsCollection = collection(database, "products");
    const productQuery = query(productsCollection);
    const querySnapshot = await getDocs(productQuery);
    const fetchedData: Array<Product> = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as Product);
    });
    setProducts(fetchedData);
    setLoading(false);
  }
  // Fetch para obtener los productos desde firebase

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full w-screen">
          <Spinner />
        </div>
      ) : (
        <main className="bg-neutral-100 h-full w-screen flex flex-row items-center">
          <div className="w-1/3 h-full bg-white p-10">
            <h2 className="text-4xl font-light">Simulación de Crédito</h2>
            <p>
              ¡Bienvenido a nuestra herramienta de simulación de préstamos! Aquí
              puedes explorar y comparar diferentes tipos de créditos mediante
              la generación de tablas de pagos basadas en los métodos de
              amortización francés y alemán.
            </p>
            <div className="mt-20">
              <h3 className="text-2xl">Amortización Francesa</h3>
              <p>
                El método francés es el sistema de amortización más común. En
                este método, los pagos mensuales consisten en una combinación de
                capital e intereses. A medida que el tiempo avanza, la
                proporción de capital en el pago mensual aumenta, lo que resulta
                en una reducción gradualx de la deuda.
              </p>
            </div>
            <div className="mt-7">
              <h3 className="text-2xl">Amortización Alemana</h3>
              <p>
                Contrastando con el método francés, la amortización alemana
                implica pagos constantes de capital a lo largo de la vida del
                préstamo, con intereses calculados sobre el saldo pendiente.
                Esto conduce a una disminución más rápida de la deuda total en
                comparación con la amortización francesa.
              </p>
            </div>
            <div className="mt-28">
              <p>
                Explora nuestras opciones de crédito y descubre cómo cambian las
                tablas de pagos según el método de amortización seleccionado.
                ¡Comienza tu simulación ahora para tomar decisiones financieras
                informadas!
              </p>
            </div>
          </div>
          <div className="w-2/3 h-[90vh]  p-16  flex flex-col justify-start items-center overflow-y-auto">
            {products.map((credito, index) => (
              <CreditoCard
                key={index}
                id={credito.id}
                nombre={credito.name}
                descripcion={credito.description}
                tasa={credito.percent}
              />
            ))}
          </div>
        </main>
      )}
    </>
  );
}
