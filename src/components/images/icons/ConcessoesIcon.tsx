import Image from "next/image";
import { IconProps } from "../types";

type Props = IconProps;

export default function ConcessoesIcon(props: Props) {
  return (
    <Image
      src="/icons/concessoes-ppp.png"
      alt="Concessões comuns e PPP"
      height={50}
      width={50}
      {...props}
    />
  );
}
