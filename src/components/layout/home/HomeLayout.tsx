import { ReactNode } from "react";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex items-center justify-between pt-3 pb-5 px-8 bg-gradient-to-b from-[#E9E6E2]">
        <HomeHeader />
      </header>
      <main className="text-sky-700 mt-4 flex flex-col flex-wrap gap-8">
        {children}
      </main>
      <footer className="bg-[#082b54] center mt-12 p-8 text-white max-xl:hidden">
        <HomeFooter />
      </footer>
    </>
  );
}
