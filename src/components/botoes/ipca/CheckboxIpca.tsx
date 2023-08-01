"use client";
import { useAtom } from "jotai";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ipcaState } from "./ipcaState";

export default function CheckboxIpca({ className }: { className?: string }) {
  const [ipca, toggle] = useAtom(ipcaState);

  return (
    <button
      className={`flex items-center ${className ?? ""}`}
      onClick={() => toggle()}
      data-tooltip-id="ipca-button-legend"
      data-tooltip-place="bottom"
    >
      <input type="checkbox" className="mr-1" checked={ipca.enabled} readOnly />
      Correção pelo IPCA
      <ReactTooltip id="ipca-button-legend">
        Os valores do ano corrente e do imediatamente anterior não estão
        sujeitos à correção.
        <br />
        Os valores dos anos anteriores são multiplicados pela inflação anual,
        divulgada pelo IBGE, acumulada até aquele respectivo ano.
        <br />
        Exemplo: Se estamos em 2021, os valores desse ano e de 2020 não são
        corrigidos.
        <br />
        Os valores de 2019 são multiplicados pela inflação de 2020.
        <br />
        Os valores de 2018 são multiplicados pela inflação de 2020 e 2019, e
        assim sucessivamente.
      </ReactTooltip>
    </button>
  );
}
