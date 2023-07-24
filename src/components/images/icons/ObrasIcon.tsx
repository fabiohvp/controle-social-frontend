import Image from "next/image";
import { IconProps } from "../types";

type Props = IconProps;

export default function ObrasIcon(props: Props) {
  return (
    <Image
      src="/icons/obras-publicas.svg"
      alt="Obras"
      height={50}
      width={50}
      {...props}
    />
  );
}
