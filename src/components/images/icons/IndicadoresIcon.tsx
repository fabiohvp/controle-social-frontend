import Image from "next/image";
import { IconProps } from "../types";

type Props = {
  small?: boolean;
} & IconProps;

export default function IndicadoresIcon({ small, ...props }: Props) {
  return (
    <Image
      src="/icons/indicadores.png"
      alt="Obrigações"
      height={small ? 20 : 50}
      width={small ? 20 : 50}
      {...props}
    />
  );
}
