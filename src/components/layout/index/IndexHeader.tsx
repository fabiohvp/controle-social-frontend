import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";

export default function IndexHeader() {
  return (
    <>
      <Image
        src="/logos/painel-controle.png"
        alt="Logo Painel de Controle"
        height={55}
        width={180}
        priority
      />

      <span className="flex items-center gap-3 text-blue-dark ">
        <span className="flex gap-2 items-center font-bold text-sm">
          <FaLock />
          <Link
            href="https://www.tcees.tc.br/cidades/apresentacao/"
            target="_blank"
          >
            CidadES
          </Link>
        </span>

        <Image
          src="/logos/tcees.svg"
          alt="Logo Tribunal de Contas do Estado do Espírito Santo"
          height={60}
          width={296}
          priority
        />
      </span>
    </>
  );
}
