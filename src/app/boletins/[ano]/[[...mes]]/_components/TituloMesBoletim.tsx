"use client";
import { getMonthNames } from "@/shared/date";

interface TituloMesBoletimProps {
  ano: number;
  mesSelecionado?: number; // e.g., 1 = January
  mesUltimoEnvio?: number;
}

export default function TituloMesBoletim({
  ano,
  mesSelecionado,
  mesUltimoEnvio,
}: TituloMesBoletimProps) {
  // Get month names in long format
  const meses = getMonthNames({ format: "long" });

  // Determine which month to display
  const mesIndex = (mesSelecionado ?? mesUltimoEnvio ?? 1) - 1;

  return (
    <h2 className="font-normal">
      {meses[mesIndex]} / {ano}
    </h2>
  );
}
