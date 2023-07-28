import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function Educacao2Widget(props: Props) {
  return (
    <Link
      href="/municipio/2020/colatina/gestao-fiscal/educacao"
      className={twMerge(
        "bg-neutral-100 flex justify-center gap-20 p-12",
        props.className
      )}
      prefetch={false}
    >
      <Image
        src="/banners/educacao2.png"
        alt="Veja quais são os investimentos realizados na educação."
        height={331}
        width={464}
      />
      <section className="max-w-xl">
        <h2 className="title-with-vertical-bar">Educação</h2>
        <p className="mt-8 text-gray-dark text-2xl">
          Veja quais são os investimentos realizados na educação.
        </p>
      </section>
    </Link>
  );
}
