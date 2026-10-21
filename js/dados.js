/* =========================================================
   Oficina de Interfaces: DADOS DO JOGO
   Conceitos (cartas), etapas (telas e defeitos) e tutorial.
   ========================================================= */

/* ---------- Cartas de conceito ----------
   nome: texto da carta
   icone: emoji da carta
   resumo: usado na explicação de erro ("a carta X serve para...")
   definicao: texto do flashcard exibido no acerto */
const CONCEITOS = {
  /* Treino */
  "monoespacada": {
    nome: "Fonte monoespaçada", icone: "⌨️",
    resumo: "usar letras de largura igual em código, terminais e dados técnicos",
    definicao: "Fontes monoespaçadas dão a mesma largura a todos os caracteres. São comuns em código, terminais e dados técnicos, onde 1, l e I não podem se confundir."
  },

  /* Cores */
  "cor-primaria": {
    nome: "Cor primária", icone: "🎯",
    resumo: "reservar a cor principal para a identidade e para a ação mais importante da tela",
    definicao: "A cor primária representa a identidade e destaca a ação prioritária. Usada em todos os elementos, ela perde a força de destacar."
  },
  "cores-semanticas": {
    nome: "Cores semânticas", icone: "🏷️",
    resumo: "dar a cada cor uma função fixa no sistema, como primary, success e error",
    definicao: "Cores semânticas são nomeadas pela função que cumprem: primary, success, error, warning. Assim, a mesma cor mantém o mesmo significado em todas as telas."
  },
  "cores-estado": {
    nome: "Cores de estado", icone: "🚦",
    resumo: "usar a cor certa para sucesso, erro, atenção e informação, junto com ícone e texto",
    definicao: "Sucesso, erro, atenção e informação têm cores próprias. Cada mensagem combina símbolo, texto, contexto e cor de apoio."
  },
  "harmonia-triadica": {
    nome: "Harmonia triádica", icone: "🔺",
    resumo: "combinar três cores distribuídas no círculo cromático, dando destaque a apenas uma delas",
    definicao: "A triádica usa três cores distribuídas no círculo cromático. Traz variedade e equilíbrio, mas polui a tela quando todas recebem o mesmo destaque."
  },
  "cores-neutras": {
    nome: "Cores neutras", icone: "⚪",
    resumo: "usar branco, cinza e tons suaves como base para fundos, bordas e textos",
    definicao: "Branco, preto, cinza e tons levemente coloridos formam a base da tela. Eles existem para que os destaques funcionais recebam atenção."
  },
  "cmyk": {
    nome: "Modelo CMYK", icone: "🖨️",
    resumo: "representar cores com tintas ciano, magenta, amarelo e preto em materiais impressos",
    definicao: "CMYK é o modelo das tintas, usado em materiais impressos. Nas telas, as cores são formadas por luz, no modelo RGB."
  },
  "tracking": {
    nome: "Tracking", icone: "↔️",
    resumo: "ajustar o espaçamento entre as letras de títulos e rótulos em caixa alta",
    definicao: "Tracking é o espaçamento entre letras. Ajuda em rótulos em caixa alta, mas em excesso prejudica a leitura."
  },

  /* Contraste e acessibilidade */
  "texto-imagem": {
    nome: "Texto sobre imagem", icone: "🖼️",
    resumo: "garantir a leitura de textos colocados sobre fotos, com sobreposição escura ou fundo sólido",
    definicao: "Sobre uma foto, o fundo muda de um ponto para outro. Sobreposição escura, fundo sólido ou uma área menos detalhada garantem a leitura."
  },
  "contraste": {
    nome: "Contraste mínimo (WCAG)", icone: "🌗",
    resumo: "garantir diferença perceptível entre texto e fundo, com pelo menos 4,5:1 para texto normal",
    definicao: "Contraste é a diferença perceptível entre cores. A WCAG nível AA pede 4,5:1 para texto normal e 3:1 para texto grande."
  },
  "nao-so-cor": {
    nome: "Não depender só da cor", icone: "🔣",
    resumo: "combinar cor com ícone, texto e posição para que todas as pessoas entendam a informação",
    definicao: "Uma informação não pode depender só da cor. Ícone e rótulo ajudam pessoas com daltonismo, usuários de leitores de tela e impressões em preto e branco."
  },
  "desabilitado": {
    nome: "Desabilitado legível", icone: "🔒",
    resumo: "fazer o elemento parecer indisponível sem perder a leitura, explicando o motivo",
    definicao: "O elemento desabilitado precisa parecer indisponível, mas continuar legível. Uma mensagem sobre o motivo ajuda o usuário."
  },
  "harmonia-analoga": {
    nome: "Harmonia análoga", icone: "🌈",
    resumo: "combinar cores vizinhas no círculo cromático para criar continuidade",
    definicao: "A análoga usa cores próximas no círculo cromático. Transmite harmonia e continuidade, mas pode ter contraste insuficiente."
  },
  "hsl": {
    nome: "Modelo HSL", icone: "🎚️",
    resumo: "descrever a cor por matiz, saturação e luminosidade para gerar variações",
    definicao: "HSL descreve a cor por matiz (hue), saturação e luminosidade. Mudar só a luminosidade gera tons controlados da mesma cor."
  },

  /* Tipografia */
  "familias": {
    nome: "Poucas famílias tipográficas", icone: "🔤",
    resumo: "usar uma família principal, variando peso e tamanho, em vez de muitas fontes",
    definicao: "Muitas fontes geram inconsistência, poluição visual e hierarquia confusa. Em muitos projetos, uma única família com diferentes pesos basta."
  },
  "hierarquia": {
    nome: "Hierarquia tipográfica", icone: "📶",
    resumo: "diferenciar níveis de informação com tamanho, peso, cor e espaçamento",
    definicao: "A hierarquia tipográfica mostra ao usuário o que ler primeiro: título, subtítulo, corpo e legenda em níveis claros, criados por tamanho, peso, cor e espaçamento."
  },
  "altura-linha": {
    nome: "Altura de linha", icone: "↕️",
    resumo: "ajustar o espaço vertical entre as linhas de um texto",
    definicao: "Altura de linha é o espaço vertical entre linhas. Apertada, cansa; separada demais, quebra a continuidade. Textos longos pedem uma altura confortável."
  },
  "caixa-alta": {
    nome: "Caixa alta só em trechos curtos", icone: "🔠",
    resumo: "reservar letras maiúsculas para rótulos, categorias e pequenos destaques",
    definicao: "Em textos longos, a caixa alta reduz a diferença entre as palavras e causa cansaço. Ela funciona em rótulos curtos e categorias."
  },
  "alinhamento": {
    nome: "Alinhamento à esquerda", icone: "⬅️",
    resumo: "fazer cada linha do texto começar no mesmo ponto",
    definicao: "Alinhado à esquerda, cada linha começa no mesmo ponto. É o padrão para a maioria dos textos em português; o justificado abre espaços irregulares em colunas estreitas."
  },
  "pilha-fontes": {
    nome: "Pilha de fontes", icone: "🗂️",
    resumo: "listar fontes alternativas para o navegador usar caso a primeira não carregue",
    definicao: "A pilha de fontes, como Inter, Arial, sans-serif, define substitutas em ordem caso a primeira fonte não esteja disponível."
  },
  "fonte-display": {
    nome: "Fonte display", icone: "✨",
    resumo: "usar fontes de muita personalidade em títulos e destaques curtos",
    definicao: "Fontes display têm personalidade visual forte. Funcionam em títulos e destaques curtos, mas cansam em textos longos."
  },

  /* Formulário */
  "rotulo": {
    nome: "Rótulo sempre visível", icone: "🏷",
    resumo: "manter o nome do campo fora dele, porque o placeholder some durante a digitação",
    definicao: "O placeholder é um texto temporário que desaparece durante a digitação. Ele pode mostrar um exemplo, mas não substitui o rótulo."
  },
  "erro-campo": {
    nome: "Erro junto ao campo", icone: "⚠️",
    resumo: "mostrar a mensagem de erro perto do campo com problema, com ícone e texto",
    definicao: "A mensagem de erro fica perto do campo com problema, com ícone e um texto que explica como corrigir."
  },
  "tipo-campo": {
    nome: "Tipo de campo adequado", icone: "📱",
    resumo: "usar campos como email, tel, number e date para abrir o teclado certo no celular",
    definicao: "O tipo correto de campo apresenta um teclado mais adequado no celular e melhora velocidade, precisão, facilidade e validação."
  },
  "sublinhado": {
    nome: "Sublinhado só em links", icone: "🔗",
    resumo: "reservar o sublinhado para textos que levam a algum lugar",
    definicao: "Em interfaces, o sublinhado é fortemente associado a links. Usá-lo em texto sem ação confunde o usuário."
  },
  "harmonia-complementar": {
    nome: "Harmonia complementar", icone: "☯️",
    resumo: "combinar cores opostas no círculo cromático para criar alto destaque",
    definicao: "A complementar usa cores opostas no círculo cromático. Cria alto contraste e destaque, mas exige controle para não exagerar na intensidade."
  },
  "layout-fluido": {
    nome: "Layout fluido", icone: "🌊",
    resumo: "usar medidas relativas para o layout ocupar todo o espaço disponível",
    definicao: "O layout fluido usa medidas relativas e ocupa o espaço disponível. O risco é ficar excessivamente largo em telas grandes."
  },

  /* Grid e layout */
  "margens": {
    nome: "Margens", icone: "🔲",
    resumo: "afastar o conteúdo das bordas da tela",
    definicao: "Margens são os espaços entre o conteúdo e as bordas da tela. Elas melhoram a leitura, criam equilíbrio e facilitam o toque."
  },
  "excecao-grid": {
    nome: "Exceção intencional ao grid", icone: "💥",
    resumo: "romper o grid de propósito para criar destaque",
    definicao: "O grid orienta, mas não é prisão. Quebrá-lo sem motivo parece erro; quebrá-lo com intenção cria destaque."
  },
  "grid-colunas": {
    nome: "Grid de colunas", icone: "▥",
    resumo: "posicionar os elementos em colunas alinhadas, como no grid de 12 colunas",
    definicao: "O grid organiza os elementos em colunas. O de 12 colunas aceita divisões como 6 + 6, 4 + 4 + 4 e 8 + 4, por isso é tão comum."
  },
  "gutter": {
    nome: "Gutter", icone: "⫴",
    resumo: "deixar um espaço regular entre as colunas do grid",
    definicao: "Gutters são os espaços entre as colunas. Pequenos demais misturam os conteúdos; grandes demais fragmentam o layout."
  },
  "escala-espaco": {
    nome: "Escala de espaçamento", icone: "📏",
    resumo: "usar valores previsíveis de espaço, como múltiplos de 8, em vez de números soltos",
    definicao: "Uma escala de espaçamento evita valores aleatórios. Múltiplos de 8 dão ritmo e facilitam a implementação; 4 px fica para ajustes finos."
  },
  "largura-maxima": {
    nome: "Largura máxima", icone: "↔",
    resumo: "limitar a largura do conteúdo em telas muito largas para evitar linhas longas",
    definicao: "Em telas muito largas, uma largura máxima evita linhas longas, elementos dispersos e excesso de espaço entre áreas relacionadas."
  },
  "rgb": {
    nome: "Modelo RGB", icone: "💡",
    resumo: "formar as cores na tela somando luz vermelha, verde e azul",
    definicao: "RGB forma as cores com luz e é o modelo das telas. Na web, a mesma cor também pode ser escrita em HEX ou HSL."
  },

  /* Responsividade */
  "navegacao": {
    nome: "Navegação inferior", icone: "🧭",
    resumo: "trocar o menu lateral do computador por uma barra inferior ou um menu recolhido no celular",
    definicao: "No celular, o menu lateral vira navegação inferior ou menu recolhido, deixando espaço para o conteúdo e mantendo as ações prioritárias visíveis."
  },
  "ordem-tarefa": {
    nome: "Ordem segue a tarefa", icone: "🔀",
    resumo: "reorganizar os elementos no celular conforme o que o usuário precisa fazer primeiro",
    definicao: "Reorganizar é mais do que empilhar. No celular, a ação principal sobe para logo depois do título e os filtros ficam recolhidos."
  },
  "tabela-cartoes": {
    nome: "Tabela vira cartões", icone: "🗃️",
    resumo: "transformar cada linha de uma tabela larga em um cartão no celular",
    definicao: "No celular, cada linha da tabela pode virar um cartão. A leitura melhora, mas a comparação entre linhas fica mais difícil."
  },
  "hover": {
    nome: "Nada importante só no hover", icone: "🖱️",
    resumo: "não esconder informações que só aparecem quando o mouse passa por cima",
    definicao: "No celular não existe o mesmo hover do computador. Nomes e explicações importantes precisam estar sempre visíveis."
  },
  "area-toque": {
    nome: "Área de toque e distância", icone: "👆",
    resumo: "dar tamanho confortável aos alvos de toque e afastar as ações perigosas",
    definicao: "Alvos de toque precisam de área suficiente, que pode ser maior que o ícone. Ações perigosas ficam afastadas para evitar exclusões acidentais."
  },
  "monocromatica": {
    nome: "Harmonia monocromática", icone: "🔵",
    resumo: "usar variações de uma única matiz",
    definicao: "A monocromática usa variações de uma mesma matiz. É consistente e simples, mas diferencia pouco os elementos."
  },
  "escala-tipografica": {
    nome: "Escala tipográfica", icone: "🔢",
    resumo: "trabalhar com um conjunto fixo de tamanhos de texto",
    definicao: "Uma escala tipográfica, como 12, 14, 16, 20, 24 e 32 px, evita tamanhos aleatórios entre as telas."
  }
};

