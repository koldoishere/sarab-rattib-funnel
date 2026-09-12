const STORAGE_KEY = "rattib-app-v1";
const STATUS = [
  { value: "lead", label: "عميل محتمل" },
  { value: "proposal", label: "عرض سعر" },
  { value: "won", label: "تم الاتفاق" },
  { value: "lost", label: "خسارة" },
];
const DAYS = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

function localISODate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function isoDay(offset = 0) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return localISODate(d);
}

const seed = () => ({
  fx: 50,
  pricing: [
    { type: "صفحة هبوط (Landing)", hours: 20, rate: 250, costs: 500, margin: 25, notes: "تصميم + فورم + تسليم ملفات" },
    { type: "لوحة تحكم بسيطة", hours: 45, rate: 280, costs: 1200, margin: 30, notes: "CRUD + صلاحيات أساسية" },
    { type: "تكامل API", hours: 16, rate: 300, costs: 200, margin: 25, notes: "ربط بوابة دفع أو خدمة خارجية" },
    { type: "إصلاح باج / ساعة طوارئ", hours: 4, rate: 350, costs: 0, margin: 20, notes: "حد أدنى ساعة واحدة" },
    { type: "موقع تعريفي 5 صفحات", hours: 35, rate: 260, costs: 800, margin: 25, notes: "محتوى من العميل + SEO أساسي" },
    { type: "", hours: "", rate: "", costs: "", margin: 25, notes: "" },
    { type: "", hours: "", rate: "", costs: "", margin: 25, notes: "" },
  ],
  proposal: {
    date: isoDay(0),
    validUntil: isoDay(14),
    client: "شركة نور للتجارة",
    contact: "محمد علي — واتساب 01011112222",
    project: "صفحة هبوط + فورم تواصل",
    summary: "صفحة متجاوبة تعرض العرض وتجمع طلبات التواصل",
    inScope: "تصميم متجاوب، أقسام أساسية، فورم مربوط بالإيميل، تسليم ملفات/كود",
    outScope: "متجر إلكتروني، تطبيق موبايل، كتابة المحتوى التسويقي",
    duration: "10 أيام عمل بعد استلام المقدم والمحتوى",
    price: 12000,
    depositPct: 50,
    revisions: "جولتان",
    payments: "تحويل بنكي / InstaPay / Wise (حسب الاتفاق)",
    terms: "التأخير من طرف العميل يؤجّل الموعد بنفس المدة؛ أي توسّع نطاق = تقدير جديد",
    next: "رد بالموافقة + طريقة دفع المقدم، أو طلب تعديل النطاق",
  },
  clients: [
    { name: "أحمد منصور", contact: "واتساب 01012345678", source: "إحالة", status: "proposal", last: isoDay(-11), next: isoDay(-4), value: 15000, notes: "بستنى موافقة شريكه" },
    { name: "سارة حسين", contact: "sara@mail.com", source: "لينكدإن", status: "lead", last: isoDay(-7), next: isoDay(-2), value: 40000, notes: "متجر بسيط" },
    { name: "TechNest", contact: "Slack", source: "Upwork", status: "won", last: isoDay(-23), next: "", value: 22000, notes: "مرحلة 2 محتملة" },
    { name: "خالد عمر", contact: "واتساب 01098765432", source: "تويتر", status: "lost", last: isoDay(-28), next: "", value: 5000, notes: "الميزانية أقل من النطاق" },
  ],
  week: [
    { day: "الأحد", tasks: "بناء الصفحة الرئيسية + هيكل المشروع", hours: 4, deliverables: "—", done: "☐" },
    { day: "الاثنين", tasks: "تكملة الأقسام + ربط الفورم", hours: 4, deliverables: "مسودة داخلية", done: "☐" },
    { day: "الثلاثاء", tasks: "ردود عملاء + اجتماع 30د", hours: 2, deliverables: "متابعة CRM", done: "☐" },
    { day: "الأربعاء", tasks: "تحسين موبايل + اختبارات", hours: 3.5, deliverables: "نسخة للمراجعة", done: "☐" },
    { day: "الخميس", tasks: "مراجعة ملاحظات العميل + توثيق", hours: 3, deliverables: "تعديلات الجولة 1", done: "☐" },
    { day: "الجمعة", tasks: "إغلاق مفتوحات + تخطيط الأسبوع", hours: 2, deliverables: "تقرير أسبوعي", done: "☐" },
    { day: "السبت", tasks: "راحة / تعلم اختياري", hours: 0, deliverables: "—", done: "☐" },
  ],
});

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    return normalizeImportedState(JSON.parse(raw));
  } catch {
    return seed();
  }
}
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function n(v) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}
function money(v) {
  return Math.round(v).toLocaleString("en-US");
}
function suggested(row) {
  return n(row.hours) * n(row.rate) * (1 + n(row.margin) / 100) + n(row.costs);
}

const UI_KEY = "rattib-ui-v1";
const TAB_IDS = ["pricing", "proposal", "crm", "week"];
const CRM_FILTER_IDS = ["all", "today", "overdue", "lead", "proposal", "won", "lost"];

function loadUi() {
  try {
    const raw = localStorage.getItem(UI_KEY);
    if (!raw) return {};
    const u = JSON.parse(raw);
    return u && typeof u === "object" && !Array.isArray(u) ? u : {};
  } catch {
    return {};
  }
}

function saveUi(patch) {
  try {
    localStorage.setItem(UI_KEY, JSON.stringify({ ...loadUi(), ...patch }));
  } catch {
    /* ignore quota / private mode */
  }
}

function activateTab(name) {
  if (!TAB_IDS.includes(name)) return;
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  const panel = document.getElementById(`panel-${name}`);
  if (panel) panel.classList.add("active");
}

/** Programmatic navigation — keep rattib-ui-v1 in sync with tab clicks. */
function goTab(name) {
  if (!TAB_IDS.includes(name)) return;
  activateTab(name);
  saveUi({ tab: name });
}

const CRM_FILTER_LABELS = {
  all: "الكل",
  today: "النهاردة",
  overdue: "متأخر",
  lead: "عميل محتمل",
  proposal: "عرض سعر",
  won: "تم الاتفاق",
  lost: "خسارة",
};

/** Count clients for a chip given current search (ignore selected filter). */
function crmFilterCount(filterId) {
  return state.clients.filter((c) => {
    if (!clientMatchesQuery(c)) return false;
    if (filterId === "all") return true;
    if (filterId === "today") return clientIsDueToday(c);
    if (filterId === "overdue") return clientIsOverdue(c);
    return c.status === filterId;
  }).length;
}

