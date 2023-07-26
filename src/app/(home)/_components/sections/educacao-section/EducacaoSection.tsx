import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function EducacaoSection(props: Props) {
  return (
    <Link
      href="/areas-tematicas/educacao/visao-geral"
      className={twMerge("flex justify-center gap-20 p-12", props.className)}
      prefetch={false}
    >
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Educação</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Conheça a distribuição de escolas públicas, matrículas e profissionais
          da educação no Estado e nos municípios.
        </p>
      </section>
      <Image
        src="/banners/educacao.png"
        alt="Conheça a distribuição de escolas públicas, matrículas e profissionais da educação no Estado e nos municípios."
        height={282}
        width={467}
      />
    </Link>
  );
}
