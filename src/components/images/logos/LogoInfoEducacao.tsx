import Image from "next/image";
import { LogoProps } from "../types";

type Props = LogoProps;

export default function LogoInfoEducacao(props: Props) {
  return (
    <Image
      src="/logos/info-educacao.png"
      alt="Informações sobre educação"
      height={106}
      width={179}
      {...props}
    />
  );
}
