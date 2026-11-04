#!/usr/bin/env node
// checar.mjs — confere a pasta de uma peça antes da PR: manifesto, PNG finais, nomes, frases proibidas, declaração de IA.
// Uso: node estudio/scripts/checar.mjs agilit/<pasta-da-peça> [--json]
// Exit 1 quando há ERRO. AVISO não trava.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

export const FRASES_PROIBIDAS = [
  ['Agilit Mais', 'nome de marca antigo'],
  ['Autorizado pelo BACEN', 'claim regulatório impreciso'],
  ['Correspondente autorizado', 'claim regulatório impreciso (use "Correspondente Bancário Banco do Brasil")'],
  ['autorizados e fiscalizados pelo BACEN', 'claim regulatório impreciso'],
  ['Aprovação em minutos', 'promessa de prazo'],
  ['em até 30 minutos', 'promessa de prazo'],
  ['aprovação garantida', 'promessa de aprovação'],
  ['pagamento é garantido', 'promessa de aprovação'],
  ['Sem consultar SPC', 'claim de crédito impreciso'],
  ['sem consulta ao SPC', 'claim de crédito impreciso'],
  ['melhores condições', 'comparativo sem fonte'],
  ['menores taxas', 'comparativo sem fonte'],
  ['menor taxa do mercado', 'comparativo sem fonte'],
  ['R$ 10 bilhões', 'métrica institucional sem fonte'],
  ['2 milhões de clientes', 'métrica institucional sem fonte'],
  ['400 municípios', 'métrica institucional sem fonte'],
];

// Dimensões aceitas por formato (largura × altura).
export const DIMENSOES = {
  carrossel: [[1080, 1350]],
  feed: [[1080, 1350], [1080, 1080]],
  story: [[1080, 1920]],
  reel: [[1080, 1920], [1080, 1350]],
};

