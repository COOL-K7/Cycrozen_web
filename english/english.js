(function () {
  "use strict";
  const deck = window.WASH_DECK;
  const POS = {adj: "형", n: "명", v: "동", adv: "부", prep: "전", conj: "접"};
  const $ = (id) => document.getElementById(id);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  const panels = ["read", "words", "grammar"];
  document.querySelector(".panels").addEventListener("click", (e) => {
    const id = e.target.dataset && e.target.dataset.panel;
    if (!id) return;
    for (const name of panels) $(name).hidden = name !== id;
    for (const b of document.querySelectorAll("[data-panel]")) {
      b.setAttribute("aria-pressed", b.dataset.panel === id ? "true" : "false");
    }
    if (id === "words") $("q").focus();
  });

  let group = "all";
  const chips = $("chips");
  const groupName = Object.fromEntries(deck.groups.map((g) => [g.id, g.ko]));

  function addChip(id, label) {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.group = id;
    b.textContent = label;
    b.setAttribute("aria-pressed", id === group ? "true" : "false");
    chips.append(b);
  }
  addChip("all", "전체");
  for (const g of deck.groups) addChip(g.id, g.ko);

  chips.addEventListener("click", (e) => {
    const id = e.target.dataset && e.target.dataset.group;
    if (!id) return;
    group = id;
    for (const b of chips.querySelectorAll("button")) {
      b.setAttribute("aria-pressed", b.dataset.group === group ? "true" : "false");
    }
    renderWords();
  });

  const list = $("word-list");
  const maskBtn = $("mask");
  maskBtn.addEventListener("click", () => {
    const on = maskBtn.getAttribute("aria-pressed") !== "true";
    maskBtn.setAttribute("aria-pressed", on ? "true" : "false");
    maskBtn.textContent = on ? "뜻 보이기" : "뜻 가리기";
    list.classList.toggle("mask", on);
    if (!on) {
      for (const card of list.querySelectorAll(".card.open")) card.classList.remove("open");
      for (const btn of list.querySelectorAll(".reveal")) {
        btn.textContent = "뜻 보기";
        btn.setAttribute("aria-expanded", "false");
      }
    }
  });
  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".reveal");
    if (!btn) return;
    const card = btn.closest(".card");
    const open = card.classList.toggle("open");
    btn.textContent = open ? "뜻 숨기기" : "뜻 보기";
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  function renderWords() {
    const q = $("q").value.trim().toLowerCase();
    const shown = deck.words.filter((w) => {
      if (group !== "all" && w.g !== group) return false;
      if (!q) return true;
      const blob = [w.w, w.ko, w.ex, w.why, POS[w.pos] || "", groupName[w.g] || ""].join("\n").toLowerCase();
      return blob.includes(q);
    });
    $("count").textContent = shown.length + " / " + deck.words.length;
    $("empty").hidden = shown.length !== 0;
    list.replaceChildren();
    for (const w of shown) {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML =
        '<div class="head"><span class="word" lang="en">' + esc(w.w) + "</span>" +
        '<span class="pos">' + esc(POS[w.pos] || w.pos) + "</span></div>" +
        '<p class="ko">' + esc(w.ko) + "</p>" +
        '<p class="ex" lang="en"><span>예문</span>' + esc(w.ex) + "</p>" +
        '<p class="why"><span>왜 높은 말인가</span>' + esc(w.why) + "</p>" +
        '<button type="button" class="reveal" aria-expanded="false">뜻 보기</button>';
      list.append(card);
    }
  }

  $("q").addEventListener("input", renderWords);

  const glist = $("grammar-list");
  for (const g of deck.grammar) {
    const card = document.createElement("article");
    card.className = "card grammar";
    card.innerHTML =
      '<p class="word">' + esc(g.name) + "</p>" +
      '<p class="en" lang="en">' + esc(g.en) + "</p>" +
      "<p>" + esc(g.ko) + "</p>" +
      '<p class="why"><span>언제 유용한가</span>' + esc(g.use) + "</p>" +
      '<p class="ex" lang="en"><span>예문</span>' + esc(g.ex) + "</p>";
    glist.append(card);
  }

  renderWords();
})();
