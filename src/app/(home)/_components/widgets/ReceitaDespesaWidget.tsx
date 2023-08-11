import useGeolocation from "@/hooks/useGeolocation";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function ReceitaDespesaWidget(props: Props) {
  const { municipio } = useGeolocation();

  return (
    <Link
      href={`/municipio/2023/${municipio.nomeNormalizado}/gestao-orcamentaria`}
      className={twMerge("flex justify-center gap-20 p-12", props.className)}
      prefetch={false}
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
