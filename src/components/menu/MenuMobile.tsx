import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import EstadoIcon from "../images/icones/header/EstadoIcon";
import MapaESIcon from "../images/icones/header/MapaESIcon";
import "./menu-mobile.css";

type Props = {
  className?: string;
  style?: CSSProperties;
};

export default function MenuMobile(props: Props) {
  return (
    <div
      className={twMerge(
        "bg-gray-200 center h-screen menu-mobile overflow-y-auto p-2",
        props.className
      )}
      style={props.style}
    >
      <ul className="flex flex-col gap-1 self-start w-full">
        <li>
          <section>
            <h5>SERRA</h5>
            <div>Dados da cidade geolocalizada</div>
          </section>
          <div>
            <MapaESIcon />
          </div>
        </li>
        <li>
          <section>
            <h5>MUNICÍPIOS</h5>
            <div>Navegue pelas cidades do ES</div>
          </section>
          <div>
            <MapaESIcon />
          </div>
        </li>
        <li>
          <section>
            <h5>ESTADO - PAINEL DE CONTROLE</h5>
            <div>Macrogestão governamental do ES</div>
          </section>
          <div>
            <EstadoIcon />
          </div>
        </li>
      </ul>
    </div>
  );
}
