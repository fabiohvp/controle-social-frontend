import Iframe from "@/components/iframes/Iframe";
import AlertPanel from "@/components/panel/AlertPanel";
import { ReactNode } from "react";

type Props = {
  alerta: ReactNode;
  src: string;
  titulo: string;
};

/** Texto de apresentação da fiscalização + relatório em PDF. */
export default function RelatorioPdf({ alerta, src, titulo }: Props) {
  return (
    <>
      <AlertPanel type="info">{alerta}</AlertPanel>
      <Iframe src={src} title={titulo} className="h-full mt-2 w-full" />
    </>
  );
}
