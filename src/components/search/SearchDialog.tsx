"use client";
import CloseButton from "@/components/buttons/CloseButton";
import { useGlobalState } from "@/providers/GlobalProvider";
import {
  PAINEIS,
  getHrefPainel,
  getPaineisMunicipios,
  pesquisarPaineis,
} from "@/shared/paineis";
import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./searchDialog.css";
import { searchOpenState } from "./searchState";

type RouteParams = {
  ano?: string;
  municipio?: string;
};

type Opcao = {
  href: string;
  id: string;
  secao: string;
  titulo: string;
};

type Grupo = {
  id: string;
  opcoes: Opcao[];
  titulo: string;
};

/**
 * Modal "Pesquisar painel". Monte um único por página (está no
 * `DashboardHeader`); os botões (`SearchButton`) só abrem o modal.
 * Atalhos: Ctrl/Cmd+K e "/" (fora de campos de texto).
 */
export default function SearchDialog() {
  const [open, setOpen] = useAtom(searchOpenState);
  const [busca, setBusca] = useState("");
  const [ativo, setAtivo] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const globalState = useGlobalState();
  const params = useParams<RouteParams>();
  const router = useRouter();
  const id = useId();
  const tituloId = `${id}-titulo`;
  const listboxId = `${id}-resultados`;

  const paineisMunicipios = useMemo(
    () => getPaineisMunicipios(globalState.municipios, globalState),
    [globalState]
  );

  const grupos = useMemo<Grupo[]>(() => {
    const contexto = {
      ano: params?.ano,
      globalState,
      municipio: params?.municipio,
    };
    let indice = 0;
    const toOpcoes = (paineis: typeof PAINEIS) =>
      paineis.map((painel) => ({
        href: getHrefPainel(painel, contexto),
        id: `${id}-opcao-${indice++}`,
        secao: painel.secao,
        titulo: painel.titulo,
      }));

    return [
      {
        id: `${id}-grupo-paineis`,
        opcoes: toOpcoes(pesquisarPaineis(PAINEIS, busca)),
        titulo: "Painéis",
      },
      {
        id: `${id}-grupo-municipios`,
        opcoes: toOpcoes(pesquisarPaineis(paineisMunicipios, busca)),
        titulo: "Municípios",
      },
    ].filter((grupo) => grupo.opcoes.length > 0);
  }, [busca, globalState, id, paineisMunicipios, params?.ano, params?.municipio]);

  const opcoes = useMemo(() => grupos.flatMap((grupo) => grupo.opcoes), [grupos]);
  const opcaoAtiva = opcoes[ativo];

  // sincroniza o estado com o <dialog>: showModal() dá foco, inert e Esc nativos
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
      // o React não emite o atributo autofocus, então o foco inicial é explícito
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // atalhos globais: Ctrl/Cmd+K e "/"
  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      const atalhoCtrlK =
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        event.key.toLowerCase() === "k";
      const atalhoBarra =
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !isCampoEditavel(event.target);

      if (atalhoCtrlK || atalhoBarra) {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  // mantém a opção ativa visível ao navegar com as setas
  useEffect(() => {
    if (opcaoAtiva) {
      document
        .getElementById(opcaoAtiva.id)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [opcaoAtiva]);

  function onClose() {
    setOpen(false);
    setBusca("");
    setAtivo(0);
  }

  // light dismiss em navegadores sem suporte a closedby (Safari)
  function onClickDialog(event: MouseEvent<HTMLDialogElement>) {
    const dialog = event.currentTarget;

    if ("closedBy" in HTMLDialogElement.prototype || event.target !== dialog) {
      return;
    }
    const rect = dialog.getBoundingClientRect();
    const dentro =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;

    if (!dentro) {
      dialog.close();
    }
  }

  function onKeyDownInput(event: KeyboardEvent<HTMLInputElement>) {
    if (opcoes.length === 0) {
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setAtivo((ativo + 1) % opcoes.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setAtivo((ativo - 1 + opcoes.length) % opcoes.length);
        break;
      case "PageDown":
        event.preventDefault();
        setAtivo(Math.min(ativo + 10, opcoes.length - 1));
        break;
      case "PageUp":
        event.preventDefault();
        setAtivo(Math.max(ativo - 10, 0));
        break;
      case "Enter":
        if (opcaoAtiva) {
          event.preventDefault();
          router.push(opcaoAtiva.href);
          dialogRef.current?.close();
        }
        break;
    }
  }

  function onClickOpcao(event: MouseEvent<HTMLAnchorElement>) {
    // Ctrl/Cmd/Shift+clique abre em outra aba: mantém o modal aberto
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
      dialogRef.current?.close();
    }
  }

  const buscaPreenchida = busca.trim() !== "";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={tituloId}
      className="search-dialog"
      closedby="any"
      onClick={onClickDialog}
      onClose={onClose}
    >
      <div className="flex flex-col max-h-[inherit]">
        <header className="flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-200">
          <h1 id={tituloId} className="text-base">
            Pesquisar painel
          </h1>
          <form method="dialog">
            <CloseButton aria-label="Fechar" title="Fechar (Esc)" />
          </form>
        </header>

        <div className="p-3">
          <label className="search-dialog-input flex items-center gap-2 border border-gray-light rounded-md px-3 focus-within:border-primary">
            <FaMagnifyingGlass aria-hidden="true" className="text-gray-medium" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-label="Informe o painel ou município desejado"
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-expanded={opcoes.length > 0}
              aria-activedescendant={opcaoAtiva?.id}
              autoComplete="off"
              enterKeyHint="go"
              spellCheck={false}
              className="flex-1 min-w-0 py-2 bg-transparent outline-none"
              placeholder="Informe o painel desejado..."
              value={busca}
              onChange={(event) => {
                setBusca(event.target.value);
                setAtivo(0);
              }}
              onKeyDown={onKeyDownInput}
            />
          </label>
        </div>

        <div
          id={listboxId}
          role="listbox"
          aria-label="Resultados"
          className="min-h-0 overflow-y-auto overscroll-contain px-3 pb-3"
          hidden={opcoes.length === 0}
        >
          {grupos.map((grupo) => (
            <div key={grupo.id} role="group" aria-labelledby={grupo.id}>
              <div
                id={grupo.id}
                className="pt-2 pb-1 text-xs font-semibold uppercase text-gray-medium"
              >
                {grupo.titulo}
              </div>
              {grupo.opcoes.map((opcao) => {
                const selecionada = opcao.id === opcaoAtiva?.id;
                return (
                  <Link
                    key={opcao.id}
                    id={opcao.id}
                    href={opcao.href}
                    role="option"
                    aria-selected={selecionada}
                    tabIndex={-1}
                    prefetch={false}
                    className={clsx(
                      "flex flex-wrap items-baseline justify-between gap-x-3 px-2 py-2 border-b border-[#eee] rounded-sm text-gray-dark",
                      selecionada && "bg-menu-active"
                    )}
                    onClick={onClickOpcao}
                    onMouseMove={() => setAtivo(opcoes.indexOf(opcao))}
                  >
                    <span>{opcao.titulo}</span>
                    <span className="text-xs text-gray-medium">
                      {opcao.secao}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {buscaPreenchida && opcoes.length === 0 && (
          <p className="px-3 pb-3 text-gray-medium">Não encontrado</p>
        )}
        <p role="status" className="sr-only">
          {buscaPreenchida
            ? opcoes.length === 0
              ? "Nenhum resultado"
              : `${opcoes.length} ${opcoes.length === 1 ? "resultado" : "resultados"}`
            : ""}
        </p>
      </div>
    </dialog>
  );
}

function isCampoEditavel(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}
