import Image from "next/image";
import { HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<HTMLImageElement>, "placeholder">;

export default function ObrasImage(props: Props) {
  return (
    <Image
      src="/images/obras.png"
      alt="Obras públicas"
      height={124}
      width={185}
      {...props}
    />
  );
}
