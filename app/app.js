const STORAGE_KEY = "rattib-app-v1";
const DEMO_FLAG_KEY = "rattib-demo-seed-v1";
const STATUS = [
  { value: "lead", label: "عميل محتمل" },
  { value: "proposal", label: "عرض سعر" },
  { value: "won", label: "تم الاتفاق" },
  { value: "lost", label: "خسارة" },
];
const DAYS = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

const APP_TZ = "Africa/Cairo";

/** Calendar date in Africa/Cairo (YYYY-MM-DD), not the browser/machine local TZ. */
function localISODate(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** 0=Sunday … 6=Saturday in Africa/Cairo. */
function cairoDayOfWeek(d = new Date()) {
  const wd = new Intl.DateTimeFormat("en-US", { timeZone: APP_TZ, weekday: "short" }).format(d);
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd] ?? d.getDay();
}

function isoDay(offset = 0) {
  // Noon UTC then shift by calendar days in Cairo via ISO string math
  const base = localISODate();
  const [y, m, day] = base.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, day + offset, 12, 0, 0));
  return localISODate(dt);
}

const seed = () => ({
  fx: 50,
  pricing: [
    { type: "صفحة هبوط (Landing)", hours: 20, rate: 250, costs: 500, margin: 25, notes: "تصميم + فورم + تسليم ملفات" },
    { type: "لوحة تحكم بسيطة", hours: 45, rate: 280, costs: 1200, margin: 30, notes: "CRUD + صلاحيات أساسية" },
    { type: "تكامل API", hours: 16, rate: 300, costs: 200, margin: 25, notes: "ربط بوابة دفع أو خدمة خارجية" },
    { type: "إصلاح باج / ساعة طوارئ", hours: 4, rate: 350, costs: 0, margin: 20, notes: "حد أدنى ساعة واحدة" },
    { type: "موقع تعريفي 5 صفحات", hours: 35, rate: 260, costs: 800, margin: 25, notes: "محتوى من العميل + SEO أساسي" },
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

/** True while showing first-visit / reset demo seed (no user-owned save yet). */
let showingDemoSeed = false;

/** True if iso looks like YYYY-MM-DD. */
function isISODate(iso) {
  return !!iso && /^\d{4}-\d{2}-\d{2}$/.test(String(iso));
}

/** Calendar-day difference a − b (Cairo ISO dates), or null if either invalid. */
function demoIsoDayDiff(a, b) {
  if (!isISODate(a) || !isISODate(b)) return null;
  const [y0, m0, d0] = String(a).split("-").map(Number);
  const [y1, m1, d1] = String(b).split("-").map(Number);
  const t0 = Date.UTC(y0, m0 - 1, d0, 12);
  const t1 = Date.UTC(y1, m1 - 1, d1, 12);
  return Math.round((t0 - t1) / 86400000);
}

/**
 * Canonical fingerprint of demo-stable (non-date) fields.
 * Omits proposal/client calendar dates so a pristine seed saved on an earlier
 * day still matches today's seed(); content edits do not.
 */
function demoSeedFingerprint(s) {
  const p = s.proposal || {};
  return JSON.stringify({
    fx: s.fx,
    pricing: s.pricing,
    proposal: {
      client: p.client,
      contact: p.contact,
      project: p.project,
      summary: p.summary,
      inScope: p.inScope,
      outScope: p.outScope,
      duration: p.duration,
      price: p.price,
      depositPct: p.depositPct,
      revisions: p.revisions,
      payments: p.payments,
      terms: p.terms,
      next: p.next,
    },
    clients: (s.clients || []).map((c) => ({
      name: c.name,
      contact: c.contact,
      source: c.source,
      status: c.status,
      value: c.value,
      notes: c.notes,
    })),
    week: s.week,
  });
}

/**
 * Date fields must be empty in the same places as seed(), and every present
 * ISO date must share one uniform day-shift vs today's seed (0 = same day,
 * -1 = seeded yesterday, …). A single edited next/last/date breaks the shift.
 */
function demoDatesAligned(data, seeded) {
  const pairs = [
    [data.proposal?.date, seeded.proposal?.date],
    [data.proposal?.validUntil, seeded.proposal?.validUntil],
  ];
  const n = Math.max((data.clients || []).length, (seeded.clients || []).length);
  for (let i = 0; i < n; i++) {
    pairs.push([data.clients?.[i]?.last, seeded.clients?.[i]?.last]);
    pairs.push([data.clients?.[i]?.next, seeded.clients?.[i]?.next]);
  }
  let shift = null;
  for (const [a, b] of pairs) {
    const aOk = isISODate(a);
    const bOk = isISODate(b);
    if (!aOk && !bOk) continue;
    if (aOk !== bOk) return false;
    const d = demoIsoDayDiff(a, b);
    if (d == null) return false;
    if (shift === null) shift = d;
    else if (d !== shift) return false;
  }
  return true;
}

function matchesCurrentDemoSeed(data) {
  try {
    const seeded = seed();
    return (
      demoSeedFingerprint(data) === demoSeedFingerprint(seeded) &&
      demoDatesAligned(data, seeded)
    );
  } catch {
    return false;
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      showingDemoSeed = true;
      return seed();
    }
    const data = normalizeImportedState(JSON.parse(raw));
    const flagOn = localStorage.getItem(DEMO_FLAG_KEY) === "1";
    if (flagOn) {
      showingDemoSeed = true;
    } else if (matchesCurrentDemoSeed(data)) {
      // pre-#84 seed (or flag lost) still matches current seed → restore chip
      showingDemoSeed = true;
      try { localStorage.setItem(DEMO_FLAG_KEY, "1"); } catch { /* private mode */ }
    } else {
      showingDemoSeed = false;
    }
    return data;
  } catch {
    showingDemoSeed = true;
    return seed();
  }
}
let persistPauseDepth = 0;
function save() {
  if (persistPauseDepth > 0) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (showingDemoSeed) {
    showingDemoSeed = false;
    localStorage.removeItem(DEMO_FLAG_KEY);
    paintDemoChip();
  }
}

/** Persist demo seed + flag so reload keeps «بيانات تجريبية» until a real user edit/import. */
function persistDemoSeed() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(DEMO_FLAG_KEY, "1");
  showingDemoSeed = true;
  paintDemoChip();
}

function paintDemoChip() {
  const el = document.getElementById("demo-seed-chip");
  if (!el) return;
  el.hidden = !showingDemoSeed;
  paintBackupNudge();
}

/** Days between an ISO date and today (Cairo calendar), or Infinity if missing/invalid. */
function daysSinceISO(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(String(iso))) return Infinity;
  const today = localISODate();
  const [y0, m0, d0] = String(iso).split("-").map(Number);
  const [y1, m1, d1] = today.split("-").map(Number);
  const t0 = Date.UTC(y0, m0 - 1, d0, 12);
  const t1 = Date.UTC(y1, m1 - 1, d1, 12);
  return Math.round((t1 - t0) / 86400000);
}

/** Soft backup reminder: real (non-demo) data + never exported or ≥7 days since last export. */
function paintBackupNudge() {
  const el = document.getElementById("backup-nudge");
  if (!el) return;
  if (showingDemoSeed) {
    el.hidden = true;
    return;
  }
  const ui = loadUi();
  const last = ui.lastExportAt;
  const stale = !last || daysSinceISO(last) >= 7;
  const dismissedUntil = ui.backupNudgeDismissedUntil;
  const today = localISODate();
  const dismissOk = !dismissedUntil || today >= String(dismissedUntil);
  el.hidden = !(stale && dismissOk);
}

function doExport() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  const stamp = localISODate();
  const filename = `rattib-${stamp}.json`;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  saveUi({ lastExportAt: stamp });
  paintBackupNudge();
  showToast(`اتصدر ${filename}`);
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
const CRM_FILTER_IDS = ["all", "today", "overdue", "none", "lead", "proposal", "won", "lost"];

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

function dismissToast() {
  const toast = document.getElementById("toast");
  if (!toast || toast.hidden) return false;
  clearTimeout(toast._t);
  toast.hidden = true;
  return true;
}

