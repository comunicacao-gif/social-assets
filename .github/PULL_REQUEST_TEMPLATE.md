<!-- Assine na primeira linha e peça a contribuição do Codex: toda PR do estúdio passa por ele. -->
**[Agente]** → Codex · Trilho: Operação (peça) | Governança (docs, estúdio) · Tamanho: P | M · Risco: baixo

## Peça
<!-- Uma linha por peça: pasta em agilit/, link da peça no dashboard (/conteudo/peca/<id>), formato, data de publicação, família de layout, montagem (HTML | Figma + link). -->

## O que o Codex precisa fazer nesta PR
<!-- Marque o que se aplica. A PR não entra sem a rodada do Codex. -->
- [ ] Revisar as lâminas em `final/` contra o texto aprovado da peça (copy fiel, sem taxa, prazo ou frase proibida)
- [ ] Conferir a marca pelo checklist da seção 5 do fluxo (tokens, fontes, margem, marca, CTA, sazonal)
- [ ] Gerar no ChatGPT a(s) imagem(ns) pedida(s) abaixo, pelo prompt do catálogo, e subir em `fonte/imagens/` (ou anexar aqui)
- [ ] Propor variação de família se a peça ficou igual à anterior do mesmo mês

## Imagens
<!-- Para cada imagem de origem: arquivo, origem (chatgpt | figma | foto-real | vetor), prompt usado (nome em estudio/prompts/), se há pessoa e em que papel. Foto real: quem autorizou e onde está a autorização. -->

## Prova
<!-- Saída do `node estudio/scripts/checar.mjs agilit/<pasta>` (sem ERRO), `npm test`, e o contact sheet ou a primeira lâmina. -->

## Entrega ao dashboard
<!-- Depois da revisão: quem sobe os PNG na pasta da peça no Drive e quem aciona "Enviar arte pra aprovação". Se a peça ainda não tem pasta, o admin cria em /conteudo/admin. -->

## Dependência
<!-- Base `main` @ SHA. Texto da peça aprovado no dashboard? Campanha com faixa do site aplicada (quando for peça de campanha)? -->

## Consumo
<!-- Tokens e modelo, quando houver recibo. Sem recibo: "sem medição exata". Imagens geradas: quantas e onde (ChatGPT, Figma). -->

## Checklist
- [ ] Sem segredo, dado pessoal, print de conversa ou foto sem autorização
- [ ] `peca.json` preenchido; `checar.mjs` sem ERRO; `npm test` verde
- [ ] Toda imagem de IA declarada; pessoa gerada nunca como cliente ou depoimento
- [ ] Etiqueta `aguarda-codex` colocada
- [ ] Se a próxima ação é do Gleidson: o comentário termina com o bloco **→ Gleidson, para colar**
