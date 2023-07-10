import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";

type Props = {
  className?: string;
};

export default function HeaderFixedButtons(props: Props) {
  return (
    <>
      <span
        className={`flex items-center gap-3 text-blue-dark ${
          props.className ?? ""
        }`}
      >
        <span className="flex gap-2 items-center font-bold text-sm">
          <FaLock />
          <Link
            href="https://www.tcees.tc.br/cidades/apresentacao/"
            target="_blank"
          >
            CidadES
          </Link>
        </span>

        <Link href="https://www.tcees.tc.br/" target="_blank">
          <Image
            src="/logos/tcees.svg"
            alt="Logo Tribunal de Contas do Estado do Espírito Santo"
            height={60}
            width={296}
            priority
          />
        </Link>
      </span>
    </>
  );
}
