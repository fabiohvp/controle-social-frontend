"use client";

import { useState, useSyncExternalStore } from "react";

const CHAVE_ACEITE = "painel-controle:cookies-aceitos";
const URL_PRIVACIDADE = "https://www.tcees.tc.br/privacidade/";

function getAceiteSalvo(): boolean {
  try {
    return localStorage.getItem(CHAVE_ACEITE) === "true";
  } catch {
    return false;
  }
}

function salvarAceite() {
  try {
    localStorage.setItem(CHAVE_ACEITE, "true");
  } catch {
    // Armazenamento indisponível (modo privado, bloqueio): o banner fecha só nesta sessão.
  }
}

const semInscricao = () => () => {};

export default function CookieBanner() {
  // No servidor e na hidratação o snapshot é "já aceito", então nada é renderizado.
  // Depois de montar no client, o valor real do localStorage decide: sem flash e sem erro de hidratação.
  const jaAceito = useSyncExternalStore(semInscricao, getAceiteSalvo, () => true);
  const [fechadoNestaSessao, setFechadoNestaSessao] = useState(false);

  if (jaAceito || fechadoNestaSessao) return null;

  function aceitar() {
    salvarAceite();
    setFechadoNestaSessao(true);
  }

  return (
    <section
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-300 bg-white px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.15)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-sm text-gray-800 sm:flex-row sm:justify-between sm:text-left">
        <p>
          O Painel de Controle utiliza cookies para auxiliar na sua navegação.
          Para mais informações, acesse a nossa{" "}
          <a
            href={URL_PRIVACIDADE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            Política de privacidade
          </a>
          .
        </p>
        <button
          type="button"
          onClick={aceitar}
          className="shrink-0 rounded border border-gray-400 bg-gray-100 px-5 py-2 font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          Aceitar e fechar
        </button>
      </div>
    </section>
  );
}
