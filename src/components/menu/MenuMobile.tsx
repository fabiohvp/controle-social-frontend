import GlobalStateProvider from "@/providers/GlobalProvider";
import { initGlobalState } from "@/shared/globalState";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import MenuMobileModals from "./MenuMobileModals";
import "./menuMobile.css";

type Props = HTMLAttributes<HTMLDivElement>;

export default function MenuMobile({ className, ...props }: Props) {
  const globalState = initGlobalState();

  return (
    <GlobalStateProvider value={globalState}>
      <div
        className={twMerge(
          "bg-gray-200 center h-screen menu-mobile overflow-y-auto p-2 relative",
          className
        )}
        {...props}
      >
        <MenuMobileModals />
      </div>
    </GlobalStateProvider>
  );
}
