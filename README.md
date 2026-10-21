# Oficina de Interfaces

Jogo educativo em HTML, CSS e JavaScript para a disciplina de **Design de Experiência e Interface do Usuário (UX/UI)**. A turma conserta telas de produtos digitais cheias de defeitos visuais, relacionando cada problema ao conceito certo de **cores, tipografia, grid e responsividade**.

Feito para ser projetado na TV ou no projetor, no modo colaborativo (todos juntos) ou competitivo (equipes disputando pontos). Funciona offline, sem instalar nada.

## Como jogar

1. Abra o `index.html` em um navegador (Chrome, Edge ou Firefox).
2. Escolha o modo, as equipes, as dicas e o tempo por jogada.
3. Em cada etapa, clique em um número na tela para ler o defeito.
4. Arraste a carta de conceito até o número do defeito, ou clique na carta e depois no número.
5. Acertou: a tela se conserta na hora e aparece o flashcard do conceito, com o antes e o depois.

## As 6 etapas

| Etapa | Tela | Conceitos | Ferramenta do laboratório |
|---|---|---|---|
| 1. Cores | App de tarefas | cor primária, cores neutras, cores semânticas, cores de estado, harmonia triádica | gerador de tons HSL |
| 2. Contraste e acessibilidade | Portal de notas | contraste mínimo (WCAG), texto sobre imagem, não depender só da cor, desabilitado legível | óculos de daltonismo e medidor de contraste |
| 3. Tipografia | Página de revista | poucas famílias, hierarquia, altura de linha, caixa alta, alinhamento à esquerda | controle de altura de linha |
| 4. Tipografia em formulários | Tela de cadastro | rótulo visível, erro junto ao campo, tipo de campo, sublinhado só em links | prévia do teclado virtual |
| 5. Grid e layout | Vitrine de cursos | margens, grid de colunas, gutter, escala de espaçamento, exceção intencional ao grid | grid de 12 colunas sobre a tela |
| 6. Responsividade | App no celular | navegação inferior, ordem pela tarefa, tabela em cartões, hover, área de toque | largura da tela com breakpoints |

São 28 defeitos ao todo. Cada etapa também tem duas cartas que não consertam nada, para a turma precisar pensar e não apenas eliminar opções.

## Modos e regras

- **Colaborativo:** o grupo joga junto, com uma pontuação única e até 3 estrelas por etapa.
- **Competitivo:** de 2 a 4 equipes com nomes editáveis, uma jogada por vez. Errou ou o tempo acabou, a vez passa.
- **Pontuação:** acerto vale 100 pontos; com dica na jogada (ou, no colaborativo, depois de um erro), vale 50.
- **Dicas:** modo limitado (6 por equipe, ou 6 para o grupo) ou ilimitado. A dica mostra uma pista e descarta uma carta errada.
- **Voltar:** desfaz a última jogada, inclusive os pontos.
- **Tutorial:** passo a passo em que o próprio jogador faz a primeira conexão, com opção de pular.
- **Final:** pódio ou resumo do grupo, galeria com o antes e depois de cada tela e revisão de todos os conceitos em cartas.

## Estrutura dos arquivos

```
index.html        estrutura das telas do jogo
css/estilos.css   visual do jogo
css/telas.css     visual das telas com defeito (antes e depois)
js/dados.js       conceitos, defeitos, dicas, flashcards e tutorial
js/telas.js       desenho das 6 telas e ferramentas do laboratório
js/jogo.js        lógica: modos, turnos, tempo, dicas, tutorial e tela final
```

Para mudar textos, dicas ou cartas, edite só o `js/dados.js`.

## Publicar no GitHub Pages

Em **Settings > Pages**, escolha **Deploy from a branch**, a branch `main` e a pasta `/ (root)`. Em alguns minutos o endereço do jogo aparece no topo da própria página de Pages.

## Autoria

Prof. Alexandre Dias, Instituto Federal Fluminense, Campus Maricá. Curso Técnico em Informática para Internet.