function paintCrmFilterChips() {
  const filters = document.getElementById("crm-filters");
  if (!filters) return;
  filters.querySelectorAll("[data-filter]").forEach((b) => {
    const id = b.dataset.filter || "all";
    b.classList.toggle("active", id === crmFilter);
    const label = CRM_FILTER_LABELS[id] || id;
    const count = crmFilterCount(id);
    b.replaceChildren();
    b.append(document.createTextNode(label + "\u00a0"));
    const badge = document.createElement("span");
    badge.className = "chip-count";
    badge.textContent = String(count);
    b.appendChild(badge);
  });
}

function bindTabs() {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      goTab(btn.dataset.tab);
    });
  });
  const saved = loadUi().tab;
  if (TAB_IDS.includes(saved)) activateTab(saved);
}

function depositPct() {
  const raw = state.proposal?.depositPct;
  if (raw === "" || raw == null) return 50;
  const p = n(raw);
  if (!Number.isFinite(p)) return 50;
  return Math.min(100, Math.max(0, p));
}

function pricingCalcs(row) {
  const empty = row.hours === "" && row.rate === "";
  if (empty) return { empty: true, price: 0, usd: 0, dep: 0, bal: 0 };
  const price = suggested(row);
  const usd = state.fx ? Math.round(price / state.fx) : 0;
  const dep = Math.round(price * (depositPct() / 100));
  const bal = price - dep;
  return { empty: false, price, usd, dep, bal };
}

function paintPricingCalcs(tr, row) {
  const c = pricingCalcs(row);
  const spans = tr.querySelectorAll("span.calc");
  if (spans.length < 4) return;
  const vals = c.empty ? ["—", "—", "—", "—"] : [money(c.price), money(c.usd), money(c.dep), money(c.bal)];
  spans.forEach((el, idx) => { el.textContent = vals[idx]; });
  paintPricingTotals();
}

function pricingTotals() {
  return state.pricing.reduce((acc, row) => {
    const c = pricingCalcs(row);
    if (c.empty) return acc;
    acc.n += 1;
    acc.price += c.price;
    acc.usd += c.usd;
    acc.dep += c.dep;
    acc.bal += c.bal;
    return acc;
  }, { n: 0, price: 0, usd: 0, dep: 0, bal: 0 });
}

function paintPricingTotals() {
  const foot = document.getElementById("pricing-tfoot");
  if (!foot) return;
  const t = pricingTotals();
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  if (t.n === 0) {
    foot.hidden = true;
    return;
  }
  foot.hidden = false;
  const count = document.getElementById("pricing-count");
  if (count) count.textContent = `(${t.n})`;
  const depCell = foot.querySelector('[data-label="المقدم"], [data-label^="مقدم"]');
  if (depCell) depCell.setAttribute("data-label", `مقدم ${depositPct()}%`);
  set("tot-price", money(t.price));
  set("tot-usd", money(t.usd));
  set("tot-dep", money(t.dep));
  set("tot-bal", money(t.bal));
}

