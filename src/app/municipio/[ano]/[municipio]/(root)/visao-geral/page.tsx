import PanelWithTitle from "@/components/layout/panel/PanelWithTitle";
import Link from "next/link";
import { FaUniversity } from "react-icons/fa";
import { MunicipioPageProps } from "../MunicipioPageProps";
import { ReceitasXDespesasPanel } from "./_panels/ReceitasXDespesasPanel";

const FIRST_ROW_HEIGHT = "155px";

export default async function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <div
      className="grid grid-flow-row gap-2 text-gray-dark"
      style={{ gridTemplateColumns: "2fr 1.5fr 2fr 2fr" }}
    >
      <ReceitasXDespesasPanel height={FIRST_ROW_HEIGHT} {...params} />
      <PanelWithTitle
        height={FIRST_ROW_HEIGHT}
        title="Obrigações junto ao TCE-ES"
      >
        <div>teste</div>
      </PanelWithTitle>
      <PanelWithTitle
        height={FIRST_ROW_HEIGHT}
        title="Prefeitura Municipal
"
      >
        <Link
          href={`/municipio/${params.ano}/${params.municipio}/prestacao-conta`}
          className="flex flex-col items-center text-center"
        >
          <FaUniversity className="text-5xl" />
          <div>
            Prestação de Contas Anual está em atraso para a competência 2022
          </div>
        </Link>
      </PanelWithTitle>
      <PanelWithTitle
        height={FIRST_ROW_HEIGHT}
        title="Câmara Municipal de Vereadores"
      >
        <div>teste</div>
      </PanelWithTitle>
    </div>
  );
}