function paintCrmSearchClear() {
  const clearBtn = document.getElementById("crm-search-clear");
  if (!clearBtn) return;
  clearBtn.hidden = !(crmQuery || "").trim();
}

function clearCrmSearch() {
  const search = document.getElementById("crm-search");
  crmQuery = "";
  if (search) search.value = "";
  paintCrmSearchClear();
  renderCrm();
  if (search) search.focus();
}

function setCrmFilter(id) {
  if (!CRM_FILTER_IDS.includes(id)) return;
  crmFilter = id;
  saveUi({ crmFilter });
  paintCrmFilterChips();
  renderCrm();
}

const CRM_FILTER_LABELS = {
  all: "الكل",
  today: "النهاردة",
  overdue: "متأخر",
  none: "بدون موعد",
  lead: "عميل محتمل",
  proposal: "عرض سعر",
  won: "تم الاتفاق",
  lost: "خسارة",
};

/** Count clients for a chip given current search (ignore selected filter). */
function clientNeedsNext(c) {
  return !!(["lead", "proposal"].includes(c.status) && !String(c.next || "").trim());
}

function crmFilterCount(filterId) {
  return state.clients.filter((c) => {
    if (!clientMatchesQuery(c)) return false;
    if (filterId === "all") return true;
    if (filterId === "today") return clientIsDueToday(c);
    if (filterId === "overdue") return clientIsOverdue(c);
    if (filterId === "none") return clientNeedsNext(c);
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
  const overdueBadge = document.getElementById("crm-overdue-badge");
  if (overdueBadge) {
    overdueBadge.addEventListener("click", (e) => {
      e.stopPropagation();
      setCrmFilter("overdue");
      goTab("crm");
      showToast("تصفية المتأخرين");
    });
  }
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
        <button type="button" class="ghost tiny" data-copy-row="${i}" title="نسخ صف التسعير كنص عربي">نسخ نص</button>
        <button type="button" class="ghost tiny" data-dup="${i}" title="كرّر الصف تحتها">كرّر</button>
        <button type="button" class="icon-btn" data-del="${i}">✕</button>
      </td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("input").forEach((inp) => {
    inp.addEventListener("input", () => {
      const i = +inp.dataset.i; const k = inp.dataset.k;
      const row = state.pricing[i];
      if (!row) return;
      row[k] = inp.type === "number" ? (inp.value === "" ? "" : n(inp.value)) : inp.value;
      save();
      if (["hours","rate","costs","margin"].includes(k)) {
        const tr = tbody.querySelector(`tr[data-row="${i}"]`);
        if (tr) paintPricingCalcs(tr, row);
      }
      paintClearBlankPricingBtn();
    });
  });
  tbody.querySelectorAll("[data-use]").forEach((btn) => {
    btn.onclick = () => {
      const row = state.pricing[+btn.dataset.use];
      const c = pricingCalcs(row);
      if (c.empty) { alert("املأ الساعات وسعر الساعة أولاً"); return; }
      const previous = JSON.parse(JSON.stringify(state.proposal));
      state.proposal.project = row.type || state.proposal.project;
      state.proposal.price = Math.round(c.price);
      if (row.notes) state.proposal.summary = row.notes;
      save();
      goTab("proposal");
      renderProposal();
      offerProposalAfterPricingToast("اتنقل لعرض السعر بالسعر المحسوب", previous);
    };
  });
  tbody.querySelectorAll("[data-copy-row]").forEach((btn) => {
    btn.onclick = () => { copyPricingRow(+btn.dataset.copyRow); };
  });
  tbody.querySelectorAll("[data-dup]").forEach((btn) => {
    btn.onclick = () => duplicatePricingRow(+btn.dataset.dup);
  });
  tbody.querySelectorAll("[data-del]").forEach((btn) => {
    btn.onclick = () => deletePricingRow(+btn.dataset.del);
  });
  paintPricingTotals();
  paintClearBlankPricingBtn();
}


function fillProposalFromPricing() {
  const t = pricingTotals();
  if (t.n === 0) {
    alert("املأ صف تسعير واحد على الأقل (ساعات وسعر الساعة) أولاً");
    return;
  }
  const previous = JSON.parse(JSON.stringify(state.proposal));
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
  offerProposalAfterPricingToast(`اتنقل إجمالي التسعير: ${money(price)} ج.م`, previous);
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
  const actions = Array.isArray(opts.actions) && opts.actions.length
    ? opts.actions
    : (opts.actionLabel && typeof opts.onAction === "function"
      ? [{ label: opts.actionLabel, onAction: opts.onAction }]
      : []);
  for (const a of actions) {
    if (!a || !a.label || typeof a.onAction !== "function") continue;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toast-action";
    btn.textContent = a.label;
    btn.onclick = () => {
      clearTimeout(toast._t);
      toast.hidden = true;
      a.onAction();
    };
    toast.appendChild(btn);
  }
  toast.hidden = false;
  clearTimeout(toast._t);
  const ms = opts.ms != null ? opts.ms : (actions.length ? 6000 : 2200);
  toast._t = setTimeout(() => { toast.hidden = true; }, ms);
}

/** After pricing → proposal: offer نسخ للواتساب + تراجع (closes pricing→proposal→WA loop). */
function offerProposalAfterPricingToast(msg, previous) {
  showToast(msg, {
    ms: 8000,
    actions: [
      {
        label: "نسخ للواتساب",
        onAction: () => { copyProposalWhatsApp(); },
      },
      {
        label: "تراجع",
        onAction: () => {
          state.proposal = previous;
          save();
          renderProposal();
          showToast("رجع عرض السعر زي ما كان");
        },
      },
    ],
  });
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
  showToast(label, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      const removeAt = state.pricing.indexOf(copy);
      if (removeAt < 0) return;
      state.pricing.splice(removeAt, 1);
      save();
      renderPricing();
      showToast("اتلغت النسخة");
    },
  });
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

function blankPricingIndices() {
  return state.pricing
    .map((row, i) => (isBlankPricingRow(row) ? i : -1))
    .filter((i) => i >= 0);
}

function clearBlankPricingRows() {
  const idxs = blankPricingIndices();
  if (!idxs.length) {
    showToast("مفيش صفوف فاضية تتشال");
    return;
  }
  // Snapshot full list so undo restores order + blanks exactly.
  const previous = state.pricing.map((row) => ({ ...row }));
  const kept = state.pricing.filter((row) => !isBlankPricingRow(row));
  // Keep at least one blank row so the table isn't empty after a clean sweep.
  if (kept.length === 0) {
    kept.push({ type: "", hours: "", rate: "", costs: "", margin: 25, notes: "" });
  }
  state.pricing = kept;
  save();
  renderPricing();
  const n = previous.length - state.pricing.length;
  if (n <= 0) {
    showToast("مفيش صفوف فاضية تتشال");
    return;
  }
  showToast(`اتمسح ${n} صف فاضي`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      state.pricing = previous.map((row) => ({ ...row }));
      save();
      renderPricing();
      showToast("رجعت صفوف التسعير");
    },
  });
}

function paintClearBlankPricingBtn() {
  const btn = document.getElementById("btn-clear-blank-pricing");
  if (!btn) return;
  const n = blankPricingIndices().length;
  // Hide when nothing blank, or when every row is blank and we'd only leave one blank.
  const allBlank = n > 0 && n === state.pricing.length;
  const removable = allBlank ? Math.max(0, n - 1) : n;
  btn.hidden = removable === 0;
  btn.title = removable
    ? `احذف ${removable} صف تسعير فاضي`
    : "مفيش صفوف فاضية";
}

function blankClientIndices() {
  return state.clients
    .map((c, i) => (isBlankClient(c) ? i : -1))
    .filter((i) => i >= 0);
}

function clearBlankClients() {
  const idxs = blankClientIndices();
  if (!idxs.length) {
    showToast("مفيش عملاء فاضي");
    return;
  }
  // Snapshot full list so undo restores order + blanks exactly.
  const previous = state.clients.map((c) => ({ ...c }));
  const kept = state.clients.filter((c) => !isBlankClient(c));
  // Keep at least one blank client so the list isn't empty after a clean sweep.
  if (kept.length === 0) {
    kept.push({ name: "", contact: "", source: "", status: "lead", last: "", next: "", value: 0, notes: "" });
  }
  state.clients = kept;
  save();
  renderCrm();
  const n = previous.length - state.clients.length;
  if (n <= 0) {
    showToast("مفيش عملاء فاضي");
    return;
  }
  showToast(`اتمسح ${n} عميل فاضي`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      state.clients = previous.map((c) => ({ ...c }));
      save();
      renderCrm();
      showToast("رجعت العملاء");
    },
  });
}

