"use client";
import useGeolocation from "@/hooks/useGeolocation";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function PrevidenciaWidget(props: Props) {
  const { municipio } = useGeolocation();

  return (
    <Link
      href={`/municipio/2023/${municipio.nomeNormalizado}/previdencia/receita`}
      className={twMerge(
        "bg-neutral-100 flex justify-center gap-20 p-12",
        props.className
      )}
      prefetch={false}
    >
      <Image
        src="/banners/previdencia.png"
        alt="Monitore a situação dos Regimes Próprios de Previdência Social (RPPS), a partir dos dados de receitas, despesas, compromissos atuariais e segurados."
        height={282}
        width={467}
      />
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Previdência</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Monitore a situação dos Regimes Próprios de Previdência Social (RPPS),
          a partir dos dados de receitas, despesas, compromissos atuariais e
          segurados.
        </p>
      </section>
    </Link>
  );
}
