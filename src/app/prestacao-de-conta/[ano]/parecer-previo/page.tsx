import ExternalLink from "@/components/links/ExternalLink";
import AlertPanel from "@/components/panel/AlertPanel";
import { ENV } from "@/shared/env";
import Link from "next/link";
import { SituacaoProcesso } from "../types";
import { ParecerPrevioPageProps } from "./routes";

async function getData(ano: string): Promise<SituacaoProcesso[]> {
  const res = await fetch(
    `${ENV.apiUrl}/PrestacaoContaControllers/EsferaAdministrativa/GetProcessosPrestacaoContaAnualPorTipoConta?tipoConta=Governo&anoExercicio=${ano}&codigoTipoUG=07&dadosMunicipios=true&v=${ENV.apiVersion}`
  );
  return res.json();
}

export default async function Page({
  params,
}: {
  params: ParecerPrevioPageProps;
}) {
  const resolvedParams = await params;

  const situacaoProcessos = await getData(resolvedParams.ano);
  if (!situacaoProcessos.length) {
    return (
      <AlertPanel type="info">
        Ainda não há prestações de contas disponíveis para {resolvedParams.ano}.
      </AlertPanel>
    );
  }

  return (
    <table className="table mt-4 responsive text-sm">
      <thead>
        <tr>
          <th>Processo</th>
          <th>Órgão público</th>
          <th className="min-w-[120px]">Responsáveis</th>
          <th>Acórdão/Parecer</th>
          <th>Recurso</th>
        </tr>
      </thead>
      <tbody>
        {situacaoProcessos.map((row, index) => (
          <tr
            key={row.processo.id}
            className={`${index % 2 === 0 ? "even" : "odd"}`}
          >
            <td data-label="Processo">
              <ExternalLink
                className="justify-end sm:justify-normal"
                href={`https://www.tcees.tc.br/consultas/processo/detalhar-processo-id?idProcesso=${row.processo.id}&key=${row.chaveSeguranca}`}
              >
                {row.processo.numeroCompleto}
              </ExternalLink>
            </td>
            <td data-label="Órgão público">
              {row.processo.unidadesGestoras.map((ug) => (
                <div key={ug.codigo}>
                  <Link
                    href={`/unidade-gestora/${ug.codigo}`}
                    className="justify-end sm:justify-normal"
                  >
                    {ug.nome}
                  </Link>
                </div>
              ))}
            </td>
            <td data-label="Responsáveis">
              {row.processo.responsaveis.map((responsavel) => (
                <div key={responsavel.nome} className="capitalize">
                  {responsavel.nome.toLocaleLowerCase()}
                </div>
              ))}
            </td>
            <td data-label="Parecer prévio">
              {row.processo.responsaveis.map((responsavel) =>
                responsavel.deliberacao ? (
                  <div key={responsavel.nome}>
                    <ExternalLink
                      href={`https://servicos.tcees.tc.br/DocumentoDisponibilizado/BaixarDocumentoDisponibilizado?idDocumento=${responsavel.idDocumentoDeliberacao}&key=${responsavel.chaveSegurancaDeliberacao}`}
                      className="justify-end sm:justify-normal"
                    >
                      {responsavel.deliberacao}
                    </ExternalLink>
                  </div>
                ) : (
                  <div key={responsavel.nome}>-</div>
                )
              )}
            </td>
            <td data-label="Parecer simplificado">
              {row.processo.responsaveis.map((responsavel) =>
                responsavel.numeroParecerPrevioSimplificado ? (
                  <div key={responsavel.nome}>
                    <ExternalLink
                      href={`https://www.tcees.tc.br/consultas/processo/detalhar-processo-id?idProcesso=${responsavel.idParecerPrevioSimplificado}&key=${responsavel.chaveSegurancaParecerSimplificado}`}
                      className="justify-end sm:justify-normal"
                    >
                      {responsavel.numeroParecerPrevioSimplificado}
                    </ExternalLink>
                  </div>
                ) : (
                  <div key={responsavel.nome}>-</div>
                )
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
