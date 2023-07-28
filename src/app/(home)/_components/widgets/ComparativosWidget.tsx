"use client";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function ComparativosWidget(props: Props) {
  return (
    <div className={twMerge("center flex-col p-12", props.className)}>
      <div className="border border-gray-400 rounded h-[380px]">
        <Carousel width={840} showThumbs={false}>
          <Link
            href="/projecao"
            className="h-full w-full block"
            prefetch={false}
          >
            <p className="carousel-title">Compare municípios</p>
            <Image
              src="/banners/comparativo-municipios.png"
              alt="Compare municípios"
              height={293}
              width={840}
            />
          </Link>
          <Link href="/obras" prefetch={false}>
            <p className="carousel-title">Visualize indicadores consolidados</p>
            <Image
              src="/banners/comparativo-indicadores-consolidados.png"
              alt="Visualize indicadores consolidados de todos os municípios"
              height={293}
              width={840}
            />
          </Link>
          <Link
            href="rankings/2023/municipios/receita-receita-arrecadada"
            prefetch={false}
          >
            <p className="carousel-title">Também temos rankings temáticos</p>
            <Image
              src="/banners/comparativo-ranking-tematicos.png"
              alt="Também temos rankings temáticos"
              height={293}
              width={840}
            />
          </Link>
        </Carousel>
      </div>
    </div>
  );
}
