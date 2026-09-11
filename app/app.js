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
    contact: "محمد علي — واتساب",
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
    { name: "أحمد منصور", contact: "واتساب", source: "إحالة", status: "proposal", last: isoDay(-11), next: isoDay(-4), value: 15000, notes: "بستنى موافقة شريكه" },
    { name: "سارة حسين", contact: "sara@mail.com", source: "لينكدإن", status: "lead", last: isoDay(-7), next: isoDay(-2), value: 40000, notes: "متجر بسيط" },
    { name: "TechNest", contact: "Slack", source: "Upwork", status: "won", last: isoDay(-23), next: "", value: 22000, notes: "مرحلة 2 محتملة" },
    { name: "خالد عمر", contact: "واتساب", source: "تويتر", status: "lost", last: isoDay(-28), next: "", value: 5000, notes: "الميزانية أقل من النطاق" },
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

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    return { ...seed(), ...JSON.parse(raw) };
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

function bindTabs() {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`panel-${btn.dataset.tab}`).classList.add("active");
    });
  });
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
        <button type="button" class="ghost tiny" data-use="${i}" title="ضع السعر والمشروع في عرض السعر">للعرض</button>
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
      document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === "proposal"));
      document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === "panel-proposal"));
      renderProposal();
      const toast = document.getElementById("toast");
      if (toast) {
        toast.textContent = "اتنقل لعرض السعر بالسعر المحسوب";
        toast.hidden = false;
        clearTimeout(toast._t);
        toast._t = setTimeout(() => { toast.hidden = true; }, 2200);
      }
    };
  });
  tbody.querySelectorAll("[data-del]").forEach((btn) => {
    btn.onclick = () => { state.pricing.splice(+btn.dataset.del, 1); save(); renderPricing(); };
  });
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
    `التاريخ: ${p.date || "—"} · صالح حتى: ${p.validUntil || "—"}`,
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

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.hidden = true; }, 2200);
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
  const url = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener,noreferrer");
  showToast("اتفتح واتساب بالنص — راجع قبل الإرسال");
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
  box.innerHTML = fields.map(([k,label,type,full]) => `
    <label class="${full ? "full" : ""}">${label}
      ${type === "textarea"
        ? `<textarea data-k="${k}">${esc(p[k] ?? "")}</textarea>`
        : `<input data-k="${k}" type="${type}" value="${esc(p[k] ?? "")}">`}
    </label>`).join("") + `
    <label>المقدم المحسوب
      <div class="calc" id="proposal-deposit-calc">${money(deposit)} ج.م</div>
    </label>
    <label>المتبقي عند التسليم
      <div class="calc" id="proposal-balance-calc">${money(balance)} ج.م</div>
    </label>
    <div class="full proposal-actions">
      <button type="button" id="btn-copy-wa" class="primary">نسخ للواتساب</button>
      <button type="button" id="btn-open-wa" class="ghost">فتح واتساب</button>
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
    });
  });
  const copyBtn = document.getElementById("btn-copy-wa");
  if (copyBtn) copyBtn.onclick = () => { copyProposalWhatsApp(); };
  const openBtn = document.getElementById("btn-open-wa");
  if (openBtn) openBtn.onclick = () => { openProposalWhatsApp(); };
  const addCrmBtn = document.getElementById("btn-add-crm");
  if (addCrmBtn) addCrmBtn.onclick = () => { addProposalToCrm(); };
}


function addDaysISO(iso, days) {
  const [y, m, d] = (iso || localISODate()).split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return localISODate(dt);
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
    renderCrm();
    document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === "crm"));
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === "panel-crm"));
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
  renderCrm();
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === "crm"));
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === "panel-crm"));
  showToast("اتضاف للعملاء — متابعة بعد 3 أيام");
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

function renderCrm() {
  const tbody = document.querySelector("#crm-table tbody");
  tbody.innerHTML = "";
  let overdueCount = 0;
  sortedClientIndexes().forEach(({ c, i }) => {
    const tr = document.createElement("tr");
    const overdue = c.next && ["lead","proposal"].includes(c.status) && c.next < localISODate();
    if (overdue) { tr.classList.add("overdue"); overdueCount += 1; }
    const hint = nextDateHint(c.next);
    tr.innerHTML = `
      <td data-label="الاسم"><input data-i="${i}" data-k="name" value="${esc(c.name)}"></td>
      <td data-label="التواصل"><input data-i="${i}" data-k="contact" value="${esc(c.contact)}"></td>
      <td data-label="المصدر"><input data-i="${i}" data-k="source" value="${esc(c.source)}"></td>
      <td data-label="الحالة"><select data-i="${i}" data-k="status">${STATUS.map(s => `<option value="${s.value}" ${c.status===s.value?"selected":""}>${s.label}</option>`).join("")}</select></td>
      <td data-label="آخر تواصل"><input data-i="${i}" data-k="last" type="date" value="${esc(c.last)}"></td>
      <td data-label="متابعة تالية">
        <input data-i="${i}" data-k="next" type="date" value="${esc(c.next)}">
        ${hint ? `<div class="date-hint${overdue ? " late" : ""}">${hint}</div>` : ""}
      </td>
      <td class="num" data-label="القيمة"><input data-i="${i}" data-k="value" type="number" value="${c.value}"></td>
      <td data-label="ملاحظات"><input data-i="${i}" data-k="notes" value="${esc(c.notes)}"></td>
      <td class="row-actions" data-label="إجراءات">
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
      state.clients[i][k] = el.type === "number" ? n(el.value) : el.value;
      save();
      if (k === "status" || k === "next") renderCrm();
    });
    el.addEventListener("input", () => {
      if (el.tagName === "SELECT") return;
      const i = +el.dataset.i; const k = el.dataset.k;
      state.clients[i][k] = el.type === "number" ? n(el.value) : el.value;
      save();
    });
  });
  tbody.querySelectorAll("[data-del]").forEach((btn) => {
    btn.onclick = () => { state.clients.splice(+btn.dataset.del, 1); save(); renderCrm(); };
  });
  tbody.querySelectorAll("[data-touch]").forEach((btn) => {
    btn.onclick = () => markContacted(+btn.dataset.touch);
  });
}

