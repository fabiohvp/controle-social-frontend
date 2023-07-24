import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function BoletimIcon(props: Props) {
  return (
    <Image
      src="/icons/header/boletim.png"
      alt="Obrigações"
      height={20}
      width={26}
      {...props}
    />
  );
}
