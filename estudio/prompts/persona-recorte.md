# persona-recorte — pessoa em fundo branco para a família B

Uso: pessoa recortada sobre bloco de cor e grafismo (família B), stories de abertura, capa de reel quando não há foto do apresentador. Gera em fundo branco liso e passa pelo `rembg`.

```
Fotografia realista de estúdio, retrato vertical 4:5, fundo branco puro (#FFFFFF) totalmente liso, sem sombra no fundo, sem gradiente. Uma mulher brasileira de uns 45 anos, pele parda, cabelo cacheado preso, camisa azul-escura e calça clara, corpo inteiro até o joelho (plano americano), de pé, três quartos, olhando para a câmera com um sorriso contido; mão direita segurando um celular com a tela desligada. Luz suave e uniforme, bordas do cabelo e das roupas nítidas para recorte. Sem texto, sem logo, sem crachá, sem uniforme de banco.
[+ bloco de marca do README]
```

Depois: `rembg i -m isnet-general-use -a img-02-pessoa-branco.png img-02-pessoa-recorte.png` e conferir as bordas. Na montagem, a pessoa fica à direita (x ≈ 500 px, largura ≈ 760 px na peça 4:5) e o texto à esquerda, acima do bloco.

Declarar: `origem: chatgpt`, `prompt: persona-recorte`, `pessoa: true`, `papel: ilustrativa`.
