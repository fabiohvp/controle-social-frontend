import Image from "next/image";
import { IconProps } from "../../types";

type Props = {
  small?: boolean;
} & IconProps;

export default function PrestacaoContaIcon({ small, ...props }: Props) {
  return (
    <Image
      src={
        small
          ? "/icons/header/prestacao-conta.png"
          : "/icons/prestacao-conta.png"
      }
      alt="Prestação de conta"
      height={small ? 24 : 53}
      width={small ? 26 : 50}
      {...props}
    />
  );
}
