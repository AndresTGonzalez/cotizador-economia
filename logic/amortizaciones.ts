import { Cuota } from "@/models/Cuota";

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

export function calcularAmortizacionFrancesa(
  monto: number,
  tasa: number,
  tiempo: number,
  seguro: number
) {
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
  return cuotas;
}

export function calcularAmortizacionAlemana(
  monto: number,
  tasa: number,
  tiempo: number,
  seguro: number
) {
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
  return cuotas;
}
