import MenuHamburguerButton from "@/components/menu/MenuHamburguerButton";
import SearchButton from "@/components/search/SearchButton";
import SearchDialog from "@/components/search/SearchDialog";
import HeaderFixedButtons from "../HeaderFixedButtons";
import LogoComVersao from "../LogoComVersao";
import DashboardHeaderItems from "./DashboardHeaderMenu";

export default function DashboardHeader() {
  return (
    <div
      className="flex gap-3 items-center justify-between px-2"
      style={{ height: 56 }}
    >
      <div className="flex gap-3 h-full items-center w-full">
        <LogoComVersao />
        <DashboardHeaderItems />
      </div>
      <HeaderFixedButtons className="hidden md:flex" />
      <SearchButton className="shrink-0 xl:hidden" compact />
      <MenuHamburguerButton className="xl:hidden" />
      <SearchDialog />
    </div>
  );
}
