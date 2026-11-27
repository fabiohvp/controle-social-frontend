import AlertPanel from "@/components/panel/AlertPanel";
import { ReactNode } from "react";

/** Faixa informativa no fim das páginas (o "AlertaPagina" do site oficial) */
export default function AvisoPagina({
  children,
  tipo = "info",
}: {
  children: ReactNode;
  tipo?: "info" | "warning" | "danger" | "success";
}) {
  return (
    <AlertPanel type={tipo} className="col-span-full min-h-0 text-sm">
      {children}
    </AlertPanel>
  );
}
