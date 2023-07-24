import Image from "next/image";
import { IconProps } from "../types";

type Props = IconProps;

export default function PessoalIcon(props: Props) {
  return (
    <Image
      src="/icons/pessoal.png"
      alt="Pessoal"
      height={65}
      width={77}
      {...props}
    />
  );
}
