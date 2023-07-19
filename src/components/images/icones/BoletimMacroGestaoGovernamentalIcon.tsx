import Image from "next/image";

type Props = {
  className?: string;
  height?: number;
  width?: number;
};

export default function BoletimMacroGestaoGovernamentalIcon(props: Props) {
  return (
    <Image
      src="/images/boletim-macrogestao-governamental.png"
      alt="Painel de controle - Macrogestão governamental do estado do Espírito Santo"
      className={props.className}
      height={props.height ?? 294}
      width={props.width ?? 387}
    />
  );
}
