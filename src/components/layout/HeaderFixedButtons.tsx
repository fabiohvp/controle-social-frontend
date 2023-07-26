import TceesLogo from "@/components/images/logos/TceesLogo";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function HeaderFixedButtons(props: Props) {
  return (
    <>
      <span
        className={twMerge(
          "flex items-center gap-3 text-blue-dark",
          props.className
        )}
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
          <TceesLogo style={{ height: 60 }} />
        </Link>
      </span>
    </>
  );
}
