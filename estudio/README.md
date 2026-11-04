# estúdio

Base de montagem das peças. Tudo aqui deriva do Manual de Identidade Visual Agilit 2.0 (`agilit-site`, `docs/marca/manual-2.0/`); a cópia carrega a origem e muda por PR de Governança quando o manual mudar.

| Pasta ou arquivo | O quê | Origem |
|---|---|---|
| `tokens.css` | paleta e papéis semânticos | cópia de `docs/marca/manual-2.0/assets/tokens.css` (agilit-site `main @ 63f2517`) |
| `logos/` | conjunto 2026 (horizontal, vertical, branco, negativo limão, logotipo, símbolo, avatar) | cópia de `docs/marca/manual-2.0/assets/logos/`, com o azul `#306cb3` da decisão de 03/11 (agilit-site#23, aplicada na PR #30) |
| `base.css` | formatos, margens, marca, botão, rodapé de carrossel, camadas de imagem, sazonal | estúdio |
| `familias/` | um HTML por família de layout (A a D) e o carrossel vetorial, com a mesma copy, para comparar e copiar | estudo de 04/11 |
| `prompts/` | catálogo de prompts para o ChatGPT, por tipo de camada, e o comando de recorte | estúdio |
| `scripts/render.mjs` | HTML → PNG por `.peca[data-nome]`, com checagem de estouro | estúdio |
| `scripts/checar.mjs` | confere a pasta da peça antes da PR (manifesto, PNG, nomes, frases proibidas, IA declarada) | estúdio |
| `peca.schema.json` | esquema do `peca.json` | estúdio |
| `referencias/` | o estudo das quatro famílias montado no Figma, as três imagens de exemplo geradas para ele e o contato das famílias renderizadas em HTML (`familias-html.jpg`) | 04/11/2026 |

Para começar uma peça em HTML: copie o HTML da família para `agilit/<peça>/fonte/peca.html`, troque `../../estudio/` pelo caminho relativo certo (`../../../estudio/`), edite a copy e rode o render. Para montagem no Figma, o arquivo compartilhado é o "Estúdio Agilit" (link no `peca.json`); exporte cada quadro como PNG 1× para `final/`.
