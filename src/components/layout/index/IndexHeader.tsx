import Image from "next/image";
import Link from "next/link";
import HeaderFixedButtons from "../HeaderFixedButtons";

export default function IndexHeader() {
  return (
    <>
      <Link href="/">
        <Image
          src="/logos/painel-controle.png"
          alt="Logo Painel de Controle"
          height={55}
          width={180}
          priority
        />
      </Link>
      <HeaderFixedButtons />
    </>
  );
}