function renderPricing() {
  const fx = document.getElementById("fx-rate");
  fx.value = state.fx;
  fx.onchange = () => { state.fx = n(fx.value) || 50; save(); renderPricing(); };
  const depHead = document.getElementById("th-deposit");
  if (depHead) depHead.textContent = `مقدم ${depositPct()}%`;

  const tbody = document.querySelector("#pricing-table tbody");
  tbody.innerHTML = "";
  state.pricing.forEach((row, i) => {
    const c = pricingCalcs(row);
    const tr = document.createElement("tr");
    tr.dataset.row = String(i);
    const depLabel = `مقدم ${depositPct()}%`;
    tr.innerHTML = `
      <td data-label="نوع المشروع"><input data-i="${i}" data-k="type" value="${esc(row.type)}"></td>
      <td class="num" data-label="ساعات"><input data-i="${i}" data-k="hours" type="number" value="${row.hours}"></td>
      <td class="num" data-label="سعر/س"><input data-i="${i}" data-k="rate" type="number" value="${row.rate}"></td>
      <td class="num" data-label="تكاليف"><input data-i="${i}" data-k="costs" type="number" value="${row.costs}"></td>
      <td class="num" data-label="هامش %"><input data-i="${i}" data-k="margin" type="number" value="${row.margin}"></td>
      <td class="calc-cell" data-label="مقترح ج.م"><span class="calc">${c.empty ? "—" : money(c.price)}</span></td>
      <td class="calc-cell" data-label="USD"><span class="calc">${c.empty ? "—" : money(c.usd)}</span></td>
      <td class="calc-cell" data-label="${depLabel}"><span class="calc">${c.empty ? "—" : money(c.dep)}</span></td>
      <td class="calc-cell" data-label="المتبقي"><span class="calc">${c.empty ? "—" : money(c.bal)}</span></td>
      <td data-label="ملاحظات"><input data-i="${i}" data-k="notes" value="${esc(row.notes)}"></td>
      <td class="row-actions" data-label="إجراءات">
        <button type="button" class="ghost tiny" data-use="${i}" title="ضع السعر والمشروع في عرض السعر">انقل للعرض</button>
        <button type="button" class="ghost tiny" data-dup="${i}" title="نسخ الصف تحتها">نسخ</button>
        <button type="button" class="icon-btn" data-del="${i}">✕</button>
      </td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("input").forEach((inp) => {
    inp.addEventListener("input", () => {
      const i = +inp.dataset.i; const k = inp.dataset.k;
      state.pricing[i][k] = inp.type === "number" ? (inp.value === "" ? "" : n(inp.value)) : inp.value;
      save();
      if (["hours","rate","costs","margin"].includes(k)) {
        const tr = tbody.querySelector(`tr[data-row="${i}"]`);
        if (tr) paintPricingCalcs(tr, state.pricing[i]);
      }
    });
  });
  tbody.querySelectorAll("[data-use]").forEach((btn) => {
    btn.onclick = () => {
      const row = state.pricing[+btn.dataset.use];
      const c = pricingCalcs(row);
      if (c.empty) { alert("املأ الساعات وسعر الساعة أولاً"); return; }
      state.proposal.project = row.type || state.proposal.project;
      state.proposal.price = Math.round(c.price);
      if (row.notes) state.proposal.summary = row.notes;
      save();
      goTab("proposal");
      renderProposal();
      showToast("اتنقل لعرض السعر بالسعر المحسوب");
    };
  });
  tbody.querySelectorAll("[data-dup]").forEach((btn) => {
    btn.onclick = () => duplicatePricingRow(+btn.dataset.dup);
  });
  tbody.querySelectorAll("[data-del]").forEach((btn) => {
    btn.onclick = () => deletePricingRow(+btn.dataset.del);
  });
  paintPricingTotals();
}


function fillProposalFromPricing() {
  const t = pricingTotals();
  if (t.n === 0) {
    alert("املأ صف تسعير واحد على الأقل (ساعات وسعر الساعة) أولاً");
    return;
  }
  const price = Math.round(t.price);
  state.proposal.price = price;
  const types = state.pricing
    .map((r) => String(r.type || "").trim())
    .filter(Boolean);
  if (types.length && !String(state.proposal.project || "").trim()) {
    state.proposal.project = types.slice(0, 3).join(" + ");
  }
  save();
  goTab("proposal");
  renderProposal();
  showToast(`اتنقل إجمالي التسعير: ${money(price)} ج.م`);
}

function proposalPlainText() {
  const p = state.proposal;
  const pct = depositPct();
  const deposit = Math.round(n(p.price) * pct / 100);
  const balance = n(p.price) - deposit;
  return [
    `عرض سعر — ${p.project || "مشروع"}`,
    `للعميل: ${p.client || "—"}`,
    `التواصل: ${p.contact || "—"}`,
    `التاريخ: ${formatArDate(p.date) || p.date || "—"} · صالح حتى: ${formatArDate(p.validUntil) || p.validUntil || "—"}`,
    "",
    `الملخص: ${p.summary || "—"}`,
    `داخل النطاق: ${p.inScope || "—"}`,
    `خارج النطاق: ${p.outScope || "—"}`,
    `المدة: ${p.duration || "—"}`,
    `المراجعات: ${p.revisions || "—"}`,
    "",
    `السعر: ${money(n(p.price))} ج.م`,
    `المقدم (${pct}%): ${money(deposit)} ج.م`,
    `المتبقي عند التسليم: ${money(balance)} ج.م`,
    `طرق الدفع: ${p.payments || "—"}`,
    "",
    `الشروط: ${p.terms || "—"}`,
    `الخطوة التالية: ${p.next || "—"}`,
    "",
    "— عبر رتّب (Rattib) من Sarab",
  ].join("\n");
}

function showToast(msg, opts = {}) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.replaceChildren();
  const text = document.createElement("span");
  text.textContent = msg;
  toast.appendChild(text);
  if (opts.actionLabel && typeof opts.onAction === "function") {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toast-action";
    btn.textContent = opts.actionLabel;
    btn.onclick = () => {
      clearTimeout(toast._t);
      toast.hidden = true;
      opts.onAction();
    };
    toast.appendChild(btn);
  }
  toast.hidden = false;
  clearTimeout(toast._t);
  const ms = opts.ms != null ? opts.ms : (opts.onAction ? 6000 : 2200);
  toast._t = setTimeout(() => { toast.hidden = true; }, ms);
}

function duplicatePricingRow(i) {
  if (i < 0 || i >= state.pricing.length) return;
  const src = state.pricing[i];
  const copy = {
    type: src.type ?? "",
    hours: src.hours ?? "",
    rate: src.rate ?? "",
    costs: src.costs ?? "",
    margin: src.margin ?? 25,
    notes: src.notes ?? "",
  };
  state.pricing.splice(i + 1, 0, copy);
  save();
  renderPricing();
  const label = (copy.type && String(copy.type).trim())
    ? `اتنسخ صف «${copy.type}»`
    : "اتنسخ صف التسعير";
  showToast(label);
}

function deletePricingRow(i) {
  if (i < 0 || i >= state.pricing.length) return;
  const removed = state.pricing.splice(i, 1)[0];
  const at = i;
  save();
  renderPricing();
  const label = (removed && String(removed.type || "").trim())
    ? `اتمسح صف «${removed.type}»`
    : "اتمسح صف التسعير";
  showToast(label, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      const insertAt = Math.min(at, state.pricing.length);
      state.pricing.splice(insertAt, 0, removed);
      save();
      renderPricing();
      showToast("رجع صف التسعير");
    },
  });
}

function deleteClient(i) {
  if (!confirm("حذف العميل ده من المتابعة؟")) return;
  if (i < 0 || i >= state.clients.length) return;
  const removed = state.clients.splice(i, 1)[0];
  const at = i;
  save();
  renderCrm();
  const label = (removed && removed.name) ? `اتمسح «${removed.name}»` : "اتمسح العميل";
  showToast(label, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      const insertAt = Math.min(at, state.clients.length);
      state.clients.splice(insertAt, 0, removed);
      save();
      renderCrm();
      showToast("رجع العميل للمتابعة");
    },
  });
}

async function copyProposalWhatsApp() {
  const text = proposalPlainText();
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  showToast("تم نسخ العرض — الصقه في واتساب");
}

function openProposalWhatsApp() {
  const text = proposalPlainText();
  const encoded = encodeURIComponent(text);
  // Prefer chat with the proposal contact number (CRM parity) when one is parseable.
  const phone = whatsappPhone(state.proposal?.contact);
  const base = phone ? ("https://wa.me/" + phone) : "https://wa.me/";
  const url = base + "?text=" + encoded;
  // wa.me links break when the URL gets too long; fall back to copy + (phone) chat
  if (url.length > 1800) {
    copyProposalWhatsApp();
    window.open(base, "_blank", "noopener,noreferrer");
    showToast(phone
      ? "العرض طويل — اتنسخ، الصقه في واتساب للعميل"
      : "العرض طويل — اتنسخ، الصقه في واتساب");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
  showToast(phone
    ? "اتفتح واتساب للعميل بالنص — راجع قبل الإرسال"
    : "اتفتح واتساب بالنص — راجع قبل الإرسال");
}

function proposalDepositBalance() {
  const p = state.proposal;
  const pct = depositPct();
  const deposit = Math.round(n(p.price) * pct / 100);
  const balance = n(p.price) - deposit;
  return { deposit, balance, pct };
}

function paintProposalCalcs() {
  const { deposit, balance } = proposalDepositBalance();
  const depEl = document.getElementById("proposal-deposit-calc");
  const balEl = document.getElementById("proposal-balance-calc");
  if (depEl) depEl.textContent = `${money(deposit)} ج.م`;
  if (balEl) balEl.textContent = `${money(balance)} ج.م`;
}

function renderProposal() {
  const p = state.proposal;
  const { deposit, balance } = proposalDepositBalance();
  const fields = [
    ["date","تاريخ العرض","date"], ["validUntil","صالح حتى","date"],
    ["client","اسم العميل","text"], ["contact","جهة التواصل","text"],
    ["project","اسم المشروع","text"], ["price","السعر (ج.م)","number"],
    ["depositPct","نسبة المقدم %","number"], ["revisions","المراجعات","text"],
    ["duration","المدة","text"], ["payments","طرق الدفع","text"],
    ["summary","ملخص","textarea", true], ["inScope","داخل النطاق","textarea", true],
    ["outScope","خارج النطاق","textarea", true], ["terms","شروط","textarea", true],
    ["next","الخطوة التالية","textarea", true],
  ];
  const box = document.getElementById("proposal-form");
  box.innerHTML = fields.map(([k,label,type,full]) => {
    const ar = type === "date" ? formatArDate(p[k]) : "";
    const control = type === "textarea"
      ? `<textarea data-k="${k}">${esc(p[k] ?? "")}</textarea>`
      : type === "date"
        ? `<input data-k="${k}" type="date" lang="ar-EG" title="اليوم / الشهر / السنة" value="${esc(p[k] ?? "")}">${ar ? `<div class="date-hint">${ar}</div>` : ""}`
        : `<input data-k="${k}" type="${type}" value="${esc(p[k] ?? "")}">`;
    return `<label class="${full ? "full" : ""}">${label}
      ${control}
    </label>`;
  }).join("") + `
    <label>المقدم المحسوب
      <div class="calc" id="proposal-deposit-calc">${money(deposit)} ج.م</div>
    </label>
    <label>المتبقي عند التسليم
      <div class="calc" id="proposal-balance-calc">${money(balance)} ج.م</div>
    </label>
    <div class="full proposal-actions">
      <button type="button" id="btn-copy-wa" class="primary">نسخ للواتساب</button>
      <button type="button" id="btn-open-wa" class="ghost">فتح واتساب</button>
      <button type="button" id="btn-from-pricing" class="ghost" title="انقل إجمالي صفوف التسعير المحسوبة إلى سعر العرض">من التسعير</button>
      <button type="button" id="btn-add-crm" class="ghost">أضف للعملاء</button>
    </div>`;
  box.querySelectorAll("[data-k]").forEach((el) => {
    el.addEventListener("input", () => {
      const k = el.dataset.k;
      state.proposal[k] = el.type === "number" ? (el.value === "" ? "" : n(el.value)) : el.value;
      save();
      if (k === "price" || k === "depositPct") {
        paintProposalCalcs();
        if (k === "depositPct") renderPricing();
      }
      if (el.type === "date") {
        const hint = el.parentElement && el.parentElement.querySelector(".date-hint");
        const ar = formatArDate(el.value);
        if (hint) {
          if (ar) hint.textContent = ar;
          else hint.remove();
        } else if (ar) {
          const div = document.createElement("div");
          div.className = "date-hint";
          div.textContent = ar;
          el.insertAdjacentElement("afterend", div);
        }
      }
    });
  });
  const copyBtn = document.getElementById("btn-copy-wa");
  if (copyBtn) copyBtn.onclick = () => { copyProposalWhatsApp(); };
  const openBtn = document.getElementById("btn-open-wa");
  if (openBtn) openBtn.onclick = () => { openProposalWhatsApp(); };
  const addCrmBtn = document.getElementById("btn-add-crm");
  if (addCrmBtn) addCrmBtn.onclick = () => { addProposalToCrm(); };
  const fromPricingBtn = document.getElementById("btn-from-pricing");
  if (fromPricingBtn) fromPricingBtn.onclick = () => { fillProposalFromPricing(); };
}


function addDaysISO(iso, days) {
  const [y, m, d] = (iso || localISODate()).split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return localISODate(dt);
}

function formatArDate(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("ar-EG", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function nextDateHint(iso) {
  if (!iso) return "";
  const today = localISODate();
  const t0 = new Date(today + "T12:00:00");
  const t1 = new Date(iso + "T12:00:00");
  const diff = Math.round((t1 - t0) / 86400000);
  if (diff === 0) return "اليوم";
  if (diff === 1) return "بكرة";
  if (diff === -1) return "متأخر يوم";
  if (diff < 0) return `متأخر ${Math.abs(diff)} أيام`;
  return `بعد ${diff} أيام`;
}


function clientIsOverdue(c) {
  return !!(c.next && ["lead","proposal"].includes(c.status) && c.next < localISODate());
}

function clientIsDueToday(c) {
  return !!(c.next && ["lead","proposal"].includes(c.status) && c.next === localISODate());
}

function clientMatchesQuery(c) {
  const q = (crmQuery || "").trim().toLowerCase();
  if (!q) return true;
  const hay = [c.name, c.contact, c.source, c.notes]
    .map((v) => String(v || "").toLowerCase())
    .join(" ");
  return hay.includes(q);
}

function clientMatchesFilter(c) {
  if (!clientMatchesQuery(c)) return false;
  if (crmFilter === "all") return true;
  if (crmFilter === "today") return clientIsDueToday(c);
  if (crmFilter === "overdue") return clientIsOverdue(c);
  return c.status === crmFilter;
}

function crmSortKey(c) {
  const overdue = c.next && ["lead","proposal"].includes(c.status) && c.next < localISODate();
  const next = c.next || "9999-99-99";
  return [overdue ? 0 : 1, next, (c.name || "").toLowerCase()];
}

function sortedClientIndexes() {
  return state.clients
    .map((c, i) => ({ c, i }))
    .sort((a, b) => {
      const ka = crmSortKey(a.c);
      const kb = crmSortKey(b.c);
      for (let k = 0; k < ka.length; k++) {
        if (ka[k] < kb[k]) return -1;
        if (ka[k] > kb[k]) return 1;
      }
      return a.i - b.i;
    });
}


function revealClientInCrm(i) {
  const c = state.clients[i];
  if (!c) {
    goTab("crm");
    return;
  }
  if (!clientMatchesFilter(c)) {
    crmFilter = "all";
    saveUi({ crmFilter });
    paintCrmFilterChips();
  }
  goTab("crm");
}

function addProposalToCrm() {
  const p = state.proposal || {};
  const name = String(p.client || "").trim();
  if (!name) {
    alert("اكتب اسم العميل في عرض السعر أولاً");
    return;
  }
  const contact = String(p.contact || "").trim();
  const value = Math.round(n(p.price));
  const notesParts = [];
  if (p.project) notesParts.push(p.project);
  if (p.summary) notesParts.push(p.summary);
  const notes = notesParts.join(" — ");
  const idx = state.clients.findIndex(
    (c) => String(c.name || "").trim().toLowerCase() === name.toLowerCase()
  );
  if (idx >= 0) {
    const c = state.clients[idx];
    if (contact) c.contact = contact;
    if (value) c.value = value;
    if (notes) c.notes = notes;
    c.status = c.status === "lost" ? "proposal" : (c.status === "won" ? c.status : "proposal");
    c.last = localISODate();
    c.next = addDaysISO(c.last, 3);
    save();
    revealClientInCrm(idx);
    renderCrm();
    showToast("اتحدّث العميل في المتابعة");
    return;
  }
  state.clients.push({
    name,
    contact,
    source: "عرض سعر",
    status: "proposal",
    last: localISODate(),
    next: addDaysISO(localISODate(), 3),
    value,
    notes,
  });
  save();
  revealClientInCrm(state.clients.length - 1);
  renderCrm();
  showToast("اتضاف للعملاء — متابعة بعد 3 أيام");
}


function whatsappPhone(raw) {
  const s = String(raw || "").trim();
  if (!s || s.includes("@")) return null;
  const wa = s.match(/(?:https?:\/\/)?(?:wa\.me\/|api\.whatsapp\.com\/send\?phone=)(\+?\d{8,15})/i);
  if (wa) {
    const d = wa[1].replace(/\D/g, "");
    return d.length >= 8 && d.length <= 15 ? d : null;
  }
  let digits = s.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("00")) digits = digits.slice(2);
  // Egyptian local mobile 01x… → 201x…
  if (/^01[0125]\d{8}$/.test(digits)) digits = "20" + digits.slice(1);
  if (!/^\d{10,15}$/.test(digits)) return null;
  return digits;
}

function clientFollowUpText(c) {
  const name = String(c.name || "").trim() || "أستاذنا";
  const note = String(c.notes || "").trim().slice(0, 80);
  const lines = [`السلام عليكم ${name}،`];
  if (clientIsOverdue(c)) lines.push("متابعة سريعة بخصوص كلامنا الأخير.");
  else if (clientIsDueToday(c)) lines.push("متابعة زي ما اتفقنا النهاردة.");
  else lines.push("حابب أطمن على الموضوع.");
  if (note) lines.push(`بخصوص: ${note}`);
  lines.push("لو مناسب نكمّل؟");
  return lines.join("\n");
}

function openClientWhatsApp(i) {
  const c = state.clients[i];
  if (!c) return;
  const phone = whatsappPhone(c.contact);
  if (!phone) {
    showToast("حط رقم واتساب في خانة التواصل أولاً");
    return;
  }
  // Prefill a short Arabic follow-up; keep URL short so wa.me does not break.
  const text = clientFollowUpText(c);
  let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
  if (url.length > 1800) url = "https://wa.me/" + phone;
  window.open(url, "_blank", "noopener,noreferrer");
  showToast("اتفتح واتساب بمسودة متابعة — راجع قبل الإرسال");
}

function markContacted(i) {
  const c = state.clients[i];
  if (!c) return;
  c.last = localISODate();
  c.next = addDaysISO(c.last, 3);
  if (c.status === "lost") c.status = "lead";
  save();
  renderCrm();
  showToast("اتسجّل تواصل — المتابعة بعد 3 أيام");
}

function snoozeClient(i, days) {
  const c = state.clients[i];
  if (!c) return;
  const d = Math.max(1, Math.min(30, Number(days) || 3));
  const today = localISODate();
  // From today if overdue/empty; otherwise push from the scheduled next date
  const base = c.next && c.next >= today ? c.next : today;
  c.next = addDaysISO(base, d);
  save();
  renderCrm();
  showToast(d === 7 ? "اتأجلت المتابعة أسبوع" : `اتأجلت المتابعة ${d} أيام`);
}

function setClientNextToday(i) {
  const c = state.clients[i];
  if (!c) return;
  if (!["lead", "proposal"].includes(c.status)) return;
  c.next = localISODate();
  save();
  renderCrm();
  showToast("المتابعة بقت النهاردة");
}

function paintCrmPipeline(visible) {
  const el = document.getElementById("crm-pipeline");
  if (!el) return;
  if (!visible.length) {
    el.hidden = true;
    el.textContent = "";
    return;
  }
  const sum = visible.reduce((acc, { c }) => acc + n(c.value), 0);
  const todayN = state.clients.filter(clientIsDueToday).length;
  const parts = [`الظاهر: ${visible.length} · قيمة ${money(sum)} ج.م`];
  if (crmFilter !== "today" && todayN > 0) parts.push(`${todayN} متابعة النهاردة`);
  el.textContent = parts.join(" · ");
  el.hidden = false;
}


function onClientStatusChange(i, prev, nextStatus) {
  const c = state.clients[i];
  if (!c || prev === nextStatus) return;
  let toast = "";
  if (nextStatus === "won" || nextStatus === "lost") {
    c.next = "";
    toast = nextStatus === "won" ? "تم الاتفاق — اتشالت المتابعة" : "اتسجّلت كخسارة — اتشالت المتابعة";
  } else if ((nextStatus === "lead" || nextStatus === "proposal") && !String(c.next || "").trim()) {
    c.next = addDaysISO(localISODate(), 3);
    toast = "رجعت للمتابعة — بعد 3 أيام";
  }
  save();
  renderCrm();
  if (toast) showToast(toast);
}

function renderCrm() {
  const tbody = document.querySelector("#crm-table tbody");
  tbody.innerHTML = "";
  let overdueCount = 0;
  const visible = sortedClientIndexes().filter(({ c }) => clientMatchesFilter(c));
  const emptyEl = document.getElementById("crm-empty");
  const wrap = document.querySelector("#panel-crm .table-wrap");
  if (emptyEl) {
    emptyEl.hidden = visible.length > 0;
    emptyEl.textContent = state.clients.length === 0
      ? "لسه مفيش عملاء — اضغط «+ عميل» أو «أضف للعملاء» من عرض السعر."
      : (crmQuery || "").trim()
        ? "مفيش نتائج للبحث ده — جرّب كلمة تانية أو امسح البحث."
        : crmFilter === "today"
          ? "مفيش متابعات النهاردة — لو في متأخرين جرّب «متأخر»."
          : "مفيش عملاء في التصفية دي — جرّب «الكل» أو ضيف عميل.";
  }
  if (wrap) wrap.hidden = visible.length === 0;
  paintCrmPipeline(visible);
  paintCrmFilterChips();
  // badge counts all overdue, not just filtered
  state.clients.forEach((c) => { if (clientIsOverdue(c)) overdueCount += 1; });
  visible.forEach(({ c, i }) => {
    const tr = document.createElement("tr");
    const overdue = clientIsOverdue(c);
    if (overdue) tr.classList.add("overdue");
    const hint = nextDateHint(c.next);
    const showSnooze = ["lead", "proposal"].includes(c.status);
    const snoozeHtml = showSnooze ? `
        <div class="snooze-row" role="group" aria-label="متابعة سريعة">
          <button type="button" class="ghost tiny" data-today="${i}" title="خلي المتابعة النهاردة">اليوم</button>
          <button type="button" class="ghost tiny" data-snooze="${i}" data-days="3" title="تأجيل 3 أيام">+3</button>
          <button type="button" class="ghost tiny" data-snooze="${i}" data-days="7" title="تأجيل أسبوع">+7</button>
        </div>` : "";
    tr.innerHTML = `
      <td data-label="الاسم"><input data-i="${i}" data-k="name" value="${esc(c.name)}"></td>
      <td data-label="التواصل">
        <input data-i="${i}" data-k="contact" value="${esc(c.contact)}" placeholder="واتساب 01xxxxxxxxx">
        ${(!whatsappPhone(c.contact) && /واتساب|whatsapp/i.test(c.contact || "")) ? `<div class="date-hint">حط رقم عشان يظهر زر واتساب</div>` : ""}
      </td>
      <td data-label="المصدر"><input data-i="${i}" data-k="source" value="${esc(c.source)}"></td>
      <td data-label="الحالة"><select data-i="${i}" data-k="status">${STATUS.map(s => `<option value="${s.value}" ${c.status===s.value?"selected":""}>${s.label}</option>`).join("")}</select></td>
      <td data-label="آخر تواصل">
        <input data-i="${i}" data-k="last" type="date" lang="ar-EG" title="اليوم / الشهر / السنة" value="${esc(c.last)}">
        ${c.last && formatArDate(c.last) ? `<div class="date-hint">${formatArDate(c.last)}</div>` : ""}
      </td>
      <td data-label="متابعة تالية">
        <input data-i="${i}" data-k="next" type="date" lang="ar-EG" title="اليوم / الشهر / السنة" value="${esc(c.next)}">
        ${c.next && formatArDate(c.next) ? `<div class="date-hint">${formatArDate(c.next)}</div>` : ""}
        ${hint ? `<div class="date-hint${overdue ? " late" : ""}">${hint}</div>` : ""}
        ${snoozeHtml}
      </td>
      <td class="num" data-label="القيمة"><input data-i="${i}" data-k="value" type="number" value="${c.value}"></td>
      <td data-label="ملاحظات"><input data-i="${i}" data-k="notes" value="${esc(c.notes)}"></td>
      <td class="row-actions" data-label="إجراءات">
        ${whatsappPhone(c.contact) ? `<button type="button" class="ghost tiny" data-wa="${i}" title="فتح واتساب">واتساب</button>` : ""}
        <button type="button" class="ghost tiny" data-touch="${i}">تواصلت</button>
        <button type="button" class="icon-btn" data-del="${i}">✕</button>
      </td>`;
    tbody.appendChild(tr);
  });
  const badge = document.getElementById("crm-overdue-badge");
  if (badge) {
    badge.hidden = overdueCount === 0;
    badge.textContent = overdueCount ? `${overdueCount} متأخر` : "";
  }
  tbody.querySelectorAll("input,select").forEach((el) => {
    el.addEventListener("change", () => {
      const i = +el.dataset.i; const k = el.dataset.k;
      const prevStatus = k === "status" ? state.clients[i].status : null;
      state.clients[i][k] = el.type === "number" ? n(el.value) : el.value;
      save();
      if (k === "status") {
        onClientStatusChange(i, prevStatus, state.clients[i].status);
        return;
      }
      if (k === "next" || k === "last" || k === "contact") renderCrm();
    });
    el.addEventListener("input", () => {
      if (el.tagName === "SELECT") return;
      const i = +el.dataset.i; const k = el.dataset.k;
      state.clients[i][k] = el.type === "number" ? n(el.value) : el.value;
      save();
    });
  });
  tbody.querySelectorAll("[data-del]").forEach((btn) => {
    btn.onclick = () => deleteClient(+btn.dataset.del);
  });
  tbody.querySelectorAll("[data-touch]").forEach((btn) => {
    btn.onclick = () => markContacted(+btn.dataset.touch);
  });
  tbody.querySelectorAll("[data-wa]").forEach((btn) => {
    btn.onclick = () => openClientWhatsApp(+btn.dataset.wa);
  });
  tbody.querySelectorAll("[data-snooze]").forEach((btn) => {
    btn.onclick = () => snoozeClient(+btn.dataset.snooze, +btn.dataset.days);
  });
  tbody.querySelectorAll("[data-today]").forEach((btn) => {
    btn.onclick = () => setClientNextToday(+btn.dataset.today);
  });
}

function weekTotal() {
  return state.week.reduce((sum, w) => sum + n(w.hours), 0);
}

function weekDoneCount() {
  return state.week.filter((w) => w.done === "☑").length;
}

function paintWeekProgress() {
  const doneEl = document.getElementById("week-done");
  const totEl = document.getElementById("week-total");
  if (doneEl) doneEl.textContent = String(weekDoneCount());
  if (totEl) totEl.textContent = String(weekTotal());
}

function weekPlainText() {
  const lines = [
    "ملخص أسبوع الشغل — رتّب",
    `تم ${weekDoneCount()} من 7 · ساعات التركيز: ${weekTotal()}`,
    "",
  ];
  state.week.forEach((w) => {
    const mark = w.done === "☑" ? "☑" : "☐";
    lines.push(`${mark} ${w.day}`);
    if (String(w.tasks || "").trim()) lines.push(`  المهام: ${w.tasks}`);
    if (n(w.hours)) lines.push(`  الساعات: ${w.hours}`);
    const del = String(w.deliverables || "").trim();
    if (del && del !== "—") lines.push(`  التسليمات: ${w.deliverables}`);
  });
  return lines.join("\n");
}

async function copyWeekSummary() {
  const text = weekPlainText();
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  showToast("اتنسخ ملخص الأسبوع");
}

function weekHasCarryTasks() {
  return state.week.some((w) => w.done !== "☑" && String(w.tasks || "").trim());
}

function resetWeek() {
  if (!confirm("أسبوع جديد؟ هنتصفّر الساعات والتسليمات وعلامات «تم» (والمهام إلا لو اخترت ترحيل الناقص).")) return;
  const carryable = weekHasCarryTasks();
  const carry = carryable && confirm("في مهام ناقصة لسه مش «تم». ترحيل المهام الناقصة للأسبوع الجديد؟\n\nموافق = تفضل المهام زي ما هي على الأيام الناقصة.\nإلغاء = أسبوع فاضي بالكامل.");
  const previous = state.week.map((w) => ({
    day: w.day,
    tasks: w.tasks,
    hours: w.hours,
    deliverables: w.deliverables,
    done: w.done,
  }));
  state.week = state.week.map((w) => {
    const keepTasks = carry && w.done !== "☑" && String(w.tasks || "").trim();
    return {
      day: w.day,
      tasks: keepTasks ? w.tasks : "",
      hours: 0,
      deliverables: "",
      done: "☐",
    };
  });
  save();
  renderWeek();
  showToast(carry ? "اترحّلت المهام الناقصة" : "أسبوع جديد جاهز", {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      state.week = previous.map((w) => ({ ...w }));
      save();
      renderWeek();
      showToast("رجع أسبوع الشغل");
    },
  });
}

function toggleWeekDone(i) {
  const w = state.week[i];
  if (!w) return;
  w.done = w.done === "☑" ? "☐" : "☑";
  save();
  renderWeek();
  showToast(w.done === "☑" ? `«${w.day}» بقت مكتملة` : `«${w.day}» رجعت مش مكتملة`);
}

function renderWeek() {
  const tbody = document.querySelector("#week-table tbody");
  tbody.innerHTML = "";
  const todayName = DAYS[new Date().getDay()];
  // Start display at today so mobile users see «اليوم» first (data order stays Sun→Sat).
  let start = state.week.findIndex((w) => w.day === todayName);
  if (start < 0) start = 0;
  const order = state.week.map((w, i) => i).slice(start).concat(state.week.map((w, i) => i).slice(0, start));
  order.forEach((i) => {
    const w = state.week[i];
    const tr = document.createElement("tr");
    if (w.day === todayName) tr.classList.add("today");
    if (w.done === "☑") tr.classList.add("week-done");
    const dayLabel = w.day === todayName ? `${esc(w.day)} <span class="today-pill">اليوم</span>` : esc(w.day);
    const doneOn = w.done === "☑";
    tr.innerHTML = `
      <td data-label="اليوم">${dayLabel}</td>
      <td data-label="المهام"><input data-i="${i}" data-k="tasks" value="${esc(w.tasks)}"></td>
      <td class="num" data-label="ساعات التركيز"><input data-i="${i}" data-k="hours" type="number" step="0.5" value="${w.hours}"></td>
      <td data-label="التسليمات"><input data-i="${i}" data-k="deliverables" value="${esc(w.deliverables)}"></td>
      <td data-label="تم؟" class="week-done-cell">
        <button type="button" class="done-toggle${doneOn ? " on" : ""}" data-done-toggle="${i}" aria-pressed="${doneOn ? "true" : "false"}" title="${doneOn ? "إلغاء اكتمال اليوم" : "تعليم اليوم كمكتمل"}">
          <span aria-hidden="true">${doneOn ? "☑" : "☐"}</span>
          <span class="done-toggle-label">${doneOn ? "تم" : "مش بعد"}</span>
        </button>
      </td>`;
    tbody.appendChild(tr);
  });
  paintWeekProgress();
  tbody.querySelectorAll("input").forEach((el) => {
    const handler = () => {
      const i = +el.dataset.i; const k = el.dataset.k;
      state.week[i][k] = el.type === "number" ? n(el.value) : el.value;
      save();
      if (k === "hours") paintWeekProgress();
    };
    el.addEventListener("change", handler);
    el.addEventListener("input", handler);
  });
  tbody.querySelectorAll("[data-done-toggle]").forEach((btn) => {
    btn.onclick = () => toggleWeekDone(+btn.dataset.doneToggle);
  });
  const todayRow = tbody.querySelector("tr.today");
  if (todayRow) {
    requestAnimationFrame(() => {
      todayRow.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }
}


const STATUS_VALUES = new Set(STATUS.map((s) => s.value));
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isPlainObject(v) {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function cleanStr(v, max = 2000) {
  if (v == null) return "";
  return String(v).slice(0, max);
}

function cleanNum(v, fallback = 0) {
  if (v === "" || v == null) return v === "" ? "" : fallback;
  const x = Number(v);
  return Number.isFinite(x) ? x : fallback;
}

function cleanDate(v) {
  const s = cleanStr(v, 32).trim();
  return ISO_DATE_RE.test(s) ? s : "";
}

function cleanStatus(v) {
  const s = cleanStr(v, 32);
  return STATUS_VALUES.has(s) ? s : "lead";
}

function cleanDone(v) {
  return v === "☑" ? "☑" : "☐";
}

/** Validate + normalize a Rattib export. Throws Error with Arabic message on bad shape. */
function normalizeImportedState(data) {
  if (!isPlainObject(data)) throw new Error("الملف مش JSON كائن صالح");
  // reject prototype-pollution keys and require at least one known section
  const keys = Object.keys(data);
  if (keys.some((k) => k === "__proto__" || k === "constructor" || k === "prototype")) {
    throw new Error("الملف فيه مفاتيح مش مسموحة");
  }
  const hasSection = ["fx", "pricing", "proposal", "clients", "week"].some((k) => k in data);
  if (!hasSection) throw new Error("الملف مش تصدير رتّب — مفيش أقسام معروفة");

  const base = seed();
  const out = { ...base };

  if ("fx" in data) {
    const fx = Number(data.fx);
    if (!Number.isFinite(fx) || fx <= 0 || fx > 1e6) throw new Error("سعر الصرف غير صالح");
    out.fx = fx;
  }

  if ("pricing" in data) {
    if (!Array.isArray(data.pricing)) throw new Error("قائمة التسعير لازم تكون مصفوفة");
    if (data.pricing.length > 200) throw new Error("عدد صفوف التسعير أكبر من المسموح");
    out.pricing = data.pricing.map((row) => {
      if (!isPlainObject(row)) throw new Error("صف تسعير غير صالح");
      return {
        type: cleanStr(row.type, 200),
        hours: row.hours === "" || row.hours == null ? "" : cleanNum(row.hours, 0),
        rate: row.rate === "" || row.rate == null ? "" : cleanNum(row.rate, 0),
        costs: row.costs === "" || row.costs == null ? "" : cleanNum(row.costs, 0),
        margin: row.margin === "" || row.margin == null ? 25 : cleanNum(row.margin, 25),
        notes: cleanStr(row.notes, 500),
      };
    });
  }

  if ("proposal" in data) {
    if (!isPlainObject(data.proposal)) throw new Error("عرض السعر غير صالح");
    const p = data.proposal;
    out.proposal = {
      ...base.proposal,
      date: cleanDate(p.date) || base.proposal.date,
      validUntil: cleanDate(p.validUntil) || base.proposal.validUntil,
      client: cleanStr(p.client, 200),
      contact: cleanStr(p.contact, 200),
      project: cleanStr(p.project, 200),
      summary: cleanStr(p.summary, 1000),
      inScope: cleanStr(p.inScope, 2000),
      outScope: cleanStr(p.outScope, 2000),
      duration: cleanStr(p.duration, 200),
      price: cleanNum(p.price, 0),
      depositPct: Math.min(100, Math.max(0, cleanNum(p.depositPct, 50))),
      revisions: cleanStr(p.revisions, 100),
      payments: cleanStr(p.payments, 300),
      terms: cleanStr(p.terms, 2000),
      next: cleanStr(p.next, 500),
    };
  }

  if ("clients" in data) {
    if (!Array.isArray(data.clients)) throw new Error("قائمة العملاء لازم تكون مصفوفة");
    if (data.clients.length > 2000) throw new Error("عدد العملاء أكبر من المسموح");
    out.clients = data.clients.map((c) => {
      if (!isPlainObject(c)) throw new Error("سجل عميل غير صالح");
      return {
        name: cleanStr(c.name, 200),
        contact: cleanStr(c.contact, 200),
        source: cleanStr(c.source, 100),
        status: cleanStatus(c.status),
        last: cleanDate(c.last),
        next: cleanDate(c.next),
        value: cleanNum(c.value, 0),
        notes: cleanStr(c.notes, 500),
      };
    });
  }

  if ("week" in data) {
    if (!Array.isArray(data.week)) throw new Error("أسبوع الشغل لازم يكون مصفوفة");
    if (data.week.length !== 7) throw new Error("أسبوع الشغل لازم 7 أيام");
    out.week = data.week.map((w, i) => {
      if (!isPlainObject(w)) throw new Error("يوم أسبوع غير صالح");
      return {
        day: cleanStr(w.day, 40) || DAYS[i],
        tasks: cleanStr(w.tasks, 1000),
        hours: cleanNum(w.hours, 0),
        deliverables: cleanStr(w.deliverables, 500),
        done: cleanDone(w.done),
      };
    });
  }

  return out;
}

function esc(s) {
  return String(s ?? "").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
}

function wire() {
  bindTabs();
  const newWeekBtn = document.getElementById("btn-new-week");
  if (newWeekBtn) newWeekBtn.onclick = () => { resetWeek(); };
  const copyWeekBtn = document.getElementById("btn-copy-week");
  if (copyWeekBtn) copyWeekBtn.onclick = () => { copyWeekSummary(); };
  document.getElementById("add-pricing").onclick = () => {
    state.pricing.push({ type: "", hours: "", rate: "", costs: "", margin: 25, notes: "" });
    save(); renderPricing();
  };
  const toProposalBtn = document.getElementById("btn-to-proposal");
  if (toProposalBtn) toProposalBtn.onclick = () => { fillProposalFromPricing(); };
  document.getElementById("add-client").onclick = () => {
    state.clients.push({ name: "", contact: "", source: "", status: "lead", last: "", next: "", value: 0, notes: "" });
    save(); renderCrm();
  };
  const filters = document.getElementById("crm-filters");
  if (filters) {
    filters.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.onclick = () => {
        crmFilter = btn.dataset.filter || "all";
        saveUi({ crmFilter });
        paintCrmFilterChips();
        renderCrm();
      };
    });
  }
  const search = document.getElementById("crm-search");
  if (search) {
    search.value = crmQuery;
    search.addEventListener("input", () => {
      crmQuery = search.value || "";
      renderCrm();
      // keep focus/caret — search lives outside renderCrm
      search.focus();
    });
  }
  document.getElementById("btn-export").onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const stamp = localISODate();
    const filename = `rattib-${stamp}.json`;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    showToast(`اتصدر ${filename}`);
  };
  document.getElementById("btn-import").onclick = () => document.getElementById("import-file").click();
  document.getElementById("import-file").onchange = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error("الملف كبير أوي (حد أقصى 2MB)");
      const text = await file.text();
      let data;
      try { data = JSON.parse(text); }
      catch { throw new Error("الملف مش JSON صالح"); }
      const next = normalizeImportedState(data);
      if (!confirm("استيراد الملف هيستبدل البيانات الحالية. كمّل؟")) {
        e.target.value = "";
        return;
      }
      const previous = JSON.parse(JSON.stringify(state));
      state = next;
      save();
      renderAll();
      showToast("تم استيراد البيانات بأمان", {
        actionLabel: "تراجع",
        ms: 6000,
        onAction: () => {
          state = previous;
          save();
          renderAll();
          showToast("رجعت البيانات قبل الاستيراد");
        },
      });
    } catch (err) {
      alert(err?.message || "ملف غير صالح");
    }
    e.target.value = "";
  };
  document.getElementById("btn-reset").onclick = () => {
    if (!confirm("مسح كل البيانات والرجوع للأمثلة؟")) return;
    const previous = JSON.parse(JSON.stringify(state));
    state = seed();
    save();
    renderAll();
    showToast("اتمسحت البيانات — رجعت للأمثلة", {
      actionLabel: "تراجع",
      ms: 6000,
      onAction: () => {
        state = previous;
        save();
        renderAll();
        showToast("رجعت بياناتك");
      },
    });
  };
  renderAll();
}
let state = load();
const _ui = loadUi();
let crmFilter = CRM_FILTER_IDS.includes(_ui.crmFilter) ? _ui.crmFilter : "all";
let crmQuery = "";

function renderAll() { renderPricing(); renderProposal(); renderCrm(); renderWeek(); }
paintCrmFilterChips();
wire();