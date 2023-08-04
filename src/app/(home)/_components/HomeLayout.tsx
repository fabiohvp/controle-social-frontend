import LoadingPage from "@/components/loading/LoadingPage";
import GlobalStateProvider from "@/providers/GlobalProvider";
import { initGlobalState } from "@/shared/globalState";
import { ReactNode, Suspense } from "react";
import { twMerge } from "tailwind-merge";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

export default function HomeLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const globalState = initGlobalState();

  return (
    <GlobalStateProvider value={globalState}>
      <div className={twMerge("home h-screen overflow-y-auto", className)}>
        <header className="flex items-center justify-between pt-3 pb-5 px-8 bg-gradient-to-b from-[#E9E6E2]">
          <HomeHeader />
        </header>
        <main className="text-sky-700">
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        </main>
        <footer className="bg-[#082b54] p-8 text-white">
          <HomeFooter />
        </footer>
      </div>
    </GlobalStateProvider>
  );
}