/* ---------- Etapa de treino (usada só no tutorial) ---------- */
const TREINO = {
  id: "treino", numero: 0, titulo: "Treino", produto: "Guia do desenvolvedor",
  cor: "#2EC4B6", tela: "treino", lab: "treino",
  descricao: "Uma tela de treino para aprender os comandos.",
  defeitos: [
    {
      id: "mono", conceito: "monoespacada",
      sintoma: "O código de exemplo está em uma fonte manuscrita, e letras parecidas, como 1 e l, se confundem.",
      dica: "Código precisa de letras com a mesma largura, fáceis de distinguir.",
      antes: "Código em fonte manuscrita.", depois: "Código em fonte monoespaçada, sobre fundo escuro."
    }
  ],
  distratores: ["gutter"]
};

/* ---------- As 6 etapas ---------- */
const ETAPAS = [
  {
    id: "cores", numero: 1, titulo: "Cores", produto: "App de tarefas Tarefando",
    cor: "#FF7A6B", tela: "tarefas", lab: "hsl",
    descricao: "Função das cores, paleta funcional, harmonias e cores de estado.",
    defeitos: [
      {
        id: "harmonia", conceito: "harmonia-triadica",
        sintoma: "Laranja, roxo e verde fortes disputam a atenção no cabeçalho, todos com o mesmo peso.",
        dica: "São três cores distribuídas no círculo cromático. O problema não é usar três cores, e sim dar o mesmo destaque a todas.",
        antes: "Três cores fortes em listras, com o mesmo peso.", depois: "Uma cor domina e as outras viram pequenos acentos."
      },
      {
        id: "neutras", conceito: "cores-neutras",
        sintoma: "O fundo inteiro da tela é amarelo forte, e nada consegue se destacar sobre ele.",
        dica: "Toda tela precisa de uma base calma: branco, cinza ou tons levemente coloridos.",
        antes: "Fundo amarelo saturado em toda a tela.", depois: "Fundo cinza muito claro, deixando os destaques respirarem."
      },
      {
        id: "semanticas", conceito: "cores-semanticas",
        sintoma: "O mesmo vermelho aparece no botão Nova tarefa e no aviso de falha na sincronização.",
        dica: "Uma cor deve ter uma única função no sistema. Pense em nomes como primary e error.",
        antes: "Vermelho significa criar tarefa e também erro.", depois: "Ação principal em azul (primary) e erro em vermelho (error)."
      },
      {
        id: "estados", conceito: "cores-estado",
        sintoma: "O aviso de que o prazo termina hoje aparece em verde, com um sinal de confirmação.",
        dica: "Verde costuma indicar sucesso. Qual estado combina com risco ou necessidade de cuidado?",
        antes: "Aviso de prazo com a cor e o ícone de sucesso.", depois: "Aviso em âmbar, com ícone de atenção e texto claro."
      },
      {
        id: "primaria", conceito: "cor-primaria",
        sintoma: "Editar, Compartilhar, Excluir e Salvar usam o mesmo azul forte. Nenhum botão parece o mais importante.",
        dica: "Quando tudo tem a cor principal, nada se destaca. Qual é a ação prioritária desta lista?",
        antes: "Todos os botões preenchidos com a cor principal.", depois: "Só Salvar alterações usa a cor principal; os outros ficam neutros."
      }
    ],
    distratores: ["cmyk", "tracking"]
  },
  {
    id: "contraste", numero: 2, titulo: "Contraste e acessibilidade", produto: "Portal de Notas",
    cor: "#B08CFF", tela: "notas", lab: "contraste",
    descricao: "Contraste, texto sobre imagem, daltonismo e estado desabilitado.",
    defeitos: [
      {
        id: "imagem", conceito: "texto-imagem",
        sintoma: "O título branco foi colocado direto sobre a foto e some no meio das nuvens claras.",
        dica: "O fundo da foto muda de um ponto para outro. Uma camada escura por cima resolveria.",
        antes: "Título branco direto sobre as áreas claras da foto.", depois: "Sobreposição escura deixa o título legível."
      },
      {
        id: "contraste", conceito: "contraste",
        sintoma: "Os nomes das disciplinas e as notas aparecem em cinza muito claro sobre o fundo branco.",
        dica: "Use o medidor do laboratório: texto normal precisa de pelo menos 4,5:1.",
        antes: "Cinza-claro sobre branco, abaixo de 2:1.", depois: "Texto escuro sobre branco, bem acima de 4,5:1."
      },
      {
        id: "cor", conceito: "nao-so-cor",
        sintoma: "A situação de cada disciplina é mostrada apenas por uma bolinha verde ou vermelha.",
        dica: "Ligue os óculos de daltonismo no laboratório. As bolinhas continuam diferentes?",
        antes: "Bolinhas verde e vermelha, sem texto.", depois: "Ícone e rótulo: Aprovado e Em recuperação."
      },
      {
        id: "desabilitado", conceito: "desabilitado",
        sintoma: "O botão Baixar boletim está tão apagado que quase não dá para ler, e ninguém sabe por quê.",
        dica: "Indisponível não é invisível. O usuário também precisa saber o motivo.",
        antes: "Botão quase invisível, sem explicação.", depois: "Botão cinza legível, com cadeado e o motivo."
      }
    ],
    distratores: ["harmonia-analoga", "hsl"]
  },
  {
    id: "tipografia", numero: 3, titulo: "Tipografia", produto: "Revista Pixel",
    cor: "#5AA9FF", tela: "artigo", lab: "linha",
    descricao: "Famílias, hierarquia, altura de linha, caixa alta e alinhamento.",
    defeitos: [
      {
        id: "familias", conceito: "familias",
        sintoma: "O artigo mistura seis fontes diferentes, quase uma em cada parte do texto.",
        dica: "Em muitos projetos, uma única família com diferentes pesos é suficiente.",
        antes: "Courier, Comic Sans, Impact, Georgia e uma manuscrita juntas.", depois: "Uma única família sem serifa, variando só o peso."
      },
      {
        id: "hierarquia", conceito: "hierarquia",
        sintoma: "Título, subtítulo e texto têm o mesmo tamanho e o mesmo peso. Não dá para saber o que ler primeiro.",
        dica: "O leitor precisa saber o que vem primeiro. Tamanho e peso criam níveis de informação.",
        antes: "Tudo no mesmo tamanho, sem negrito.", depois: "Título grande em negrito, subtítulo médio e corpo menor."
      },
      {
        id: "altura", conceito: "altura-linha",
        sintoma: "As linhas do primeiro parágrafo estão tão juntas que quase se encostam.",
        dica: "Observe o espaço vertical entre uma linha e a seguinte.",
        antes: "Linhas apertadas, quase sobrepostas.", depois: "Altura de linha confortável, perto de 1,6."
      },
      {
        id: "caixa", conceito: "caixa-alta",
        sintoma: "Um parágrafo inteiro foi escrito em letras maiúsculas.",
        dica: "Maiúsculas reduzem a diferença entre as palavras. Elas funcionam bem em rótulos curtos.",
        antes: "Parágrafo longo todo em maiúsculas.", depois: "Texto em caixa normal; maiúsculas só no rótulo DICA."
      },
      {
        id: "alinhamento", conceito: "alinhamento",
        sintoma: "Na coluna estreita do glossário, o texto justificado abriu buracos irregulares entre as palavras.",
        dica: "Em português, o padrão de leitura faz cada linha começar no mesmo ponto.",
        antes: "Justificado em coluna estreita, com espaços irregulares.", depois: "Alinhado à esquerda, com espaços regulares."
      }
    ],
    distratores: ["pilha-fontes", "fonte-display"]
  },
  {
    id: "formulario", numero: 4, titulo: "Tipografia em formulários", produto: "Cadastro Bem-Estar",
    cor: "#F472B6", tela: "form", lab: "teclado",
    descricao: "Rótulo, placeholder, mensagem de erro, sublinhado e tipos de campo.",
    defeitos: [
      {
        id: "erro", conceito: "erro-campo",
        sintoma: "O aviso de erro aparece só no topo, longe do campo com problema, que fica marcado apenas em vermelho.",
        dica: "A mensagem deve ficar onde a pessoa está olhando, com ícone e texto.",
        antes: "Aviso genérico no topo da página.", depois: "Mensagem com ícone logo abaixo do campo E-mail."
      },
      {
        id: "placeholder", conceito: "rotulo",
        sintoma: "Os campos não têm rótulos: o nome de cada um está apenas escrito dentro do campo, em cinza.",
        dica: "Esse texto some assim que a pessoa começa a digitar. E depois, como ela sabe o que era o campo?",
        antes: "Só o placeholder indica o que preencher.", depois: "Rótulos visíveis acima; placeholder só com exemplo."
      },
      {
        id: "sublinhado", conceito: "sublinhado",
        sintoma: "O trecho Li e aceito está sublinhado, mas não é clicável. Já o link dos termos não tem destaque.",
        dica: "Em interfaces, o sublinhado é fortemente associado a uma coisa específica.",
        antes: "Sublinhado no texto comum, link sem destaque.", depois: "Só o link Termos de uso fica sublinhado."
      },
      {
        id: "telefone", conceito: "tipo-campo",
        sintoma: "No celular, o campo Telefone abre um teclado cheio de letras.",
        dica: "Campos do tipo email, tel, number e date mudam o teclado virtual. Teste no laboratório.",
        antes: "Teclado de letras para digitar números.", depois: "Teclado numérico de telefone."
      }
    ],
    distratores: ["harmonia-complementar", "layout-fluido"]
  },
  {
    id: "grid", numero: 5, titulo: "Grid e layout", produto: "Vitrine Cursos Livres",
    cor: "#3DDC97", tela: "vitrine", lab: "grade",
    descricao: "Colunas, margens, gutters, escala de espaçamento e exceções ao grid.",
    defeitos: [
      {
        id: "margens", conceito: "margens",
        sintoma: "Todo o conteúdo está encostado nas bordas da janela, dos dois lados.",
        dica: "Falta espaço entre o conteúdo e a borda da tela.",
        antes: "Conteúdo grudado nas laterais.", depois: "Margens laterais de 32 px."
      },
      {
        id: "excecao", conceito: "excecao-grid",
        sintoma: "O banner de lançamento ficou torto e meio fora do alinhamento. Parece um erro.",
        dica: "Romper o grid é possível, desde que pareça uma decisão, e não um acidente.",
        antes: "Banner deslocado sem motivo.", depois: "Banner de largura total, criando destaque de propósito."
      },
      {
        id: "grid", conceito: "grid-colunas",
        sintoma: "Os cartões da primeira linha têm larguras diferentes e começam em alturas diferentes.",
        dica: "Ligue o grid de 12 colunas no laboratório. Três cartões iguais ocupariam quantas colunas cada?",
        antes: "Larguras e alturas aleatórias.", depois: "Três cartões de 4 colunas, alinhados."
      },
      {
        id: "gutter", conceito: "gutter",
        sintoma: "Os cartões da segunda linha estão grudados uns nos outros, sem nenhum espaço entre eles.",
        dica: "O espaço entre as colunas tem um nome próprio no grid.",
        antes: "Nenhum espaço entre os cartões.", depois: "Espaço de 24 px entre as colunas."
      },
      {
        id: "espaco", conceito: "escala-espaco",
        sintoma: "Na caixa Receba novidades, os espaços são de 3, 7, 13 e 22 px, sem nenhum padrão.",
        dica: "Valores como 8, 16, 24 e 32 dão ritmo e são fáceis de implementar.",
        antes: "Espaços soltos: 3, 7, 13 e 22 px.", depois: "Espaços de 8, 16 e 24 px."
      }
    ],
    distratores: ["largura-maxima", "rgb"]
  },
  {
    id: "responsivo", numero: 6, titulo: "Responsividade", produto: "Plataforma de cursos no celular",
    cor: "#FFB547", tela: "app", lab: "largura",
    descricao: "Navegação, ordem pela tarefa, tabelas, hover e áreas de toque.",
    defeitos: [
      {
        id: "menu", conceito: "navegacao",
        sintoma: "O menu lateral do computador ocupa quase metade da tela do celular.",
        dica: "No celular, a navegação costuma ir para baixo ou ficar recolhida.",
        antes: "Menu lateral fixo e aberto.", depois: "Barra de navegação inferior com ícone e nome."
      },
      {
        id: "ordem", conceito: "ordem-tarefa",
        sintoma: "O botão Entregar atividade, a tarefa mais importante, ficou lá no fim da tela.",
        dica: "A ordem no celular deve acompanhar o que o usuário precisa fazer primeiro.",
        antes: "Ação principal depois de resumo, filtros e tabela.", depois: "Ação logo após o título; filtros recolhidos."
      },
      {
        id: "tabela", conceito: "tabela-cartoes",
        sintoma: "A tabela de atividades é mais larga que a tela, e as colunas da direita foram cortadas.",
        dica: "Para consultar um registro por vez, cada linha pode virar outro tipo de componente.",
        antes: "Tabela cortada na lateral.", depois: "Cada atividade em um cartão."
      },
      {
        id: "hover", conceito: "hover",
        sintoma: "Os ícones só mostram o nome quando o mouse passa por cima. No celular não há mouse.",
        dica: "No toque não existe o mesmo comportamento do ponteiro.",
        antes: "Nome do ícone só aparece com o mouse.", depois: "Ícones com nome sempre visível."
      },
      {
        id: "toque", conceito: "area-toque",
        sintoma: "Os botões Salvar e Excluir curso são minúsculos e estão colados um no outro.",
        dica: "Pense no tamanho do dedo e no risco de tocar na ação perigosa por engano.",
        antes: "Botões pequenos e colados.", depois: "Botão grande e Excluir afastado."
      }
    ],
    distratores: ["monocromatica", "escala-tipografica"]
  }
];

