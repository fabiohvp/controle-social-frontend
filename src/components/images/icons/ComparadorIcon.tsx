import Image from "next/image";
import { IconProps } from "../types";

type Props = {
  small?: boolean;
} & IconProps;

export default function ComparadorIcon({ small, ...props }: Props) {
  return (
    <Image
      src="/icons/comparador.png"
      alt="Obrigações"
      className={props.className}
      height={small ? 20 : 50}
      width={small ? 24 : 59}
      {...props}
    />
  );
}
