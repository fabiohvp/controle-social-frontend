import Image from "next/image";
import { HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<HTMLImageElement>, "placeholder">;

export default function FundoTabelaComparadorImage(props: Props) {
  return (
    <Image
      src="/images/fundo-tabela-comparador.png"
      alt="Comparador de municípios"
      height={54}
      width={159}
      {...props}
    />
  );
}
