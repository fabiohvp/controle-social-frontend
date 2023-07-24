import Image from "next/image";
import { IconProps } from "../types";

type Props = {
  small?: boolean;
} & IconProps;

export default function MunicipioGeolicalizadoIcon({ small, ...props }: Props) {
  return (
    <Image
      src="/icons/municipio-geolocalizado.png"
      alt="Município"
      height={small ? 28 : 50}
      width={small ? 22 : 39}
      {...props}
    />
  );
}
