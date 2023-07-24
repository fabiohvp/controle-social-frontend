import Image from "next/image";
import { LogoProps } from "../types";

type Props = LogoProps;

export default function CrasLogo(props: Props) {
  return (
    <Image
      src="/logos/cras.png"
      alt="Centros de Referência da Assistência Social"
      height={110}
      width={183}
      {...props}
    />
  );
}
