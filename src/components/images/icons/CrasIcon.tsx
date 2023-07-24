import Image from "next/image";
import { IconProps } from "../types";

type Props = IconProps;

export default function CrasIcon(props: Props) {
  return (
    <Image
      src="/icons/cras.png"
      alt="Centros de referência da assistência social (CRAS)"
      height={30}
      width={30}
      {...props}
    />
  );
}
