import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function PrestacaoContaIcon(props: Props) {
  return (
    <Image
      src="/icons/header/prestacao-conta.png"
      alt="Prestação de conta"
      height={30}
      width={32}
      {...props}
    />
  );
}
