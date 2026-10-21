/* =========================================================
   Oficina de Interfaces: TELAS COM DEFEITOS E LABORATÓRIOS
   Cada tela é um desenho em HTML. Os elementos com data-zona
   são os defeitos. Quando o defeito é consertado, a zona
   recebe a classe "ok" e o CSS (telas.css) mostra o "depois".
   ========================================================= */

const CHROME = (url) => `<div class="m-chrome"><i></i><i></i><i></i><span>${url}</span></div>`;

const TELAS = {
  /* ---------------- TREINO ---------------- */
  treino: {
    largura: 760, altura: 540,
    html: `
    <div class="tela t-treino">
      ${CHROME("docs.exemplo.dev/guia-rapido")}
      <div class="tr-doc">
        <div class="tr-trilha">Guia do desenvolvedor › Funções</div>
        <h2>Guia rápido: a função soma</h2>
        <p>Copie o código abaixo para somar dois números e mostrar o resultado no console.</p>
        <pre class="tr-codigo" data-zona="mono">function soma(a, b) {
  return a + b;
}
console.log(soma(1, 11)); // 12
let l1 = 10, I1 = 1;</pre>
        <p class="tr-obs">Repare nas letras l, I e no número 1 da última linha.</p>
      </div>
    </div>`
  },

  /* ---------------- ETAPA 1: CORES ---------------- */
  tarefas: {
    largura: 760, altura: 540,
    html: `
    <div class="tela t-tarefas">
      ${CHROME("tarefando.app/hoje")}
      <header class="ta-cab" data-zona="harmonia" data-pino="p-dentro">
        <div class="ta-logo">✔ Tarefando</div>
        <nav class="ta-nav"><span class="ativo">Hoje</span><span>Projetos</span><span>Equipe</span></nav>
        <span class="ta-chip">3 para hoje</span>
      </header>
      <div class="ta-fundo" data-zona="neutras" data-pino="p-dentro p-dir p-baixo">
        <div class="ta-barra" data-zona="semanticas">
          <button class="ta-nova">+ Nova tarefa</button>
          <div class="ta-falha"><b>✕</b> Não foi possível sincronizar. Tente de novo.</div>
        </div>
        <div class="ta-aviso" data-zona="estados">
          <span class="ic-antes">✓</span><span class="ic-depois">⚠</span>
          <span><b class="rot-depois">Atenção: </b>o prazo de 2 tarefas termina hoje.</span>
        </div>
        <div class="ta-lista" data-zona="primaria">
          <div class="ta-item"><span class="ta-check"></span><div class="ta-txt"><b>Revisar os wireframes</b><small>Projeto App Saúde · hoje</small></div>
            <div class="ta-acoes"><button class="ta-sec">Editar</button><button class="ta-sec">Compartilhar</button><button class="ta-sec">Excluir</button></div></div>
          <div class="ta-item"><span class="ta-check"></span><div class="ta-txt"><b>Testar a paleta de cores</b><small>Projeto Loja Verde · hoje</small></div>
            <div class="ta-acoes"><button class="ta-sec">Editar</button><button class="ta-sec">Compartilhar</button><button class="ta-sec">Excluir</button></div></div>
          <div class="ta-item"><span class="ta-check feito">✓</span><div class="ta-txt"><b>Escolher a tipografia</b><small>Projeto App Saúde · ontem</small></div>
            <div class="ta-acoes"><button class="ta-sec">Editar</button><button class="ta-sec">Compartilhar</button><button class="ta-sec">Excluir</button></div></div>
          <div class="ta-rodape"><span>3 tarefas · 1 concluída</span><button class="ta-pri">Salvar alterações</button></div>
        </div>
      </div>
    </div>`
  },

  /* ---------------- ETAPA 2: CONTRASTE ---------------- */
  notas: {
    largura: 760, altura: 540,
    html: `
    <div class="tela t-notas">
      ${CHROME("portal.escola.edu/boletim")}
      <div class="no-hero" data-zona="imagem" data-pino="p-dentro p-dir">
        <svg class="no-foto" viewBox="0 0 760 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs><linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6fb"/><stop offset="1" stop-color="#f7fbff"/></linearGradient></defs>
          <rect width="760" height="160" fill="url(#ceu)"/>
          <circle cx="640" cy="38" r="26" fill="#fff6cf"/>
          <g fill="#ffffff"><ellipse cx="120" cy="52" rx="90" ry="26"/><ellipse cx="190" cy="40" rx="60" ry="24"/><ellipse cx="330" cy="70" rx="120" ry="30"/><ellipse cx="470" cy="48" rx="80" ry="22"/><ellipse cx="560" cy="80" rx="90" ry="24"/></g>
          <rect x="40" y="96" width="220" height="64" fill="#efe6d8"/><rect x="60" y="108" width="24" height="20" fill="#d6e6f2"/><rect x="100" y="108" width="24" height="20" fill="#d6e6f2"/><rect x="140" y="108" width="24" height="20" fill="#d6e6f2"/><rect x="180" y="108" width="24" height="20" fill="#d6e6f2"/>
          <rect x="300" y="84" width="180" height="76" fill="#f3ede4"/><polygon points="290,86 390,56 490,86" fill="#e7dccd"/>
          <rect x="520" y="104" width="200" height="56" fill="#eee5d6"/>
          <g fill="#9cc79a"><circle cx="280" cy="140" r="18"/><circle cx="505" cy="138" r="20"/><circle cx="20" cy="140" r="22"/><circle cx="740" cy="136" r="24"/></g>
        </svg>
        <div class="no-veu"></div>
        <div class="no-tit"><h2>Boletim do estudante</h2><p>Acompanhe suas notas e a situação em cada disciplina</p></div>
      </div>
      <div class="no-corpo">
        <div class="no-tabela" data-zona="contraste">
          <div class="no-lin no-cab"><span>Disciplina</span><span>Nota</span><span>Situação</span></div>
          <div class="no-lin"><span class="no-txt">Design de Interfaces</span><span class="no-txt no-nota">8,5</span><span class="no-sit ap" data-zona="cor"><i class="no-bola"></i><b class="no-ic">✓</b><em>Aprovado</em></span></div>
          <div class="no-lin"><span class="no-txt">Programação Web</span><span class="no-txt no-nota">9,0</span><span class="no-sit ap" data-zona="cor"><i class="no-bola"></i><b class="no-ic">✓</b><em>Aprovado</em></span></div>
          <div class="no-lin"><span class="no-txt">Banco de Dados</span><span class="no-txt no-nota">4,5</span><span class="no-sit rp" data-zona="cor"><i class="no-bola"></i><b class="no-ic">✕</b><em>Em recuperação</em></span></div>
          <div class="no-lin"><span class="no-txt">Redes de Computadores</span><span class="no-txt no-nota">7,0</span><span class="no-sit ap" data-zona="cor"><i class="no-bola"></i><b class="no-ic">✓</b><em>Aprovado</em></span></div>
          <div class="no-lin"><span class="no-txt">Matemática</span><span class="no-txt no-nota">5,0</span><span class="no-sit rp" data-zona="cor"><i class="no-bola"></i><b class="no-ic">✕</b><em>Em recuperação</em></span></div>
        </div>
        <div class="no-des" data-zona="desabilitado">
          <button class="no-baixar" tabindex="-1">⬇ Baixar boletim em PDF</button>
          <small class="no-motivo">🔒 Disponível quando todas as notas forem lançadas.</small>
        </div>
      </div>
    </div>`
  },

  /* ---------------- ETAPA 3: TIPOGRAFIA ---------------- */
  artigo: {
    largura: 760, altura: 540,
    html: `
    <div class="tela t-artigo">
      ${CHROME("revistapixel.com/leitura")}
      <div class="ar-topo"><b>Revista Pixel</b><span>Tecnologia · Design · Cultura</span></div>
      <div class="ar-corpo" data-zona="familias" data-pino="p-dentro p-dir p-baixo">
        <article class="ar-art">
          <div class="ar-hier" data-zona="hierarquia">
            <h1 class="ar-tit">Como a tipografia muda a leitura na tela</h1>
            <p class="ar-sub">Pequenas escolhas de fonte decidem se um texto cansa ou convida.</p>
            <p class="ar-meta">Por Equipe Pixel · 6 min de leitura</p>
          </div>
          <p class="ar-p1" data-zona="altura">Quando abrimos um texto no celular, os olhos percorrem cada linha procurando um ritmo. Se as linhas ficam coladas, a leitura trava e cansa. Um bom espaço entre elas guia o olhar de uma linha para a próxima sem esforço.</p>
          <p class="ar-p2" data-zona="caixa"><span class="ar-rot">Dica</span> Antes de publicar, leia o texto em telas diferentes e peça para outra pessoa conferir se a leitura flui do começo ao fim.</p>
        </article>
        <aside class="ar-lado" data-zona="alinhamento" data-pino="p-dentro p-dir">
          <h4>Glossário</h4>
          <p>Legibilidade: facilidade de reconhecer caracteres. Leiturabilidade: facilidade de compreender blocos inteiros de texto, parágrafo por parágrafo.</p>
        </aside>
      </div>
    </div>`
  },

  /* ---------------- ETAPA 4: FORMULÁRIO ---------------- */
  form: {
    largura: 760, altura: 540,
    html: `
    <div class="tela t-form">
      ${CHROME("bemestar.app/criar-conta")}
      <div class="fo-banner" data-zona="erro" data-pino="p-dentro p-dir"><span class="b-antes">Existem erros no formulário.</span><span class="b-depois">⚠ 1 campo precisa de correção.</span></div>
      <div class="fo-area">
        <div class="fo-form">
          <h3>Criar conta</h3>
          <p class="fo-lead">Leva menos de um minuto.</p>
          <div class="fo-campos" data-zona="placeholder">
            <div class="fo-campo"><span class="fo-rot">Nome completo</span><div class="fo-inp"><span class="ph-antes">Nome completo</span><span class="ph-depois">Ex.: Maria Souza</span></div></div>
            <div class="fo-campo"><span class="fo-rot">E-mail</span><div class="fo-inp fo-errado"><span class="valor">maria.souza@</span></div>
              <div class="fo-msg" data-zona="erro">⚠ Informe um e-mail completo, como nome@dominio.com</div></div>
            <div class="fo-campo"><span class="fo-rot">Senha</span><div class="fo-inp"><span class="ph-antes">Senha</span><span class="ph-depois">Mínimo de 8 caracteres</span></div></div>
          </div>
          <div class="fo-termos" data-zona="sublinhado"><span class="fo-cb">✓</span><span class="fo-u1">Li e aceito</span>&nbsp;os&nbsp;<span class="fo-link">termos de uso</span></div>
          <button class="fo-criar" tabindex="-1">Criar conta</button>
        </div>
        <div class="fo-previa" data-zona="telefone" data-pino="p-dentro p-dir">
          <div class="fo-cel">
            <div class="fo-cel-tit">Campo Telefone no celular</div>
            <div class="fo-cel-campo"><small>Telefone</small><span>(21) 9<i class="cursor"></i></span></div>
            <div class="fo-tec letras">
              <div><b>q</b><b>w</b><b>e</b><b>r</b><b>t</b><b>y</b><b>u</b><b>i</b><b>o</b><b>p</b></div>
              <div><b>a</b><b>s</b><b>d</b><b>f</b><b>g</b><b>h</b><b>j</b><b>k</b><b>l</b></div>
              <div><b class="l">⇧</b><b>z</b><b>x</b><b>c</b><b>v</b><b>b</b><b>n</b><b>m</b><b class="l">⌫</b></div>
              <div><b class="l">123</b><b class="esp">espaço</b><b class="l">ok</b></div>
            </div>
            <div class="fo-tec numeros">
              <div><b>1</b><b>2</b><b>3</b></div><div><b>4</b><b>5</b><b>6</b></div><div><b>7</b><b>8</b><b>9</b></div><div><b>*</b><b>0</b><b>⌫</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>`
  },

  /* ---------------- ETAPA 5: GRID ---------------- */
  vitrine: {
    largura: 760, altura: 540,
    html: `
    <div class="tela t-vitrine">
      ${CHROME("cursoslivres.com")}
      <div class="vi-pagina" data-zona="margens" data-pino="p-dentro p-baixo">
        <div class="vi-cab"><b>◆ Cursos Livres</b><nav><span>Cursos</span><span>Trilhas</span><span class="vi-entrar">Entrar</span></nav></div>
        <div class="vi-banner" data-zona="excecao" data-pino="p-dentro"><b>Lançamento:</b> trilha de Design de Interfaces com 30% de desconto <span class="vi-cta">Conhecer</span></div>
        <h4>Em destaque</h4>
        <div class="vi-linha1" data-zona="grid" data-pino="p-dentro p-dir">
          <div class="vi-card"><i style="background:#7c9cff"></i><b>UX para iniciantes</b><small>8 módulos</small></div>
          <div class="vi-card"><i style="background:#ff9f7c"></i><b>Cores na interface</b><small>5 módulos</small></div>
          <div class="vi-card"><i style="background:#58d0a8"></i><b>Grid e layout</b><small>6 módulos</small></div>
        </div>
        <h4>Mais procurados</h4>
        <div class="vi-linha2" data-zona="gutter" data-pino="p-dentro p-dir">
          <div class="vi-card"><b>Figma do zero</b><small>4,8 ★</small></div>
          <div class="vi-card"><b>CSS responsivo</b><small>4,7 ★</small></div>
          <div class="vi-card"><b>Acessibilidade</b><small>4,9 ★</small></div>
        </div>
        <div class="vi-news" data-zona="espaco" data-pino="p-dentro p-dir">
          <b>Receba novidades</b>
          <p>Um e-mail por semana com cursos novos.</p>
          <div class="vi-form"><span class="vi-inp">seu@email.com</span><span class="vi-btn">Assinar</span></div>
        </div>
      </div>
      <div class="vi-grade" aria-hidden="true">
        <div class="vi-colunas">${Array.from({ length: 12 }, (_, i) => `<span>${i + 1}</span>`).join("")}</div>
        <em class="vi-rot-m">margem</em><em class="vi-rot-g">gutter</em>
      </div>
    </div>`
  },

  /* ---------------- ETAPA 6: RESPONSIVIDADE ---------------- */
  app: {
    largura: 380, altura: 740, celular: true,
    html: `
    <div class="tela celular t-app">
      <div class="ap-status"><span>9:41</span><span>▂▄▆ 🔋</span></div>
      <div class="ap-barra"><span class="ap-ham">☰</span> Meus cursos</div>
      <div class="ap-corpo">
        <nav class="ap-menu" data-zona="menu" data-pino="p-dentro">
          <span>🏠 Início</span><span>📚 Cursos</span><span>📝 Notas</span><span>💬 Mensagens</span><span>📅 Agenda</span><span>👤 Perfil</span><span>⚙️ Ajustes</span><span>🚪 Sair</span>
        </nav>
        <div class="ap-conteudo" data-zona="ordem" data-pino="p-dentro p-dir">
          <h3 class="ap-tit">Design de Interfaces</h3>
          <div class="ap-resumo"><small>Seu progresso</small><div class="ap-barra-prog"><i></i></div><small>68% concluído · 3 atividades pendentes</small></div>
          <div class="ap-filtros"><span class="on">Todas</span><span>Pendentes</span><span>Entregues</span><span>Atrasadas</span><span class="ap-filtro-um">Filtros ▾</span></div>
          <div class="ap-tabela" data-zona="tabela" data-pino="p-dentro p-dir">
            <div class="ap-tab">
              <div class="ap-tl cab"><span>Atividade</span><span>Prazo</span><span>Nota</span><span>Peso</span><span>Status</span></div>
              <div class="ap-tl"><span>Projeto UX</span><span>18/08</span><span>-</span><span>3</span><span>Pendente</span></div>
              <div class="ap-tl"><span>Wireframes</span><span>22/08</span><span>9,0</span><span>2</span><span>Entregue</span></div>
              <div class="ap-tl"><span>Paleta</span><span>29/08</span><span>-</span><span>2</span><span>Pendente</span></div>
            </div>
            <div class="ap-cards">
              <div class="ap-c"><b>Projeto UX</b><small>Prazo 18/08 · Peso 3</small><em class="pend">Pendente</em></div>
              <div class="ap-c"><b>Wireframes</b><small>Prazo 22/08 · Nota 9,0</small><em class="ent">Entregue</em></div>
              <div class="ap-c"><b>Paleta</b><small>Prazo 29/08 · Peso 2</small><em class="pend">Pendente</em></div>
            </div>
          </div>
          <div class="ap-icones" data-zona="hover" data-pino="p-dentro">
            <div class="ap-ics"><span><i>⬇</i><em>Baixar</em></span><span><i>🔗</i><em>Copiar link</em></span><span><i>⭐</i><em>Favoritar</em></span><span><i>🗂</i><em>Arquivar</em></span></div>
            <small class="ap-hover-aviso">Passe o mouse sobre um ícone para ver o nome.</small>
            <span class="ap-mouse">➤<b>Baixar</b></span>
          </div>
          <div class="ap-botoes" data-zona="toque" data-pino="p-dentro"><button class="ap-salvar" tabindex="-1">Salvar</button><button class="ap-excluir" tabindex="-1">Excluir curso</button></div>
          <button class="ap-entregar" tabindex="-1">Entregar atividade</button>
        </div>
      </div>
      <nav class="ap-nav-inf"><span><i>🏠</i>Início</span><span class="on"><i>📚</i>Cursos</span><span><i>📝</i>Notas</span><span><i>👤</i>Perfil</span></nav>
    </div>`
  }
};

