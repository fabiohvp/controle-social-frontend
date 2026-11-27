import CookieBanner from "@/components/cookies/CookieBanner";
import GlobalStateProvider from "@/providers/GlobalProvider";
import { globalState, initGlobalState } from "@/shared/globalState";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      ":: Painel de Controle - Tribunal de Contas do Estado do Espírito Santo ::",
    template: "%s :: Painel de Controle - TCE-ES",
  },
  description:
    "Painel de Controle: a sua ferramenta de fiscalização dos órgãos públicos capixabas",
  authors: [{ name: "STI - TCE-ES" }],
  other: { copyright: "© Tribunal de Contas do Espírito Santo" },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  await initGlobalState();

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <GlobalStateProvider value={globalState}>
          {children}
          <CookieBanner />
        </GlobalStateProvider>
      </body>
    </html>
  );
}