/* ---------- Passos do tutorial ----------
   alvo: seletor do elemento destacado
   acao: null (só leitura) | "pino" | "carta" | "conectar"
   so: mostra o passo apenas em um modo */
const TUTORIAL = [
  { alvo: "#palco", titulo: "Bem-vindos à Oficina!", texto: "Cada etapa mostra a tela de um produto digital cheia de defeitos visuais. A missão é consertar todos." },
  { alvo: '.pino[data-def="mono"]', titulo: "Os números marcam os defeitos", texto: "Clique no número 1 para ler o que está errado nesta tela.", acao: "pino" },
  { alvo: "#painel-cartas", titulo: "As cartas de conceito", texto: "Cada carta é um conceito. Só uma delas conserta cada defeito, e algumas cartas não servem para nenhum." },
  { alvo: '.carta[data-c="monoespacada"]', titulo: "Escolha a carta", texto: "Clique na carta Fonte monoespaçada. Se preferir, arraste a carta direto até o defeito.", acao: "carta" },
  { alvo: '.pino[data-def="mono"]', titulo: "Aplique o conceito", texto: "Agora clique no defeito 1 para aplicar a carta escolhida.", acao: "conectar" },
  { alvo: "#btn-dica", titulo: "Pedir dica", texto: "Travou? A dica mostra uma pista sobre o defeito e descarta uma carta errada. No modo limitado, há 6 dicas." },
  { alvo: "#laboratorio", titulo: "Laboratório", texto: "Cada etapa traz uma ferramenta para experimentar o conceito: simulador de daltonismo, grid de 12 colunas, largura da tela e outras." },
  { alvo: "#btn-voltar", titulo: "Voltar jogada", texto: "Clicou errado? O botão Voltar desfaz a última jogada, inclusive os pontos." },
  { alvo: "#placar", titulo: "Placar das equipes", texto: "No modo competitivo, cada equipe faz uma jogada por vez. Acerto vale 100 pontos, ou 50 se a equipe usou dica na jogada. Errou, a vez passa.", so: "competitivo" },
  { alvo: "#placar", titulo: "Pontuação do grupo", texto: "No modo colaborativo, todos jogam juntos. Acerto de primeira vale 100 pontos; depois de erro ou dica, vale 50.", so: "colaborativo" },
  { alvo: "#palco", titulo: "Tudo pronto!", texto: "Agora é com vocês. Seis telas e 28 defeitos esperam por conserto.", fim: true }
];
