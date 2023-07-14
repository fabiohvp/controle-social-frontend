import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderFixedButtons from "../HeaderFixedButtons";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between px-2" style={{ height: 56 }}>
      <div className="flex items-center gap-3">
        <div className="border center h-10 rounded-xs text-xl w-10 sm:hidden">
          <GiHamburgerMenu />
        </div>
        <Link href="/" className="relative">
          <Image
            src="/logos/cidades.png"
            alt="CidadES"
            objectFit="cover"
            height={37}
            width={121}
          />
          <div className="absolute top-8 right-0 text-gray-medium text-xs">
            5.2.10
          </div>
        </Link>
        <ul className="dashboard-menu font-bold hidden xl:flex">
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
      <HeaderFixedButtons className="hidden md:flex" />
    </div>
  );
}
