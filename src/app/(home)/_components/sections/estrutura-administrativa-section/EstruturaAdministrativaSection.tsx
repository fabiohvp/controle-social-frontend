import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function EstruturaAdministrativaSection(props: Props) {
  return (
    <Link
      href="/areas-tematicas/educacao/visao-geral"
      className={twMerge("flex justify-center gap-20 p-12", props.className)}
      prefetch={false}
    >
      <Image
        src="/banners/estrutura-administrativa.png"
        alt="Acompanhe quais os cargos, empregos e funções criados no Estado e nos municípios."
        height={282}
        width={467}
      />
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Estrutura administrativa</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Acompanhe os cargos, empregos e funções públicas existentes no Estado
          e nos municípios.
        </p>
      </section>
    </Link>
  );
}