function weekTotal() {
  return state.week.reduce((sum, w) => sum + n(w.hours), 0);
}

function resetWeek() {
  if (!confirm("أسبوع جديد؟ هنتصفّر المهام والساعات والتسليمات وعلامات «تم».")) return;
  state.week = state.week.map((w) => ({
    day: w.day,
    tasks: "",
    hours: 0,
    deliverables: "",
    done: "☐",
  }));
  save();
  renderWeek();
  showToast("أسبوع جديد جاهز");
}

function renderWeek() {
  const tbody = document.querySelector("#week-table tbody");
  tbody.innerHTML = "";
  const todayName = DAYS[new Date().getDay()];
  state.week.forEach((w, i) => {
    const tr = document.createElement("tr");
    if (w.day === todayName) tr.classList.add("today");
    const dayLabel = w.day === todayName ? `${esc(w.day)} <span class="today-pill">اليوم</span>` : esc(w.day);
    tr.innerHTML = `
      <td>${dayLabel}</td>
      <td><input data-i="${i}" data-k="tasks" value="${esc(w.tasks)}"></td>
      <td class="num"><input data-i="${i}" data-k="hours" type="number" step="0.5" value="${w.hours}"></td>
      <td><input data-i="${i}" data-k="deliverables" value="${esc(w.deliverables)}"></td>
      <td><select data-i="${i}" data-k="done"><option ${w.done==="☐"?"selected":""}>☐</option><option ${w.done==="☑"?"selected":""}>☑</option></select></td>`;
    tbody.appendChild(tr);
  });
  document.getElementById("week-total").textContent = weekTotal();
  tbody.querySelectorAll("input,select").forEach((el) => {
    const handler = () => {
      const i = +el.dataset.i; const k = el.dataset.k;
      state.week[i][k] = el.type === "number" ? n(el.value) : el.value;
      save();
      if (k === "hours") document.getElementById("week-total").textContent = weekTotal();
    };
    el.addEventListener("change", handler);
    el.addEventListener("input", handler);
  });
}

function esc(s) {
  return String(s ?? "").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
}

function wire() {
  bindTabs();
  const newWeekBtn = document.getElementById("btn-new-week");
  if (newWeekBtn) newWeekBtn.onclick = () => { resetWeek(); };
  document.getElementById("add-pricing").onclick = () => {
    state.pricing.push({ type: "", hours: "", rate: "", costs: "", margin: 25, notes: "" });
    save(); renderPricing();
  };
  document.getElementById("add-client").onclick = () => {
    state.clients.push({ name: "", contact: "", source: "", status: "lead", last: "", next: "", value: 0, notes: "" });
    save(); renderCrm();
  };
  document.getElementById("btn-export").onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rattib-data.json";
    a.click();
  };
  document.getElementById("btn-import").onclick = () => document.getElementById("import-file").click();
  document.getElementById("import-file").onchange = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      state = { ...seed(), ...data };
      save(); renderAll();
    } catch { alert("ملف غير صالح"); }
    e.target.value = "";
  };
  document.getElementById("btn-reset").onclick = () => {
    if (!confirm("مسح كل البيانات والرجوع للأمثلة؟")) return;
    state = seed(); save(); renderAll();
  };
  renderAll();
}
function renderAll() { renderPricing(); renderProposal(); renderCrm(); renderWeek(); }
wire();