/* =========================================================
   LABORATÓRIOS: uma ferramenta interativa por etapa
   Cada função recebe (elementoDoLaboratorio, telaAtual)
   e pode devolver { atualizar() }.
   ========================================================= */

function hslParaHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hex = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  return ("#" + hex(f(0)) + hex(f(8)) + hex(f(4))).toUpperCase();
}

function luminancia(rgb) {
  const c = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function lerRgb(str) { const m = str.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : [0, 0, 0]; }
function razaoContraste(a, b) {
  const l1 = luminancia(a), l2 = luminancia(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const LABS = {
  treino(el) {
    el.innerHTML = `<div class="lab-tit">🔬 Laboratório</div>
      <div class="lab-corpo"><p class="lab-nota grande">Em cada etapa, este espaço traz uma ferramenta para experimentar o conceito: gerador de tons, simulador de daltonismo, altura de linha, teclado virtual, grid de 12 colunas e largura da tela.</p></div>`;
  },

  hsl(el) {
    const tons = [[95, "Fundo"], [85, "Borda"], [55, "Botão"], [40, "Hover"], [20, "Texto"]];
    el.innerHTML = `<div class="lab-tit">🔬 Gerador de tons HSL</div>
      <div class="lab-corpo lab-hsl">
        <div class="lab-ctrl">
          <label>Luminosidade <output class="hsl-val">55%</output></label>
          <input type="range" min="8" max="96" value="55" class="hsl-range" aria-label="Luminosidade">
          <code class="hsl-cod"></code>
        </div>
        <div class="hsl-amostra"></div>
        <div class="hsl-tons">${tons.map(([l, n]) => `<div><i style="background:${hslParaHex(222, 72, l)}"></i><small>${n}<br>${l}%</small></div>`).join("")}</div>
        <p class="lab-nota">Matiz 222 e saturação 72% fixas. Mudar só a luminosidade gera tons da mesma cor para fundos, bordas, botões e textos.</p>
      </div>`;
    const r = el.querySelector(".hsl-range");
    const pintar = () => {
      const l = +r.value, hex = hslParaHex(222, 72, l);
      el.querySelector(".hsl-val").textContent = l + "%";
      el.querySelector(".hsl-amostra").style.background = hex;
      el.querySelector(".hsl-cod").innerHTML = `hsl(222, 72%, ${l}%)<br>= ${hex}`;
    };
    r.addEventListener("input", pintar); pintar();
  },

  contraste(el, tela) {
    el.innerHTML = `<div class="lab-tit">🔬 Acessibilidade</div>
      <div class="lab-corpo lab-contraste">
        <button class="lab-btn btn-oculos" aria-pressed="false">👓 Óculos de daltonismo: <b>desligado</b></button>
        <div class="medidor"><small>Contraste das notas</small><strong class="med-val">-</strong><span class="med-res"></span></div>
        <p class="lab-nota">A simulação imita a deuteranopia, um tipo comum de daltonismo. A WCAG nível AA pede 4,5:1 para texto normal e 3:1 para texto grande.</p>
      </div>`;
    const b = el.querySelector(".btn-oculos");
    b.addEventListener("click", () => {
      const on = !tela.classList.contains("daltonismo");
      tela.classList.toggle("daltonismo", on);
      b.setAttribute("aria-pressed", on);
      b.querySelector("b").textContent = on ? "ligado" : "desligado";
    });
    const medir = () => {
      const n = tela.querySelector(".no-nota");
      if (!n) return;
      const razao = razaoContraste(lerRgb(getComputedStyle(n).color), [255, 255, 255]);
      const ok = razao >= 4.5;
      el.querySelector(".med-val").textContent = razao.toFixed(1).replace(".", ",") + ":1";
      const res = el.querySelector(".med-res");
      res.textContent = ok ? "✓ Passa na WCAG AA" : "✕ Abaixo de 4,5:1";
      res.className = "med-res " + (ok ? "bom" : "ruim");
    };
    medir();
    return { atualizar() { setTimeout(medir, 750); } };
  },

  linha(el) {
    el.innerHTML = `<div class="lab-tit">🔬 Altura de linha</div>
      <div class="lab-corpo lab-linha">
        <div class="lab-ctrl">
          <label>line-height <output class="lh-val">1,6</output></label>
          <input type="range" min="0.8" max="2.8" step="0.1" value="1.6" class="lh-range" aria-label="Altura de linha">
          <span class="lh-status"></span>
        </div>
        <p class="lh-amostra">Textos longos pedem uma altura de linha confortável. Com linhas apertadas, o olhar se perde; com linhas separadas demais, o parágrafo deixa de parecer um bloco único de leitura.</p>
      </div>`;
    const r = el.querySelector(".lh-range"), p = el.querySelector(".lh-amostra"), st = el.querySelector(".lh-status");
    const pintar = () => {
      const v = +r.value;
      p.style.lineHeight = v;
      el.querySelector(".lh-val").textContent = v.toFixed(1).replace(".", ",");
      if (v < 1.3) { st.textContent = "Apertada: cansa a leitura"; st.className = "lh-status ruim"; }
      else if (v <= 1.9) { st.textContent = "Confortável"; st.className = "lh-status bom"; }
      else { st.textContent = "Separada demais: quebra a continuidade"; st.className = "lh-status ruim"; }
    };
    r.addEventListener("input", pintar); pintar();
  },

  teclado(el) {
    const tipos = {
      text: { n: "text", d: "Teclado de letras completo." , html: `<div><b>q</b><b>w</b><b>e</b><b>r</b><b>t</b><b>y</b><b>u</b><b>i</b><b>o</b><b>p</b></div><div><b>a</b><b>s</b><b>d</b><b>f</b><b>g</b><b>h</b><b>j</b><b>k</b><b>l</b></div><div><b>z</b><b>x</b><b>c</b><b>v</b><b>b</b><b>n</b><b>m</b></div>` },
      email: { n: "email", d: "Letras com @ e ponto à mão.", html: `<div><b>q</b><b>w</b><b>e</b><b>r</b><b>t</b><b>y</b><b>u</b><b>i</b><b>o</b><b>p</b></div><div><b>a</b><b>s</b><b>d</b><b>f</b><b>g</b><b>h</b><b>j</b><b>k</b><b>l</b></div><div><b class="d">@</b><b>z</b><b>x</b><b>c</b><b>v</b><b>b</b><b class="d">.</b><b class="d">.com</b></div>` },
      tel: { n: "tel", d: "Teclado numérico de telefone, com * e #.", html: `<div><b>1</b><b>2</b><b>3</b></div><div><b>4</b><b>5</b><b>6</b></div><div><b>7</b><b>8</b><b>9</b></div><div><b>*</b><b>0</b><b>#</b></div>` },
      number: { n: "number", d: "Números com vírgula e sinal.", html: `<div><b>1</b><b>2</b><b>3</b><b class="d">-</b></div><div><b>4</b><b>5</b><b>6</b><b class="d">,</b></div><div><b>7</b><b>8</b><b>9</b><b class="d">⌫</b></div><div><b class="esp">0</b></div>` },
      date: { n: "date", d: "Um seletor de data em vez de digitar.", html: `<div class="cal"><span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>${Array.from({ length: 21 }, (_, i) => `<span class="${i === 9 ? "hoje" : ""}">${i + 1}</span>`).join("")}</div>` }
    };
    el.innerHTML = `<div class="lab-tit">🔬 Teclado virtual</div>
      <div class="lab-corpo lab-teclado">
        <div class="tp-botoes">${Object.keys(tipos).map((k) => `<button class="lab-btn tp" data-t="${k}">type="${k}"</button>`).join("")}</div>
        <div class="tp-previa"><div class="tp-tec"></div></div>
        <p class="lab-nota tp-desc"></p>
      </div>`;
    const mostrar = (k) => {
      el.querySelectorAll(".tp").forEach((b) => b.classList.toggle("on", b.dataset.t === k));
      el.querySelector(".tp-tec").innerHTML = tipos[k].html;
      el.querySelector(".tp-tec").className = "tp-tec t-" + k;
      el.querySelector(".tp-desc").textContent = `Campo do tipo ${tipos[k].n}: ${tipos[k].d}`;
    };
    el.querySelectorAll(".tp").forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.t)));
    mostrar("text");
  },

  grade(el, tela) {
    el.innerHTML = `<div class="lab-tit">🔬 Grid de 12 colunas</div>
      <div class="lab-corpo lab-grade">
        <button class="lab-btn btn-grade" aria-pressed="false">▥ Mostrar grid: <b>desligado</b></button>
        <div class="gr-legenda"><span><i class="c"></i>Coluna</span><span><i class="g"></i>Gutter 24 px</span><span><i class="m"></i>Margem 32 px</span></div>
        <p class="lab-nota">O grid é invisível para o usuário, mas sustenta os alinhamentos. Compare os cartões com as colunas antes e depois de consertar.</p>
      </div>`;
    const b = el.querySelector(".btn-grade");
    b.addEventListener("click", () => {
      const on = !tela.classList.contains("mostrar-grade");
      tela.classList.toggle("mostrar-grade", on);
      b.setAttribute("aria-pressed", on);
      b.querySelector("b").textContent = on ? "ligado" : "desligado";
    });
  },

  largura(el) {
    el.innerHTML = `<div class="lab-tit">🔬 Largura da tela</div>
      <div class="lab-corpo lab-largura">
        <div class="lab-ctrl">
          <label>Largura <output class="lg-val">1280 px</output></label>
          <input type="range" min="320" max="1440" step="10" value="1280" class="lg-range" aria-label="Largura da tela">
          <span class="lg-status"></span>
        </div>
        <div class="lg-palco"><div class="lg-pagina"><div class="lg-topo"></div><div class="lg-cards"><i>1</i><i>2</i><i>3</i><i>4</i></div></div></div>
        <div class="lg-regua"><span data-min="0">até 639 px<br><b>1 coluna</b></span><span data-min="640">640 px<br><b>2 colunas</b></span><span data-min="1024">1024 px<br><b>4 colunas</b></span></div>
      </div>`;
    const r = el.querySelector(".lg-range"), pg = el.querySelector(".lg-pagina"), cards = el.querySelector(".lg-cards"), st = el.querySelector(".lg-status");
    let ultimo = null;
    const pintar = () => {
      const w = +r.value;
      el.querySelector(".lg-val").textContent = w + " px";
      const palco = el.querySelector(".lg-palco");
      const max = palco.clientWidth || 300;
      pg.style.width = Math.max(40, (w / 1440) * max) + "px";
      const cols = w >= 1024 ? 4 : w >= 640 ? 2 : 1;
      cards.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      el.querySelectorAll(".lg-regua span").forEach((s) => {
        const m = +s.dataset.min; const prox = m === 0 ? 640 : m === 640 ? 1024 : 99999;
        s.classList.toggle("on", w >= m && w < prox);
      });
      if (ultimo !== null && ultimo !== cols) {
        st.textContent = "Breakpoint! O conteúdo apertou e o layout se reorganizou.";
        st.className = "lg-status pisca";
        clearTimeout(pintar.t); pintar.t = setTimeout(() => { st.className = "lg-status"; }, 1600);
      } else if (ultimo === null) {
        st.textContent = "Arraste para ver onde o layout muda."; st.className = "lg-status";
      }
      ultimo = cols;
    };
    r.addEventListener("input", pintar);
    requestAnimationFrame(pintar);
    return { atualizar() {}, redimensionar: pintar };
  }
};
