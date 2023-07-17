"use client";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function ServicosIASection(props: Props) {
  return (
    <div
      className={twMerge(
        "bg-neutral-100 center flex-col p-12",
        props.className
      )}
    >
      <p className="carousel-title">Serviços de inteligência artificial</p>
      <div className="border border-gray-400 rounded h-[295px]">
        <Carousel width={840} showThumbs={false}>
          <Link href="/projecao" className="block">
            <Image
              src="/banners/projecao-pessoal.png"
              alt="Visualize quais serão os gastos com pessoal do Estado e municípios projetados pelas nossas ferramentas de inteligência artificial"
              height={291}
              width={840}
            />
          </Link>
          <Link href="/obras" className="block">
            <Image
              src="/banners/obras-publicas.png"
              alt="Visualize quais serão os gastos com pessoal do Estado e municípios projetados pelas nossas ferramentas de inteligência artificial"
              height={291}
              width={840}
            />
          </Link>
          <Image
            src="/banners/acoes-futuras.png"
            alt="Visualize quais serão os gastos com pessoal do Estado e municípios projetados pelas nossas ferramentas de inteligência artificial"
            height={291}
            width={840}
          />
        </Carousel>
      </div>
    </div>
  );
}
