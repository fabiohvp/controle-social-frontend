import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function SaudeWidget(props: Props) {
  return (
    <Link
      href="/area-tematica/saude/visao-geral"
      className={twMerge(
        "bg-neutral-100 flex justify-center gap-20 p-12",
        props.className
      )}
      prefetch={false}
    >
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Saúde</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Conheça equipamentos, leitos e estabelecimentos de saúde públicos e
          privados existentes em cada município.
        </p>
      </section>
      <Image
        src="/banners/saude.png"
        alt="Conheça a distribuição de escolas públicas, matrículas e profissionais da educação no Estado e nos municípios."
        height={282}
        width={467}
      />
    </Link>
  );
}
