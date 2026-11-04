import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checarPeca, dimensoesPng } from './checar.mjs';

// PNG mínimo (só assinatura + IHDR); o checador lê apenas as dimensões.
function pngFalso(w, h) {
  const b = Buffer.alloc(33);
  Buffer.from('89504e470d0a1a0a', 'hex').copy(b, 0);
  b.writeUInt32BE(13, 8);
  b.write('IHDR', 12);
  b.writeUInt32BE(w, 16);
  b.writeUInt32BE(h, 20);
  return b;
}

function pecaValida(extra = {}) {
  const raiz = mkdtempSync(join(tmpdir(), 'peca-'));
  const pasta = join(raiz, '2026-11-26-carrossel-natal');
  mkdirSync(join(pasta, 'final'), { recursive: true });
  mkdirSync(join(pasta, 'fonte', 'imagens'), { recursive: true });
  writeFileSync(join(pasta, 'fonte', 'peca.html'), '<div class="peca" data-nome="lamina-01"></div>');
  writeFileSync(join(pasta, 'fonte', 'imagens', 'img-01-cena.png'), pngFalso(1024, 1280));
  writeFileSync(join(pasta, 'final', 'lamina-01.png'), pngFalso(1080, 1350));
  writeFileSync(join(pasta, 'final', 'lamina-02.png'), pngFalso(1080, 1350));
  const manifesto = {
    peca_id: 'f8c786fd-6ff7-483a-ad44-a340a76ada45',
    titulo: 'Natal sem dívida nova',
    marca: 'agilit',
    formato: 'carrossel',
    data_publicacao: '2026-11-26',
    familia: 'mista',
    montagem: 'html',
    versao: 1,
    imagens: [{ arquivo: 'fonte/imagens/img-01-cena.png', origem: 'chatgpt', prompt: 'cena-ambiente', pessoa: false }],
    textos: ['Natal sem dívida nova', 'Quem analisa é o banco.'],
    ...extra,
  };
  writeFileSync(join(pasta, 'peca.json'), JSON.stringify(manifesto));
  return pasta;
}

test('peça válida passa sem erro', () => {
  const r = checarPeca(pecaValida());
  assert.deepEqual(r.erros, []);
});

test('lê as dimensões do PNG', () => {
  const pasta = pecaValida();
  assert.deepEqual(dimensoesPng(join(pasta, 'final', 'lamina-01.png')), [1080, 1350]);
});

test('frase proibida é erro, percentual é aviso', () => {
  const r = checarPeca(pecaValida({ textos: ['Aprovação em minutos', 'Juros de 1,5% ao mês'] }));
  assert.ok(r.erros.some((e) => e.includes('Aprovação em minutos')));
  assert.ok(r.avisos.some((a) => a.includes('percentual')));
});

test('pessoa gerada sem papel válido é erro', () => {
  const r = checarPeca(pecaValida({ imagens: [{ arquivo: 'fonte/imagens/img-01-cena.png', origem: 'chatgpt', prompt: 'persona-recorte', pessoa: true, papel: 'cliente' }] }));
  assert.ok(r.erros.some((e) => e.includes('papel')));
});

test('foto real sem autorização e ChatGPT sem prompt são erros', () => {
  const r = checarPeca(pecaValida({ imagens: [
    { arquivo: 'fonte/imagens/img-01-cena.png', origem: 'foto-real', pessoa: true, papel: 'equipe-autorizada' },
    { arquivo: 'fonte/imagens/img-01-cena.png', origem: 'chatgpt', pessoa: false },
  ] }));
  assert.ok(r.erros.some((e) => e.includes('autorizacao')));
  assert.ok(r.erros.some((e) => e.includes('prompt')));
});

test('dimensão errada e nome fora do padrão são erros', () => {
  const pasta = pecaValida();
  writeFileSync(join(pasta, 'final', 'lamina-03.png'), pngFalso(1080, 1440));
  writeFileSync(join(pasta, 'final', 'capa-extra.png'), pngFalso(1080, 1350));
  const r = checarPeca(pasta);
  assert.ok(r.erros.some((e) => e.includes('1080×1440')));
  assert.ok(r.erros.some((e) => e.includes('capa-extra.png')));
});

test('pasta sem a data da peça e montagem no Figma sem link são erros', () => {
  const r = checarPeca(pecaValida({ data_publicacao: '2026-12-01', montagem: 'figma' }));
  assert.ok(r.erros.some((e) => e.includes('não começa com data_publicacao')));
  assert.ok(r.erros.some((e) => e.includes('figma_url')));
});