// Nome esperado dos arquivos em final/, por formato.
export const NOMES = {
  carrossel: /^lamina-\d{2}\.png$/,
  story: /^story-\d{2}\.png$/,
  feed: /^feed(-\d{2})?\.png$/,
  reel: /^capa\.png$/,
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const FAMILIAS = ['A-foto-declaracao', 'B-recorte', 'C-editorial', 'D-objeto-prova', 'vetorial', 'mista'];
const MONTAGENS = ['html', 'figma', 'figma+html'];
const ORIGENS = ['chatgpt', 'figma', 'foto-real', 'vetor', 'banco-interno'];
const PAPEIS = ['ilustrativa', 'apresentador', 'equipe-autorizada'];

export function dimensoesPng(caminho) {
  const b = readFileSync(caminho);
  const assinatura = b.subarray(0, 8).toString('hex');
  if (assinatura !== '89504e470d0a1a0a') return null;
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

function normalizar(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function checarPeca(pasta) {
  const erros = [];
  const avisos = [];
  const erro = (m) => erros.push(m);
  const aviso = (m) => avisos.push(m);

  if (!existsSync(pasta) || !statSync(pasta).isDirectory()) return { erros: [`pasta não existe: ${pasta}`], avisos };
  const nomePasta = basename(pasta.replace(/[\\/]+$/, ''));
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(nomePasta)) erro(`nome da pasta fora do padrão AAAA-MM-DD-slug: ${nomePasta}`);

  const manifestoPath = join(pasta, 'peca.json');
  if (!existsSync(manifestoPath)) return { erros: [...erros, 'peca.json ausente'], avisos };
  let m;
  try {
    m = JSON.parse(readFileSync(manifestoPath, 'utf8'));
  } catch (e) {
    return { erros: [...erros, `peca.json inválido: ${e.message}`], avisos };
  }

  if (!UUID.test(m.peca_id || '')) erro('peca_id não é um UUID do dashboard');
  if (!m.titulo || m.titulo.length < 3) erro('titulo ausente');
  if (m.marca !== 'agilit') erro(`marca desconhecida: ${m.marca}`);
  if (!DIMENSOES[m.formato]) erro(`formato inválido: ${m.formato}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(m.data_publicacao || '')) erro('data_publicacao fora do padrão AAAA-MM-DD');
  else if (!nomePasta.startsWith(m.data_publicacao)) erro(`a pasta (${nomePasta}) não começa com data_publicacao (${m.data_publicacao})`);
  if (!FAMILIAS.includes(m.familia)) erro(`familia inválida: ${m.familia} (${FAMILIAS.join(', ')})`);
  if (!MONTAGENS.includes(m.montagem)) erro(`montagem inválida: ${m.montagem}`);
  if (m.montagem !== 'html' && !/^https:\/\/www\.figma\.com\//.test(m.figma_url || '')) erro('montagem no Figma sem figma_url');
  if (m.montagem !== 'figma' && !existsSync(join(pasta, 'fonte', 'peca.html'))) erro('montagem em HTML sem fonte/peca.html');
  if (!Number.isInteger(m.versao) || m.versao < 1) erro('versao deve ser inteiro ≥ 1');
  if (!Array.isArray(m.imagens)) erro('imagens deve ser uma lista (vazia quando a peça é vetorial)');
  if (!Array.isArray(m.textos) || !m.textos.length) erro('textos deve listar toda a copy das lâminas');

  for (const [i, img] of (Array.isArray(m.imagens) ? m.imagens : []).entries()) {
    const ref = `imagens[${i}]`;
    if (!img.arquivo || !img.arquivo.startsWith('fonte/imagens/')) erro(`${ref}: arquivo deve ficar em fonte/imagens/`);
    else if (!existsSync(join(pasta, img.arquivo))) erro(`${ref}: arquivo não encontrado: ${img.arquivo}`);
    if (!ORIGENS.includes(img.origem)) erro(`${ref}: origem inválida: ${img.origem}`);
    if (typeof img.pessoa !== 'boolean') erro(`${ref}: pessoa deve ser true ou false`);
    if (img.pessoa && !PAPEIS.includes(img.papel)) erro(`${ref}: pessoa na imagem exige papel em ${PAPEIS.join(', ')} (cliente e depoimento não valem)`);
    if (img.origem === 'chatgpt' && !img.prompt) erro(`${ref}: imagem do ChatGPT sem o prompt usado`);
    if (img.origem === 'foto-real' && !img.autorizacao) erro(`${ref}: foto real sem autorizacao registrada`);
  }

  // frases proibidas e sinais de taxa ou prazo na copy
  for (const t of Array.isArray(m.textos) ? m.textos : []) {
    const nt = normalizar(t);
    for (const [frase, motivo] of FRASES_PROIBIDAS) {
      if (nt.includes(normalizar(frase))) erro(`frase proibida "${frase}" (${motivo}) em: "${t}"`);
    }
    if (/\d+(,\d+)?\s*%/.test(t)) aviso(`percentual na copy, confirme que não é taxa: "${t}"`);
    if (/\b(em|até)\s+\d+\s*(min|minutos|horas|h)\b/i.test(t)) aviso(`prazo na copy, confirme com o texto aprovado: "${t}"`);
  }

  // PNG finais
  const finalDir = join(pasta, 'final');
  const pngs = existsSync(finalDir) ? readdirSync(finalDir).filter((f) => f.toLowerCase().endsWith('.png')).sort() : [];
  if (!pngs.length) erro('final/ sem PNG');
  const padraoNome = NOMES[m.formato];
  for (const f of pngs) {
    if (padraoNome && !padraoNome.test(f)) erro(`final/${f}: nome fora do padrão ${padraoNome}`);
    const dim = dimensoesPng(join(finalDir, f));
    if (!dim) {
      erro(`final/${f}: não é PNG`);
      continue;
    }
    const aceitas = DIMENSOES[m.formato] || [];
    if (!aceitas.some(([w, h]) => w === dim[0] && h === dim[1])) erro(`final/${f}: ${dim[0]}×${dim[1]}, esperado ${aceitas.map((d) => d.join('×')).join(' ou ')}`);
  }
  if (m.formato === 'carrossel') {
    const nums = pngs.map((f) => Number((f.match(/(\d{2})\.png$/) || [])[1])).filter(Boolean);
    if (nums.length && (nums[0] !== 1 || nums.some((n, i) => n !== i + 1))) erro('lâminas do carrossel fora de sequência (lamina-01, 02, …)');
    if (nums.length === 1) aviso('carrossel com uma lâmina só');
    if (nums.length > 10) erro('carrossel com mais de 10 lâminas (limite do Instagram)');
  }

  const fonteDir = join(pasta, 'fonte');
  if (!existsSync(fonteDir)) erro('fonte/ ausente (HTML, prompts usados ou imagens de origem)');
  return { erros, avisos };
}

const ehPrincipal = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (ehPrincipal) {
  const pasta = process.argv[2];
  if (!pasta) {
    console.error('uso: checar.mjs agilit/<pasta-da-peça> [--json]');
    process.exit(2);
  }
  const r = checarPeca(pasta);
  if (process.argv.includes('--json')) console.log(JSON.stringify(r, null, 2));
  else {
    for (const e of r.erros) console.log(`ERRO   ${e}`);
    for (const a of r.avisos) console.log(`AVISO  ${a}`);
    console.log(r.erros.length ? `\n${r.erros.length} erro(s), ${r.avisos.length} aviso(s)` : `ok: ${pasta} (${r.avisos.length} aviso(s))`);
  }
  process.exit(r.erros.length ? 1 : 0);
}
