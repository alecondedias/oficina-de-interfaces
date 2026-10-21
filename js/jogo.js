/* =========================================================
   Oficina de Interfaces: LÓGICA DO JOGO
   Preparo, modos colaborativo e competitivo, turnos, tempo,
   dicas, tutorial guiado, voltar jogada, modais e tela final.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const clonar = (o) => JSON.parse(JSON.stringify(o));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const embaralhar = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  const hexRgba = (hex, a) => { const h = hex.replace("#", ""); const n = parseInt(h, 16); return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`; };
  const fmtTempo = (s) => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

  /* ---------- constantes ---------- */
  const EQUIPES_BASE = [
    { nome: "Equipe Coral", cor: "#FF7B7B" },
    { nome: "Equipe Azul", cor: "#5AB0FF" },
    { nome: "Equipe Verde", cor: "#45E0A0" },
    { nome: "Equipe Âmbar", cor: "#FFC24D" }
  ];
  const COR_GRUPO = "#2EC4B6";
  const PONTOS_ACERTO = 100;
  const PONTOS_COM_AJUDA = 50;
  const DICAS_LIMITE = 6;
  const TOTAL_DEFEITOS = ETAPAS.reduce((s, e) => s + e.defeitos.length, 0);

  /* ---------- configuração escolhida no preparo ---------- */
  const config = { modo: "colaborativo", qtd: 2, nomes: EQUIPES_BASE.map((e) => e.nome), dicas: "limitado", tempo: 0 };

  /* ---------- estado ----------
     E: tudo que entra no "Voltar" (pontos, vez, consertos...)
     ui: estado visual temporário */
  let E = null;
  let historico = [];
  const ui = { selecionada: null, foco: null, tut: null, timer: null, restante: 0, pausado: false, modalAberto: false, bloqueio: false, lab: null, som: true, arraste: null, tela: null, telaDef: null };

  /* =========================================================
     SOM (sintetizado, sem arquivos)
     ========================================================= */
  let audio = null;
  function iniciarAudio() {
    try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === "suspended") audio.resume(); } catch (e) { audio = null; }
  }
  function tom(freq, dur, tipo, vol, atraso) {
    if (!audio || !ui.som) return;
    const t = audio.currentTime + (atraso || 0);
    const o = audio.createOscillator(), g = audio.createGain();
    o.type = tipo || "sine"; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.1, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(audio.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  function som(nome) {
    switch (nome) {
      case "clique": tom(660, 0.06, "triangle", 0.05); break;
      case "acerto": tom(523, 0.16, "triangle", 0.12); tom(659, 0.16, "triangle", 0.12, 0.1); tom(784, 0.28, "triangle", 0.12, 0.2); break;
      case "erro": tom(220, 0.25, "sawtooth", 0.06); tom(175, 0.32, "sawtooth", 0.05, 0.12); break;
      case "dica": tom(880, 0.12, "sine", 0.08); tom(1175, 0.2, "sine", 0.07, 0.08); break;
      case "vez": tom(440, 0.1, "square", 0.04); tom(660, 0.16, "square", 0.04, 0.1); break;
      case "tique": tom(1000, 0.05, "square", 0.035); break;
      case "fim": [523, 659, 784, 1047].forEach((f, i) => tom(f, 0.32, "triangle", 0.1, i * 0.14)); break;
    }
  }

  /* =========================================================
     TROCA DE TELAS, TOAST E MODAIS
     ========================================================= */
  function mostrarTela(id) {
    $$(".tela-app").forEach((s) => s.classList.toggle("ativa", s.id === id));
  }
  let toastT = null;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("mostrar");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("mostrar"), 2200);
  }
  function abrirModal(op) {
    const cam = $("#camada-modal");
    cam.innerHTML = ""; cam.style.opacity = "";
    const m = document.createElement("div");
    m.className = "modal " + (op.classe || "");
    m.innerHTML = op.html;
    const ac = document.createElement("div"); ac.className = "modal-acoes";
    (op.botoes || []).forEach((b) => {
      const bt = document.createElement("button");
      bt.type = "button";
      bt.className = (b.primario ? "btn-principal" : "btn-sec") + (b.classe ? " " + b.classe : "");
      bt.innerHTML = b.rotulo;
      if (b.acao) bt.addEventListener("click", b.acao);
      ac.appendChild(bt);
    });
    m.appendChild(ac); cam.appendChild(m);
    cam.classList.add("aberta"); ui.modalAberto = true;
    const prim = ac.querySelector(".btn-principal") || ac.querySelector("button");
    if (prim) setTimeout(() => prim.focus(), 60);
    return m;
  }
  function fecharModal() {
    const cam = $("#camada-modal");
    cam.classList.remove("aberta"); cam.innerHTML = ""; cam.style.opacity = "";
    ui.modalAberto = false;
    if (ui.tut) mostrarPassoTutorial();
  }

  /* =========================================================
     PREPARO
     ========================================================= */
  function iniciarPreparo() {
    $$(".opcoes").forEach((g) => g.addEventListener("click", (ev) => {
      const b = ev.target.closest(".opcao"); if (!b || b.disabled) return;
      $$(".opcao", g).forEach((o) => o.classList.toggle("sel", o === b));
      const v = b.dataset.valor;
      switch (g.dataset.grupo) {
        case "modo": config.modo = v; break;
        case "qtd": config.qtd = +v; break;
        case "dicas": config.dicas = v; break;
        case "tempo": config.tempo = +v; break;
      }
      iniciarAudio(); som("clique"); atualizarPreparo();
    }));
    $("#btn-comecar").addEventListener("click", () => { iniciarAudio(); comecar(true); });
    atualizarPreparo();
  }
  function atualizarPreparo() {
    const comp = config.modo === "competitivo";
    $("#bloco-equipes").hidden = !comp;
    $$("#bloco-tempo .opcao").forEach((b) => { b.disabled = !comp; });
    $(".txt-tempo").textContent = comp ? "Quando o tempo acaba, a vez passa para a próxima equipe." : "No modo colaborativo não há cronômetro.";
    $(".txt-limite").textContent = comp ? "6 dicas para cada equipe." : "6 dicas para o grupo.";
    const lista = $("#lista-equipes"); lista.innerHTML = "";
    for (let i = 0; i < config.qtd; i++) {
      const d = document.createElement("label"); d.className = "campo-equipe";
      d.innerHTML = `<i style="background:${EQUIPES_BASE[i].cor}"></i><input maxlength="22" value="${esc(config.nomes[i])}" aria-label="Nome da equipe ${i + 1}">`;
      d.querySelector("input").addEventListener("input", (e) => { config.nomes[i] = e.target.value; });
      lista.appendChild(d);
    }
  }

  /* =========================================================
     ESTADO DA PARTIDA
     ========================================================= */
  function novaEquipe(nome, cor) { return { nome, cor, pontos: 0, dicas: DICAS_LIMITE, acertos: 0, erros: 0, dicasUsadas: 0, primeira: 0 }; }
  function novoEstado() {
    const comp = config.modo === "competitivo";
    const equipes = comp
      ? Array.from({ length: config.qtd }, (_, i) => novaEquipe((config.nomes[i] || "").trim() || EQUIPES_BASE[i].nome, EQUIPES_BASE[i].cor))
      : [novaEquipe("Grupo", COR_GRUPO)];
    const ordem = {};
    [TREINO].concat(ETAPAS).forEach((et) => { ordem[et.id] = embaralhar(et.defeitos.map((d) => d.conceito).concat(et.distratores)); });
    return { modo: config.modo, equipes, vez: 0, etapa: -1, ordem, resolvidos: {}, descartadas: {}, errosDef: {}, errosEtapa: {}, dicaNaVez: false, inicio: Date.now(), duracao: 0 };
  }
  const etapaAtual = () => (E.etapa < 0 ? TREINO : ETAPAS[E.etapa]);
  function resolv(et) { et = et || etapaAtual(); if (!E.resolvidos[et.id]) E.resolvidos[et.id] = {}; return E.resolvidos[et.id]; }
  function descart(et) { et = et || etapaAtual(); if (!E.descartadas[et.id]) E.descartadas[et.id] = []; return E.descartadas[et.id]; }
  function salvarHistorico() { historico.push(clonar(E)); if (historico.length > 300) historico.shift(); }
  function cartaIndisponivel(id) {
    const usados = Object.keys(resolv()).map((k) => resolv()[k].c);
    return usados.indexOf(id) >= 0 || descart().indexOf(id) >= 0;
  }
  function etapaCompleta() { const r = resolv(); return etapaAtual().defeitos.every((d) => r[d.id]); }

  function comecar(comTutorial) {
    E = novoEstado(); historico = [];
    mostrarTela("tela-jogo");
    if (comTutorial) { E.etapa = -1; montarEtapa(); iniciarTutorial(); }
    else { E.etapa = 0; montarEtapa(); abrirIntro(); }
  }

  /* =========================================================
     MONTAGEM DA ETAPA
     ========================================================= */
  function montarEtapa() {
    const et = etapaAtual();
    const raiz = document.documentElement.style;
    raiz.setProperty("--etapa", et.cor);
    raiz.setProperty("--etapa-suave", hexRgba(et.cor, 0.26));
    $("#etapa-rotulo").textContent = E.etapa < 0 ? "Treino" : `Etapa ${et.numero} de ${ETAPAS.length}`;
    $("#etapa-titulo").textContent = et.titulo;
    $("#etapa-produto").textContent = et.produto;

    ui.telaDef = TELAS[et.tela];
    const interno = $("#palco-interno");
    interno.innerHTML = ui.telaDef.html;
    ui.tela = interno.querySelector(".tela");
    et.defeitos.forEach((d, i) => {
      const zonas = $$(`[data-zona="${d.id}"]`, ui.tela);
      zonas.forEach((z) => { z.dataset.def = d.id; });
      const p = document.createElement("button");
      p.type = "button"; p.className = "pino"; p.dataset.def = d.id; p.textContent = String(i + 1);
      p.title = `Defeito ${i + 1}`; p.setAttribute("aria-label", `Defeito ${i + 1}: ${d.sintoma}`);
      if (zonas[0].dataset.pino) zonas[0].dataset.pino.split(" ").forEach((c) => p.classList.add(c));
      zonas[0].appendChild(p);
    });
    ui.selecionada = null; ui.foco = null; document.body.classList.remove("com-carta");
    sincronizarTela();
    renderCartas(); renderTopo(); renderPainel(); mostrarObservacao(null);

    const lab = $("#laboratorio"); lab.innerHTML = ""; ui.lab = null;
    if (LABS[et.lab]) ui.lab = LABS[et.lab](lab, ui.tela) || null;
    encaixar();
  }

  function sincronizarTela() {
    if (!ui.tela) return;
    const et = etapaAtual(), r = resolv(et);
    et.defeitos.forEach((d, i) => {
      const ok = !!r[d.id];
      $$(`[data-zona="${d.id}"]`, ui.tela).forEach((z) => z.classList.toggle("ok", ok));
      const p = ui.tela.querySelector(`.pino[data-def="${d.id}"]`);
      if (!p) return;
      p.classList.toggle("resolvido", ok);
      p.classList.toggle("foco", ui.foco === d.id && !ok);
      p.textContent = ok ? "✓" : String(i + 1);
      let s = null;
      Array.prototype.forEach.call(p.parentElement.children, (c) => { if (c.classList.contains("selo")) s = c; });
      if (ok && !s) { s = document.createElement("span"); s.className = "selo " + (p.parentElement.dataset.pino || ""); s.textContent = CONCEITOS[r[d.id].c].nome; p.parentElement.appendChild(s); }
      if (!ok && s) s.remove();
    });
    ui.tela.classList.toggle("nav-ok", !!ui.tela.querySelector(".ap-menu.ok"));
  }

  function encaixar() {
    if (!ui.tela || !ui.telaDef) return;
    const palco = $("#palco");
    const W = ui.telaDef.largura, H = ui.telaDef.altura;
    const s = Math.max(0.2, Math.min((palco.clientWidth - 28) / W, (palco.clientHeight - 28) / H, 1.7));
    ui.tela.style.transform = `scale(${s})`;
    const int = $("#palco-interno"); int.style.width = W * s + "px"; int.style.height = H * s + "px";
    if (ui.lab && ui.lab.redimensionar) ui.lab.redimensionar();
    if (ui.tut) posicionarTutorial();
  }

  /* =========================================================
     TOPO, PAINEL, CARTAS E OBSERVAÇÃO
     ========================================================= */
  function chipsEquipes(destacar) {
    if (E.modo === "competitivo") {
      return E.equipes.map((eq, i) => `<div class="chip-eq ${i === E.vez && E.etapa >= 0 ? "vez" : ""} ${destacar === i ? "sobe" : ""}" style="--cor-eq:${eq.cor};--cor-eq-suave:${hexRgba(eq.cor, 0.2)}">
        <i style="background:${eq.cor}"></i><b>${esc(eq.nome)}</b><strong>${eq.pontos}</strong>${config.dicas === "limitado" ? `<small>💡${eq.dicas}</small>` : ""}</div>`).join("");
    }
    const g = E.equipes[0];
    const feitos = ETAPAS.reduce((s, e) => s + Object.keys(E.resolvidos[e.id] || {}).length, 0);
    return `<div class="chip-eq vez ${destacar === 0 ? "sobe" : ""}" style="--cor-eq:${COR_GRUPO};--cor-eq-suave:${hexRgba(COR_GRUPO, 0.18)}"><i style="background:${COR_GRUPO}"></i><b>Pontos do grupo</b><strong>${g.pontos}</strong><small>✓ ${feitos}/${TOTAL_DEFEITOS}</small>${config.dicas === "limitado" ? `<small>💡${g.dicas}</small>` : ""}</div>`;
  }
  function renderTopo(destacar) {
    $("#trilha").innerHTML = ETAPAS.map((et, i) => {
      const cls = i < E.etapa ? "feita" : i === E.etapa ? "atual" : "";
      return `<span class="${cls}" style="--c:${et.cor};--c-suave:${hexRgba(et.cor, 0.3)}" title="${esc(et.titulo)}">${i < E.etapa ? "✓" : i + 1}</span>`;
    }).join("");
    $("#placar").innerHTML = chipsEquipes(destacar);
  }
  function renderPainel() {
    const f = $("#faixa-vez"), eq = E.equipes[E.vez];
    f.style.background = ""; f.style.color = "";
    if (E.etapa < 0) { f.className = "faixa-vez colab"; f.innerHTML = "🎓 Treino: siga o passo a passo"; }
    else if (E.modo === "competitivo") {
      f.className = "faixa-vez"; f.style.background = eq.cor; f.style.color = "#0d1a2b";
      f.innerHTML = `<span>🎮 Vez de ${esc(eq.nome)}</span>${config.tempo ? `<span class="relogio" id="relogio">⏱ ${fmtTempo(ui.restante)}</span>` : ""}`;
      atualizarRelogio();
    } else { f.className = "faixa-vez colab"; f.innerHTML = "🤝 Colaborativo: todos podem sugerir a jogada"; }
    const b = $("#btn-dica"), s = $("#dicas-restantes");
    if (config.dicas === "limitado") { s.textContent = eq.dicas; b.disabled = E.etapa >= 0 && eq.dicas <= 0; }
    else { s.textContent = "∞"; b.disabled = false; }
    $("#btn-voltar").disabled = !historico.length || !!ui.tut;
  }
  function renderCartas() {
    const et = etapaAtual(), r = resolv(et), d = descart(et);
    const usados = Object.keys(r).map((k) => r[k].c);
    $("#painel-cartas").innerHTML = E.ordem[et.id].map((id) => {
      const c = CONCEITOS[id], cls = ["carta"];
      if (usados.indexOf(id) >= 0) cls.push("usada");
      else if (d.indexOf(id) >= 0) cls.push("descartada");
      if (ui.selecionada === id) cls.push("selecionada");
      return `<button type="button" class="${cls.join(" ")}" data-c="${id}" aria-pressed="${ui.selecionada === id}"><span class="c-ic">${c.icone}</span><span class="c-nome">${c.nome}</span></button>`;
    }).join("");
  }
  function mostrarObservacao(defId) {
    const o = $("#observacao"), et = etapaAtual();
    if (ui.selecionada) {
      const c = CONCEITOS[ui.selecionada];
      let extra = "";
      if (defId && !resolv(et)[defId]) { const d = et.defeitos.find((x) => x.id === defId); extra = `<br><small>Defeito ${et.defeitos.indexOf(d) + 1}: ${d.sintoma}</small>`; }
      o.className = "observacao"; o.innerHTML = `<b>🃏 Carta escolhida:</b> ${c.nome}. Agora clique no número do defeito que ela conserta.${extra}`;
      return;
    }
    if (!defId) { o.className = "observacao"; o.innerHTML = "🔍 Clique em um <b>número</b> na tela para ler a descrição do defeito."; return; }
    const d = et.defeitos.find((x) => x.id === defId), n = et.defeitos.indexOf(d) + 1, r = resolv(et)[defId];
    if (r) { o.className = "observacao resolvida"; o.innerHTML = `<b>✓ Defeito ${n} consertado</b> com a carta “${CONCEITOS[r.c].nome}”.`; }
    else { o.className = "observacao"; o.innerHTML = `<b>🔍 Defeito ${n}:</b> ${d.sintoma}`; }
  }

  /* =========================================================
     INTERAÇÃO: cartas (clique ou arraste) e palco
     ========================================================= */
  function ligarInteracoes() {
    const area = $("#painel-cartas"), fant = $("#carta-fantasma");
    area.addEventListener("pointerdown", (ev) => {
      const c = ev.target.closest(".carta");
      if (!c || ev.button > 0 || ui.modalAberto || ui.bloqueio) return;
      if (c.classList.contains("usada") || c.classList.contains("descartada")) return;
      ui.arraste = { id: c.dataset.c, el: c, x: ev.clientX, y: ev.clientY, ativo: false };
      try { c.setPointerCapture(ev.pointerId); } catch (e) { /* sem captura */ }
    });
    area.addEventListener("pointermove", (ev) => {
      const a = ui.arraste; if (!a) return;
      if (!a.ativo && Math.hypot(ev.clientX - a.x, ev.clientY - a.y) > 9) {
        if (bloqueadoTutorial("carta", a.id)) { ui.arraste = null; avisoTutorial(); return; }
        a.ativo = true; a.el.classList.add("arrastando"); document.body.classList.add("arrastando");
        const c = CONCEITOS[a.id]; fant.innerHTML = `<span>${c.icone}</span><span>${c.nome}</span>`; fant.classList.add("ativa");
      }
      if (a.ativo) { fant.style.left = ev.clientX + "px"; fant.style.top = ev.clientY + "px"; destacarAlvo(defeitoNoPonto(ev.clientX, ev.clientY)); }
    });
    const terminar = (ev, cancelado) => {
      const a = ui.arraste; if (!a) return; ui.arraste = null;
      if (a.ativo) {
        a.el.classList.remove("arrastando"); document.body.classList.remove("arrastando"); fant.classList.remove("ativa");
        const def = cancelado ? null : defeitoNoPonto(ev.clientX, ev.clientY); destacarAlvo(null);
        if (def) tentar(a.id, def);
      } else if (!cancelado) clicarCarta(a.id);
    };
    area.addEventListener("pointerup", (ev) => terminar(ev, false));
    area.addEventListener("pointercancel", (ev) => terminar(ev, true));
    area.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      const c = ev.target.closest(".carta"); if (!c) return;
      ev.preventDefault(); if (!c.classList.contains("usada") && !c.classList.contains("descartada")) clicarCarta(c.dataset.c);
    });

    $("#palco").addEventListener("click", (ev) => {
      if (!ui.tela || ui.modalAberto || ui.bloqueio) return;
      const pino = ev.target.closest(".pino");
      const def = pino ? pino.dataset.def : defeitoDoElemento(ev.target);
      if (!def) return;
      if (ui.selecionada) { tentar(ui.selecionada, def); return; }
      if (bloqueadoTutorial("pino")) { avisoTutorial(); return; }
      ui.foco = def; sincronizarTela(); mostrarObservacao(def); som("clique");
      tutorialAcao("pino");
    });
    $("#palco").addEventListener("mousemove", (ev) => {
      if (!ui.selecionada || !ui.tela) return;
      const p = ev.target.closest(".pino");
      destacarAlvo(p ? p.dataset.def : defeitoDoElemento(ev.target));
    });
    $("#palco").addEventListener("mouseleave", () => destacarAlvo(null));

    $("#btn-dica").addEventListener("click", pedirDica);
    $("#btn-voltar").addEventListener("click", voltar);
    $("#btn-som").addEventListener("click", () => { ui.som = !ui.som; $("#btn-som").textContent = ui.som ? "🔊" : "🔇"; iniciarAudio(); som("clique"); });
    $("#btn-tela-cheia").addEventListener("click", () => {
      try { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); } catch (e) { toast("Tela cheia indisponível neste navegador."); }
    });
    $("#btn-inicio").addEventListener("click", () => {
      if (ui.modalAberto) return;
      pausarTimer();
      abrirModal({
        classe: "", html: `<div class="ic-grande">🏠</div><h3>Voltar ao início?</h3><p>A partida atual será encerrada e o progresso será perdido.</p>`,
        botoes: [
          { rotulo: "Continuar jogando", acao: () => { fecharModal(); retomarTimer(); } },
          { rotulo: "Sim, voltar ao início", primario: true, acao: () => { fecharModal(); sairParaPreparo(); } }
        ]
      });
    });

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && ui.selecionada && !ui.modalAberto) { ui.selecionada = null; document.body.classList.remove("com-carta"); renderCartas(); mostrarObservacao(ui.foco); destacarAlvo(null); }
    });
    window.addEventListener("resize", encaixar);
    if (window.ResizeObserver) new ResizeObserver(encaixar).observe($("#palco"));
  }

  function defeitoDoElemento(el) {
    if (!el || !el.closest || !ui.tela) return null;
    const r = resolv();
    let z = el.closest("[data-zona]"), primeiro = null;
    while (z && ui.tela.contains(z)) {
      const id = z.dataset.def;
      if (id) { if (!primeiro) primeiro = id; if (!r[id]) return id; }
      z = z.parentElement ? z.parentElement.closest("[data-zona]") : null;
    }
    return primeiro;
  }
  function defeitoNoPonto(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el || !ui.tela || !ui.tela.contains(el)) return null;
    const p = el.closest(".pino");
    return p ? p.dataset.def : defeitoDoElemento(el);
  }
  function destacarAlvo(def) {
    if (!ui.tela) return;
    $$("[data-zona].alvo", ui.tela).forEach((z) => z.classList.remove("alvo"));
    if (def && !resolv()[def]) $$(`[data-zona="${def}"]`, ui.tela).forEach((z) => z.classList.add("alvo"));
  }
  function clicarCarta(id) {
    if (ui.modalAberto || ui.bloqueio) return;
    if (bloqueadoTutorial("carta", id)) { avisoTutorial(); return; }
    if (cartaIndisponivel(id)) return;
    ui.selecionada = ui.selecionada === id ? null : id;
    document.body.classList.toggle("com-carta", !!ui.selecionada);
    if (!ui.selecionada) destacarAlvo(null);
    som("clique"); renderCartas(); mostrarObservacao(ui.foco);
    if (ui.selecionada) tutorialAcao("carta");
  }
  function tremerCarta(id) {
    const c = $(`.carta[data-c="${id}"]`); if (!c) return;
    c.classList.remove("treme"); void c.offsetWidth; c.classList.add("treme");
  }
  function animarZona(def, classe) {
    $$(`[data-zona="${def}"]`, ui.tela).forEach((z) => { z.classList.remove(classe); void z.offsetWidth; z.classList.add(classe); });
  }

  /* =========================================================
     JOGADAS
     ========================================================= */
  function tentar(cardId, defId) {
    if (ui.modalAberto || ui.bloqueio) return;
    if (bloqueadoTutorial("tentar", cardId)) { avisoTutorial(); return; }
    const et = etapaAtual(), r = resolv(et);
    if (cartaIndisponivel(cardId)) return;
    if (r[defId]) { toast("Esse defeito já foi consertado."); return; }
    const d = et.defeitos.find((x) => x.id === defId);
    if (!d) return;
    const num = et.defeitos.indexOf(d) + 1;
    const tut = !!ui.tut;
    if (!tut) salvarHistorico();
    const eq = E.equipes[E.vez];
    ui.selecionada = null; document.body.classList.remove("com-carta"); destacarAlvo(null);
    pausarTimer();
    const chave = et.id + ":" + defId;

    if (d.conceito === cardId) {
      const errosAntes = E.errosDef[chave] || 0;
      const comAjuda = E.dicaNaVez || (E.modo === "colaborativo" && errosAntes > 0);
      const pts = comAjuda ? PONTOS_COM_AJUDA : PONTOS_ACERTO;
      r[defId] = { c: cardId, eq: E.vez };
      if (!tut) { eq.pontos += pts; eq.acertos++; if (errosAntes === 0 && !E.dicaNaVez) eq.primeira++; }
      E.dicaNaVez = false; ui.foco = null;
      sincronizarTela(); animarZona(defId, "conserto");
      const seloNovo = ui.tela.querySelector(`.pino[data-def="${defId}"] + .selo`);
      if (seloNovo) { seloNovo.classList.add("recente"); setTimeout(() => seloNovo.classList.remove("recente"), 4200); }
      renderCartas(); renderTopo(tut ? undefined : E.vez); renderPainel(); mostrarObservacao(defId);
      if (ui.lab && ui.lab.atualizar) ui.lab.atualizar();
      som("acerto");
      if (tut) { $("#tut-balao").classList.remove("ativo"); $("#tut-furo").classList.remove("ativo"); }
      ui.bloqueio = true;
      setTimeout(() => { ui.bloqueio = false; abrirFlashcard(d, num, pts, eq, tut); }, 900);
    } else {
      E.errosDef[chave] = (E.errosDef[chave] || 0) + 1;
      E.errosEtapa[et.id] = (E.errosEtapa[et.id] || 0) + 1;
      eq.erros++;
      som("erro"); renderCartas(); tremerCarta(cardId); renderTopo(); renderPainel(); mostrarObservacao(ui.foco);
      abrirErro(cardId, d, num);
    }
  }

  function abrirFlashcard(d, num, pts, eq, tut) {
    const c = CONCEITOS[d.conceito];
    const tag = tut ? `Defeito ${num} consertado`
      : E.modo === "competitivo" ? `+${pts} pontos para ${esc(eq.nome)}`
      : `Defeito ${num} consertado · +${pts} pontos`;
    abrirModal({
      classe: "flash",
      html: `<div class="ic-grande">${c.icone}</div><span class="flash-tag">${tag}</span><h3>${c.nome}</h3>
        <p class="flash-def">${c.definicao}</p>
        <div class="antes-depois"><div class="ad antes"><b>Antes</b>${d.antes}</div><div class="seta">➜</div><div class="ad depois"><b>Depois</b>${d.depois}</div></div>`,
      botoes: [{ rotulo: "Continuar ▶", primario: true, acao: () => { fecharModal(); depoisDoAcerto(tut); } }]
    });
  }
  function depoisDoAcerto(tut) {
    if (tut) {
      const idx = ui.tut.passos.findIndex((p) => p.acao === "conectar");
      ui.tut.i = Math.max(ui.tut.i, idx) + 1;
      mostrarPassoTutorial();
      return;
    }
    if (etapaCompleta()) { concluirEtapa(); return; }
    if (E.modo === "competitivo") proximaVez(); else retomarTimer();
  }
  function abrirErro(cardId, d, num) {
    const c = CONCEITOS[cardId], comp = E.modo === "competitivo";
    const prox = comp ? E.equipes[(E.vez + 1) % E.equipes.length] : null;
    abrirModal({
      classe: "erro",
      html: `<div class="ic-grande">✋</div><h3>Essa carta não conserta este defeito</h3>
        <p>A carta <b>“${c.nome}”</b> serve para ${c.resumo}.</p>
        <p>O defeito ${num} mostra outro problema: <i>${d.sintoma}</i></p>
        ${comp ? `<p class="passa">A vez passa para <span style="color:${prox.cor}">${esc(prox.nome)}</span>.</p>` : `<p class="passa">Observem a tela de novo e tentem outra carta.</p>`}`,
      botoes: [{ rotulo: "OK", primario: true, acao: () => { fecharModal(); if (comp) proximaVez(); else retomarTimer(); } }]
    });
  }

  function proximaVez() {
    if (E.modo !== "competitivo") { renderPainel(); return; }
    E.vez = (E.vez + 1) % E.equipes.length; E.dicaNaVez = false;
    renderTopo(); renderPainel(); anunciarVez(); reiniciarTimer();
  }
  let avisoT = null;
  function anunciarVez() {
    if (E.modo !== "competitivo" || E.etapa < 0) return;
    const eq = E.equipes[E.vez], a = $("#aviso-vez");
    a.style.background = eq.cor; a.innerHTML = `<small>Agora é a vez de</small>${esc(eq.nome)}`;
    a.classList.add("mostrar"); som("vez");
    clearTimeout(avisoT); avisoT = setTimeout(() => a.classList.remove("mostrar"), 1500);
  }

  /* ---------- dica ---------- */
  function pedirDica() {
    if (ui.tut) { avisoTutorial(); return; }
    if (ui.modalAberto || ui.bloqueio) return;
    const et = etapaAtual(), r = resolv(et), eq = E.equipes[E.vez];
    if (config.dicas === "limitado" && eq.dicas <= 0) { toast("Não há mais dicas disponíveis."); return; }
    const alvo = (ui.foco && !r[ui.foco]) ? et.defeitos.find((d) => d.id === ui.foco) : et.defeitos.find((d) => !r[d.id]);
    if (!alvo) return;
    salvarHistorico();
    if (config.dicas === "limitado") eq.dicas--;
    eq.dicasUsadas++; E.dicaNaVez = true;
    const ds = descart(et);
    const candidatas = et.distratores.filter((id) => ds.indexOf(id) < 0);
    let descartou = null;
    if (candidatas.length) { descartou = candidatas[Math.floor(Math.random() * candidatas.length)]; ds.push(descartou); if (ui.selecionada === descartou) ui.selecionada = null; }
    ui.foco = alvo.id;
    sincronizarTela(); renderCartas(); renderTopo(); renderPainel();
    const num = et.defeitos.indexOf(alvo) + 1, o = $("#observacao");
    o.className = "observacao dica";
    o.innerHTML = `<b>💡 Dica para o defeito ${num}:</b> ${alvo.dica}${descartou ? `<br><small>A carta “${CONCEITOS[descartou].nome}” foi descartada: ela não conserta nada nesta tela.</small>` : ""}`;
    animarZona(alvo.id, "pista");
    som("dica");
  }

  /* ---------- voltar jogada ---------- */
  function voltar() {
    if (ui.tut) { avisoTutorial(); return; }
    if (ui.modalAberto || ui.bloqueio) return;
    if (!historico.length) { toast("Não há jogada para desfazer."); return; }
    E = historico.pop();
    montarEtapa(); reiniciarTimer(); toast("Última jogada desfeita."); som("clique");
  }

  /* ---------- cronômetro (só no competitivo) ---------- */
  function pararTimer() { clearInterval(ui.timer); ui.timer = null; }
  function pausarTimer() { ui.pausado = true; }
  function retomarTimer() { ui.pausado = false; }
  function reiniciarTimer() {
    pararTimer(); ui.pausado = false;
    if (E.modo !== "competitivo" || !config.tempo || E.etapa < 0) { renderPainel(); return; }
    ui.restante = config.tempo; renderPainel();
    ui.timer = setInterval(() => {
      if (ui.pausado || ui.modalAberto || ui.bloqueio) return;
      ui.restante--; atualizarRelogio();
      if (ui.restante > 0 && ui.restante <= 5) som("tique");
      if (ui.restante <= 0) { pararTimer(); tempoEsgotado(); }
    }, 1000);
  }
  function atualizarRelogio() {
    const r = $("#relogio"); if (!r) return;
    r.textContent = "⏱ " + fmtTempo(ui.restante);
    r.classList.toggle("alerta", ui.restante <= 10);
  }
  function tempoEsgotado() {
    salvarHistorico();
    ui.selecionada = null; document.body.classList.remove("com-carta"); renderCartas();
    const prox = E.equipes[(E.vez + 1) % E.equipes.length];
    som("erro");
    abrirModal({
      classe: "erro",
      html: `<div class="ic-grande">⏰</div><h3>Tempo esgotado!</h3><p>${esc(E.equipes[E.vez].nome)} não fez a jogada a tempo.</p><p class="passa">A vez passa para <span style="color:${prox.cor}">${esc(prox.nome)}</span>.</p>`,
      botoes: [{ rotulo: "OK", primario: true, acao: () => { fecharModal(); proximaVez(); } }]
    });
  }

  /* =========================================================
     ETAPAS: introdução e conclusão
     ========================================================= */
  function abrirIntro() {
    const et = etapaAtual(), comp = E.modo === "competitivo", eq = E.equipes[E.vez];
    abrirModal({
      classe: "intro",
      html: `<span class="intro-num">Etapa ${et.numero} de ${ETAPAS.length}</span><h3>${et.titulo}</h3>
        <p>Tela para consertar: <b>${et.produto}</b></p><p>${et.descricao}</p>
        <div class="intro-dados"><span>🔧 ${et.defeitos.length} defeitos</span><span>🃏 ${et.defeitos.length + et.distratores.length} cartas</span><span>🔬 Laboratório com ferramenta</span></div>
        ${comp ? `<p class="passa" style="margin-top:1rem">Começa: <b style="color:${eq.cor}">${esc(eq.nome)}</b></p>` : ""}`,
      botoes: [{ rotulo: "Começar etapa ▶", primario: true, acao: () => { fecharModal(); reiniciarTimer(); anunciarVez(); } }]
    });
  }

  function concluirEtapa() {
    pararTimer();
    const et = etapaAtual(), erros = E.errosEtapa[et.id] || 0;
    const estrelas = erros === 0 ? 3 : erros <= 2 ? 2 : 1;
    const ultima = E.etapa >= ETAPAS.length - 1;
    const sobras = et.distratores.map((id) => `<p><b>${CONCEITOS[id].icone} ${CONCEITOS[id].nome}:</b> serve para ${CONCEITOS[id].resumo}. Por isso não consertava nenhum defeito desta tela.</p>`).join("");
    const desempenho = E.modo === "competitivo"
      ? `<div class="placar-parcial">${chipsEquipes()}</div>`
      : `<div class="estrelas">${"★".repeat(estrelas)}<span class="apagada">${"★".repeat(3 - estrelas)}</span></div><p>${erros === 0 ? "Nenhum erro nesta etapa!" : erros === 1 ? "1 erro nesta etapa." : erros + " erros nesta etapa."}</p>`;
    E.estrelas = E.estrelas || {}; E.estrelas[et.id] = estrelas;
    som("fim");
    const m = abrirModal({
      classe: "intro largo",
      html: `<div class="ic-grande">🎉</div><span class="intro-num">Etapa ${et.numero} concluída</span><h3>${et.produto}: tela consertada!</h3>
        ${desempenho}
        <div class="lista-sobra"><h4>Cartas que sobraram</h4>${sobras}</div>`,
      botoes: [
        { rotulo: "👀 Segure para ver o antes", classe: "btn-comparar" },
        { rotulo: ultima ? "Ver resultado final 🏁" : "Próxima etapa ▶", primario: true, acao: avancarEtapa }
      ]
    });
    const cam = $("#camada-modal");
    ligarSegurar(m.querySelector(".btn-comparar"), ui.tela, () => { cam.style.opacity = "0"; }, () => { cam.style.opacity = ""; sincronizarTela(); });
  }
  function avancarEtapa() {
    fecharModal();
    if (E.etapa >= ETAPAS.length - 1) { fimDeJogo(); return; }
    E.etapa++;
    if (E.modo === "competitivo") { E.vez = (E.vez + 1) % E.equipes.length; E.dicaNaVez = false; }
    montarEtapa(); abrirIntro();
  }

  /* ---------- comparar antes e depois ---------- */
  function mostrarAntes(tela, on) {
    $$("[data-zona]", tela).forEach((z) => {
      if (on) { if (z.classList.contains("ok")) { z.dataset.eraOk = "1"; z.classList.remove("ok"); } }
      else if (z.dataset.eraOk) { z.classList.add("ok"); delete z.dataset.eraOk; }
    });
    tela.classList.toggle("nav-ok", !on && !!tela.querySelector(".ap-menu.ok"));
  }
  function ligarSegurar(btn, tela, aoIniciar, aoTerminar) {
    if (!btn) return;
    let ativo = false;
    const ini = (e) => { if (e) e.preventDefault(); if (ativo) return; ativo = true; mostrarAntes(tela, true); btn.classList.add("on"); if (aoIniciar) aoIniciar(); };
    const fim = () => { if (!ativo) return; ativo = false; mostrarAntes(tela, false); btn.classList.remove("on"); if (aoTerminar) aoTerminar(); };
    btn.addEventListener("pointerdown", ini);
    ["pointerup", "pointerleave", "pointercancel", "blur"].forEach((t) => btn.addEventListener(t, fim));
    btn.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") ini(e); });
    btn.addEventListener("keyup", fim);
  }

  /* =========================================================
     TUTORIAL GUIADO (obriga o jogador a fazer a ação)
     ========================================================= */
  function iniciarTutorial() {
    ui.tut = { passos: TUTORIAL.filter((p) => !p.so || p.so === E.modo), i: 0 };
    mostrarPassoTutorial();
    const seguir = () => { if (!ui.tut) return; posicionarTutorial(); requestAnimationFrame(seguir); };
    requestAnimationFrame(seguir);
  }
  function mostrarPassoTutorial() {
    if (!ui.tut) return;
    const p = ui.tut.passos[ui.tut.i], b = $("#tut-balao"), total = ui.tut.passos.length;
    const acaoHtml = p.acao ? `<span class="tut-espera">👉 Faça a ação destacada</span>` : `<button type="button" class="tut-prox">${p.fim ? "Começar a etapa 1 ▶" : "Próximo ▶"}</button>`;
    b.innerHTML = `<div class="tut-passo">Tutorial · passo ${ui.tut.i + 1} de ${total}</div><h4>${p.titulo}</h4><p>${p.texto}</p>
      <div class="tut-acoes"><button type="button" class="tut-pular">Pular tutorial</button>${acaoHtml}</div>`;
    b.classList.add("ativo"); $("#tut-furo").classList.add("ativo");
    const prox = b.querySelector(".tut-prox");
    if (prox) { prox.addEventListener("click", () => { som("clique"); if (p.fim) encerrarTutorial(); else { ui.tut.i++; mostrarPassoTutorial(); } }); setTimeout(() => prox.focus(), 50); }
    b.querySelector(".tut-pular").addEventListener("click", encerrarTutorial);
    posicionarTutorial();
  }
  function tutorialAcao(tipo) {
    if (!ui.tut) return;
    const p = ui.tut.passos[ui.tut.i];
    if (p.acao === tipo) { ui.tut.i++; mostrarPassoTutorial(); }
  }
  function bloqueadoTutorial(acao, id) {
    if (!ui.tut) return false;
    const p = ui.tut.passos[ui.tut.i];
    if (ui.modalAberto) return true;
    if (acao === "pino") return p.acao !== "pino";
    if (acao === "carta" || acao === "tentar") return !((p.acao === "carta" || p.acao === "conectar") && id === "monoespacada");
    return true;
  }
  function avisoTutorial() {
    const b = $("#tut-balao"); b.classList.remove("treme"); void b.offsetWidth; b.classList.add("treme");
    toast("Siga o passo destacado do tutorial.");
  }
  function posicionarTutorial() {
    if (!ui.tut) return;
    const p = ui.tut.passos[ui.tut.i], alvo = $(p.alvo), f = $("#tut-furo"), b = $("#tut-balao");
    if (!b.classList.contains("ativo")) return;
    const bw = b.offsetWidth, bh = b.offsetHeight, W = window.innerWidth, H = window.innerHeight, m = 16;
    if (!alvo) { f.style.width = "0px"; f.style.height = "0px"; b.style.left = (W - bw) / 2 + "px"; b.style.top = (H - bh) / 2 + "px"; return; }
    const r = alvo.getBoundingClientRect(), pad = 6;
    f.style.left = r.left - pad + "px"; f.style.top = r.top - pad + "px";
    f.style.width = r.width + pad * 2 + "px"; f.style.height = r.height + pad * 2 + "px";
    let x, y;
    if (r.height < H * 0.35 && r.bottom + m + bh < H) { x = r.left + r.width / 2 - bw / 2; y = r.bottom + m; }
    else if (r.right + m + bw < W) { x = r.right + m; y = r.top; }
    else if (r.left - m - bw > 0) { x = r.left - m - bw; y = r.top; }
    else if (r.bottom + m + bh < H) { x = r.left; y = r.bottom + m; }
    else if (r.top - m - bh > 0) { x = r.left; y = r.top - m - bh; }
    else { x = r.left + r.width / 2 - bw / 2; y = r.bottom - bh - m; }
    x = Math.max(m, Math.min(W - bw - m, x)); y = Math.max(m, Math.min(H - bh - m, y));
    b.style.left = x + "px"; b.style.top = y + "px";
  }
  function encerrarTutorial() {
    ui.tut = null;
    $("#tut-balao").classList.remove("ativo"); $("#tut-furo").classList.remove("ativo");
    if (ui.modalAberto) fecharModal();
    E = novoEstado(); historico = []; E.etapa = 0; E.inicio = Date.now();
    montarEtapa(); abrirIntro();
  }

  /* =========================================================
     FIM DE JOGO
     ========================================================= */
  function fimDeJogo() {
    pararTimer();
    E.duracao = Date.now() - E.inicio;
    mostrarTela("tela-final"); renderFinal(); som("fim");
  }
  function renderFinal() {
    const comp = E.modo === "competitivo";
    let topo = "";
    if (comp) {
      const ord = E.equipes.slice().sort((a, b) => b.pontos - a.pontos || b.primeira - a.primeira || a.erros - b.erros);
      const empate = ord.length > 1 && ord[0].pontos === ord[1].pontos && ord[0].primeira === ord[1].primeira && ord[0].erros === ord[1].erros;
      const lugares = [ord[1], ord[0], ord[2]].filter(Boolean);
      const alturas = { 0: "11rem", 1: "8rem", 2: "6rem" };
      topo = `<div class="final-cab"><h1>🏆 ${empate ? "Empate no topo!" : esc(ord[0].nome) + " venceu!"}</h1><p>Todas as 6 telas foram consertadas. Confira o placar final.</p></div>
        <div class="podio">${lugares.map((eq) => { const pos = ord.indexOf(eq); return `<div class="degrau"><b>${esc(eq.nome)}</b><strong>${eq.pontos} pts</strong><div class="bloco-pod" style="background:${eq.cor};height:${alturas[pos]}">${pos + 1}º</div></div>`; }).join("")}</div>
        <table class="tabela-final"><thead><tr><th>Equipe</th><th>Pontos</th><th>Acertos</th><th>De primeira</th><th>Erros</th><th>Dicas usadas</th></tr></thead>
        <tbody>${ord.map((eq) => `<tr><td><span style="color:${eq.cor}">●</span> ${esc(eq.nome)}</td><td><b>${eq.pontos}</b></td><td>${eq.acertos}</td><td>${eq.primeira}</td><td>${eq.erros}</td><td>${eq.dicasUsadas}</td></tr>`).join("")}</tbody></table>`;
    } else {
      const g = E.equipes[0];
      const est = ETAPAS.reduce((s, e) => s + ((E.estrelas || {})[e.id] || 0), 0);
      topo = `<div class="final-cab"><h1>🏁 Oficina concluída!</h1><p>O grupo consertou as 6 telas e os ${TOTAL_DEFEITOS} defeitos.</p></div>
        <div class="resumo-colab">
          <div><strong>${g.pontos}</strong><small>pontos do grupo</small></div>
          <div><strong>${est}/18</strong><small>estrelas</small></div>
          <div><strong>${g.primeira}/${TOTAL_DEFEITOS}</strong><small>acertos de primeira</small></div>
          <div><strong>${fmtTempo(E.duracao / 1000)}</strong><small>tempo total</small></div>
        </div>`;
    }
    const galeria = ETAPAS.map((et, i) => `<div class="galeria-item"><header><span><i style="background:${et.cor}"></i>${i + 1}. ${et.titulo}</span><button type="button" class="btn-ico seg-antes" data-i="${i}">👀 Segure: antes</button></header><div class="galeria-mini" data-i="${i}"></div></div>`).join("");
    const conceitosEtapas = [];
    ETAPAS.forEach((et) => et.defeitos.forEach((d) => conceitosEtapas.push({ id: d.conceito, cor: et.cor })));
    const revisao = conceitosEtapas.map((c) => { const k = CONCEITOS[c.id]; return `<button type="button" class="flip" style="--c:${c.cor}"><div class="flip-in"><div class="flip-f"><span>${k.icone}</span><b>${k.nome}</b></div><div class="flip-v">${k.definicao}</div></div></button>`; }).join("");
    $("#tela-final").innerHTML = `<div class="final">${topo}
      <h2>Galeria: as telas consertadas</h2><p class="instrucao">Segure o botão de cada tela para ver como ela era antes do conserto.</p>
      <div class="galeria">${galeria}</div>
      <h2>Revisão dos conceitos</h2><p class="instrucao">Clique em uma carta para ver a definição.</p>
      <div class="rev-conceitos">${revisao}</div>
      <div class="final-acoes"><button type="button" class="btn-principal" id="btn-de-novo">🔁 Jogar de novo</button><button type="button" class="btn-sec" id="btn-preparo">⚙️ Mudar modo e equipes</button></div>
    </div>`;
    $$(".galeria-mini", $("#tela-final")).forEach((mini) => {
      const et = ETAPAS[+mini.dataset.i], def = TELAS[et.tela];
      const wrap = document.createElement("div"); wrap.style.position = "relative";
      wrap.innerHTML = def.html; mini.appendChild(wrap);
      const tela = wrap.querySelector(".tela");
      $$("[data-zona]", tela).forEach((z) => z.classList.add("ok"));
      tela.classList.toggle("nav-ok", true);
      const ajustar = () => { const s = Math.min((mini.clientWidth - 12) / def.largura, (mini.clientHeight - 12) / def.altura); tela.style.transform = `scale(${s})`; wrap.style.width = def.largura * s + "px"; wrap.style.height = def.altura * s + "px"; };
      ajustar(); window.addEventListener("resize", ajustar);
      ligarSegurar($(`.seg-antes[data-i="${mini.dataset.i}"]`), tela);
    });
    $$(".flip", $("#tela-final")).forEach((f) => f.addEventListener("click", () => f.classList.toggle("virada")));
    $("#btn-de-novo").addEventListener("click", () => { comecar(false); });
    $("#btn-preparo").addEventListener("click", sairParaPreparo);
    $("#tela-final").scrollTop = 0;
  }
  function sairParaPreparo() {
    pararTimer(); ui.tut = null;
    $("#tut-balao").classList.remove("ativo"); $("#tut-furo").classList.remove("ativo");
    mostrarTela("tela-preparo"); atualizarPreparo();
  }

  /* ---------- início ---------- */
  document.addEventListener("DOMContentLoaded", () => { iniciarPreparo(); ligarInteracoes(); });

  /* ganchos para testes automatizados */
  window.__oficina = { estado: () => E, config, ui, tentar: (c, d) => tentar(c, d) };
})();
