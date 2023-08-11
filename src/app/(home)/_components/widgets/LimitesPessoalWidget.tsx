import useGeolocation from "@/hooks/useGeolocation";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function LimitesPessoalWidget(props: Props) {
  const { municipio } = useGeolocation();

  return (
    <Link
      href={`/municipio/2023/${municipio.nomeNormalizado}/gestao-fiscal/pessoal`}
      className={twMerge("flex justify-center gap-20 p-12", props.className)}
      prefetch={false}
    >
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Limites com pessoal</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Verifique a evolução das despesas com pessoal e encargos do município
          nos últimos exercícios.
        </p>
      </section>
      <Image
        src="/banners/limites-pessoal.png"
        alt="Verifique a evolução das despesas com pessoal e encargos do município nos últimos exercícios."
        height={278}
        width={475}
      />
    </Link>
  );
}
