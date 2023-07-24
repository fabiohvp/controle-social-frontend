import Image from "next/image";
import { IconProps } from "../types";

type Props = IconProps;

export default function ProjecaoIcon(props: Props) {
  return (
    <Image
      src="/icons/projecao.png"
      alt="Projeção"
      height={50}
      width={50}
      {...props}
    />
  );
}
