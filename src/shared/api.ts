import { cache } from "react";

/**
 * Realiza fetch seguro de JSON na API externa com cache do React.
 * Trata HTTP 204 (No Content), status HTTP de erro (!res.ok),
 * corpo vazio e JSON inválido, retornando null sem quebrar o SSR.
 */
export const fetchJson = cache(
  async <T>(url: string, init?: RequestInit): Promise<T | null> => {
    try {
      const res = await fetch(url, init);
      if (!res.ok || res.status === 204) return null;
      const text = await res.text();
      if (!text || !text.trim()) return null;
      return JSON.parse(text) as T;
    } catch {
      return null;
    }
  }
);
