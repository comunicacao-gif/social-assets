# Como criamos peças em equipe

Versão 1.0 · 04/11/2026 · vale para `social-assets`. As regras gerais (assinatura, etiquetas, revisão cruzada, cola do Gleidson) estão no `CLAUDE.md` e no `docs/PROCESSO.md` do `dashboard-marketing-gfhub`; este documento diz só o que é específico da produção de peças.

## 0. Resumo de uma tela

| Ferramenta | Papel | O que nunca faz |
|---|---|---|
| **Dashboard** (`/conteudo`) | pauta, texto aprovado, trilha da arte (em revisão, ajuste, aprovada), agendamento | guardar a fonte da arte |
| **GitHub** (este repositório) | fonte e prova de cada peça: imagens de origem, prompt, montagem, PNG final, PR com revisão cruzada | publicar |
| **Drive** (pasta da peça) | entrega: os PNG que o dashboard mostra e o aprovador vê | versionar a fonte |
| **ChatGPT** | gera as imagens fotorrealistas e as camadas (fundo, pessoa, objeto) pelos prompts do catálogo | tocar GitHub, Vercel, banco ou Drive |
| **Figma** | montagem em camadas quando há foto (famílias A, B e D); arquivo compartilhado, link no `peca.json` | ser a única cópia: o PNG final sempre entra aqui |
| **HTML + render** | montagem vetorial em série (família C, carrosséis, stories de aviso) | — |
| **Codex (ChatGPT) e Claude** | um monta, o outro revisa; os dois podem ser autor | aprovar o próprio trabalho; aceitar arte |
| **Gleidson (e Paulo)** | pauta e texto no dashboard; imagens no ChatGPT quando quiser; aceite da arte no dashboard | — |

