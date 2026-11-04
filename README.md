# social-assets

Peças das redes sociais das marcas do GF Hub (hoje, Agilit). Cada peça é uma pasta com a fonte (HTML, prompts, link do Figma), as imagens de origem e os PNG finais, mais um `peca.json` que a liga à peça do dashboard de marketing.

| Onde | O quê |
|---|---|
| `agilit/AAAA-MM-DD-slug/` | uma peça: `peca.json`, `fonte/`, `final/` |
| `estudio/` | base de montagem: tokens e logos do Manual 2.0, famílias de layout, prompts para o ChatGPT, scripts de render e checagem |
| `docs/FLUXO-DE-PECAS.md` | como a equipe cria uma peça, do dashboard ao Drive, e o que cada um faz |
| `CLAUDE.md` / `AGENTS.md` | regras deste repositório (apontam para o processo comum) |

## Começando

```bash
npm install
npm test
node estudio/scripts/render.mjs estudio/familias/C-editorial.html /tmp/saida
node estudio/scripts/checar.mjs agilit/2026-11-26-carrossel-natal-sem-divida-nova
```

O render usa o Chromium do Playwright. O recorte de pessoa usa o `rembg` (Python, grátis); o comando está em `estudio/prompts/README.md`.

## Histórico

As pastas de junho a outubro de 2026 (campanhas de governo, Semana do INSS, carrossel dos descontos, reel das 3 contas) nasceram antes do fluxo e não têm `peca.json` nem `fonte/`. Ficam como estão, para auditoria do que foi veiculado.
