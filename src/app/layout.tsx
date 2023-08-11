import GlobalStateProvider from "@/providers/GlobalProvider";
import { initGlobalState } from "@/shared/globalState";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const globalState = initGlobalState();

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStateProvider value={globalState}>
          {children}
        </GlobalStateProvider>
      </body>
      {/* <script
        async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGQKub_8AS5F9XiIR95UFM5GHE7VE_X20&language=pt-BR"
      ></script> */}
    </html>
  );
}
