import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function FiscalizacaoIcon(props: Props) {
  return (
    <Image
      src="/icons/header/fiscalizacao.png"
      alt="Fiscalização"
      height={22}
      width={20}
      {...props}
    />
  );
}
