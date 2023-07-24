import Image from "next/image";
import { IconProps } from "../types";

type Props = IconProps;

export default function EstruturaAdministrativaIcon(props: Props) {
  return (
    <Image
      src="/icons/estrutura-administrativa.png"
      alt="Estrutura administrativa"
      height={50}
      width={64}
      {...props}
    />
  );
}
