const STORAGE_KEY = "rattib-app-v1";
const STATUS = ["lead", "proposal", "won", "lost"];
const DAYS = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

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
    date: "2026-09-10",
    validUntil: "2026-09-24",
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
    { name: "أحمد منصور", contact: "واتساب", source: "إحالة", status: "proposal", last: "2026-09-01", next: "2026-09-08", value: 15000, notes: "بستنى موافقة شريكه" },
    { name: "سارة حسين", contact: "sara@mail.com", source: "لينكدإن", status: "lead", last: "2026-09-05", next: "2026-09-10", value: 40000, notes: "متجر بسيط" },
    { name: "TechNest", contact: "Slack", source: "Upwork", status: "won", last: "2026-08-20", next: "", value: 22000, notes: "مرحلة 2 محتملة" },
    { name: "خالد عمر", contact: "واتساب", source: "تويتر", status: "lost", last: "2026-08-15", next: "", value: 5000, notes: "الميزانية أقل من النطاق" },
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

function renderPricing() {
  const fx = document.getElementById("fx-rate");
  fx.value = state.fx;
  fx.onchange = () => { state.fx = n(fx.value) || 50; save(); renderPricing(); };

  const tbody = document.querySelector("#pricing-table tbody");
  tbody.innerHTML = "";
  state.pricing.forEach((row, i) => {
    const price = suggested(row);
    const usd = state.fx ? Math.round(price / state.fx) : 0;
    const dep = Math.round(price * 0.5);
    const bal = price - dep;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input data-i="${i}" data-k="type" value="${esc(row.type)}"></td>
      <td class="num"><input data-i="${i}" data-k="hours" type="number" value="${row.hours}"></td>
      <td class="num"><input data-i="${i}" data-k="rate" type="number" value="${row.rate}"></td>
      <td class="num"><input data-i="${i}" data-k="costs" type="number" value="${row.costs}"></td>
      <td class="num"><input data-i="${i}" data-k="margin" type="number" value="${row.margin}"></td>
      <td><span class="calc">${row.hours === "" && row.rate === "" ? "—" : money(price)}</span></td>
      <td><span class="calc">${row.hours === "" && row.rate === "" ? "—" : money(usd)}</span></td>
      <td><span class="calc">${row.hours === "" && row.rate === "" ? "—" : money(dep)}</span></td>
      <td><span class="calc">${row.hours === "" && row.rate === "" ? "—" : money(bal)}</span></td>
      <td><input data-i="${i}" data-k="notes" value="${esc(row.notes)}"></td>
      <td><button type="button" class="icon-btn" data-del="${i}">✕</button></td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("input").forEach((inp) => {
    inp.addEventListener("input", () => {
      const i = +inp.dataset.i; const k = inp.dataset.k;
      state.pricing[i][k] = inp.type === "number" ? (inp.value === "" ? "" : n(inp.value)) : inp.value;
      save();
      if (["hours","rate","costs","margin"].includes(k)) renderPricing();
    });
  });
  tbody.querySelectorAll("[data-del]").forEach((btn) => {
    btn.onclick = () => { state.pricing.splice(+btn.dataset.del, 1); save(); renderPricing(); };
  });
}

function renderProposal() {
  const p = state.proposal;
  const deposit = Math.round(n(p.price) * n(p.depositPct) / 100);
  const balance = n(p.price) - deposit;
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
      <div class="calc">${money(deposit)} ج.م</div>
    </label>
    <label>المتبقي عند التسليم
      <div class="calc">${money(balance)} ج.م</div>
    </label>`;
  box.querySelectorAll("[data-k]").forEach((el) => {
    el.addEventListener("input", () => {
      const k = el.dataset.k;
      state.proposal[k] = el.type === "number" ? n(el.value) : el.value;
      save();
      if (k === "price" || k === "depositPct") renderProposal();
    });
  });
}

function renderCrm() {
  const tbody = document.querySelector("#crm-table tbody");
  tbody.innerHTML = "";
  state.clients.forEach((c, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input data-i="${i}" data-k="name" value="${esc(c.name)}"></td>
      <td><input data-i="${i}" data-k="contact" value="${esc(c.contact)}"></td>
      <td><input data-i="${i}" data-k="source" value="${esc(c.source)}"></td>
      <td><select data-i="${i}" data-k="status">${STATUS.map(s => `<option value="${s}" ${c.status===s?"selected":""}>${s}</option>`).join("")}</select></td>
      <td><input data-i="${i}" data-k="last" type="date" value="${esc(c.last)}"></td>
      <td><input data-i="${i}" data-k="next" type="date" value="${esc(c.next)}"></td>
      <td class="num"><input data-i="${i}" data-k="value" type="number" value="${c.value}"></td>
      <td><input data-i="${i}" data-k="notes" value="${esc(c.notes)}"></td>
      <td><button type="button" class="icon-btn" data-del="${i}">✕</button></td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("input,select").forEach((el) => {
    el.addEventListener("change", () => {
      const i = +el.dataset.i; const k = el.dataset.k;
      state.clients[i][k] = el.type === "number" ? n(el.value) : el.value;
      save();
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
}

function renderWeek() {
  const tbody = document.querySelector("#week-table tbody");
  tbody.innerHTML = "";
  let total = 0;
  state.week.forEach((w, i) => {
    total += n(w.hours);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${esc(w.day)}</td>
      <td><input data-i="${i}" data-k="tasks" value="${esc(w.tasks)}"></td>
      <td class="num"><input data-i="${i}" data-k="hours" type="number" step="0.5" value="${w.hours}"></td>
      <td><input data-i="${i}" data-k="deliverables" value="${esc(w.deliverables)}"></td>
      <td><select data-i="${i}" data-k="done"><option ${w.done==="☐"?"selected":""}>☐</option><option ${w.done==="☑"?"selected":""}>☑</option></select></td>`;
    tbody.appendChild(tr);
  });
  document.getElementById("week-total").textContent = total;
  tbody.querySelectorAll("input,select").forEach((el) => {
    const handler = () => {
      const i = +el.dataset.i; const k = el.dataset.k;
      state.week[i][k] = el.type === "number" ? n(el.value) : el.value;
      save();
      if (k === "hours") renderWeek();
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
  };
  document.getElementById("btn-reset").onclick = () => {
    if (!confirm("مسح كل البيانات والرجوع للأمثلة؟")) return;
    state = seed(); save(); renderAll();
  };
  renderAll();
}
function renderAll() { renderPricing(); renderProposal(); renderCrm(); renderWeek(); }
wire();
