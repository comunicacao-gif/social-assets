# CLAUDE.md — social-assets (peças das redes sociais)

Este repositório segue o mesmo processo do `dashboard-marketing-gfhub`:

- **Regras e comunicação:** https://github.com/comunicacao-gif/dashboard-marketing-gfhub/blob/main/CLAUDE.md
- **Processo (trilhos, ciclo da entrega, revisão cruzada, cola do Gleidson):** https://github.com/comunicacao-gif/dashboard-marketing-gfhub/blob/main/docs/PROCESSO.md
- **Mural:** https://github.com/comunicacao-gif/dashboard-marketing-gfhub/issues/45
- **Fluxo das peças (o que é específico daqui):** `docs/FLUXO-DE-PECAS.md`

## O que é específico daqui

- Aqui mora a **fonte e a prova** de cada peça das redes: imagens de origem, prompt, montagem (HTML ou link do Figma) e os PNG finais. A pauta, o texto e as aprovações continuam no dashboard (`/conteudo`); a entrega é a pasta da peça no Drive, que o dashboard lê. Nada neste repositório publica nada.
- Trilho **Operação** para peças (base `main`, sem pilha; uma PR por peça ou por lote da mesma semana) e **Governança** para `docs/`, `estudio/`, templates e este arquivo.
- **Toda PR pede a contribuição do Codex (ChatGPT):** primeira linha `[Agente] → Codex`, etiqueta `aguarda-codex`. O que se espera dele está na seção 2 do fluxo. Nenhuma PR do estúdio entra sem a rodada do Codex.
- Risco **baixo** por padrão: não toca site, banco nem produção. A arte só fica pública pelo dashboard e pelo Metricool, depois do aceite. Mesmo assim, frase proibida, taxa, prazo, promessa de aprovação ou marca fora do Manual 2.0 é **BLOQUEIO** na revisão.
- Tamanho da PR: PNG, SVG, JPG e PDF não contam como linhas. O limite de 400 linhas vale para HTML, CSS, scripts e docs.
- Rodar antes de abrir PR: `npm test` e `node estudio/scripts/checar.mjs agilit/<pasta-da-peça>`.
- **Nunca no repositório:** foto de pessoa real sem a autorização registrada no `peca.json`; dado de cliente ou lead; print de conversa; vídeo (fica no Drive; o `reel.mp4` de 30/09 é histórico); credencial de Drive, Figma ou ChatGPT.
- **Imagem gerada por IA é sempre declarada** no `peca.json` (`origem`, prompt usado, se há pessoa). Pessoa gerada nunca aparece como cliente, depoimento ou funcionário com nome.
- Fonte da verdade da marca: Manual de Identidade Visual Agilit 2.0 (`agilit-site`, `docs/marca/manual-2.0/`). `estudio/tokens.css` e `estudio/logos/` são cópias com a origem anotada; quando o manual mudar, a cópia muda por PR de Governança.
- Assinatura obrigatória nos comentários: `[Gleidson]`, `[Codex]` ou `[Claude]`.
- Pasta da peça: `agilit/AAAA-MM-DD-slug` (data de publicação). Nomes dos arquivos finais: seção 3 do fluxo.
