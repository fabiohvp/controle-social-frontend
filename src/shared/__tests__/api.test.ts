import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchJson } from "../api";

describe("fetchJson", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("retorna JSON parseado para status 200", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ valor: 123.45 }),
    } as Response);

    const data = await fetchJson<{ valor: number }>("https://api.exemplo.com/dados");
    expect(data).toEqual({ valor: 123.45 });
  });

  it("retorna null para status 204 No Content sem lançar erro", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      text: async () => "",
    } as Response);

    const data = await fetchJson("https://api.exemplo.com/204");
    expect(data).toBeNull();
  });

  it("retorna null para respostas !res.ok (ex: 404, 500, 502)", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    } as Response);

    const data = await fetchJson("https://api.exemplo.com/500");
    expect(data).toBeNull();
  });

  it("retorna null quando o corpo não for JSON válido (ex: HTML de erro)", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => "<html><body>Bad Gateway</body></html>",
    } as Response);

    const data = await fetchJson("https://api.exemplo.com/html");
    expect(data).toBeNull();
  });

  it("retorna null quando fetch lança exceção de rede ou timeout", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network timeout"));

    const data = await fetchJson("https://api.exemplo.com/timeout");
    expect(data).toBeNull();
  });
});
