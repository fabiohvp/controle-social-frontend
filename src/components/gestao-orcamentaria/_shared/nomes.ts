/** "NomeFuncao_EDUCAÇÃO" => "Educação" (o site oficial remove o prefixo e aplica title case) */
export function getNomeLimpo(nome: string) {
  const semPrefixo = nome.substring(nome.indexOf("_") + 1);
  const minusculas = new Set(["de", "da", "do", "das", "dos", "e", "em", "a", "o", "para", "por", "com"]);
  return semPrefixo
    .toLowerCase()
    .split(/(\s+)/)
    .map((parte, i) =>
      i > 0 && minusculas.has(parte)
        ? parte
        : parte.charAt(0).toUpperCase() + parte.slice(1)
    )
    .join("");
}
