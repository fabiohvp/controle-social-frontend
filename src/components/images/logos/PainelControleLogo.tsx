import Image from "next/image";
import { LogoProps } from "../types";

type Props = LogoProps;

export default function PainelControleLogo(props: Props) {
  return (
    <Image
      src="/logos/painel-controle.png"
      alt="CidadES"
      height={37}
      width={121}
      {...props}
    />
  );
}
