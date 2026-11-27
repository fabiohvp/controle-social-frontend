import { RankingItem } from "@/components/ranking/types";
import { ENV } from "@/shared/env";
import { cache } from "react";

/**
 * `RankingsControllers/<endpoint>?anoExercicio=`. A API oficial às vezes
 * responde 500 de forma intermitente, por isso tenta uma segunda vez.
 */
export const getRanking = cache(
  async ({ ano, endpoint }: { ano: string; endpoint: string }) => {
    const url = `${ENV.apiUrl}/RankingsControllers/${endpoint}?anoExercicio=${ano}&v=${ENV.apiVersion}`;
    let res = await fetch(url);

    if (!res.ok) {
      res = await fetch(url);
    }
    if (!res.ok) {
      throw new Error(`Erro ${res.status} ao consultar ${endpoint} (${ano})`);
    }
    return (await res.json()) as RankingItem[];
  }
);
