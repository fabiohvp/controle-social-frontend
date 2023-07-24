import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function PessoalIcon(props: Props) {
  return (
    <Image
      src="/icons/header/pessoal.png"
      alt="Pessoal"
      height={26}
      width={20}
      {...props}
    />
  );
}
