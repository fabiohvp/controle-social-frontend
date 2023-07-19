import Image from "next/image";

type Props = {
  className?: string;
  height?: number;
  width?: number;
};

export default function BoletinsInformativoIcon(props: Props) {
  return (
    <Image
      src="/icones/boletins-informativos.png"
      alt="Boletins informativos"
      className={props.className}
      height={props.height ?? 26}
      width={props.width ?? 20}
    />
  );
}
