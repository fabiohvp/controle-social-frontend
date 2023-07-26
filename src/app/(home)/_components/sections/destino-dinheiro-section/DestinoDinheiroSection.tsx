import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function DestinoDinheiroSection(props: Props) {
  return (
    <Link
      href="/municipio/2023/colatina/gestao-orcamentaria/destino-dinheiro"
      className={twMerge(
        "bg-neutral-100 flex justify-center gap-20 p-12",
        props.className
      )}
      prefetch={false}
    >
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Destino do dinheiro</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Acompanhe como o dinheiro proveniente de determinadas fontes de
          recursos tem sido aplicado em seu município.
        </p>
      </section>
      <Image
        src="/banners/destino-dinheiro.png"
        alt="Acompanhe como o dinheiro proveniente de determinadas fontes de recursos tem sido aplicado em seu município."
        height={282}
        width={467}
      />
    </Link>
  );
}
