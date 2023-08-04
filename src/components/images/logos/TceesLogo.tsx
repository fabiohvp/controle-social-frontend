import Image from "next/image";
import { LogoProps } from "../types";

type Props = {
  color?: "preto" | "branco";
} & LogoProps;

export default function TceesLogo({ color = "preto", ...props }: Props) {
  return (
    <Image
      src={`/logos/logo-tcees-${color}.png`}
      alt="Tribunal de Contas do Estado do Espírito Santo"
      height={58}
      width={303}
      {...props}
    />
  );
}
