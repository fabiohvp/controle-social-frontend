import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function ConcessoesPPPSection(props: Props) {
  return (
    <Link
      href="/areas-tematicas/concessao-publica/visao-geral"
      className={twMerge("flex justify-center gap-20 p-12", props.className)}
      prefetch={false}
    >
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Concessões comuns e PPP</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Acompanhe as concessões comuns e as parcerias publico-privadas
          vigentes no Estado do Espírito Santo e em seus municípios.
        </p>
      </section>
      <Image
        src="/banners/concessoes-ppp.png"
        alt="Acompanhe as concessões comuns e as parcerias publico-privadas vigentes no Estado do Espírito Santo e em seus municípios."
        height={340}
        width={380}
      />
    </Link>
  );
}
