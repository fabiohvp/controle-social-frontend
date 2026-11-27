"use client";
import AlertPanel from "@/components/panel/AlertPanel";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import SankeyChart, { SankeyLink, SankeyNo } from "./SankeyChart";

export type NivelSankey = {
  /** campo do registro da API com o nome do nível (ex.: nomePrograma) */
  campo: string;
  rotulo: string;
  /** nível sempre exibido (sem checkbox): função ou fonte de recurso */
  fixo?: boolean;
};

type Registro = Record<string, string | number> & { value: number };

type Props = {
  /** itens do select (função ou fonte de recurso) */
  opcoes: { valor: string; nome: string }[];
  selecionado: string;
  /** parâmetro de query que guarda a opção selecionada */
  parametro: string;
  niveis: NivelSankey[];
  registros: Registro[] | null;
  mensagemSemDados: string;
};

/**
 * Sankey com select (recarrega a página por query string, os dados vêm do
 * servidor) e checkboxes dos níveis (filtro local), como em "Programas e ações"
 * e "Destino do dinheiro" do site oficial.
 */
export default function SankeyFiltrado({
  opcoes,
  selecionado,
  parametro,
  niveis,
  registros,
  mensagemSemDados,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [carregando, iniciarTransicao] = useTransition();
  const [ativos, setAtivos] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(niveis.map((nivel) => [nivel.campo, true]))
  );

  const { nos, links } = useMemo(() => {
    const ativas = niveis.filter((nivel) => nivel.fixo || ativos[nivel.campo]);
    const nos: SankeyNo[] = [];
    const links: SankeyLink[] = [];
    const nomesNos = new Set<string>();

    for (const registro of registros ?? []) {
      if (!(registro.value > 0)) continue;
      const nomes = ativas.map((nivel) => String(registro[nivel.campo] ?? ""));
      nomes.forEach((nome) => {
        if (nome.length > 0 && !nomesNos.has(nome)) {
          nomesNos.add(nome);
          nos.push({ name: nome });
        }
      });
      for (let i = 0; i < nomes.length - 1; i++) {
        const existente = links.find(
          (link) => link.source === nomes[i] && link.target === nomes[i + 1]
        );
        if (existente) existente.value += registro.value;
        else
          links.push({
            source: nomes[i],
            target: nomes[i + 1],
            value: registro.value,
          });
      }
    }
    return { nos, links };
  }, [registros, ativos, niveis]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <select
          aria-label="Selecionar"
          className="max-w-full rounded border border-gray-300 p-2"
          value={selecionado}
          disabled={carregando}
          onChange={(e) =>
            iniciarTransicao(() =>
              router.push(
                `${pathname}?${parametro}=${encodeURIComponent(e.target.value)}`,
                { scroll: false }
              )
            )
          }
        >
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.nome}
            </option>
          ))}
        </select>
        {niveis
          .filter((nivel) => !nivel.fixo)
          .map((nivel) => (
            <label key={nivel.campo} className="flex items-center gap-1">
              <span aria-hidden>&rsaquo;</span>
              <input
                type="checkbox"
                checked={ativos[nivel.campo]}
                onChange={(e) =>
                  setAtivos((atual) => ({
                    ...atual,
                    [nivel.campo]: e.target.checked,
                  }))
                }
              />
              {nivel.rotulo}
            </label>
          ))}
      </div>

      <div className={carregando ? "opacity-50" : undefined}>
        {nos.length === 0 && (
          <AlertPanel type="warning">
            <strong>Sem dados de despesas.</strong> {mensagemSemDados}
          </AlertPanel>
        )}
        {nos.length > 0 && links.length === 0 && (
          <AlertPanel type="warning">
            Para visualizar o gráfico, favor checar ao menos uma opção.
          </AlertPanel>
        )}
        {links.length > 0 && <SankeyChart nos={nos} links={links} />}
      </div>
    </div>
  );
}
