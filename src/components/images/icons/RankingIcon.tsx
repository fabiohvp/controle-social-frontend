import Image from "next/image";
import { IconProps } from "../types";

type Props = {
  small?: boolean;
} & IconProps;

export default function RankingIcon({ small, ...props }: Props) {
  return (
    <Image
      src="/icons/ranking.png"
      alt="Rankings"
      height={small ? 20 : 50}
      width={small ? 20 : 50}
      {...props}
    />
  );
}
