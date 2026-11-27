"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro na página do município:", error);
  }, [error]);

  return (
    <div className="p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[300px]">
      <div className="text-xl font-semibold text-gray-800">
        Não foi possível carregar as informações do município
      </div>
      <p className="text-sm text-gray-600 max-w-md">
        Ocorreu uma instabilidade na consulta às fontes públicas externas.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Tentar novamente
      </button>
    </div>
  );
}
