import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function FiscalizacaoSection(props: Props) {
  return (
    <Link
      href="/fiscalizacoes/2019/escolas"
      className={`bg-neutral-100 flex justify-center gap-20 p-12 ${
        props.className ?? ""
      }`}
    >
      <Image
        src="/banners/fiscalizacao.png"
        alt="Acompanhe os resultados das nossas fiscalizações, que permitem a mensuração de serviços e políticas públicas."
        height={282}
        width={442}
      />
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Fiscalizações</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Acompanhe os resultados das nossas fiscalizações, que permitem a
          mensuração de serviços e políticas públicas.
        </p>
      </section>
    </Link>
  );
}
