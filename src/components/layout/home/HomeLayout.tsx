import { ReactNode } from "react";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto">
      <header className="flex items-center justify-between pt-3 pb-5 px-8 bg-gradient-to-b from-[#E9E6E2]">
        <HomeHeader />
      </header>
      <main className="text-sky-700">{children}</main>
      <footer className="bg-[#082b54] p-8 text-white">
        <HomeFooter />
      </footer>
    </div>
  );
}
