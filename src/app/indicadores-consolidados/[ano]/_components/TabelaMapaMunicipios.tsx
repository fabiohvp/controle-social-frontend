"use client";
import MapaEsChart, { SelectedRegion } from "@/components/charts/MapaEsChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import SortableTable, {
  SortableTableColumn,
  SortableTableSort,
} from "@/components/tables/SortableTable";
import { useCallback } from "react";
import { getUrlMunicipioIndicador } from "../routes";

type Props<T> = {
  ano: string;
  columns: SortableTableColumn<T>[];
  getRowKey: (row: T, index: number) => string;
  initialSort?: SortableTableSort;
  legends?: { color: string; name: string; value: number }[];
  /** Página do município aberta ao clicar no mapa (padrão: `visao-geral`). */
  paginaMunicipio?: string;
  /** Municípios coloridos no mapa (`name` = nome do município no mapa). */
  regions: SelectedRegion[];
  rows: T[];
  titulo: string;
};

const ALTURA = "min(70vh, 620px)";

/**
 * Tabela ordenável + mapa do ES lado a lado.
 * Componente de cliente: quem o usa também precisa ser `"use client"`,
 * pois `columns` contém funções (`render`). Para rankings use `RankingTabela`.
 */
export default function TabelaMapaMunicipios<T>({
  ano,
  columns,
  getRowKey,
  initialSort,
  legends,
  paginaMunicipio,
  regions,
  rows,
  titulo,
}: Props<T>) {
  const getUrlMunicipio = useCallback(
    (nomeNormalizado: string) =>
      getUrlMunicipioIndicador(ano, nomeNormalizado, paginaMunicipio),
    [ano, paginaMunicipio]
  );

  return (
    <div className="grid gap-2 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <PanelWithTitle bodyProps={{ className: "p-0" }} header={titulo}>
        <SortableTable
          caption={titulo}
          className="w-full"
          columns={columns}
          getRowKey={getRowKey}
          initialSort={initialSort}
          rows={rows}
          style={{ maxHeight: ALTURA }}
        />
      </PanelWithTitle>
      <PanelWithTitle header="Mapa">
        <div className="w-full" style={{ height: ALTURA }}>
          <MapaEsChart
            chartGeoOptions={{ tooltip: { show: true } }}
            getUrlMunicipio={getUrlMunicipio}
            legends={legends}
            selectedRegions={regions}
          />
        </div>
      </PanelWithTitle>
    </div>
  );
}