function paintClearBlankClientsBtn() {
  const btn = document.getElementById("btn-clear-blank-clients");
  if (!btn) return;
  const n = blankClientIndices().length;
  // Hide when nothing blank, or when every client is blank and we'd only leave one blank.
  const allBlank = n > 0 && n === state.clients.length;
  const removable = allBlank ? Math.max(0, n - 1) : n;
  btn.hidden = removable === 0;
  btn.title = removable
    ? `احذف ${removable} عميل فاضي`
    : "مفيش عملاء فاضي";
}

function duplicateClient(i) {
  if (i < 0 || i >= state.clients.length) return;
  const src = state.clients[i];
  const copy = {
    name: src.name ?? "",
    contact: src.contact ?? "",
    source: src.source ?? "",
    status: ["lead", "proposal", "won", "lost"].includes(src.status) ? src.status : "lead",
    last: src.last ?? "",
    next: src.next ?? "",
    value: n(src.value),
    notes: src.notes ?? "",
  };
  // Fresh follow-up window for the clone (keep status/value/notes/contact).
  if (["lead", "proposal"].includes(copy.status) && !copy.next) {
    copy.next = isoDay(3);
  }
  const at = i + 1;
  state.clients.splice(at, 0, copy);
  save();
  renderCrm();
  const label = (copy.name && String(copy.name).trim())
    ? `اتنسخ «${copy.name}»`
    : "اتنسخ العميل";
  showToast(label, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      const removeAt = state.clients.indexOf(copy);
      if (removeAt < 0) return;
      state.clients.splice(removeAt, 1);
      save();
      renderCrm();
      showToast("اتلغت النسخة");
    },
  });
}

function deleteClient(i) {
  // No confirm — same as deletePricingRow; toast «تراجع» restores the client.
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

/** After proposal WhatsApp copy/open: offer أضف للعملاء when client name is set (CRM WA → تواصلت parity). */
function offerProposalAddToCrmToast(msg) {
  const name = String(state.proposal?.client || "").trim();
  if (!name) {
    showToast(msg);
    return;
  }
  showToast(msg, {
    actionLabel: "أضف للعملاء",
    ms: 8000,
    onAction: () => addProposalToCrm(),
  });
}

async function copyProposalWhatsApp(opts = {}) {
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
  if (opts.silent) return;
  offerProposalAddToCrmToast("تم نسخ العرض — الصقه في واتساب");
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
    copyProposalWhatsApp({ silent: true });
    window.open(base, "_blank", "noopener,noreferrer");
    offerProposalAddToCrmToast(phone
      ? "العرض طويل — اتنسخ، الصقه في واتساب للعميل"
      : "العرض طويل — اتنسخ، الصقه في واتساب");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
  offerProposalAddToCrmToast(phone
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
  if (crmFilter === "none") return clientNeedsNext(c);
  return c.status === crmFilter;
}

function crmSortKey(c) {
  const overdue = clientIsOverdue(c);
  const dueToday = clientIsDueToday(c);
  const needsNext = clientNeedsNext(c);
  const next = c.next || "9999-99-99";
  // overdue → today → missing next (active) → everyone else by next date
  const tier = overdue ? 0 : (dueToday ? 1 : (needsNext ? 2 : 3));
  return [tier, next, (c.name || "").toLowerCase()];
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
    const prev = {
      contact: c.contact,
      value: c.value,
      notes: c.notes,
      status: c.status,
      last: c.last,
      next: c.next,
    };
    if (contact) c.contact = contact;
    if (value) c.value = value;
    if (notes) c.notes = notes;
    c.status = c.status === "lost" ? "proposal" : (c.status === "won" ? c.status : "proposal");
    c.last = localISODate();
    c.next = addDaysISO(c.last, 3);
    save();
    revealClientInCrm(idx);
    renderCrm();
    showToast("اتحدّث العميل في المتابعة", {
      actionLabel: "تراجع",
      ms: 6000,
      onAction: () => {
        if (state.clients[idx] !== c) return;
        c.contact = prev.contact;
        c.value = prev.value;
        c.notes = prev.notes;
        c.status = prev.status;
        c.last = prev.last;
        c.next = prev.next;
        save();
        renderCrm();
        showToast("اتلغى تحديث العميل من العرض");
      },
    });
    return;
  }
  const copy = {
    name,
    contact,
    source: "عرض سعر",
    status: "proposal",
    last: localISODate(),
    next: addDaysISO(localISODate(), 3),
    value,
    notes,
  };
  state.clients.push(copy);
  save();
  revealClientInCrm(state.clients.length - 1);
  renderCrm();
  showToast("اتضاف للعملاء — متابعة بعد 3 أيام", {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      const at = state.clients.indexOf(copy);
      if (at < 0) return;
      state.clients.splice(at, 1);
      save();
      renderCrm();
      showToast("اتشال العميل من المتابعة");
    },
  });
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
  // Offer تواصلت so the freelancer can close the loop without hunting the row button.
  // Match the row UI: no mark-contacted affordance once already won.
  if (c.status === "won") {
    showToast("اتفتح واتساب بمسودة متابعة — راجع قبل الإرسال");
    return;
  }
  showToast("اتفتح واتساب بمسودة متابعة — راجع قبل الإرسال", {
    actionLabel: "تواصلت",
    ms: 8000,
    onAction: () => markContacted(i),
  });
}

function markContacted(i) {
  const c = state.clients[i];
  if (!c) return;
  const prev = { last: c.last, next: c.next, status: c.status };
  c.last = localISODate();
  c.next = addDaysISO(c.last, 3);
  if (c.status === "lost") c.status = "lead";
  save();
  renderCrm();
  showToast("اتسجّل تواصل — المتابعة بعد 3 أيام", {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      if (state.clients[i] !== c) return;
      c.last = prev.last;
      c.next = prev.next;
      c.status = prev.status;
      save();
      renderCrm();
      showToast("اتلغى تسجيل التواصل");
    },
  });
}

function snoozeClient(i, days) {
  const c = state.clients[i];
  if (!c) return;
  const d = Math.max(1, Math.min(30, Number(days) || 3));
  const today = localISODate();
  // From today if overdue/empty; otherwise push from the scheduled next date
  const base = c.next && c.next >= today ? c.next : today;
  const prevNext = c.next;
  c.next = addDaysISO(base, d);
  save();
  renderCrm();
  const label = d === 7 ? "اتأجلت المتابعة أسبوع" : `اتأجلت المتابعة ${d} أيام`;
  showToast(label, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      if (state.clients[i] !== c) return;
      c.next = prevNext;
      save();
      renderCrm();
      showToast("اتلغى التأجيل");
    },
  });
}

function snoozeVisibleClients(days) {
  const d = Math.max(1, Math.min(30, Number(days) || 3));
  const today = localISODate();
  const targets = visibleCrmClients().filter(({ c }) => ["lead", "proposal"].includes(c.status));
  if (!targets.length) return;
  const snapshots = targets.map(({ c, i }) => ({ c, i, prevNext: c.next }));
  snapshots.forEach(({ c }) => {
    const base = c.next && c.next >= today ? c.next : today;
    c.next = addDaysISO(base, d);
  });
  save();
  renderCrm();
  const n = snapshots.length;
  const label = d === 7
    ? `اتأجلت المتابعة أسبوع لـ ${n} عميل`
    : `اتأجلت المتابعة ${d} أيام لـ ${n} عميل`;
  showToast(label, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      snapshots.forEach(({ c, i, prevNext }) => {
        if (state.clients[i] !== c) return;
        c.next = prevNext;
      });
      save();
      renderCrm();
      showToast("اتلغى التأجيل الجماعي");
    },
  });
}

