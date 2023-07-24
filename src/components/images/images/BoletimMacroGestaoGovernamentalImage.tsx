import Image from "next/image";
import { HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<HTMLImageElement>, "placeholder">;

export default function BoletimMacroGestaoGovernamentalImage(props: Props) {
  return (
    <Image
      src="/images/boletim-macrogestao-governamental.png"
      alt="Painel de controle - Macrogestão governamental do estado do Espírito Santo"
      height={294}
      width={387}
      {...props}
    />
  );
}
