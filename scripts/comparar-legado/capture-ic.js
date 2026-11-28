// node capture-ic.js out.json  — captura endpoints, colunas e amostra de cada página de Indicadores Consolidados do legado
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const SLUGS = ['receitas', 'receitasComposicao', 'receitasDestaque', 'despesas', 'despesasComposicao', 'despesasDestaque', 'despesasReceitas', 'resultadoOrcamentario', 'pessoal', 'educacao', 'educacaoFundeb', 'saude', 'previdenciaFinanceiro', 'previdenciaResultadoAtuarial', 'previdenciaSegurados', 'previdenciaSituacao', 'antecipacaoReceitasOrcamentarias', 'despesaPessoal', 'dividaConsolidada', 'garantiaContraGarantia', 'metaArrecadacao', 'operacaoCredito', 'resultadoNominal', 'resultadoPrimario', 'capacidadePagamento', 'endividamentoCapag', 'liquidezCapag', 'poupancaCorrenteCapag', 'indiceVulnerabilidadeFiscal', 'ivfEndividamento', 'ivfLiquidez', 'ivfMargem', 'iegm'];
const out = process.argv[2];
(async () => {
  const exe = path.join(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium-1254', 'chrome-win64', 'chrome.exe');
  const browser = await chromium.launch({ executablePath: exe, headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'pt-BR' });
  const res = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
  const queue = SLUGS.filter((s) => !res[s]);
  async function worker() {
    const page = await ctx.newPage();
    for (;;) {
      const slug = queue.shift();
      if (!slug) break;
      const apis = [];
      const onResp = async (r) => {
        const u = r.url();
        if (!/\/api\//.test(u) || /Settings\/GetAll|GetMunicipios|Ipca/i.test(u)) return;
        try { const j = await r.json(); apis.push({ url: u.replace(/^https:\/\/[^/]+\/api\//, ''), sample: JSON.stringify(Array.isArray(j) ? j.slice(0, 2) : j).slice(0, 1500), n: Array.isArray(j) ? j.length : null }); } catch { apis.push({ url: u }); }
      };
      page.on('response', onResp);
      try {
        await page.goto(`https://paineldecontrole.tcees.tc.br/indicadoresConsolidados/2025/${slug}`, { waitUntil: 'load', timeout: 60000 });
        try { await page.waitForLoadState('networkidle', { timeout: 15000 }); } catch {}
        await page.waitForFunction(() => !/Obtendo os dados/.test(document.body.innerText), null, { timeout: 20000 }).catch(() => {});
        await page.waitForTimeout(1500);
        const info = await page.evaluate(() => {
          const t = document.querySelector('table');
          const heads = t ? [...t.querySelectorAll('thead tr')].map((tr) => [...tr.children].map((c) => ({ t: c.innerText.trim(), cs: c.colSpan }))) : [];
          const rows = t ? [...t.querySelectorAll('tbody tr')].slice(0, 3).map((tr) => [...tr.children].map((c) => {
            const st = getComputedStyle(c); const inner = c.querySelector('*');
            return { t: c.innerText.trim(), bg: st.backgroundColor, color: st.color, icon: c.querySelector('i,svg') ? (c.querySelector('i')?.className || 'svg') + ' ' + getComputedStyle(c.querySelector('i,svg')).color : '' };
          })) : [];
          const main = document.querySelector('.MuiCard-root')?.closest('div')?.innerText || '';
          const titles = [...document.querySelectorAll('.widget-title, .MuiCardHeader-title, h1, h2, h3, h4')].map((x) => x.innerText.trim()).filter(Boolean);
          const legend = [...document.querySelectorAll('[class*="legenda" i], [class*="legend" i]')].map((x) => x.innerText.trim()).filter(Boolean).slice(0, 5);
          const nrows = t ? t.querySelectorAll('tbody tr').length : 0;
          return { heads, rows, titles, legend, nrows, intro: [...document.querySelectorAll('p')].map((p) => p.innerText.trim()).filter((x) => x.length > 40).slice(0, 4) };
        });
        res[slug] = { ...info, apis };
      } catch (e) { res[slug] = { error: String(e).slice(0, 200), apis }; }
      page.off('response', onResp);
      process.stdout.write(`${slug} apis=${apis.length} rows=${res[slug].nrows}\n`);
      fs.writeFileSync(out, JSON.stringify(res, null, 1));
    }
  }
  await Promise.all([worker(), worker(), worker()]);
  await browser.close();
})();
