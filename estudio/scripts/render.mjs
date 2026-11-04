#!/usr/bin/env node
// render.mjs — HTML → PNG, uma imagem por elemento `.peca[data-nome]`, com checagem de estouro.
// Uso: node estudio/scripts/render.mjs <arquivo.html> <pasta-de-saida> [--scale 1] [--estrito]
// Precisa do Playwright (npm install). Exit 1 se algum elemento sair da área da peça e --estrito estiver ligado.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const html = args[0];
const out = args[1];
if (!html || !out) {
  console.error('uso: render.mjs <arquivo.html> <pasta-de-saida> [--scale 1] [--estrito]');
  process.exit(2);
}
const scale = Number(args[args.indexOf('--scale') + 1] || 1) || 1;
const estrito = args.includes('--estrito');

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: scale, viewport: { width: 1280, height: 2100 } });
const page = await ctx.newPage();
await page.goto(pathToFileURL(resolve(html)).href);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);

const fontes = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`));
console.log('fontes carregadas:', fontes.length ? fontes.join(' | ') : 'nenhuma (sem rede?)');

const pecas = page.locator('.peca[data-nome]');
const n = await pecas.count();
if (!n) {
  console.error('nenhum elemento .peca[data-nome] no HTML');
  process.exit(2);
}
let estourou = false;
for (let i = 0; i < n; i++) {
  const el = pecas.nth(i);
  const nome = await el.getAttribute('data-nome');
  const box = await el.boundingBox();
  await el.screenshot({ path: `${out}/${nome}.png` });
  const estouro = await el.evaluate((e) => {
    const r = e.getBoundingClientRect();
    const ruins = [];
    e.querySelectorAll('*').forEach((c) => {
      const cr = c.getBoundingClientRect();
      if (!cr.width || c.closest('.ignorar-estouro')) return;
      if (cr.right > r.right + 1 || cr.bottom > r.bottom + 1 || cr.left < r.left - 1 || cr.top < r.top - 1) ruins.push(c.className || c.tagName);
    });
    return ruins;
  });
  if (estouro.length) estourou = true;
  console.log(`${nome}.png  ${Math.round(box.width * scale)}×${Math.round(box.height * scale)}  ${estouro.length ? 'ESTOURO: ' + estouro.join(', ') : 'ok'}`);
}
await browser.close();
if (estourou && estrito) process.exit(1);
