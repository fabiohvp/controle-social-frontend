"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

type CarouselItem = {
  titulo: string;
  videoId: string;
};

const carouselItems: CarouselItem[] = [
  { titulo: "Conheça a ferramenta", videoId: "Nkw7cWUi8Mw" },
  { titulo: "Conheça o site (EP: 1)", videoId: "IcxI8NgnKw8" },
  { titulo: "Conheça o destino dos impostos (EP: 2)", videoId: "TuRLHk4q9sc" },
  {
    titulo: "Compare municípios e resultado de fiscalizações (EP: 3)",
    videoId: "qw4PR5G-AeA",
  },
  {
    titulo: "Ranking dos municípios e situação da previdência (EP: 4)",
    videoId: "P7ob45NCeX8",
  },
  {
    titulo: "Raio-X da situação da Saúde no ES (Ep: 05)",
    videoId: "9nxpbyU4hSI",
  },
  {
    titulo: "Raio-X da situação dos gastos com pessoal no ES (Ep: 06)",
    videoId: "Kl3NUYKXDTc",
  },
  {
    titulo: "Explore a situação financeira e fiscal do Estado (Ep: 07)",
    videoId: "W5QTE7ZZicY",
  },
];

export default function ConhecaFerramentaWidget(props: Props) {
  return (
    <div className={twMerge("bg-neutral-100 center p-12", props.className)}>
      <Carousel showThumbs={false} width={840}>
        {carouselItems.map((carouselItem) => (
          <div key={carouselItem.videoId}>
            <p className="carousel-title">{carouselItem.titulo}</p>
            <iframe
              allow="autoplay; encrypted-media"
              src={`https://www.youtube.com/embed/${carouselItem.videoId}?rel=0&amp;amp;showinfo=0&amp;amp;controls=0`}
              height={295}
              width={840}
            ></iframe>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
