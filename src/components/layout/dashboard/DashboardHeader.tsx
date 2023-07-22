import PainelControleLogo from "@/components/images/logos/PainelControleLogo";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderFixedButtons from "../HeaderFixedButtons";
import DashboardHeaderItems from "./DashboardHeaderMenu";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between px-2" style={{ height: 56 }}>
      <div className="flex items-center gap-3">
        <div className="border h-10 rounded-xs text-xl w-10 sm:hidden">
          <GiHamburgerMenu />
        </div>
        <Link href="/" className="relative center">
          <PainelControleLogo />
          <div className="absolute bottom-0 right-0 text-gray-medium text-xs">
            5.2.10
          </div>
        </Link>
        <DashboardHeaderItems />
      </div>
      <HeaderFixedButtons className="hidden md:flex" />
    </div>
  );
}