Uma peça = uma pasta `agilit/AAAA-MM-DD-slug/` com `peca.json`, `fonte/` e `final/`. Uma PR por peça ou por lote da mesma semana. **Toda PR pede a contribuição do Codex** (`→ Codex` na primeira linha). A arte só vai ao Drive e ao dashboard depois da revisão cruzada; o aceite é do Gleidson, no dashboard, como "Arte aprovada". Decisões que este fluxo aplica: 03/11/2026, Gleidson no chat com o Claude (transcrito no Mural #45): nenhuma compra, tudo no grátis; Canva descartado para imagem; o ChatGPT gera o arquivo; a ferramenta de imagem não toca GitHub, Vercel nem banco.

## 1. Papéis

| Quem | Faz | Não faz |
|---|---|---|
| **Gleidson / Paulo** | cria ou aprova o texto no dashboard; gera imagens no ChatGPT pelo prompt do catálogo quando quiser participar da criação; decide a arte no dashboard (aprovada ou ajuste); diz qual família quer quando tiver preferência | montar PNG fora do fluxo (arte sem fonte não entra na pasta da peça) |
| **Codex (ChatGPT)** | contribui em **toda** PR: revisa copy e marca, gera ou propõe imagens pelo ChatGPT, sugere variação de família; pode ser autor de peça (então o Claude revisa) | aprovar o próprio trabalho |
| **Claude** | monta (HTML ou Figma), renderiza, roda a checagem, abre a PR, sobe os PNG ao Drive depois da revisão; revisa as PRs do Codex | aprovar o próprio trabalho; marcar arte como aprovada |
| **Dashboard** | mostra a arte na peça (lê a pasta do Drive), registra a decisão com escopo `arte`, bloqueia o agendamento até texto e arte aprovados | — |

Quem revisou não entrega: o autor sobe os PNG ao Drive e aciona "Enviar arte pra aprovação" (ou pede a quem tem acesso de admin no dashboard).

## 2. O que o Codex faz em cada PR

A primeira linha de toda PR é `[Agente] → Codex`, com a etiqueta `aguarda-codex`. O autor marca no template o que precisa dele. O mínimo em qualquer PR:

1. **Revisão das lâminas** em `final/`, lendo só o diff e as imagens: copy idêntica ao texto aprovado da peça no dashboard; nenhuma taxa, prazo, promessa de aprovação ou frase da lista proibida; "Correspondente Bancário Banco do Brasil" como forma do vínculo; nome "Agilit" (nunca "Agilit Mais").
2. **Checklist de marca** (seção 5). Achados com peso: BLOQUEIO, SUGESTÃO, PERGUNTA. O autor responde cada um com "Resolvido em `<SHA>`" ou o motivo.
3. **Imagem pelo ChatGPT**, quando a PR pedir: gera pelo prompt indicado em `estudio/prompts/`, salva em `fonte/imagens/` com o nome pedido e declara no `peca.json` (ou anexa na PR para o autor commitar).
4. **Variação:** se a peça ficou com a mesma família e a mesma composição da anterior do mês, sugere outra família (seção 6). Preferência de estilo não vira divergência: prevalece a do autor, salvo regra do manual.

Quando a integração do Codex no GitHub estiver ativa para este repositório (ambiente na nuvem criado pelo Gleidson), a menção `@codex review` na PR também vale, além do recado assinado `[Codex]`.

## 3. O ciclo de uma peça

| Passo | Quem | O que acontece | Prova |
|---|---|---|---|
| **0. Pauta** | Gleidson / Paulo | A peça existe no dashboard com texto **aprovado** (reel: capa só depois de **gravado**). O painel "Agora" lista o que está esperando arte. Peça sem pasta no Drive (importadas por SQL em 03/11): o admin cria em `/conteudo/admin` | peça com status e ficha técnica |
| **1. Assumir** | agente | Cria `agilit/AAAA-MM-DD-slug/peca.json` com o `peca_id` do dashboard e abre a PR **em rascunho** já com `→ Codex`. Isso é o "registrei que assumi" do processo; dois agentes não montam a mesma peça | PR draft |
| **2. Briefing** | agente | Copia da peça a ficha técnica (`direcao_arte`), os textos das lâminas e a legenda; escolhe a família (seção 6) conforme a mensagem, não por rodízio; registra em `peca.json` | `peca.json` |
| **3. Imagens** | quem gerar (Gleidson, Paulo, Codex ou Claude) | Se a família pede foto: prompt do catálogo no ChatGPT, uma geração por camada (cena sem pessoa; pessoa em fundo branco; objeto em fundo branco), nunca texto dentro da imagem. Salva em `fonte/imagens/img-NN-tipo.png`. Pessoa em fundo branco passa pelo recorte (`rembg`, comando no catálogo). Declara cada imagem no `peca.json` | arquivos + manifesto |
| **4. Montagem** | agente | **Figma** quando há foto ou camadas (arquivo "Estúdio Agilit", uma página por mês, nomes de camada do catálogo); **HTML** a partir de `estudio/familias/` quando é vetorial ou em série. Link do Figma ou `fonte/peca.html` no repositório | `fonte/` |
| **5. Render e checagem** | agente | `node estudio/scripts/render.mjs fonte/peca.html final/` (HTML) ou exportação PNG do Figma para `final/`; depois `node estudio/scripts/checar.mjs agilit/<pasta>`: dimensões por formato, nomes, manifesto, frases proibidas, declaração de IA | saída da checagem na PR |
| **6. PR pronta** | agente | Tira do rascunho, preenche o template (peça, o que o Codex faz, imagens, prova, entrega, consumo), etiqueta `aguarda-codex` | PR |
| **7. Revisão cruzada** | o outro agente | Seção 2. Rodadas até o consenso, cada uma só com o pendente | comentários assinados |
| **8. Entrega** | autor | Sobe `final/*.png` na pasta da peça no Drive com os nomes da seção 4 (o dashboard ordena por nome e usa `_01` como capa) e aciona **Enviar arte pra aprovação** no dashboard (admin). Merge da PR = arte entregue | comentário "Entregue: Drive + dashboard em `<SHA>`" |
| **9. Aceite** | Gleidson (ou Paulo, quando a #60 do dashboard entrar) | Decide no dashboard: arte aprovada ou ajuste. O GitHub não aprova arte | decisão com escopo `arte` no dashboard |
| **10. Ajuste** | autor | Ajuste pedido volta como commit novo na mesma pasta (`versao` + 1 no `peca.json`, `final/` substituído), nova rodada do Codex, novo envio ao Drive | PR ou commit "v2" |
| **11. Agendamento** | quem publica | Fora do repositório (Metricool / Planner); o dashboard marca agendada e publicada. Peça de campanha só entra no dia em que a faixa do site está aplicada com o mesmo texto e link (Pedido agilit-site#24) | dashboard |

Um lote (as 3 ou 4 peças de uma semana) pode ir numa PR só, uma pasta por peça, se todas tiverem texto aprovado. Peça de família diferente no mesmo lote é bem-vinda.

## 4. Estrutura e nomes

```
agilit/2026-11-26-carrossel-natal-sem-divida-nova/
├── peca.json                 # liga ao dashboard, declara imagens, família, montagem, textos
├── fonte/
│   ├── peca.html             # montagem HTML (quando houver)
│   ├── imagens/
│   │   ├── img-01-cena.png           # saída do ChatGPT (cena sem pessoa)
│   │   ├── img-02-pessoa-branco.png  # saída do ChatGPT (pessoa em fundo branco)
│   │   └── img-02-pessoa-recorte.png # depois do rembg (alfa real)
│   └── prompts-usados.md     # prompt final, se saiu do catálogo
└── final/
    ├── lamina-01.png … lamina-08.png   # carrossel 1080×1350
    ├── story-01.png …                  # story 1080×1920
    ├── feed.png                        # feed único 1080×1350 (ou 1080×1080)
    └── capa.png                        # capa de reel 1080×1920
```

No Drive, os mesmos arquivos entram com o padrão do dashboard: `AGILIT - REDES SOCIAIS - MM_AA - slug_01.png`, `_02`… O sufixo `_01` define a capa que o dashboard mostra.

`peca.json` mínimo (o esquema completo está em `estudio/peca.schema.json`):

```json
{
  "peca_id": "f8c786fd-6ff7-483a-ad44-a340a76ada45",
  "titulo": "Natal sem dívida nova: planejar com o que você tem",
  "marca": "agilit",
  "formato": "carrossel",
  "data_publicacao": "2026-11-26",
  "familia": "B-recorte",
  "montagem": "figma",
  "figma_url": "https://www.figma.com/design/…",
  "versao": 1,
  "autor": "Claude",
  "imagens": [
    { "arquivo": "fonte/imagens/img-02-pessoa-branco.png", "origem": "chatgpt", "prompt": "persona-recorte", "pessoa": true, "papel": "ilustrativa" }
  ],
  "textos": ["Natal sem dívida nova", "Resolver depois quase sempre custa mais caro.", "Simulação sem compromisso. Quem analisa é o banco."]
}
```

## 5. Checklist de marca (o que o revisor confere)

Fonte: Manual de Identidade Visual Agilit 2.0 (`agilit-site`, `docs/marca/manual-2.0/`), partes 5 (redes sociais), 6 (campanhas), 8 (fotografia) e 10 (o que não fazer).

- **Cores** só dos tokens: azul `#306cb3`, ciano `#43afe4`, verde-limão `#95c11f` (CTA e destaque, sempre com texto escuro `#0c0d10`), azul-marinho `#052951`, papel `#f6f9fd`, texto `#24272b`. Nada de `#233977`, `#141F44`, `#F2CA02`, `#FBF9F4`, `#003087`, `#FFCC00`. Vermelho nunca como acento.
- **Fontes:** Exo 2 (títulos, 700/800) e Montserrat (corpo e rótulos). Sem Syne, DM Sans, Inter.
- **Formato e margens:** 4:5 1080×1350 com margem de 80 px; story 1080×1920 com topo de 250 px e base de 340 px livres; marca horizontal 300 px (mínimo 140 px) no canto inferior esquerdo, ou só o símbolo quando a família pede. Sem lockup Mais BB nos posts.
- **Texto:** copy idêntica ao texto aprovado; sem taxa, prazo, "aprovação garantida", "sem consulta", comparativo sem fonte; fecha com "Quem analisa é o banco" quando há CTA de crédito; vínculo como "Correspondente Bancário Banco do Brasil"; nome "Agilit".
- **Imagem:** pessoa real só com autorização registrada; pessoa gerada por IA só em papel ilustrativo, nunca cliente, depoimento ou funcionário nomeado; sem logo de terceiros, sem texto dentro da imagem gerada; luz natural, contexto brasileiro; nada de banco de imagem.
- **Sazonal:** Natal com moldura verde-700 e elemento plano (estrela, laço, bola) em verde-700 e branco com detalhe âmbar; Ano Novo com estrelas em ciano e âmbar. A marca não muda de cor por campanha.
- **Legibilidade:** contraste do texto sobre foto garantido por gradiente de leitura ou placa; título legível na miniatura do feed (teste a 320 px de largura).

## 6. Famílias de layout (qual usar quando)

| Família | O que é | Quando usar | Marca | Imagem |
|---|---|---|---|---|
| **A · Foto-declaração** | foto sangrada, gradiente de leitura na base, título em branco | uma frase forte, emocional ou de cenário (abertura de campanha, capa de carrossel) | só o símbolo | cena com pessoa, luz natural, espaço no terço inferior |
| **B · Recorte** | pessoa recortada sobre bloco de cor e grafismo, título em papel, botão limão | peça de produto com CTA, reel de apresentador, story de abertura | marca branca | pessoa em fundo branco + recorte |
| **C · Editorial** | só tipografia, contraste Light/Black, número grande como grafismo, faixa limão | passo a passo, listas, avisos, dados, lâminas internas de carrossel | assinatura em texto ou marca pequena | nenhuma |
| **D · Objeto-prova** | objeto fotografado de cima, placa translúcida de leitura, etiqueta de campanha | boleto, cartão, contrato, calendário, tema "organizar" | marca colorida | objeto em fundo claro, sem texto legível |
| **Vetorial** | ícones de linha, blocos de cor, elementos sazonais planos | série de stories, carrossel técnico, aviso anti-fraude | marca 300 px | nenhuma |

Regra prática: a **mensagem** escolhe a família. Um carrossel mistura: capa em A ou B, miolo em C, fechamento em B ou D. Dois posts seguidos do mesmo mês não repetem a mesma família com a mesma composição.

## 7. Ferramentas e custo

| Ferramenta | Uso | Custo |
|---|---|---|
| ChatGPT (imagem) | gera cena, pessoa em fundo branco e objeto; uma geração por camada | plano já existente; nenhuma compra |
| rembg (`isnet-general-use`) | recorte de pessoa com alfa real | grátis, roda local |
| Figma | montagem em camadas, arquivo compartilhado; conector do Claude monta e exporta | plano grátis; a geração de imagem do Figma consome crédito e **não** é o caminho padrão |
| Playwright (Chromium) | render de HTML para PNG, com checagem de estouro | grátis |
| Canva | descartado para imagem (decisão de 03/11) | — |
| ArtCraft, outros apps de camadas | avaliados no estudo de 04/11; não fazem parte do fluxo em equipe (sem revisão, sem repositório). Podem ser usados localmente por quem quiser, desde que a fonte e o PNG entrem aqui | — |

## 8. Limites

- O repositório tem 77 MB de PNG (nov/2026). Até 500 MB fica tudo aqui. Depois disso, `final/` migra para o Drive e o repositório guarda `fonte/` e miniaturas; a decisão é do Gleidson quando chegar.
- Vídeo não entra no repositório; fica na pasta da peça no Drive e o dashboard registra em `videos`.
- Uma peça por PR quando houver foto gerada (revisão de imagem leva tempo); lote só para peças vetoriais ou de série.

## 9. Ritmo

| Quando | O quê | Quem |
|---|---|---|
| Segunda | abrir as PRs do lote da semana seguinte (peças com texto aprovado), já com os pedidos de imagem ao Codex | autor da semana (alternado como o Resumo: semana ímpar Claude, par Codex) |
| Terça e quarta | imagens geradas, montagem, rodada de revisão | autor + revisor |
| Quinta | entrega ao Drive e "Enviar arte pra aprovação" | autor |
| Sexta | aceite no dashboard e agendamento | Gleidson / Paulo |

Primeira peça pelo fluxo: o carrossel âncora de Natal (26/11), depois que o Gleidson escolher as famílias do estudo de 04/11 e o texto estiver aprovado no dashboard.
