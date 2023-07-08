import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function ReceitaDespesaSection(props: Props) {
  return (
    <Link
      href="/municipio/2023/colatina/gestao-orcamentaria"
      className={`flex justify-center gap-20 p-12 ${props.className ?? ""}`}
    >
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Receita X Despesas</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Monitore como as receitas e as despesas da sua cidade se comportam ao
          longo dos anos.
        </p>
      </section>
      <Image
        src="/banners/receita-despesa.png"
        alt="Monitore como as receitas e as despesas da sua cidade se comportam ao longo dos anos."
        height={233}
        width={595}
      />
    </Link>
  );
}
