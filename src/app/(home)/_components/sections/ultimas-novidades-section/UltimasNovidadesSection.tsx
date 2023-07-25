import Novidades from "@/app/wiki/novidades/_components/Novidades";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement>;

export default function UltimasNovidadesSection({
  className,
  ...props
}: Props) {
  return (
    <div
      className={twMerge("flex justify-center gap-20 p-12", className)}
      {...props}
    >
      <section className="max-w-xl">
        <Novidades className="h-72 mt-8 overflow-y-auto" />
      </section>
      <Image
        src="/banners/ultimas-novidades.png"
        alt="Verifique a evolução das despesas com pessoal e encargos do município nos últimos exercícios."
        height={350}
        width={252}
      />
    </div>
  );
}
