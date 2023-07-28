import MenuHamburguerButton from "@/components/menu/MenuHamburguerButton";
import { MunicipiosProps } from "@/types/Municipio";
import HeaderFixedButtons from "../HeaderFixedButtons";
import LogoComVersao from "../LogoComVersao";
import DashboardHeaderItems from "./DashboardHeaderMenu";

export default function DashboardHeader({ municipios }: MunicipiosProps) {
  return (
    <div
      className="flex gap-3 items-center justify-between px-2"
      style={{ height: 56 }}
    >
      <div className="flex gap-3 h-full items-center w-full">
        <LogoComVersao />
        <DashboardHeaderItems municipios={municipios} />
      </div>
      <HeaderFixedButtons className="hidden md:flex" />
      <MenuHamburguerButton className="xl:hidden" />
    </div>
  );
}
