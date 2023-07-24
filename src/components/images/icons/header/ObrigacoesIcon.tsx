import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function ObrigacoesIcon(props: Props) {
  return (
    <Image
      src="/icons/header/obrigacoes.png"
      alt="Obrigações"
      height={26}
      width={19}
      {...props}
    />
  );
}
