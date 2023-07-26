import Image from "next/image";
import { IconProps } from "../../types";

type Props = { color?: "white" | undefined } & IconProps;

export default function EstadoIcon({ color, ...props }: Props) {
  return (
    <Image
      src={
        color === "white"
          ? "/icons/header/estado-white.png"
          : "/icons/header/estado.png"
      }
      alt="Estado"
      height={28}
      width={26}
      {...props}
    />
  );
}
