# Prompts para o ChatGPT (imagem)

O ChatGPT gera as **imagens de origem**; a montagem (texto, marca, botão, grafismo) é feita depois, no Figma ou em HTML. Por isso:

1. **Uma geração por camada.** Cena sem pessoa (`cena-ambiente`), pessoa em fundo branco (`persona-recorte`), objeto em fundo claro (`objeto-prova`), ou a foto completa quando a família A pede (`foto-declaracao`). Camadas separadas dão liberdade de reposicionar, trocar a pessoa e ajustar a luz sem gerar de novo.
2. **Nunca texto, logo ou marca dentro da imagem.** Texto é camada da montagem. Logos de terceiros não entram.
3. **Proporção:** peça 4:5 pede imagem retrato (o ChatGPT entrega 1024×1536 ou 1024×1280); story pede 9:16 (1024×1536 e corte). A montagem reescala; não peça 1080×1350 ao modelo.
4. **Onde salvar:** `agilit/<peça>/fonte/imagens/img-NN-tipo.png` (`cena`, `pessoa-branco`, `pessoa-recorte`, `objeto`, `foto`). O prompt final, se mudou em relação ao catálogo, vai em `fonte/prompts-usados.md`.
5. **Declarar no `peca.json`:** `origem: "chatgpt"`, `prompt: "<nome do arquivo deste catálogo>"`, `pessoa: true|false` e `papel` quando há pessoa (`ilustrativa`, nunca cliente ou depoimento).
6. **Pessoa gerada:** rosto genérico, sem parecer com pessoa real conhecida, sem uniforme de banco, sem crachá. Serve para ilustrar uma situação; nunca "fulana, 62 anos, cliente".

## Recorte de pessoa (fundo branco → alfa real)

```bash
pip install "rembg[cli]"
rembg i -m isnet-general-use -a fonte/imagens/img-02-pessoa-branco.png fonte/imagens/img-02-pessoa-recorte.png
```

Confira as bordas do cabelo e dos óculos a 200%. Se sobrar halo branco, repita com `-ae 15` (erosão do alfa) ou gere a pessoa de novo com cabelo preso.

## Bloco de marca para colar no fim de qualquer prompt

```
Paleta de referência para a cena (sem reproduzir como blocos de cor): azul #306cb3, ciano #43afe4, azul-marinho #052951, papel #f6f9fd; um toque de verde-limão #95c11f em um detalhe pequeno (caneca, caneta, pulseira). Nada de amarelo, nada de vermelho, nada de dourado.
Luz natural de manhã, Brasil (Maranhão), classe trabalhadora, ambiente simples e organizado. Sem texto, sem logo, sem marca, sem relógio ou tela com conteúdo legível. Fotografia realista, 50 mm, profundidade de campo moderada.
```
