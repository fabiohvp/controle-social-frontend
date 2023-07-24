import Image from "next/image";
import { IconProps } from "../types";

type Props = IconProps;

export default function SaudeIcon(props: Props) {
  return (
    <Image
      src="/icons/saude.png"
      alt="Saúde"
      height={50}
      width={67}
      {...props}
    />
  );
}
