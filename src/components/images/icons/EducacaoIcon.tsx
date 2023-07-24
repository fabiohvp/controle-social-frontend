import Image from "next/image";
import { IconProps } from "../types";

type Props = IconProps;

export default function EducacaoIcon(props: Props) {
  return (
    <Image
      src="/icons/educacao.png"
      alt="Educação"
      height={50}
      width={50}
      {...props}
    />
  );
}
