import { getCodigoMunicipio } from "@/shared/municipio";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaHand } from "react-icons/fa6";
import { EstadoPageProps } from "../../EstadoPageProps";

type Data = {
  chaveSeguranca: string;
  processo: {
    numeroCompleto: string;
    relator: string;
    responsaveis: { nome: string }[];
    unidadesGestoras: { codigo: string }[];
  };
};

type Props = {
  codigoFiltro: string;
} & EstadoPageProps;

async function getData(
  codigoFiltro: string,
  { ano, municipio }: EstadoPageProps
) {
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/PrestacaoConta/GetProcessosPrefeituraECamara?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = (await res.json()) as Data[];
  return data.filter((o) =>
    o.processo.unidadesGestoras.some((p) => p.codigo.includes(codigoFiltro))
  );
}

export default async function SituacaoPrestacaoContaPanel({
  codigoFiltro,
  ano,
  municipio,
}: Props) {
  const data = await getData(codigoFiltro, { ano, municipio });

  return data.length ? (
    <div className="text-gray-dark text-sm w-full">
      <div className="border-dashed border-b flex justify-between">
        <span>Prestação de contas</span>
        <span>{data[0].processo.numeroCompleto}</span>
      </div>
      <div className="flex justify-between">
        <span>Relator</span>
        <span>{data[0].processo.relator}</span>
      </div>
      <div className="text-left">Responsáveis</div>
      {data[0].processo.responsaveis.map((responsavel, index) => (
        <div key={index} className="flex justify-between">
          <span className="capitalize">
            <BsArrowReturnRight className="inline ml-3 mr-1 text-xs" />
            {responsavel.nome.toLocaleLowerCase()}
          </span>
          <span>
            <FaHand />
          </span>
        </div>
      ))}
    </div>
  ) : (
    <div>Prestação de Contas Anual está em atraso para a competência {ano}</div>
  );
}
