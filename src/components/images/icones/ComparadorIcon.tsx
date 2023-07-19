import Image from "next/image";

type Props = {
  className?: string;
  height?: number;
  width?: number;
};

export default function ComparadorIcon(props: Props) {
  return (
    <Image
      src="/icones/comparador.png"
      alt="Obrigações"
      className={props.className}
      height={props.height ?? 26}
      width={props.width ?? 20}
    />
  );
}
