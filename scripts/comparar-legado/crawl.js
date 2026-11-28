// usage: node crawl.js <legacy|novo> <outfile> [maxPages]
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const SITES = {
  legacy: {
    base: 'https://paineldecontrole.tcees.tc.br',
    seeds: ['/', '/municipio/2025/vitoria/visaoGeral', '/estado/2025/visaoGeral', '/indicadoresConsolidados/2025/receitas', '/rankings/2025', '/boletins/2025'],
  },
  novo: {
    base: process.env.NOVO_BASE || 'https://controle-social-frontend.vercel.app',
    seeds: ['/', '/municipio/2025/vitoria/visao-geral', '/estado/2025/visao-geral', '/indicadores-consolidados/2025', '/rankings/2025', '/boletins/2025'],
  },
};

const which = process.argv[2];
const out = process.argv[3];
const MAX = +(process.argv[4] || 400);
const site = SITES[which];

function allowed(p) {
  if (!p.startsWith('/')) return false;
  if (/\.(pdf|xlsx?|csv|zip|png|jpe?g)$/i.test(p)) return false;
  if (/^\/api\//.test(p)) return false;
  // keep only year 2025 (or no year), municipality vitoria (or none)
  const years = p.match(/\/(19|20)\d\d(\/|$)/g);
  if (years && years.some((y) => !y.includes('2025'))) return false;
  const m = p.match(/^\/municipio\/\d{4}\/([^/]+)/);
  if (m && !['vitoria', 'comparador'].includes(m[1].toLowerCase())) return false;
  if (/julgamento-?de-?conta\/(?!visao)/i.test(p) && !/vitoria/i.test(p)) return false;
  if (/unidade-?gestora\//i.test(p)) return false;
  if (/boletins\/2025\/./.test(p) && !/informativo|extraordinario/i.test(p)) return false;
  return true;
}

const EXTRACT = () => {
  const visible = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const titleFor = (el) => {
    let p = el;
    for (let i = 0; i < 10 && p; i++) {
      p = p.parentElement;
      if (!p) break;
      const h = p.querySelector('.MuiCardHeader-title, .MuiCardHeader-root, .widget-header, h1, h2, h3, h4, h5, h6, [class*="title" i], [class*="header" i]');
      if (h && h.innerText && h.innerText.trim() && !h.contains(el)) return h.innerText.trim().replace(/\s+/g, ' ').slice(0, 80);
    }
    return '';
  };
  const charts = [];
  // FusionCharts (legacy)
  if (window.FusionCharts && FusionCharts.items) {
    for (const c of Object.values(FusionCharts.items)) {
      let d; try { d = c.getJSONData(); } catch (e) { continue; }
      if (!d || !d.chart) continue;
      const el = document.getElementById(c.options.containerElementId);
      if (el && !visible(el)) continue;
      const s = [];
      const add = (n, col) => s.push([String(n ?? '').slice(0, 50), String(col ?? '').toLowerCase()]);
      (d.dataset || []).forEach((ds) => { if (ds.dataset) ds.dataset.forEach((x) => add(x.seriesname, x.color)); else add(ds.seriesname, ds.color); });
      (d.lineset || []).forEach((x) => add(x.seriesname, x.color));
      (d.data || []).slice(0, 25).forEach((x) => { if (!x.vline) add(x.label, x.color); });
      const cr = d.colorrange || d.colorRange;
      if (cr && cr.color) cr.color.forEach((x) => add(`range ${x.minvalue}-${x.maxvalue}`, x.code));
      (d.linkeddata || []).length;
      charts.push({ title: el ? titleFor(el) : '', type: c.chartType(), caption: d.chart.caption || '', palette: (d.chart.paletteColors || d.chart.palettecolors || '').toLowerCase(), series: s });
    }
  }
  // ECharts (novo) via React fiber props
  document.querySelectorAll('.echart, [_echarts_instance_]').forEach((el) => {
    if (!visible(el)) return;
    const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$'));
    let f = key && el[key];
    let opt;
    for (let i = 0; i < 15 && f; i++) { const mp = f.memoizedProps; if (mp && (mp.options || mp.option) && typeof (mp.options || mp.option) === 'object') { opt = mp.options || mp.option; break; } f = f.return; }
    if (!opt) { charts.push({ title: titleFor(el), type: 'echart?', series: [] }); return; }
    const s = [];
    const col = (c) => (typeof c === 'string' ? c.toLowerCase() : c && c.colorStops ? 'grad:' + c.colorStops.map((x) => x.color).join('>') : '');
    const add = (n, c) => s.push([String(n ?? '').slice(0, 50), col(c)]);
    const series = Array.isArray(opt.series) ? opt.series : opt.series ? [opt.series] : [];
    const types = new Set();
    series.forEach((se) => {
      types.add(se.type);
      if (se.type === 'pie' || se.type === 'treemap' || se.type === 'funnel' || se.type === 'sunburst') (se.data || []).slice(0, 25).forEach((x) => add(x.name, x.itemStyle && x.itemStyle.color));
      else if (se.type === 'gauge') { const al = se.axisLine && se.axisLine.lineStyle && se.axisLine.lineStyle.color; if (Array.isArray(al)) al.forEach((x) => add('range<=' + x[0], x[1])); else add(se.name, se.itemStyle && se.itemStyle.color); }
      else { add(se.name, (se.itemStyle && se.itemStyle.color) || (se.lineStyle && se.lineStyle.color) || se.color); const pd = (se.data || []).filter((x) => x && x.itemStyle && x.itemStyle.color); pd.slice(0, 10).forEach((x) => add('pt:' + (x.name ?? ''), x.itemStyle.color)); }
    });
    const pal = Array.isArray(opt.color) ? opt.color.map((x) => String(x).toLowerCase()).join(',') : '';
    const legend = [].concat(opt.legend || []).flatMap((l) => (l.data || []).map((d) => (typeof d === 'string' ? d : d.name)));
    charts.push({ title: titleFor(el), type: [...types].join('+'), palette: pal, legend, series: s });
  });
  const strip = (root) => {
    const clone = root.cloneNode(true);
    const total = (root.innerText || '').length || 1;
    const live = [...root.querySelectorAll('nav, header, footer, aside, script, style, [class*="sidebar" i], [class*="BarraLateral" i], [class*="drawer" i], [class*="cookie" i], [role="navigation"]')]
      .filter((n) => (n.innerText || '').length < total * 0.5 && !n.querySelector('canvas, .fusioncharts-container, .echart'));
    const marks = new Set(live);
    const all = [root, ...root.querySelectorAll('*')];
    const cloneAll = [clone, ...clone.querySelectorAll('*')];
    all.forEach((n, i) => { if (marks.has(n) && cloneAll[i]) cloneAll[i].setAttribute('data-strip', '1'); });
    clone.querySelectorAll('[data-strip]').forEach((n) => n.remove());
    return clone;
  };
  const root = document.querySelector('main') || document.body;
  const holder = strip(root);
  holder.style.position = 'absolute'; holder.style.left = '-99999px';
  document.body.appendChild(holder);
  const txt = holder.innerText;
  holder.remove();
  const text = (txt || '').split('\n').map((l) => l.trim().replace(/\s+/g, ' ')).filter(Boolean);
  const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
  const iframes = [...document.querySelectorAll('iframe')].map((i) => i.src).filter(Boolean);
  return { title: document.title, text, charts, links, iframes, canvases: document.querySelectorAll('canvas').length };
};

(async () => {
  const exe = path.join(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium-1254', 'chrome-win64', 'chrome.exe');
  const browser = await chromium.launch({ executablePath: fs.existsSync(exe) ? exe : undefined, channel: fs.existsSync(exe) ? undefined : 'chrome', headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'pt-BR' });
  const results = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
  const queue = process.env.SEEDS ? fs.readFileSync(process.env.SEEDS, 'utf8').split(/\s+/).filter(Boolean) : [...site.seeds];
  const seen = new Set(queue);
  Object.values(results).forEach((r) => (r.links || []).forEach((l) => { if (!seen.has(l)) { seen.add(l); queue.push(l); } }));
  Object.keys(results).forEach((k) => seen.add(k));
  let n = Object.keys(results).length;
  let active = 0;
  const W = +(process.env.WORKERS || 4);
  async function worker() {
    const page = await ctx.newPage();
    while (n < MAX) {
      const p = queue.shift();
      if (!p) { if (active === 0) break; await page.waitForTimeout(1000); continue; }
      if (results[p]) continue;
      active++;
      let r;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const resp = await page.goto(site.base + p, { waitUntil: 'load', timeout: 60000 });
          try { await page.waitForLoadState('networkidle', { timeout: 10000 }); } catch {}
          await page.waitForTimeout(1500);
          const status = resp ? resp.status() : 0;
          if (status === 429) { await page.waitForTimeout(15000); continue; }
          await page.mouse.wheel(0, 4000); await page.waitForTimeout(2000); await page.mouse.wheel(0, 4000); await page.waitForTimeout(1500);
          await page.waitForFunction(() => !/Obtendo os dados|Carregando/i.test(document.body.innerText) && !document.querySelector('.animate-pulse'), null, { timeout: 15000 }).catch(() => {});
          await page.waitForTimeout(800);
          r = await page.evaluate(EXTRACT);
          r.status = status;
          r.finalUrl = page.url().replace(site.base, '');
          break;
        } catch (e) { r = { error: String(e).slice(0, 200) }; }
      }
      const links = new Set();
      for (const raw of (r && r.links) || []) {
        let u; try { u = new URL(raw, site.base + p); } catch { continue; }
        if (u.origin !== site.base) continue;
        if (process.env.NOFOLLOW) continue;
      const lp = decodeURIComponent(u.pathname).replace(/\/$/, '') || '/';
        if (allowed(lp)) links.add(lp);
      }
      r.links = [...links];
      results[p] = r;
      n++;
      active--;
      for (const l of r.links) if (!seen.has(l)) { seen.add(l); queue.push(l); }
      process.stdout.write(`${n} ${p} charts=${(r.charts || []).length} q=${queue.length}
`);
      if (n % 10 === 0) fs.writeFileSync(out, JSON.stringify(results));
    }
  }
  await Promise.all(Array.from({ length: W }, worker));
  fs.writeFileSync(out, JSON.stringify(results));
  await browser.close();
})();
