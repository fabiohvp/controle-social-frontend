"use client";
import useGeolocation from "@/hooks/useGeolocation";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function LimitesSaudeWidget(props: Props) {
  const { municipio } = useGeolocation();

  return (
    <Link
      href={`/municipio/2020/${municipio.nomeNormalizado}/gestao-fiscal/saude`}
      className={twMerge(
        "bg-neutral-100 flex justify-center gap-20 p-12",
        props.className
      )}
      prefetch={false}
    >
      <Image
        src="/banners/limites-saude.png"
        alt="Acompanhe o valor da receita aplicado em saúde, comparado ao limite constitucional mínimo previsto e a média municipal de aplicação per capita"
        height={297}
        width={436}
      />
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Limites com saúde</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Acompanhe o valor da receita aplicado em saúde, comparado ao limite
          constitucional mínimo previsto e a média municipal de aplicação per
          capita.
        </p>
      </section>
    </Link>
  );
}
