import Image from "next/image";
import Link from "next/link";
import "./arrecadacaoSection.css";

type Props = {
  className?: string;
};

export default function ArrecadacaoWidget(props: Props) {
  return (
    <Link
      href="/areas-tematicas/educacao/visao-geral"
      className={props.className}
      prefetch={false}
    >
      <div className="flex justify-center gap-20 p-12 relative">
        <Image
          src="/banners/arrecadacao.png"
          alt="Dados sumarizados de arrecadação e despesas do estado e dos municípios."
          height={340}
          width={476}
        />
        <div className="max-w-2xl font-bold items-center gap-12 grid grid-cols-3 grid-rows-3 h-96 text-center text-[1.6vw]">
          <div>&nbsp;</div>
          <div className="self-end">Estado</div>
          <div className="self-end">Municípios</div>

          <div>Receitas</div>
          <div className="text-positivo value">24.0B</div>
          <div className="text-positivo value">24.0B</div>

          <div>Despesas</div>
          <div className="text-negativo value">21.5B</div>
          <div className="text-negativo value">17.9B</div>
        </div>
      </div>
      <div className="max-w-[96rem] relative">
        <span className="absolute bottom-6 right-0 text-gray-light text-xs">
          *Referência 2022
        </span>
      </div>
    </Link>
  );
}
