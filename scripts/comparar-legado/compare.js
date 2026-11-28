// node compare.js > report.md
const fs = require('fs');
const L = JSON.parse(fs.readFileSync(process.env.LEG || 'legacy.json', 'utf8'));
const N = JSON.parse(fs.readFileSync('novo.json', 'utf8'));
const ALIAS = fs.existsSync('alias.json') ? JSON.parse(fs.readFileSync('alias.json', 'utf8')) : {};

const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const keyOf = (p) => p.split('/').map(norm).filter(Boolean).join('/');

const MAP = require('./mapping.js');
const mapPath = (p) => { let x = p; for (const [re, to] of MAP) { if (re.test(x)) { x = x.replace(re, to); break; } } return x; };
const novoByKey = {};
for (const p of Object.keys(N)) novoByKey[keyOf(p)] = p;

const isNoise = (l) => /^[\d\s.,%R$()+\-–/:KMB|]*$/.test(l) || l.length < 3;
const textSet = (r) => new Set((r.text || []).filter((l) => !isNoise(l)).map(norm).filter((x) => x.length > 2));

const colorsOf = (c) => {
  const m = {};
  for (const [name, col] of c.series || []) if (col) m[norm(name)] = col.toLowerCase();
  return m;
};
const paletteOf = (c) => (c.palette || '').toLowerCase().split(',').map((x) => x.trim()).filter(Boolean);

const freq = {};
const lpages = Object.values(L).filter((r) => !r.error);
for (const r of lpages) for (const k of new Set((r.text || []).map(norm))) freq[k] = (freq[k] || 0) + 1;
const common = new Set(Object.keys(freq).filter((k) => freq[k] > Math.max(8, lpages.length * 0.2)));
const out = [];
const unmatched = [];
let pairs = 0;
for (const lp of Object.keys(L).sort()) {
  const lr = L[lp];
  if (lr.error) continue;
  const np = ALIAS[lp] || novoByKey[keyOf(mapPath(lp))] || novoByKey[keyOf(lp)] || novoByKey[keyOf(lr.finalUrl || '')];
  if (!np || !N[np]) { unmatched.push(lp + (lr.finalUrl && lr.finalUrl !== lp ? ` (→ ${lr.finalUrl})` : '') + ` charts=${(lr.charts || []).length} iframes=${(lr.iframes || []).length}`); continue; }
  pairs++;
  const nr = N[np];
  const problems = [];
  if (nr.error) problems.push(`ERRO novo: ${nr.error}`);
  if (nr.status >= 400) problems.push(`HTTP ${nr.status} no novo`);
  // textos
  const nt = textSet(nr);
  const ntAll = [...nt].join('|');
  const missing = [...new Set((lr.text || []).filter((l) => !isNoise(l)))].filter((l) => { const k = norm(l); return k.length > 2 && !common.has(k) && !nt.has(k) && !ntAll.includes(k); });
  if (missing.length) problems.push(`Textos ausentes (${missing.length}): ${missing.slice(0, 40).map((x) => JSON.stringify(x.slice(0, 80))).join(', ')}`);
  // iframes
  if ((lr.iframes || []).length && !(nr.iframes || []).length) problems.push(`Legado tem iframe(s) e novo não: ${lr.iframes.join(' ')}`);
  // gráficos
  const lc = (lr.charts || []);
  const nc = (nr.charts || []);
  if (lc.length > nc.length) problems.push(`Gráficos: legado ${lc.length}, novo ${nc.length}`);
  const ncByTitle = {};
  nc.forEach((c) => { (ncByTitle[norm(c.title)] ||= []).push(c); });
  const used = new Set();
  for (const c of lc) {
    const t = norm(c.title);
    const cands = (ncByTitle[t] || []).filter((x) => !used.has(x));
    if (!cands.length) { problems.push(`Gráfico ausente/sem título correspondente: "${c.title}" (${c.type}) séries=${(c.series || []).map((s) => s[0]).slice(0, 8).join('; ')}`); continue; }
    const n = cands[0]; used.add(n);
    const lcol = colorsOf(c), ncol = colorsOf(n);
    const lpal = paletteOf(c), npal = paletteOf(n);
    const diffs = [];
    for (const [name, col] of Object.entries(lcol)) {
      if (ncol[name] && ncol[name] !== col) diffs.push(`${name}: legado ${col} novo ${ncol[name]}`);
    }
    if (lpal.length && npal.length && lpal.slice(0, 6).join() !== npal.slice(0, 6).join()) diffs.push(`paleta legado [${lpal.slice(0, 8)}] novo [${npal.slice(0, 8)}]`);
    if (lpal.length && !npal.length && !Object.keys(ncol).length) diffs.push(`paleta legado [${lpal.slice(0, 8)}], novo sem cor definida`);
    const lnames = (c.series || []).map((s) => norm(s[0])).filter((x) => x && !x.startsWith('range'));
    const nnames = new Set([...(n.series || []).map((s) => norm(s[0])), ...(n.legend || []).map(norm)]);
    const missingSeries = lnames.filter((x) => !nnames.has(x));
    if (missingSeries.length && nnames.size) diffs.push(`séries/itens ausentes: ${[...new Set(missingSeries)].slice(0, 10).join(', ')}`);
    if (diffs.length) problems.push(`Gráfico "${c.title}": ${diffs.join(' | ')}`);
  }
  if (problems.length) out.push(`## ${lp}  →  ${np}\n- ${problems.join('\n- ')}\n`);
}
console.log(`# Comparação legado x novo\n\nPares: ${pairs}. Páginas com divergência: ${out.length}. Legado sem par: ${unmatched.length}.\n`);
console.log(out.join('\n'));
console.log(`\n# Legado sem página correspondente no novo\n\n- ${unmatched.join('\n- ')}`);
const novoKeys = new Set(Object.keys(L).map((p) => keyOf(p)));
console.log(`\n# Novo sem par (info)\n\n- ${Object.keys(N).filter((p) => !novoKeys.has(keyOf(p))).join('\n- ')}`);
