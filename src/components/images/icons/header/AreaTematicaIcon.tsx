import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function AreaTematicaIcon(props: Props) {
  return (
    <Image
      src="/icons/header/area-tematica.png"
      alt="Área Temática"
      height={26}
      width={26}
      {...props}
    />
  );
}
