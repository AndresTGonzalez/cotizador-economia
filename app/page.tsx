

import CreditoCard from "@/components/CreditoCard";
import Product from "@/models/Product";



export default function Home() {
  const products: Product[] = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `Product name ${index + 1}`,
    description: `Product description ${index + 1}`,
    percent: 0,
  }));
  return (
    <main className="bg-neutral-100 h-full w-screen flex flex-row items-center">
      <div className="w-1/3 h-full bg-white p-10">
        <h2 className="text-4xl font-light">Simulación de Crédito</h2>
        <p>
          ¡Bienvenido a nuestra herramienta de simulación de préstamos! Aquí
          puedes explorar y comparar diferentes tipos de créditos mediante la
          generación de tablas de pagos basadas en los métodos de amortización
          francés y alemán.
        </p>
        <div className="mt-20">
          <h3 className="text-2xl">Amortización Francesa</h3>
          <p>
            El método francés es el sistema de amortización más común. En este
            método, los pagos mensuales consisten en una combinación de capital
            e intereses. A medida que el tiempo avanza, la proporción de capital
            en el pago mensual aumenta, lo que resulta en una reducción gradualx
            de la deuda.
          </p>
        </div>
        <div className="mt-7">
          <h3 className="text-2xl">Amortización Alemana</h3>
          <p>
            Contrastando con el método francés, la amortización alemana implica
            pagos constantes de capital a lo largo de la vida del préstamo, con
            intereses calculados sobre el saldo pendiente. Esto conduce a una
            disminución más rápida de la deuda total en comparación con la
            amortización francesa.
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
  );
}
