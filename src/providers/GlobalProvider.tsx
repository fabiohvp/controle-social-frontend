"use client";
import { GlobalState } from "@/shared/globalState";
import { ReactNode, createContext, useContext } from "react";

export const GlobalStateContext = createContext<Promise<GlobalState> | null>(
  null
);

export function useGlobalState() {
  const globalState = useContext(GlobalStateContext);

  if (!globalState) {
    throw new Error(
      "useGlobalState deve ser utilizado dentro do GlobalStateProvider"
    );
  }
  return globalState;
}

export default function GlobalStateProvider({
  children,
  value: globalState,
}: {
  children: ReactNode;
  value: Promise<GlobalState>;
}) {
  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
}