function setClientNextToday(i) {
  const c = state.clients[i];
  if (!c) return;
  if (!["lead", "proposal"].includes(c.status)) return;
  const prevNext = c.next;
  c.next = localISODate();
  save();
  renderCrm();
  showToast("المتابعة بقت النهاردة", {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      if (state.clients[i] !== c) return;
      c.next = prevNext;
      save();
      renderCrm();
      showToast("اتلغى تعيين النهاردة");
    },
  });
}

function setVisibleClientsNextToday() {
  const targets = visibleCrmClients().filter(({ c }) => ["lead", "proposal"].includes(c.status));
  if (!targets.length) return;
  const snapshots = targets.map(({ c, i }) => ({ c, i, prevNext: c.next }));
  const today = localISODate();
  snapshots.forEach(({ c }) => {
    c.next = today;
  });
  save();
  renderCrm();
  const n = snapshots.length;
  showToast(`المتابعة بقت النهاردة لـ ${n} عميل`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      snapshots.forEach(({ c, i, prevNext }) => {
        if (state.clients[i] !== c) return;
        c.next = prevNext;
      });
      save();
      renderCrm();
      showToast("اتلغى تعيين النهاردة الجماعي");
    },
  });
}


function clearVisibleClientsNext() {
  const targets = visibleCrmClients().filter(({ c }) =>
    ["lead", "proposal"].includes(c.status) && String(c.next || "").trim()
  );
  if (!targets.length) {
    showToast("مفيش مواعيد ظاهرة تتشال");
    return;
  }
  const snapshots = targets.map(({ c, i }) => ({ c, i, prevNext: c.next }));
  snapshots.forEach(({ c }) => {
    c.next = "";
  });
  save();
  renderCrm();
  const n = snapshots.length;
  showToast(`اتشال موعد المتابعة لـ ${n} عميل`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      snapshots.forEach(({ c, i, prevNext }) => {
        if (state.clients[i] !== c) return;
        c.next = prevNext;
      });
      save();
      renderCrm();
      showToast("اترجع مواعيد المتابعة");
    },
  });
}


function markVisibleContacted() {
  const targets = visibleCrmClients().filter(({ c }) =>
    ["lead", "proposal"].includes(c.status) && (clientIsOverdue(c) || clientIsDueToday(c))
  );
  if (!targets.length) {
    showToast("مفيش ظاهرين متأخرين أو النهاردة يتسجّل لهم تواصل");
    return;
  }
  const snapshots = targets.map(({ c, i }) => ({
    c,
    i,
    prevLast: c.last,
    prevNext: c.next,
    prevStatus: c.status,
  }));
  const today = localISODate();
  snapshots.forEach(({ c }) => {
    c.last = today;
    c.next = addDaysISO(today, 3);
  });
  save();
  renderCrm();
  const n = snapshots.length;
  showToast(`اتسجّل تواصل لـ ${n} عميل — المتابعة بعد 3 أيام`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      snapshots.forEach(({ c, i, prevLast, prevNext, prevStatus }) => {
        if (state.clients[i] !== c) return;
        c.last = prevLast;
        c.next = prevNext;
        c.status = prevStatus;
      });
      save();
      renderCrm();
      showToast("اتلغى تسجيل التواصل الجماعي");
    },
  });
}

function appendPipelineJump(el, filterId, count, label, title, toastMsg) {
  if (!count || crmFilter === filterId) return;
  el.append(document.createTextNode(" · "));
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "pipeline-jump";
  btn.textContent = label;
  btn.title = title;
  btn.onclick = () => {
    setCrmFilter(filterId);
    showToast(toastMsg);
  };
  el.appendChild(btn);
}

function paintCrmPipeline(visible) {
  const el = document.getElementById("crm-pipeline");
  if (!el) return;
  const overdueN = crmFilterCount("overdue");
  const todayN = crmFilterCount("today");
  const noneN = crmFilterCount("none");
  // Keep jumps reachable even when the current filter/search is empty.
  if (!visible.length) {
    if (!overdueN && !todayN && !noneN) {
      el.hidden = true;
      el.replaceChildren();
      return;
    }
    el.replaceChildren();
    el.append(document.createTextNode("مفيش ظاهر في التصفية دي"));
    appendPipelineJump(el, "overdue", overdueN, `${overdueN} متأخر`, "عرض المتابعات المتأخرة", "تصفية المتابعات المتأخرة");
    appendPipelineJump(el, "today", todayN, `${todayN} متابعة النهاردة`, "عرض متابعات النهاردة", "تصفية متابعات النهاردة");
    appendPipelineJump(el, "none", noneN, `${noneN} بدون موعد`, "عرض العملاء من غير متابعة تالية", "تصفية بدون موعد");
    el.hidden = false;
    return;
  }
  const sum = visible.reduce((acc, { c }) => acc + n(c.value), 0);
  // Respect current search, same as chip counts.
  el.replaceChildren();
  el.append(document.createTextNode(`الظاهر: ${visible.length} · قيمة ${money(sum)} ج.م`));
  // Overdue first, then today, then missing next — parity jumps.
  appendPipelineJump(el, "overdue", overdueN, `${overdueN} متأخر`, "عرض المتابعات المتأخرة", "تصفية المتابعات المتأخرة");
  appendPipelineJump(el, "today", todayN, `${todayN} متابعة النهاردة`, "عرض متابعات النهاردة", "تصفية متابعات النهاردة");
  appendPipelineJump(el, "none", noneN, `${noneN} بدون موعد`, "عرض العملاء من غير متابعة تالية", "تصفية بدون موعد");
  el.hidden = false;
}


function onClientStatusChange(i, prev, nextStatus) {
  const c = state.clients[i];
  if (!c || prev === nextStatus) return;
  const prevNext = c.next;
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
  if (!toast) return;
  showToast(toast, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      if (state.clients[i] !== c) return;
      c.status = prev;
      c.next = prevNext;
      save();
      renderCrm();
      showToast("اتلغى تغيير الحالة");
    },
  });
}


