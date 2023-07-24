import Image from "next/image";
import { IconProps } from "../types";

type Props = {
  small?: boolean;
} & IconProps;

export default function BoletinsInformativoIcon({ small, ...props }: Props) {
  return (
    <Image
      src="/icons/boletins-informativos.png"
      alt="Boletins informativos"
      height={small ? 26 : 50}
      width={small ? 20 : 64}
      {...props}
    />
  );
}
