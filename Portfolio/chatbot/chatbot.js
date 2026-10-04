/* Widget chatbot — portfolio Hoda Kharbouche */
(function () {
    "use strict";
  
    var script = document.currentScript;
    var API = (
      (script && script.dataset.api) ||
      window.HODA_CHATBOT_API ||
      "http://localhost:8000"
    ).replace(/\/+$/, "");
  
    var history = [];
    var busy = false;
  
    var css = `
    .hk-fab{position:fixed;right:22px;bottom:22px;width:58px;height:58px;border-radius:50%;
      background:#1a1512;color:#f4f2ec;border:none;cursor:pointer;z-index:1100;
      box-shadow:0 6px 24px rgba(90,70,50,.3);display:flex;align-items:center;justify-content:center;
      transition:transform .2s ease,background .2s ease}
    .hk-fab:hover{background:#7a5c3a;transform:scale(1.06)}
    .hk-fab svg{width:26px;height:26px}
    .hk-panel{position:fixed;right:22px;bottom:94px;width:370px;max-width:calc(100vw - 32px);
      height:540px;max-height:calc(100vh - 120px);background:#faf9f5;border:1px solid rgba(120,100,70,.18);
      box-shadow:0 12px 44px rgba(90,70,50,.25);z-index:1100;display:none;flex-direction:column;
      font-family:'Karla',system-ui,sans-serif;color:#1a1512;overflow:hidden}
    .hk-panel.hk-open{display:flex;animation:hk-in .25s ease-out}
    @keyframes hk-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
    .hk-head{padding:14px 16px;background:#1a1512;color:#f4f2ec;display:flex;align-items:center;justify-content:space-between}
    .hk-title{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:1.1rem;line-height:1.2}
    .hk-sub{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;opacity:.6}
    .hk-close{background:none;border:none;color:inherit;font-size:1.4rem;cursor:pointer;line-height:1;padding:4px 8px}
    .hk-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f4f2ec}
    .hk-msg{max-width:86%;padding:10px 13px;font-size:.9rem;line-height:1.55;white-space:pre-wrap;word-wrap:break-word}
    .hk-bot{align-self:flex-start;background:#faf9f5;border:1px solid rgba(120,100,70,.16)}
    .hk-user{align-self:flex-end;background:#7a5c3a;color:#fff}
    .hk-err{align-self:flex-start;background:#fbeee9;border:1px solid #e3b9ac;color:#7a2e1b}
    .hk-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:#faf9f5;border:1px solid rgba(120,100,70,.16)}
    .hk-typing span{width:6px;height:6px;border-radius:50%;background:#a09080;animation:hk-b 1.2s infinite}
    .hk-typing span:nth-child(2){animation-delay:.15s}.hk-typing span:nth-child(3){animation-delay:.3s}
    @keyframes hk-b{0%,80%,100%{opacity:.25}40%{opacity:1}}
    .hk-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 10px;background:#f4f2ec}
    .hk-chip{font:inherit;font-size:.78rem;padding:5px 10px;background:transparent;color:#5a4e42;
      border:1px solid #a09080;cursor:pointer;transition:all .2s}
    .hk-chip:hover{border-color:#7a5c3a;color:#7a5c3a}
    .hk-form{display:flex;border-top:1px solid rgba(120,100,70,.18);background:#faf9f5}
    .hk-input{flex:1;border:none;outline:none;padding:14px;font:inherit;font-size:.9rem;background:transparent;color:inherit}
    .hk-send{border:none;background:#1a1512;color:#f4f2ec;padding:0 18px;cursor:pointer;font:inherit;
      font-size:.75rem;letter-spacing:.09em;text-transform:uppercase;font-weight:600}
    .hk-send:hover:not(:disabled){background:#7a5c3a}
    .hk-send:disabled{opacity:.5;cursor:not-allowed}
    @media(max-width:480px){.hk-panel{right:8px;left:8px;bottom:84px;width:auto;max-width:none;height:calc(100vh - 110px)}
      .hk-fab{right:14px;bottom:14px}}
    @media(prefers-reduced-motion:reduce){.hk-panel.hk-open,.hk-typing span{animation:none}}
    `;
  
    var styleEl = document.createElement("style");
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  
    function el(tag, cls, text) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text) n.textContent = text;
      return n;
    }
  
    // --- DOM ---
    var fab = el("button", "hk-fab");
    fab.setAttribute("aria-label", "Ouvrir l'assistant du portfolio");
    fab.setAttribute("aria-expanded", "false");
    fab.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
  
    var panel = el("section", "hk-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Assistant du portfolio de Hoda");
  
    var head = el("div", "hk-head");
    var titles = el("div");
    titles.appendChild(el("div", "hk-title", "Assistant de Hoda"));
    titles.appendChild(el("div", "hk-sub", "Portfolio · IA locale"));
    var closeBtn = el("button", "hk-close", "×");
    closeBtn.setAttribute("aria-label", "Fermer");
    head.appendChild(titles);
    head.appendChild(closeBtn);
  
    var msgs = el("div", "hk-msgs");
    msgs.setAttribute("aria-live", "polite");
  
    var chips = el("div", "hk-chips");
    [
      "Quel est ton parcours ?",
      "Quelles compétences maîtrises-tu ?",
      "Parle-moi du stage chez Enedis",
      "Quels projets en 3e année ?",
    ].forEach(function (q) {
      var b = el("button", "hk-chip", q);
      b.type = "button";
      b.addEventListener("click", function () {
        send(q);
      });
      chips.appendChild(b);
    });
  
    var form = el("form", "hk-form");
    var input = el("input", "hk-input");
    input.type = "text";
    input.maxLength = 500;
    input.placeholder = "Posez votre question…";
    input.setAttribute("aria-label", "Votre question");
    var sendBtn = el("button", "hk-send", "Envoyer");
    sendBtn.type = "submit";
    form.appendChild(input);
    form.appendChild(sendBtn);
  
    panel.appendChild(head);
    panel.appendChild(msgs);
    panel.appendChild(chips);
    panel.appendChild(form);
    document.body.appendChild(fab);
    document.body.appendChild(panel);
  
    // --- Logique ---
    function addMsg(text, cls) {
      var m = el("div", "hk-msg " + cls, text);
      msgs.appendChild(m);
      msgs.scrollTop = msgs.scrollHeight;
      return m;
    }
  
    function typing() {
      var t = el("div", "hk-typing");
      t.innerHTML = "<span></span><span></span><span></span>";
      msgs.appendChild(t);
      msgs.scrollTop = msgs.scrollHeight;
      return t;
    }
  
    function setOpen(open) {
      panel.classList.toggle("hk-open", open);
      fab.setAttribute("aria-expanded", String(open));
      if (open) {
        if (!msgs.children.length) {
          addMsg(
            "Bonjour ! Je suis l'assistant du portfolio de Hoda. Posez-moi vos questions sur son parcours, ses compétences ou ses projets.",
            "hk-bot"
          );
        }
        setTimeout(function () {
          input.focus();
        }, 50);
      }
    }
  
    function send(text) {
      text = (text || "").trim();
      if (!text || busy) return;
      busy = true;
      sendBtn.disabled = true;
      chips.style.display = "none";
      addMsg(text, "hk-user");
      input.value = "";
      var t = typing();
  
      var ctrl = new AbortController();
      var timer = setTimeout(function () {
        ctrl.abort();
      }, 120000);
  
      fetch(API + "/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1",
        },
        body: JSON.stringify({ message: text, history: history.slice(-6) }),
        signal: ctrl.signal,
      })
        .then(function (r) {
          if (r.status === 429) throw new Error("Trop de messages d'un coup, patientez une minute.");
          if (!r.ok) throw new Error("Le service est momentanément indisponible.");
          return r.json();
        })
        .then(function (data) {
          t.remove();
          addMsg(data.answer, "hk-bot");
          history.push({ role: "user", content: text });
          history.push({ role: "assistant", content: data.answer });
        })
        .catch(function (err) {
          t.remove();
          var msg =
            err.name === "AbortError"
              ? "La réponse prend trop de temps. Réessayez dans un instant."
              : err.message === "Failed to fetch"
              ? "L'assistant est hors ligne pour le moment (le serveur de Hoda n'est pas démarré)."
              : err.message;
          addMsg(msg, "hk-err");
        })
        .finally(function () {
          clearTimeout(timer);
          busy = false;
          sendBtn.disabled = false;
          input.focus();
        });
    }
  
    fab.addEventListener("click", function () {
      setOpen(!panel.classList.contains("hk-open"));
    });
    closeBtn.addEventListener("click", function () {
      setOpen(false);
      fab.focus();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("hk-open")) setOpen(false);
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      send(input.value);
    });
  })();