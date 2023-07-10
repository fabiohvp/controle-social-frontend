import Image from "next/image";
import Link from "next/link";
import HeaderFixedButtons from "../HeaderFixedButtons";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between px-2" style={{ height: 56 }}>
      <div className="flex items-center gap-3">
        <Link href="/" className="relative" style={{ height: 37, width: 121 }}>
          <Image
            src="/logos/cidades.png"
            alt="CidadES"
            layout="fill"
            objectFit="contain"
          />
          <div className="absolute top-8 right-0 text-gray-medium text-xs">
            5.2.10
          </div>
        </Link>
        <ul className="dashboard-menu font-bold">
          <li className="px-3 active">Municípios</li>
          <li className="px-3">Estado</li>
          <li className="px-3">Obrigações</li>
          <li className="px-3">Prestações de contas</li>
          <li className="px-3">Fiscalizações</li>
          <li className="px-3">Áreas temáticas</li>
          <li className="px-3">Inteligência artificial</li>
          <li className="px-3">Boletins</li>
        </ul>
      </div>
      <HeaderFixedButtons />
    </div>
  );
}
