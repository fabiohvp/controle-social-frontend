import "@/components/layout/dashboard/dashboard-layout.css";
import IndexFooter from "@/components/layout/index/IndexFooter";
import IndexHeader from "@/components/layout/index/IndexHeader";
import { ReactNode } from "react";

export default function IndexLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex items-center justify-between pt-3 pb-5 px-8 bg-gradient-to-b from-[#E9E6E2]">
        <IndexHeader />
      </header>
      <main className="text-sky-700 mt-4 flex flex-col flex-wrap gap-8">
        {children}
      </main>
      <footer className="bg-[#082b54] flex items-center justify-center mt-12 p-8 text-white max-xl:hidden">
        <IndexFooter />
      </footer>
    </>
  );
}