function paintSnoozeVisibleBtn() {
  const snoozeBtn = document.getElementById("btn-snooze-visible");
  const snooze7Btn = document.getElementById("btn-snooze7-visible");
  const todayBtn = document.getElementById("btn-today-visible");
  const clearNextBtn = document.getElementById("btn-clear-next-visible");
  const markContactedBtn = document.getElementById("btn-mark-contacted-visible");
  const active = visibleCrmClients().filter(({ c }) => ["lead", "proposal"].includes(c.status));
  const n = active.length;
  const nDated = active.filter(({ c }) => String(c.next || "").trim()).length;
  const nDue = active.filter(({ c }) => clientIsOverdue(c) || clientIsDueToday(c)).length;
  const hide = n === 0;
  if (snoozeBtn) {
    snoozeBtn.hidden = hide;
    snoozeBtn.title = n
      ? `تأجيل المتابعة 3 أيام لـ ${n} عميل ظاهر (عميل محتمل / عرض سعر)`
      : "تأجيل المتابعة 3 أيام لكل العملاء الظاهرين (عميل محتمل / عرض سعر)";
  }
  if (snooze7Btn) {
    snooze7Btn.hidden = hide;
    snooze7Btn.title = n
      ? `تأجيل المتابعة أسبوع لـ ${n} عميل ظاهر (عميل محتمل / عرض سعر)`
      : "تأجيل المتابعة أسبوع لكل العملاء الظاهرين (عميل محتمل / عرض سعر)";
  }
  if (todayBtn) {
    todayBtn.hidden = hide;
    todayBtn.title = n
      ? `تعيين المتابعة لليوم لـ ${n} عميل ظاهر (عميل محتمل / عرض سعر)`
      : "تعيين المتابعة لليوم لكل العملاء الظاهرين (عميل محتمل / عرض سعر)";
  }
  if (clearNextBtn) {
    clearNextBtn.hidden = nDated === 0;
    clearNextBtn.title = nDated
      ? `مسح موعد المتابعة لـ ${nDated} عميل ظاهر (عميل محتمل / عرض سعر)`
      : "مسح موعد المتابعة لكل العملاء الظاهرين (عميل محتمل / عرض سعر)";
  }
  if (markContactedBtn) {
    markContactedBtn.hidden = nDue === 0;
    markContactedBtn.title = nDue
      ? `تسجيل تواصل لليوم + متابعة بعد 3 أيام لـ ${nDue} عميل ظاهر (متأخر / النهاردة)`
      : "تسجيل تواصل لليوم + متابعة بعد 3 أيام للظاهرين المستحقين (متأخر / النهاردة)";
  }
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
          : crmFilter === "none"
            ? "كل العملاء النشطين عندهم موعد متابعة — تمام."
            : "مفيش عملاء في التصفية دي — جرّب «الكل» أو ضيف عميل.";
  }
  if (wrap) wrap.hidden = visible.length === 0;
  paintCrmPipeline(visible);
  paintCrmFilterChips();
  paintCrmSearchClear();
  paintSnoozeVisibleBtn();
  paintClearBlankClientsBtn();
  // badge counts all overdue, not just filtered
  state.clients.forEach((c) => { if (clientIsOverdue(c)) overdueCount += 1; });
  visible.forEach(({ c, i }) => {
    const tr = document.createElement("tr");
    const overdue = clientIsOverdue(c);
    const dueToday = clientIsDueToday(c);
    if (overdue) tr.classList.add("overdue");
    else if (dueToday) tr.classList.add("due-today");
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
      <td data-label="متابعة تالية" class="${["won","lost"].includes(c.status) ? "next-closed" : ""}">
        ${["won","lost"].includes(c.status)
          ? `<span class="muted next-na">—</span>`
          : `<input data-i="${i}" data-k="next" type="date" lang="ar-EG" title="اليوم / الشهر / السنة" value="${esc(c.next)}">
        ${c.next && formatArDate(c.next) ? `<div class="date-hint">${formatArDate(c.next)}</div>` : ""}
        ${hint ? `<div class="date-hint${overdue ? " late" : ""}">${hint}</div>` : ""}
        ${snoozeHtml}`}
      </td>
      <td class="num" data-label="القيمة"><input data-i="${i}" data-k="value" type="number" value="${c.value}"></td>
      <td data-label="ملاحظات"><input data-i="${i}" data-k="notes" value="${esc(c.notes)}"></td>
      <td class="row-actions" data-label="إجراءات">
        ${whatsappPhone(c.contact) ? `<button type="button" class="ghost tiny" data-wa="${i}" title="فتح واتساب">واتساب</button>` : ""}
        ${c.status !== "won" ? `<button type="button" class="ghost tiny" data-touch="${i}">تواصلت</button>` : ""}
        <button type="button" class="ghost tiny" data-copy-card="${i}" title="نسخ بطاقة العميل كنص عربي">نسخ نص</button>
        <button type="button" class="ghost tiny" data-dup="${i}" title="كرّر العميل تحتها">كرّر</button>
        <button type="button" class="icon-btn" data-del="${i}">✕</button>
      </td>`;
    tbody.appendChild(tr);
  });
  const badge = document.getElementById("crm-overdue-badge");
  if (badge) {
    badge.hidden = overdueCount === 0;
    badge.textContent = overdueCount ? `${overdueCount} متأخر` : "";
  }
  paintCrmValueTotals();
  tbody.querySelectorAll("input,select").forEach((el) => {
    el.addEventListener("change", () => {
      const i = +el.dataset.i; const k = el.dataset.k;
      const client = state.clients[i];
      if (!client) return;
      const prevStatus = k === "status" ? client.status : null;
      client[k] = el.type === "number" ? n(el.value) : el.value;
      save();
      if (k === "status") {
        onClientStatusChange(i, prevStatus, client.status);
        return;
      }
      if (k === "next" || k === "last" || k === "contact") renderCrm();
    });
    el.addEventListener("input", () => {
      if (el.tagName === "SELECT") return;
      const i = +el.dataset.i; const k = el.dataset.k;
      const client = state.clients[i];
      if (!client) return;
      client[k] = el.type === "number" ? n(el.value) : el.value;
      save();
      if (k === "value") paintCrmValueTotals();
    });
  });
  tbody.querySelectorAll("[data-del]").forEach((btn) => {
    btn.onclick = () => deleteClient(+btn.dataset.del);
  });
  tbody.querySelectorAll("[data-copy-card]").forEach((btn) => {
    btn.onclick = () => copyClientCard(+btn.dataset.copyCard);
  });
  tbody.querySelectorAll("[data-dup]").forEach((btn) => {
    btn.onclick = () => duplicateClient(+btn.dataset.dup);
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



function crmVisibleValueTotals() {
  return visibleCrmClients().reduce((acc, { c }) => {
    acc.n += 1;
    const v = n(c.value);
    if (v) acc.withValue += 1;
    acc.sum += v;
    return acc;
  }, { n: 0, withValue: 0, sum: 0 });
}

function paintCrmValueTotals() {
  const foot = document.getElementById("crm-tfoot");
  if (!foot) return;
  const t = crmVisibleValueTotals();
  if (t.n === 0) {
    foot.hidden = true;
    return;
  }
  foot.hidden = false;
  const count = document.getElementById("crm-value-count");
  if (count) {
    const filterLabel = CRM_FILTER_LABELS[crmFilter] || crmFilter;
    count.textContent = t.withValue
      ? `(${t.withValue} بقيمة · ${t.n} ظاهر · ${filterLabel})`
      : `(${t.n} ظاهر · ${filterLabel})`;
  }
  const el = document.getElementById("crm-tot-value");
  if (el) el.textContent = `${money(t.sum)} ج.م`;
}

function statusLabel(value) {
  const hit = STATUS.find((s) => s.value === value);
  return hit ? hit.label : String(value || "");
}

function visibleCrmClients() {
  return sortedClientIndexes().filter(({ c }) => clientMatchesFilter(c));
}


function clientCardPlainText(c) {
  const name = String(c.name || "").trim() || "بدون اسم";
  const lines = [
    "متابعة عميل — رتّب",
    "",
  ];
  let head = `• ${name} (${statusLabel(c.status)})`;
  const hint = nextDateHint(c.next);
  const nextAr = formatArDate(c.next);
  if (hint) head += ` — ${hint}`;
  else if (nextAr) head += ` — ${nextAr}`;
  lines.push(head);
  const contact = String(c.contact || "").trim();
  if (contact) lines.push(`  التواصل: ${contact}`);
  const source = String(c.source || "").trim();
  if (source) lines.push(`  المصدر: ${source}`);
  const lastAr = formatArDate(c.last);
  if (lastAr) lines.push(`  آخر تواصل: ${lastAr}`);
  else if (String(c.last || "").trim()) lines.push(`  آخر تواصل: ${c.last}`);
  if (nextAr && !["won", "lost"].includes(c.status)) lines.push(`  متابعة تالية: ${nextAr}`);
  else if (String(c.next || "").trim() && !["won", "lost"].includes(c.status)) lines.push(`  متابعة تالية: ${c.next}`);
  if (n(c.value)) lines.push(`  القيمة: ${money(c.value)} ج.م`);
  const notes = String(c.notes || "").trim();
  if (notes) lines.push(`  ملاحظات: ${notes}`);
  return lines.join("\n");
}

async function copyClientCard(i) {
  const c = state.clients[i];
  if (!c) return;
  await copyTextToClipboard(clientCardPlainText(c));
  const name = String(c.name || "").trim();
  showToast(name ? `اتنسخ «${name}»` : "اتنسخ العميل");
}

function crmFollowUpPlainText() {
  const visible = visibleCrmClients();
  const filterLabel = CRM_FILTER_LABELS[crmFilter] || crmFilter;
  const q = (crmQuery || "").trim();
  const tot = crmVisibleValueTotals();
  const lines = [
    "متابعات العملاء — رتّب",
    `التصفية: ${filterLabel} · ${visible.length} عميل` + (q ? ` · بحث: «${q}»` : ""),
    `إجمالي القيمة الظاهرة: ${money(tot.sum)} ج.م`,
    "",
  ];
  visible.forEach(({ c }) => {
    const name = String(c.name || "").trim() || "بدون اسم";
    let head = `• ${name} (${statusLabel(c.status)})`;
    const hint = nextDateHint(c.next);
    const nextAr = formatArDate(c.next);
    if (hint) head += ` — ${hint}`;
    else if (nextAr) head += ` — ${nextAr}`;
    lines.push(head);
    const contact = String(c.contact || "").trim();
    if (contact) lines.push(`  التواصل: ${contact}`);
    if (n(c.value)) lines.push(`  القيمة: ${money(c.value)} ج.م`);
    const notes = String(c.notes || "").trim();
    if (notes) lines.push(`  ملاحظات: ${notes}`);
  });
  return lines.join("\n");
}

async function copyTextToClipboard(text) {
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
}

function visibleContactedTargets() {
  return visibleCrmClients().filter(({ c }) =>
    ["lead", "proposal"].includes(c.status) && (clientIsOverdue(c) || clientIsDueToday(c))
  );
}

/** After CRM follow-ups copy: offer تواصلت للكل when any visible lead/proposal is overdue or due today. */
function offerCrmFollowUpsContactedToast(msg) {
  if (!visibleContactedTargets().length) {
    showToast(msg);
    return;
  }
  showToast(msg, {
    actionLabel: "تواصلت للكل",
    ms: 8000,
    onAction: () => markVisibleContacted(),
  });
}

async function copyCrmFollowUps() {
  const visible = visibleCrmClients();
  if (!visible.length) {
    showToast("مفيش عملاء في التصفية دي للنسخ");
    return;
  }
  await copyTextToClipboard(crmFollowUpPlainText());
  const filterLabel = CRM_FILTER_LABELS[crmFilter] || crmFilter;
  offerCrmFollowUpsContactedToast(`اتنسخ ${visible.length} متابعة (${filterLabel})`);
}


function pricingPlainText() {
  const lines = [
    "ملخص التسعير — رتّب",
    `سعر الصرف: ${state.fx} ج.م لكل $1 · مقدم ${depositPct()}%`,
  ];
  const t = pricingTotals();
  if (t.n) {
    lines.push(`إجمالي (${t.n}): ${money(t.price)} ج.م · ${money(t.usd)} USD · مقدم ${money(t.dep)} · متبقي ${money(t.bal)}`);
  } else {
    lines.push("مفيش صفوف محسوبة بعد");
  }
  lines.push("");
  state.pricing.forEach((row, i) => {
    const c = pricingCalcs(row);
    const type = String(row.type || "").trim() || `صف ${i + 1}`;
    if (c.empty) {
      lines.push(`☐ ${type} — ناقص ساعات/سعر ساعة`);
    } else {
      lines.push(`• ${type}: ${row.hours}س × ${money(row.rate)} + تكاليف ${money(row.costs)} (هامش ${row.margin}%) → ${money(c.price)} ج.م / ${money(c.usd)} USD`);
      lines.push(`  مقدم ${money(c.dep)} · متبقي ${money(c.bal)}`);
    }
    const notes = String(row.notes || "").trim();
    if (notes) lines.push(`  ملاحظات: ${notes}`);
  });
  return lines.join("\n");
}

function pricingRowPlainText(row, i = 0) {
  const c = pricingCalcs(row);
  const type = String(row.type || "").trim() || `صف ${i + 1}`;
  const lines = [
    "صف تسعير — رتّب",
    `سعر الصرف: ${state.fx} ج.م لكل $1 · مقدم ${depositPct()}%`,
    "",
  ];
  if (c.empty) {
    lines.push(`☐ ${type} — ناقص ساعات/سعر ساعة`);
  } else {
    lines.push(`• ${type}: ${row.hours}س × ${money(row.rate)} + تكاليف ${money(row.costs)} (هامش ${row.margin}%) → ${money(c.price)} ج.م / ${money(c.usd)} USD`);
    lines.push(`  مقدم ${money(c.dep)} · متبقي ${money(c.bal)}`);
  }
  const notes = String(row.notes || "").trim();
  if (notes) lines.push(`  ملاحظات: ${notes}`);
  return lines.join("\n");
}

async function copyPricingRow(i) {
  if (i < 0 || i >= state.pricing.length) return;
  const row = state.pricing[i];
  await copyTextToClipboard(pricingRowPlainText(row, i));
  const type = String(row.type || "").trim();
  showToast(type ? `اتنسخ «${type}»` : "اتنسخ صف التسعير");
}

/** After pricing summary copy: offer انقل لعرض السعر when any row is computed (proposal WA → أضف للعملاء parity). */
function offerPricingToProposalToast(msg) {
  const t = pricingTotals();
  if (!t.n) {
    showToast(msg);
    return;
  }
  showToast(msg, {
    actionLabel: "انقل لعرض السعر",
    ms: 8000,
    onAction: () => fillProposalFromPricing(),
  });
}

async function copyPricingSummary() {
  if (!state.pricing.length) {
    showToast("مفيش صفوف تسعير للنسخ");
    return;
  }
  await copyTextToClipboard(pricingPlainText());
  const t = pricingTotals();
  const msg = t.n
    ? `اتنسخ ${state.pricing.length} صف تسعير (${t.n} محسوب)`
    : `اتنسخ ${state.pricing.length} صف تسعير`;
  offerPricingToProposalToast(msg);
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
  paintWeekDoneAllBtn();
  paintWeekClearAllBtn();
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

/** After week summary copy: offer تم للكل when incomplete days have content (day copy → تم parity). */
function offerWeekSummaryDoneAllToast(msg) {
  if (!weekIncompleteWithContent().length) {
    showToast(msg);
    return;
  }
  showToast(msg, {
    actionLabel: "تم للكل",
    ms: 8000,
    onAction: () => markWeekDoneAll(),
  });
}

async function copyWeekSummary() {
  await copyTextToClipboard(weekPlainText());
  offerWeekSummaryDoneAllToast("اتنسخ ملخص الأسبوع");
}


function todayWeekRow() {
  const todayName = DAYS[cairoDayOfWeek()];
  const i = state.week.findIndex((w) => w.day === todayName);
  if (i < 0) return null;
  return { w: state.week[i], i, day: todayName };
}

function weekDayHasContent(i) {
  const w = state.week[i];
  if (!w) return false;
  if (String(w.tasks || "").trim()) return true;
  if (n(w.hours)) return true;
  const del = String(w.deliverables || "").trim();
  return !!(del && del !== "—");
}

function weekDayPlainText(i) {
  const w = state.week[i];
  if (!w) return "";
  const todayName = DAYS[cairoDayOfWeek()];
  const isToday = w.day === todayName;
  const mark = w.done === "☑" ? "☑" : "☐";
  const title = isToday
    ? `يوم الشغل — رتّب · ${w.day} (اليوم)`
    : `يوم الشغل — رتّب · ${w.day}`;
  const lines = [title, `${mark} ${w.day}`];
  if (String(w.tasks || "").trim()) lines.push(`  المهام: ${w.tasks}`);
  if (n(w.hours)) lines.push(`  الساعات: ${w.hours}`);
  const del = String(w.deliverables || "").trim();
  if (del && del !== "—") lines.push(`  التسليمات: ${w.deliverables}`);
  return lines.join("\n");
}

function todayWeekPlainText() {
  const row = todayWeekRow();
  return row ? weekDayPlainText(row.i) : "";
}

function todayWeekHasContent() {
  const row = todayWeekRow();
  return row ? weekDayHasContent(row.i) : false;
}

/** Mark one week day done (no-op if already ☑); toast + تراجع. Used by copy-day toast action. */
function markWeekDayDone(i) {
  const w = state.week[i];
  if (!w) return;
  if (w.done === "☑") {
    showToast(`«${w.day}» مكتملة أصلاً`);
    return;
  }
  const prevDone = w.done;
  w.done = "☑";
  save();
  renderWeek();
  showToast(`«${w.day}» بقت مكتملة`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      if (state.week.indexOf(w) < 0) return;
      w.done = prevDone;
      save();
      renderWeek();
      showToast(`اتلغى تم «${w.day}»`);
    },
  });
}

/** After week day copy: offer تم when the day has content and is not done yet (pricing copy → انقل parity). */
function offerWeekDayDoneToast(msg, i) {
  const w = state.week[i];
  if (!w || w.done === "☑" || !weekDayHasContent(i)) {
    showToast(msg);
    return;
  }
  showToast(msg, {
    actionLabel: "تم",
    ms: 8000,
    onAction: () => markWeekDayDone(i),
  });
}

async function copyWeekDay(i) {
  if (!weekDayHasContent(i)) {
    showToast("مفيش محتوى لليوم ده للنسخ — حط مهام أو ساعات أولاً");
    return;
  }
  await copyTextToClipboard(weekDayPlainText(i));
  const w = state.week[i];
  offerWeekDayDoneToast(`اتنسخ يوم «${w ? w.day : "اليوم"}»`, i);
}

async function copyTodayWeek() {
  const row = todayWeekRow();
  if (!row) {
    showToast("مفيش محتوى لليوم ده للنسخ — حط مهام أو ساعات أولاً");
    return;
  }
  await copyWeekDay(row.i);
}


function weekHasCarryTasks() {
  return state.week.some((w) => w.done !== "☑" && String(w.tasks || "").trim());
}

function resetWeek() {
  if (!confirm("أسبوع جديد؟ هنتصفّر الساعات والتسليمات وعلامات «تم». المهام الناقصة هتترحّل، وتقدر تفضّي الأسبوع من التوست.")) return;
  const previous = state.week.map((w) => ({
    day: w.day,
    tasks: w.tasks,
    hours: w.hours,
    deliverables: w.deliverables,
    done: w.done,
  }));
  const applyReset = (carry) => {
    state.week = previous.map((w) => {
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
  };
  const restorePrevious = () => {
    state.week = previous.map((w) => ({ ...w }));
    save();
    renderWeek();
    showToast("رجع أسبوع الشغل");
  };
  if (!weekHasCarryTasks()) {
    applyReset(false);
    showToast("أسبوع جديد جاهز", {
      actionLabel: "تراجع",
      ms: 6000,
      onAction: restorePrevious,
    });
    return;
  }
  applyReset(true);
  showToast("اترحّلت المهام الناقصة", {
    ms: 8000,
    actions: [
      {
        label: "فاضي بالكامل",
        onAction: () => {
          state.week = previous.map((w) => ({
            day: w.day,
            tasks: "",
            hours: 0,
            deliverables: "",
            done: "☐",
          }));
          save();
          renderWeek();
          showToast("أسبوع فاضي", {
            actionLabel: "تراجع",
            ms: 6000,
            onAction: restorePrevious,
          });
        },
      },
      {
        label: "تراجع",
        onAction: restorePrevious,
      },
    ],
  });
}

function clearWeekDay(i) {
  const w = state.week[i];
  if (!w) return;
  const hasContent = weekDayHasContent(i);
  const doneOn = w.done === "☑";
  if (!hasContent && !doneOn) {
    showToast(`«${w.day}» فاضي أصلاً`);
    return;
  }
  const prev = {
    tasks: w.tasks,
    hours: w.hours,
    deliverables: w.deliverables,
    done: w.done,
  };
  w.tasks = "";
  w.hours = 0;
  w.deliverables = "";
  w.done = "☐";
  save();
  renderWeek();
  showToast(`اتمسح يوم «${w.day}»`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      if (state.week.indexOf(w) < 0) return;
      w.tasks = prev.tasks;
      w.hours = prev.hours;
      w.deliverables = prev.deliverables;
      w.done = prev.done;
      save();
      renderWeek();
      showToast(`رجع يوم «${w.day}»`);
    },
  });
}

function toggleWeekDone(i) {
  const w = state.week[i];
  if (!w) return;
  const prevDone = w.done;
  w.done = w.done === "☑" ? "☐" : "☑";
  save();
  renderWeek();
  showToast(w.done === "☑" ? `«${w.day}» بقت مكتملة` : `«${w.day}» رجعت مش مكتملة`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      if (state.week.indexOf(w) < 0) return;
      w.done = prevDone;
      save();
      renderWeek();
      showToast(`اتلغى تغيير «${w.day}»`);
    },
  });
}

function weekIncompleteWithContent() {
  return state.week
    .map((w, i) => ({ w, i }))
    .filter(({ w, i }) => w.done !== "☑" && weekDayHasContent(i));
}

function markWeekDoneAll() {
  const targets = weekIncompleteWithContent();
  if (!targets.length) {
    showToast("مفيش أيام ناقصة بمحتوى تتعلّم تم");
    return;
  }
  const snapshots = targets.map(({ w, i }) => ({ w, i, prevDone: w.done }));
  snapshots.forEach(({ w }) => { w.done = "☑"; });
  save();
  renderWeek();
  const n = snapshots.length;
  showToast(`اتعلّم تم لـ ${n} يوم`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      snapshots.forEach(({ w, i, prevDone }) => {
        if (state.week[i] !== w) return;
        w.done = prevDone;
      });
      save();
      renderWeek();
      showToast("اتلغى تم الجماعي");
    },
  });
}

function paintWeekDoneAllBtn() {
  const btn = document.getElementById("btn-week-done-all");
  if (!btn) return;
  const n = weekIncompleteWithContent().length;
  btn.hidden = n === 0;
  btn.title = n
    ? `علم ${n} يوم ناقص بمحتوى كمكتمل`
    : "مفيش أيام ناقصة بمحتوى";
}

function weekClearableDays() {
  return state.week
    .map((w, i) => ({ w, i }))
    .filter(({ w, i }) => weekDayHasContent(i) || w.done === "☑");
}

function clearWeekDaysAll() {
  const targets = weekClearableDays();
  if (!targets.length) {
    showToast("مفيش أيام تتتمسح");
    return;
  }
  const snapshots = targets.map(({ w, i }) => ({
    w,
    i,
    prev: {
      tasks: w.tasks,
      hours: w.hours,
      deliverables: w.deliverables,
      done: w.done,
    },
  }));
  snapshots.forEach(({ w }) => {
    w.tasks = "";
    w.hours = 0;
    w.deliverables = "";
    w.done = "☐";
  });
  save();
  renderWeek();
  const n = snapshots.length;
  showToast(`اتمسح ${n} يوم`, {
    actionLabel: "تراجع",
    ms: 6000,
    onAction: () => {
      snapshots.forEach(({ w, i, prev }) => {
        if (state.week[i] !== w) return;
        w.tasks = prev.tasks;
        w.hours = prev.hours;
        w.deliverables = prev.deliverables;
        w.done = prev.done;
      });
      save();
      renderWeek();
      showToast("اتلغى مسح الجماعي");
    },
  });
}

function paintWeekClearAllBtn() {
  const btn = document.getElementById("btn-week-clear-all");
  if (!btn) return;
  const n = weekClearableDays().length;
  btn.hidden = n === 0;
  btn.title = n
    ? `امسح ${n} يوم فيه محتوى أو تم`
    : "مفيش أيام فيها محتوى أو تم";
}

function renderWeek() {
  const tbody = document.querySelector("#week-table tbody");
  tbody.innerHTML = "";
  const todayName = DAYS[cairoDayOfWeek()];
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
      </td>
      <td class="row-actions week-row-actions" data-label="إجراءات">
        <button type="button" class="ghost tiny" data-copy-day="${i}" title="نسخ بطاقة اليوم كنص عربي">نسخ نص</button>
        <button type="button" class="ghost tiny" data-clear-day="${i}" title="مسح مهام وساعات وتسليمات اليوم">مسح</button>
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
      else {
        paintWeekDoneAllBtn();
        paintWeekClearAllBtn();
      }
    };
    el.addEventListener("change", handler);
    el.addEventListener("input", handler);
  });
  tbody.querySelectorAll("[data-done-toggle]").forEach((btn) => {
    btn.onclick = () => toggleWeekDone(+btn.dataset.doneToggle);
  });
  tbody.querySelectorAll("[data-copy-day]").forEach((btn) => {
    btn.onclick = () => copyWeekDay(+btn.dataset.copyDay);
  });
  tbody.querySelectorAll("[data-clear-day]").forEach((btn) => {
    btn.onclick = () => clearWeekDay(+btn.dataset.clearDay);
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


/** Blank formula row: no type/hours/rate/notes and no costs (margin alone doesn't count). */
function isBlankPricingRow(row) {
  if (!row || typeof row !== "object") return true;
  const noType = !String(row.type ?? "").trim();
  const noHours = row.hours === "" || row.hours == null;
  const noRate = row.rate === "" || row.rate == null;
  const noNotes = !String(row.notes ?? "").trim();
  const noCosts = row.costs === "" || row.costs == null || Number(row.costs) === 0;
  return noType && noHours && noRate && noNotes && noCosts;
}

/** Blank CRM client: no name/contact/source/notes/dates/value; status missing or default lead. */
function isBlankClient(c) {
  if (!c || typeof c !== "object") return true;
  const noName = !String(c.name ?? "").trim();
  const noContact = !String(c.contact ?? "").trim();
  const noSource = !String(c.source ?? "").trim();
  const noNotes = !String(c.notes ?? "").trim();
  const noLast = !String(c.last ?? "").trim();
  const noNext = !String(c.next ?? "").trim();
  const rawVal = c.value;
  const noValue = rawVal === "" || rawVal == null || Number(rawVal) === 0;
  const status = c.status == null || c.status === "" ? "lead" : String(c.status);
  const defaultStatus = status === "lead";
  return noName && noContact && noSource && noNotes && noLast && noNext && noValue && defaultStatus;
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
    }).filter((row) => !isBlankPricingRow(row));
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
  const copyTodayBtn = document.getElementById("btn-copy-today");
  if (copyTodayBtn) copyTodayBtn.onclick = () => { copyTodayWeek(); };
  const copyWeekBtn = document.getElementById("btn-copy-week");
  if (copyWeekBtn) copyWeekBtn.onclick = () => { copyWeekSummary(); };
  const weekDoneAllBtn = document.getElementById("btn-week-done-all");
  if (weekDoneAllBtn) weekDoneAllBtn.onclick = () => { markWeekDoneAll(); };
  const weekClearAllBtn = document.getElementById("btn-week-clear-all");
  if (weekClearAllBtn) weekClearAllBtn.onclick = () => { clearWeekDaysAll(); };
  const copyCrmBtn = document.getElementById("btn-copy-crm");
  if (copyCrmBtn) copyCrmBtn.onclick = () => { copyCrmFollowUps(); };
  const snoozeVisibleBtn = document.getElementById("btn-snooze-visible");
  if (snoozeVisibleBtn) snoozeVisibleBtn.onclick = () => { snoozeVisibleClients(3); };
  const snooze7VisibleBtn = document.getElementById("btn-snooze7-visible");
  if (snooze7VisibleBtn) snooze7VisibleBtn.onclick = () => { snoozeVisibleClients(7); };
  const todayVisibleBtn = document.getElementById("btn-today-visible");
  if (todayVisibleBtn) todayVisibleBtn.onclick = () => { setVisibleClientsNextToday(); };
  const clearNextVisibleBtn = document.getElementById("btn-clear-next-visible");
  if (clearNextVisibleBtn) clearNextVisibleBtn.onclick = () => { clearVisibleClientsNext(); };
  const markContactedVisibleBtn = document.getElementById("btn-mark-contacted-visible");
  if (markContactedVisibleBtn) markContactedVisibleBtn.onclick = () => { markVisibleContacted(); };
  const copyPricingBtn = document.getElementById("btn-copy-pricing");
  if (copyPricingBtn) copyPricingBtn.onclick = () => { copyPricingSummary(); };
  const clearBlankPricingBtn = document.getElementById("btn-clear-blank-pricing");
  if (clearBlankPricingBtn) clearBlankPricingBtn.onclick = () => { clearBlankPricingRows(); };
  const clearBlankClientsBtn = document.getElementById("btn-clear-blank-clients");
  if (clearBlankClientsBtn) clearBlankClientsBtn.onclick = () => { clearBlankClients(); };
  document.getElementById("add-pricing").onclick = () => {
    const copy = { type: "", hours: "", rate: "", costs: "", margin: 25, notes: "" };
    state.pricing.push(copy);
    save();
    renderPricing();
    showToast("اتضاف صف تسعير فاضي", {
      actionLabel: "تراجع",
      ms: 6000,
      onAction: () => {
        const at = state.pricing.indexOf(copy);
        if (at < 0) return;
        state.pricing.splice(at, 1);
        save();
        renderPricing();
        showToast("اتشال صف التسعير الفاضي");
      },
    });
  };
  const toProposalBtn = document.getElementById("btn-to-proposal");
  if (toProposalBtn) toProposalBtn.onclick = () => { fillProposalFromPricing(); };
  document.getElementById("add-client").onclick = () => {
    const copy = { name: "", contact: "", source: "", status: "lead", last: "", next: "", value: 0, notes: "" };
    state.clients.push(copy);
    save();
    renderCrm();
    showToast("اتضاف عميل فاضي", {
      actionLabel: "تراجع",
      ms: 6000,
      onAction: () => {
        const at = state.clients.indexOf(copy);
        if (at < 0) return;
        state.clients.splice(at, 1);
        save();
        renderCrm();
        showToast("اتشال العميل الفاضي");
      },
    });
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
      paintCrmSearchClear();
      renderCrm();
      // keep focus/caret — search lives outside renderCrm
      search.focus();
    });
  }
  const searchClear = document.getElementById("crm-search-clear");
  if (searchClear) {
    searchClear.onclick = () => { clearCrmSearch(); };
  }
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (e.target && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))) {
      // still allow Escape to clear CRM search when typing in the search box
      if (e.target.id === "crm-search" && (crmQuery || "").trim()) {
        e.preventDefault();
        clearCrmSearch();
        return;
      }
      // dismiss toast even while editing other fields
      if (dismissToast()) {
        e.preventDefault();
        return;
      }
      return;
    }
    if (dismissToast()) {
      e.preventDefault();
      return;
    }
    if ((crmQuery || "").trim()) {
      e.preventDefault();
      clearCrmSearch();
    }
  });
  document.getElementById("btn-export").onclick = () => doExport();
  const btnBackupExport = document.getElementById("btn-backup-export");
  if (btnBackupExport) btnBackupExport.onclick = () => doExport();
  const btnBackupDismiss = document.getElementById("btn-backup-dismiss");
  if (btnBackupDismiss) {
    btnBackupDismiss.onclick = () => {
      saveUi({ backupNudgeDismissedUntil: addDaysISO(localISODate(), 7) });
      paintBackupNudge();
    };
  }
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
      showingDemoSeed = false;
      localStorage.removeItem(DEMO_FLAG_KEY);
      save();
      paintDemoChip();
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
      const msg = err?.message || "ملف غير صالح — لازم يكون تصدير رتّب JSON";
      showToast(msg, { ms: 7000 });
    }
    e.target.value = "";
  };
  document.getElementById("btn-reset").onclick = () => {
    if (!confirm("هترجع للبيانات التجريبية — مش هتفضل فاضي. كمّل؟")) return;
    const previous = JSON.parse(JSON.stringify(state));
    // Pause persist across replace+render so detached input/change events
    // cannot re-write old rows into localStorage after seed().
    persistPauseDepth += 1;
    state = seed();
    showingDemoSeed = true;
    try {
      renderAll();
    } finally {
      persistPauseDepth = Math.max(0, persistPauseDepth - 1);
    }
    persistDemoSeed();
    showToast("رجعت للبيانات التجريبية", {
      actionLabel: "تراجع",
      ms: 6000,
      onAction: () => {
        state = previous;
        showingDemoSeed = false;
        localStorage.removeItem(DEMO_FLAG_KEY);
        save();
        paintDemoChip();
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

function renderAll() {
  persistPauseDepth += 1;
  try {
    renderPricing();
    renderProposal();
    renderCrm();
    renderWeek();
  } finally {
    persistPauseDepth = Math.max(0, persistPauseDepth - 1);
  }
}
// Pause persist across first paint so detached input/change handlers cannot
// call save() and clear a just-migrated DEMO flag before persistDemoSeed().
persistPauseDepth += 1;
try {
  paintCrmFilterChips();
  wire();
} finally {
  persistPauseDepth = Math.max(0, persistPauseDepth - 1);
}
if (showingDemoSeed) persistDemoSeed();
else paintDemoChip();