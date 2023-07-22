import { GiHamburgerMenu } from "react-icons/gi";
import HeaderFixedButtons from "../HeaderFixedButtons";
import LogoComVersao from "../LogoComVersao";
import DashboardHeaderItems from "./DashboardHeaderMenu";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between px-2" style={{ height: 56 }}>
      <div className="flex items-center gap-3">
        <div className="border h-10 rounded-xs text-xl w-10 sm:hidden">
          <GiHamburgerMenu />
        </div>
        <LogoComVersao />
        <DashboardHeaderItems />
      </div>
      <HeaderFixedButtons className="hidden md:flex" />
    </div>
  );
}
