import Image from "next/image";
import { LogoProps } from "../types";

type Props = LogoProps;

export default function DespesaPppLogo(props: Props) {
  return (
    <Image
      src="/logos/despesa-ppp.png"
      alt="Despesas com parcerias público-privadas"
      height={161}
      width={180}
      {...props}
    />
  );
}
