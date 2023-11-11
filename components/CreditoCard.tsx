"use client";

// CreditoCard.tsx
import React from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface CreditoCardProps {
  id: number;
  nombre: string;
  descripcion: string;
  tasa: number;
}

const CreditoCard: React.FC<CreditoCardProps> = ({
  id,
  nombre,
  descripcion,
  tasa,
}) => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push(`/credito/${id}`);
  };

  return (
    <div
      className="h-36 w-2/3 mb-6 bg-white cursor-pointer rounded-2xl shadow-xl flex flex-row hover:bg-slate-200"
      onClick={handleOnClick}
    >
      <div className="w-1/4 h-full flex items-center justify-center">
        <FaMoneyBillTransfer className="text-cyan-950 w-2/4 h-2/4 m-auto" />
      </div>
      <div className="w-3/4 h-full flex flex-col items-start justify-center p-10">
        <h2 className="text-neutral-900 text-3xl font-light truncate w-full max-w-full">
          {nombre}
        </h2>
        <h4 className="text-neutral-700 font-extralight truncate w-full max-w-full">
          {descripcion}
        </h4>
      </div>
    </div>
  );
};

export default CreditoCard;
