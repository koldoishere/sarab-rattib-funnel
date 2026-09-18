const STORAGE_KEY = "rattib-app-v1";
const DEMO_FLAG_KEY = "rattib-demo-seed-v1";
const STATUS = [
  { value: "lead" },
  { value: "proposal" },
  { value: "won" },
  { value: "lost" },
];
const DAYS = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

/* ─── i18n (EN + AR) ─────────────────────────────────────────────────────
 * Arabic remains default. Lang persists in rattib-ui-v1.lang (via saveUi).
 * Chrome + CRM/pricing/week actions/toasts covered; demo seed content stays AR.
 * ─────────────────────────────────────────────────────────────────────── */
const I18N = {
  "ar": {
    "doc_title": "رتّب · Rattib — نظام الفريلانسر في مكان واحد",
    "doc_desc": "تسعير + عرض سعر + CRM + أسبوع شغل في تطبيق واحد. منتج من Sarab.",
    "brand_tag": "جرّب مجانًا هنا · Free try — مش نهاية الطريق",
    "demo_chip": "بيانات تجريبية",
    "btn_export": "تصدير",
    "btn_export_title": "تصدير كل البيانات كملف JSON",
    "btn_import": "استيراد",
    "btn_import_title": "استيراد ملف JSON من تصدير رتّب",
    "btn_reset": "مسح البيانات",
    "btn_reset_title": "يرجع للبيانات التجريبية — مش مسح فاضي",
    "backup_nudge": "بياناتك بتفضل في المتصفح بس — صدّر JSON احتياطي عشان متضيعش.",
    "btn_backup_export": "تصدير الآن",
    "btn_backup_dismiss": "إخفاء",
    "lang_group": "اللغة",
    "tab_pricing": "التسعير",
    "tab_proposal": "عرض السعر",
    "tab_crm": "العملاء",
    "tab_week": "أسبوع الشغل",
    "panel_pricing": "التسعير",
    "panel_proposal": "عرض السعر",
    "panel_crm": "متابعة العملاء",
    "panel_week": "أسبوع الشغل",
    "fx_label": "سعر الصرف (ج.م لكل $1)",
    "week_done_prefix": "تم",
    "week_done_mid": "من 7 · ساعات التركيز:",
    "foot": "Sarab · Rattib MVP — أدوات تنظيم، مفيش ضمان دخل",
    "th_type": "نوع المشروع",
    "th_hours": "ساعات",
    "th_rate": "سعر/س",
    "th_costs": "تكاليف",
    "th_margin": "هامش %",
    "th_price": "مقترح ج.م",
    "th_usd": "USD",
    "th_deposit": "مقدم {pct}%",
    "th_balance": "المتبقي",
    "th_notes": "ملاحظات",
    "th_actions": "إجراءات",
    "pricing_totals": "إجمالي الصفوف المحسوبة",
    "add_pricing": "+ صف تسعير",
    "copy_pricing": "نسخ التسعير",
    "copy_pricing_title": "نسخ صفوف التسعير الظاهرة كنص",
    "clear_blank_pricing": "احذف الفارغ",
    "clear_blank_pricing_title": "احذف صفوف التسعير الفاضية",
    "to_proposal": "انقل لعرض السعر",
    "to_proposal_title": "انقل إجمالي التسعير إلى عرض السعر",
    "use_for_proposal": "انقل للعرض",
    "use_for_proposal_title": "ضع السعر والمشروع في عرض السعر",
    "copy_text": "نسخ نص",
    "copy_pricing_row_title": "نسخ صف التسعير كنص",
    "dup_row": "كرّر",
    "dup_pricing_title": "كرّر الصف تحتها",
    "prop_date": "تاريخ العرض",
    "prop_valid": "صالح حتى",
    "prop_client": "اسم العميل",
    "prop_contact": "جهة التواصل",
    "prop_project": "اسم المشروع",
    "prop_price": "السعر (ج.م)",
    "prop_deposit_pct": "نسبة المقدم %",
    "prop_revisions": "المراجعات",
    "prop_duration": "المدة",
    "prop_payments": "طرق الدفع",
    "prop_summary": "ملخص",
    "prop_in_scope": "داخل النطاق",
    "prop_out_scope": "خارج النطاق",
    "prop_terms": "شروط",
    "prop_next": "الخطوة التالية",
    "prop_deposit_calc": "المقدم المحسوب",
    "prop_balance_calc": "المتبقي عند التسليم",
    "copy_wa": "نسخ للواتساب",
    "open_wa": "فتح واتساب",
    "from_pricing": "من التسعير",
    "from_pricing_title": "انقل إجمالي صفوف التسعير المحسوبة إلى سعر العرض",
    "add_to_crm": "أضف للعملاء",
    "date_title": "اليوم / الشهر / السنة",
    "copy_crm": "نسخ المتابعات",
    "copy_crm_title": "نسخ قائمة المتابعات الظاهرة",
    "snooze3_all": "+3 للكل",
    "snooze3_all_title": "تأجيل المتابعة 3 أيام لكل العملاء الظاهرين",
    "snooze7_all": "+7 للكل",
    "snooze7_all_title": "تأجيل المتابعة أسبوع لكل العملاء الظاهرين",
    "today_all": "اليوم للكل",
    "today_all_title": "تعيين المتابعة لليوم لكل العملاء الظاهرين",
    "clear_next_all": "بدون موعد للكل",
    "clear_next_all_title": "مسح موعد المتابعة لكل العملاء الظاهرين",
    "contacted_all": "تواصلت للكل",
    "contacted_all_title": "تسجيل تواصل لليوم + متابعة بعد 3 أيام للظاهرين المستحقين",
    "clear_blank_clients": "احذف الفارغ",
    "clear_blank_clients_title": "احذف العملاء الفاضيين",
    "add_client": "+ عميل",
    "crm_filters_aria": "تصفية العملاء",
    "crm_search_sr": "بحث في العملاء",
    "crm_search_ph": "بحث بالاسم / التواصل / المصدر / الملاحظات",
    "crm_search_clear": "مسح البحث",
    "crm_empty_filter": "مفيش عملاء في التصفية دي — جرّب «الكل» أو ضيف عميل.",
    "crm_empty_none": "لسه مفيش عملاء — اضغط «+ عميل» أو «أضف للعملاء» من عرض السعر.",
    "crm_empty_search": "مفيش نتائج للبحث ده — جرّب كلمة تانية أو امسح البحث.",
    "crm_empty_today": "مفيش متابعات النهاردة — لو في متأخرين جرّب «متأخر».",
    "crm_empty_none_next": "كل العملاء النشطين عندهم موعد متابعة — تمام.",
    "th_name": "الاسم",
    "th_contact": "التواصل",
    "th_source": "المصدر",
    "th_status": "الحالة",
    "th_last": "آخر تواصل",
    "th_next": "متابعة تالية",
    "th_value": "القيمة",
    "crm_totals": "إجمالي القيمة الظاهرة",
    "filter_all": "الكل",
    "filter_today": "النهاردة",
    "filter_overdue": "متأخر",
    "filter_none": "بدون موعد",
    "filter_lead": "عميل محتمل",
    "filter_proposal": "عرض سعر",
    "filter_won": "تم الاتفاق",
    "filter_lost": "خسارة",
    "status_lead": "عميل محتمل",
    "status_proposal": "عرض سعر",
    "status_won": "تم الاتفاق",
    "status_lost": "خسارة",
    "clear_next": "بدون موعد",
    "clear_next_title": "مسح موعد المتابعة",
    "snooze_group": "متابعة سريعة",
    "today_btn": "اليوم",
    "today_btn_title": "خلي المتابعة النهاردة",
    "snooze3_title": "تأجيل 3 أيام",
    "snooze7_title": "تأجيل أسبوع",
    "whatsapp": "واتساب",
    "whatsapp_title": "فتح واتساب",
    "contacted": "تواصلت",
    "copy_client_title": "نسخ بطاقة العميل كنص",
    "dup_client_title": "كرّر العميل تحتها",
    "contact_ph": "واتساب 01xxxxxxxxx",
    "contact_hint_phone": "حط رقم عشان يظهر زر واتساب",
    "overdue_badge": "{n} متأخر",
    "pipeline_empty": "مفيش ظاهر في التصفية دي",
    "pipeline_visible": "الظاهر: {n} · قيمة {sum} ج.م",
    "pipeline_overdue": "{n} متأخر",
    "pipeline_today": "{n} متابعة النهاردة",
    "pipeline_none": "{n} بدون موعد",
    "pipeline_overdue_title": "عرض المتابعات المتأخرة",
    "pipeline_today_title": "عرض متابعات النهاردة",
    "pipeline_none_title": "عرض العملاء من غير متابعة تالية",
    "toast_filter_overdue": "تصفية المتأخرين",
    "toast_filter_overdue_pipe": "تصفية المتابعات المتأخرة",
    "toast_filter_today_pipe": "تصفية متابعات النهاردة",
    "toast_filter_none_pipe": "تصفية بدون موعد",
    "crm_count_valued": "({v} بقيمة · {n} ظاهر · {filter})",
    "crm_count_plain": "({n} ظاهر · {filter})",
    "copy_today": "نسخ اليوم",
    "copy_today_title": "نسخ بطاقة النهاردة كنص",
    "copy_week": "نسخ الملخص",
    "week_done_all": "تم للكل",
    "week_done_all_title": "علم كل الأيام الناقصة اللي فيها محتوى كمكتملة",
    "week_clear_all": "مسح للكل",
    "week_clear_all_title": "امسح مهام وساعات وتسليمات وعلامة تم لكل الأيام اللي فيها محتوى",
    "new_week": "أسبوع جديد",
    "th_day": "اليوم",
    "th_tasks": "المهام",
    "th_focus": "ساعات التركيز",
    "th_deliverables": "التسليمات",
    "th_done": "تم؟",
    "today_pill": "اليوم",
    "done_yes": "تم",
    "done_no": "مش بعد",
    "done_on_title": "إلغاء اكتمال اليوم",
    "done_off_title": "تعليم اليوم كمكتمل",
    "copy_day_title": "نسخ بطاقة اليوم كنص",
    "clear_day": "مسح",
    "clear_day_title": "مسح مهام وساعات وتسليمات اليوم",
    "day_sun": "الأحد",
    "day_mon": "الاثنين",
    "day_tue": "الثلاثاء",
    "day_wed": "الأربعاء",
    "day_thu": "الخميس",
    "day_fri": "الجمعة",
    "day_sat": "السبت",
    "undo": "تراجع",
    "egp": "ج.م",
    "hint_today": "اليوم",
    "hint_tomorrow": "بكرة",
    "hint_late1": "متأخر يوم",
    "hint_late_n": "متأخر {n} أيام",
    "hint_in_n": "بعد {n} أيام",
    "toast_exported": "اتصدر {file}",
    "toast_fill_hours": "املأ الساعات وسعر الساعة أولاً",
    "toast_fill_one_row": "املأ صف تسعير واحد على الأقل (ساعات وسعر الساعة) أولاً",
    "toast_moved_proposal": "اتنقل لعرض السعر بالسعر المحسوب",
    "toast_moved_total": "اتنقل إجمالي التسعير: {price} ج.م",
    "toast_proposal_restored": "رجع عرض السعر زي ما كان",
    "toast_copied_pricing_row": "اتنسخ صف التسعير",
    "toast_copied_named": "اتنسخ «{name}»",
    "toast_undid_copy": "اتلغت النسخة",
    "toast_pricing_row_restored": "رجع صف التسعير",
    "toast_no_blank_pricing": "مفيش صفوف فاضية تتشال",
    "toast_cleared_blank_pricing": "اتمسح {n} صف فاضي",
    "toast_pricing_rows_restored": "رجعت صفوف التسعير",
    "toast_no_blank_clients": "مفيش عملاء فاضي",
    "toast_cleared_blank_clients": "اتمسح {n} عميل فاضي",
    "toast_clients_restored": "رجعت العملاء",
    "toast_copied_client": "اتنسخ العميل",
    "toast_deleted_client": "اتمسح العميل",
    "toast_deleted_named": "اتمسح «{name}»",
    "toast_client_restored": "رجع العميل للمتابعة",
    "toast_proposal_copied": "تم نسخ العرض — الصقه في واتساب",
    "toast_proposal_long_client": "العرض طويل — اتنسخ، الصقه في واتساب للعميل",
    "toast_proposal_long": "العرض طويل — اتنسخ، الصقه في واتساب",
    "toast_wa_opened_client": "اتفتح واتساب للعميل بالنص — راجع قبل الإرسال",
    "toast_need_client_name": "اكتب اسم العميل في عرض السعر أولاً",
    "toast_crm_update_undone": "اتلغى تحديث العميل من العرض",
    "toast_crm_removed": "اتشال العميل من المتابعة",
    "toast_need_wa_number": "حط رقم واتساب في خانة التواصل أولاً",
    "toast_wa_followup": "اتفتح واتساب بمسودة متابعة — راجع قبل الإرسال",
    "toast_contact_undone": "اتلغى تسجيل التواصل",
    "toast_contacted": "اتسجّل تواصل — المتابعة بعد 3 أيام",
    "toast_snooze_undone": "اتلغى التأجيل",
    "toast_snooze_bulk_undone": "اتلغى التأجيل الجماعي",
    "toast_today_undone": "اتلغى تعيين النهاردة",
    "toast_next_today": "المتابعة بقت النهاردة",
    "toast_today_bulk_undone": "اتلغى تعيين النهاردة الجماعي",
    "toast_no_next_clear": "مفيش مواعيد ظاهرة تتشال",
    "toast_next_restored": "اترجع مواعيد المتابعة",
    "toast_no_next_one": "مفيش موعد يتشال",
    "toast_next_one_restored": "اترجع موعد المتابعة",
    "toast_next_cleared": "اتشال موعد المتابعة",
    "toast_no_contactable": "مفيش ظاهرين متأخرين أو النهاردة يتسجّل لهم تواصل",
    "toast_contact_bulk_undone": "اتلغى تسجيل التواصل الجماعي",
    "toast_status_undone": "اتلغى تغيير الحالة",
    "toast_won": "تم الاتفاق — اتشالت المتابعة",
    "toast_lost": "اتسجّلت كخسارة — اتشالت المتابعة",
    "toast_as_proposal_next": "اتسجّل كعرض سعر — المتابعة بعد 3 أيام",
    "toast_back_lead": "رجعت للمتابعة — بعد 3 أيام",
    "toast_as_proposal": "اتسجّل كعرض سعر",
    "toast_no_crm_copy": "مفيش عملاء في التصفية دي للنسخ",
    "toast_copied_followups": "اتنسخ {n} متابعة ({filter})",
    "toast_no_pricing_copy": "مفيش صفوف تسعير للنسخ",
    "toast_copied_pricing_n": "اتنسخ {n} صف تسعير ({calc} محسوب)",
    "toast_copied_pricing_plain": "اتنسخ {n} صف تسعير",
    "toast_copied_week": "اتنسخ ملخص الأسبوع",
    "toast_week_already_done": "«{day}» مكتملة أصلاً",
    "toast_week_now_done": "«{day}» بقت مكتملة",
    "toast_week_done_undone": "اتلغى تم «{day}»",
    "toast_no_day_content": "مفيش محتوى لليوم ده للنسخ — حط مهام أو ساعات أولاً",
    "toast_copied_day": "اتنسخ يوم «{day}»",
    "toast_week_restored": "رجع أسبوع الشغل",
    "toast_week_ready": "أسبوع جديد جاهز",
    "toast_week_carried": "اترحّلت المهام الناقصة",
    "toast_week_empty": "أسبوع فاضي",
    "toast_week_already_clear": "«{day}» فاضي أصلاً",
    "toast_day_cleared": "اتمسح يوم «{day}»",
    "toast_day_restored": "رجع يوم «{day}»",
    "toast_day_marked": "«{day}» بقت مكتملة",
    "toast_day_unmarked": "«{day}» رجعت مش مكتملة",
    "toast_day_toggle_undone": "اتلغى تغيير «{day}»",
    "toast_no_incomplete": "مفيش أيام ناقصة بمحتوى تتعلّم تم",
    "toast_marked_n": "اتعلّم تم لـ {n} يوم",
    "toast_done_all_undone": "اتلغى تم الجماعي",
    "toast_no_clearable": "مفيش أيام تتتمسح",
    "toast_cleared_n_days": "اتمسح {n} يوم",
    "toast_clear_all_undone": "اتلغى مسح الجماعي",
    "toast_added_pricing": "اتضاف صف تسعير فاضي",
    "toast_removed_pricing": "اتشال صف التسعير الفاضي",
    "toast_added_client": "اتضاف عميل فاضي",
    "toast_removed_client": "اتشال العميل الفاضي",
    "toast_imported": "تم استيراد البيانات بأمان",
    "toast_import_undone": "رجعت البيانات قبل الاستيراد",
    "toast_import_bad": "ملف غير صالح — لازم يكون تصدير رتّب JSON",
    "toast_reset_demo": "رجعت للبيانات التجريبية",
    "toast_reset_undone": "رجعت بياناتك",
    "confirm_import": "استيراد الملف هيستبدل البيانات الحالية. كمّل؟",
    "confirm_reset": "هترجع للبيانات التجريبية — مش هتفضل فاضي. كمّل؟",
    "confirm_new_week": "أسبوع جديد؟ هنتصفّر الساعات والتسليمات وعلامات «تم». المهام الناقصة هتترحّل، وتقدر تفضّي الأسبوع من التوست.",
    "empty_week_full": "فاضي بالكامل",
    "mark_done": "تم",
    "mark_done_all": "تم للكل",
    "move_to_proposal": "انقل لعرض السعر",
    "err_file_big": "الملف كبير أوي (حد أقصى 2MB)",
    "err_not_json": "الملف مش JSON صالح",
    "err_not_object": "الملف مش JSON كائن صالح",
    "err_bad_keys": "الملف فيه مفاتيح مش مسموحة",
    "err_not_rattib": "الملف مش تصدير رتّب — مفيش أقسام معروفة",
    "week_clear_n_title": "امسح {n} يوم فيه محتوى أو تم",
    "week_clear_none_title": "مفيش أيام فيها محتوى أو تم",
    "no_name": "بدون اسم",
    "copy_client_head": "متابعة عميل — رتّب",
    "copy_contact": "التواصل",
    "copy_source": "المصدر",
    "copy_last": "آخر تواصل",
    "copy_next": "متابعة تالية",
    "copy_value": "القيمة",
    "copy_notes": "ملاحظات",
    "copy_pricing_head": "ملخص التسعير — رتّب",
    "copy_fx_line": "سعر الصرف: {fx} ج.م لكل $1 · مقدم {pct}%",
    "copy_pricing_total": "إجمالي ({n}): {price} ج.م · {usd} USD · مقدم {dep} · متبقي {bal}",
    "copy_pricing_none": "مفيش صفوف محسوبة بعد",
    "copy_row_n": "صف {n}",
    "copy_row_incomplete": "☐ {type} — ناقص ساعات/سعر ساعة",
    "copy_pricing_row_head": "صف تسعير — رتّب",
    "copy_week_head": "ملخص أسبوع الشغل — رتّب",
    "copy_week_progress": "تم {done} من 7 · ساعات التركيز: {hours}",
    "copy_tasks": "المهام",
    "copy_hours": "الساعات",
    "copy_deliverables": "التسليمات",
    "copy_day_head": "يوم الشغل — رتّب · {day}",
    "copy_day_head_today": "يوم الشغل — رتّب · {day} (اليوم)",
    "total_label": "الإجمالي"
  },
  "en": {
    "doc_title": "Rattib — freelancer OS in one place",
    "doc_desc": "Pricing + proposal + CRM + work week in one app. A Sarab product.",
    "brand_tag": "Free try here — not the end of the road",
    "demo_chip": "Demo data",
    "btn_export": "Export",
    "btn_export_title": "Export all data as JSON",
    "btn_import": "Import",
    "btn_import_title": "Import a Rattib JSON export",
    "btn_reset": "Reset data",
    "btn_reset_title": "Restore demo seed — not a blank wipe",
    "backup_nudge": "Your data stays in this browser only — export a JSON backup so you don’t lose it.",
    "btn_backup_export": "Export now",
    "btn_backup_dismiss": "Dismiss",
    "lang_group": "Language",
    "tab_pricing": "Pricing",
    "tab_proposal": "Proposal",
    "tab_crm": "Clients",
    "tab_week": "Work week",
    "panel_pricing": "Pricing",
    "panel_proposal": "Proposal",
    "panel_crm": "Client follow-ups",
    "panel_week": "Work week",
    "fx_label": "FX rate (EGP per $1)",
    "week_done_prefix": "Done",
    "week_done_mid": "of 7 · Focus hours:",
    "foot": "Sarab · Rattib MVP — organization tools, no income guarantee",
    "th_type": "Project type",
    "th_hours": "Hours",
    "th_rate": "Rate/hr",
    "th_costs": "Costs",
    "th_margin": "Margin %",
    "th_price": "Suggest EGP",
    "th_usd": "USD",
    "th_deposit": "Deposit {pct}%",
    "th_balance": "Balance",
    "th_notes": "Notes",
    "th_actions": "Actions",
    "pricing_totals": "Total computed rows",
    "add_pricing": "+ Pricing row",
    "copy_pricing": "Copy pricing",
    "copy_pricing_title": "Copy visible pricing rows as text",
    "clear_blank_pricing": "Clear blanks",
    "clear_blank_pricing_title": "Delete blank pricing rows",
    "to_proposal": "Send to proposal",
    "to_proposal_title": "Move pricing total into the proposal",
    "use_for_proposal": "Use in proposal",
    "use_for_proposal_title": "Put price and project into the proposal",
    "copy_text": "Copy text",
    "copy_pricing_row_title": "Copy pricing row as text",
    "dup_row": "Duplicate",
    "dup_pricing_title": "Duplicate row below",
    "prop_date": "Proposal date",
    "prop_valid": "Valid until",
    "prop_client": "Client name",
    "prop_contact": "Contact",
    "prop_project": "Project name",
    "prop_price": "Price (EGP)",
    "prop_deposit_pct": "Deposit %",
    "prop_revisions": "Revisions",
    "prop_duration": "Duration",
    "prop_payments": "Payment methods",
    "prop_summary": "Summary",
    "prop_in_scope": "In scope",
    "prop_out_scope": "Out of scope",
    "prop_terms": "Terms",
    "prop_next": "Next step",
    "prop_deposit_calc": "Calculated deposit",
    "prop_balance_calc": "Balance on delivery",
    "copy_wa": "Copy for WhatsApp",
    "open_wa": "Open WhatsApp",
    "from_pricing": "From pricing",
    "from_pricing_title": "Move computed pricing total into proposal price",
    "add_to_crm": "Add to clients",
    "date_title": "Day / month / year",
    "copy_crm": "Copy follow-ups",
    "copy_crm_title": "Copy visible follow-up list",
    "snooze3_all": "+3 all",
    "snooze3_all_title": "Snooze follow-up 3 days for visible clients",
    "snooze7_all": "+7 all",
    "snooze7_all_title": "Snooze follow-up one week for visible clients",
    "today_all": "Today all",
    "today_all_title": "Set follow-up to today for visible clients",
    "clear_next_all": "No date all",
    "clear_next_all_title": "Clear follow-up date for visible clients",
    "contacted_all": "Contacted all",
    "contacted_all_title": "Log contact today + follow-up in 3 days for due visible clients",
    "clear_blank_clients": "Clear blanks",
    "clear_blank_clients_title": "Delete blank clients",
    "add_client": "+ Client",
    "crm_filters_aria": "Filter clients",
    "crm_search_sr": "Search clients",
    "crm_search_ph": "Search name / contact / source / notes",
    "crm_search_clear": "Clear search",
    "crm_empty_filter": "No clients in this filter — try “All” or add a client.",
    "crm_empty_none": "No clients yet — tap “+ Client” or “Add to clients” from Proposal.",
    "crm_empty_search": "No results for this search — try another word or clear search.",
    "crm_empty_today": "No follow-ups today — if any are late, try “Overdue”.",
    "crm_empty_none_next": "All active clients have a next date — nice.",
    "th_name": "Name",
    "th_contact": "Contact",
    "th_source": "Source",
    "th_status": "Status",
    "th_last": "Last contact",
    "th_next": "Next follow-up",
    "th_value": "Value",
    "crm_totals": "Visible value total",
    "filter_all": "All",
    "filter_today": "Today",
    "filter_overdue": "Overdue",
    "filter_none": "No date",
    "filter_lead": "Lead",
    "filter_proposal": "Proposal",
    "filter_won": "Won",
    "filter_lost": "Lost",
    "status_lead": "Lead",
    "status_proposal": "Proposal",
    "status_won": "Won",
    "status_lost": "Lost",
    "clear_next": "No date",
    "clear_next_title": "Clear follow-up date",
    "snooze_group": "Quick follow-up",
    "today_btn": "Today",
    "today_btn_title": "Set follow-up to today",
    "snooze3_title": "Snooze 3 days",
    "snooze7_title": "Snooze one week",
    "whatsapp": "WhatsApp",
    "whatsapp_title": "Open WhatsApp",
    "contacted": "Contacted",
    "copy_client_title": "Copy client card as text",
    "dup_client_title": "Duplicate client below",
    "contact_ph": "WhatsApp 01xxxxxxxxx",
    "contact_hint_phone": "Add a number so WhatsApp appears",
    "overdue_badge": "{n} overdue",
    "pipeline_empty": "Nothing visible in this filter",
    "pipeline_visible": "Visible: {n} · value {sum} EGP",
    "pipeline_overdue": "{n} overdue",
    "pipeline_today": "{n} due today",
    "pipeline_none": "{n} no date",
    "pipeline_overdue_title": "Show overdue follow-ups",
    "pipeline_today_title": "Show today’s follow-ups",
    "pipeline_none_title": "Show clients without a next date",
    "toast_filter_overdue": "Filtered to overdue",
    "toast_filter_overdue_pipe": "Filtered to overdue follow-ups",
    "toast_filter_today_pipe": "Filtered to today’s follow-ups",
    "toast_filter_none_pipe": "Filtered to no date",
    "crm_count_valued": "({v} with value · {n} visible · {filter})",
    "crm_count_plain": "({n} visible · {filter})",
    "copy_today": "Copy today",
    "copy_today_title": "Copy today’s card as text",
    "copy_week": "Copy summary",
    "week_done_all": "Done all",
    "week_done_all_title": "Mark every incomplete day that has content as done",
    "week_clear_all": "Clear all",
    "week_clear_all_title": "Clear tasks, hours, deliverables, and done for days with content",
    "new_week": "New week",
    "th_day": "Day",
    "th_tasks": "Tasks",
    "th_focus": "Focus hours",
    "th_deliverables": "Deliverables",
    "th_done": "Done?",
    "today_pill": "Today",
    "done_yes": "Done",
    "done_no": "Not yet",
    "done_on_title": "Unmark day as done",
    "done_off_title": "Mark day as done",
    "copy_day_title": "Copy day card as text",
    "clear_day": "Clear",
    "clear_day_title": "Clear today’s tasks, hours, and deliverables",
    "day_sun": "Sunday",
    "day_mon": "Monday",
    "day_tue": "Tuesday",
    "day_wed": "Wednesday",
    "day_thu": "Thursday",
    "day_fri": "Friday",
    "day_sat": "Saturday",
    "undo": "Undo",
    "egp": "EGP",
    "hint_today": "Today",
    "hint_tomorrow": "Tomorrow",
    "hint_late1": "1 day late",
    "hint_late_n": "{n} days late",
    "hint_in_n": "in {n} days",
    "toast_exported": "Exported {file}",
    "toast_fill_hours": "Fill hours and hourly rate first",
    "toast_fill_one_row": "Fill at least one pricing row (hours and rate) first",
    "toast_moved_proposal": "Moved to proposal with calculated price",
    "toast_moved_total": "Moved pricing total: {price} EGP",
    "toast_proposal_restored": "Proposal restored",
    "toast_copied_pricing_row": "Pricing row copied",
    "toast_copied_named": "Copied “{name}”",
    "toast_undid_copy": "Duplicate undone",
    "toast_pricing_row_restored": "Pricing row restored",
    "toast_no_blank_pricing": "No blank rows to clear",
    "toast_cleared_blank_pricing": "Cleared {n} blank row(s)",
    "toast_pricing_rows_restored": "Pricing rows restored",
    "toast_no_blank_clients": "No blank clients",
    "toast_cleared_blank_clients": "Cleared {n} blank client(s)",
    "toast_clients_restored": "Clients restored",
    "toast_copied_client": "Client copied",
    "toast_deleted_client": "Client deleted",
    "toast_deleted_named": "Deleted “{name}”",
    "toast_client_restored": "Client restored to follow-ups",
    "toast_proposal_copied": "Proposal copied — paste into WhatsApp",
    "toast_proposal_long_client": "Proposal is long — copied; paste into WhatsApp for the client",
    "toast_proposal_long": "Proposal is long — copied; paste into WhatsApp",
    "toast_wa_opened_client": "Opened WhatsApp with the text — review before sending",
    "toast_need_client_name": "Enter the client name on the proposal first",
    "toast_crm_update_undone": "Client update from proposal undone",
    "toast_crm_removed": "Client removed from follow-ups",
    "toast_need_wa_number": "Add a WhatsApp number in the contact field first",
    "toast_wa_followup": "Opened WhatsApp with a follow-up draft — review before sending",
    "toast_contact_undone": "Contact log undone",
    "toast_contacted": "Contact logged — follow-up in 3 days",
    "toast_snooze_undone": "Snooze undone",
    "toast_snooze_bulk_undone": "Bulk snooze undone",
    "toast_today_undone": "Set-to-today undone",
    "toast_next_today": "Follow-up set to today",
    "toast_today_bulk_undone": "Bulk set-to-today undone",
    "toast_no_next_clear": "No visible dates to clear",
    "toast_next_restored": "Follow-up dates restored",
    "toast_no_next_one": "No date to clear",
    "toast_next_one_restored": "Follow-up date restored",
    "toast_next_cleared": "Follow-up date cleared",
    "toast_no_contactable": "No visible overdue/today clients to mark contacted",
    "toast_contact_bulk_undone": "Bulk contact log undone",
    "toast_status_undone": "Status change undone",
    "toast_won": "Marked won — follow-up cleared",
    "toast_lost": "Marked lost — follow-up cleared",
    "toast_as_proposal_next": "Marked as proposal — follow-up in 3 days",
    "toast_back_lead": "Back to follow-up — in 3 days",
    "toast_as_proposal": "Marked as proposal",
    "toast_no_crm_copy": "No clients in this filter to copy",
    "toast_copied_followups": "Copied {n} follow-up(s) ({filter})",
    "toast_no_pricing_copy": "No pricing rows to copy",
    "toast_copied_pricing_n": "Copied {n} pricing row(s) ({calc} computed)",
    "toast_copied_pricing_plain": "Copied {n} pricing row(s)",
    "toast_copied_week": "Week summary copied",
    "toast_week_already_done": "“{day}” already done",
    "toast_week_now_done": "“{day}” marked done",
    "toast_week_done_undone": "Undid done on “{day}”",
    "toast_no_day_content": "Nothing to copy for this day — add tasks or hours first",
    "toast_copied_day": "Copied day “{day}”",
    "toast_week_restored": "Work week restored",
    "toast_week_ready": "New week ready",
    "toast_week_carried": "Incomplete tasks carried over",
    "toast_week_empty": "Week cleared",
    "toast_week_already_clear": "“{day}” already empty",
    "toast_day_cleared": "Cleared day “{day}”",
    "toast_day_restored": "Restored day “{day}”",
    "toast_day_marked": "“{day}” marked done",
    "toast_day_unmarked": "“{day}” unmarked",
    "toast_day_toggle_undone": "Undid change on “{day}”",
    "toast_no_incomplete": "No incomplete days with content to mark done",
    "toast_marked_n": "Marked {n} day(s) done",
    "toast_done_all_undone": "Bulk done undone",
    "toast_no_clearable": "No days to clear",
    "toast_cleared_n_days": "Cleared {n} day(s)",
    "toast_clear_all_undone": "Bulk clear undone",
    "toast_added_pricing": "Blank pricing row added",
    "toast_removed_pricing": "Blank pricing row removed",
    "toast_added_client": "Blank client added",
    "toast_removed_client": "Blank client removed",
    "toast_imported": "Data imported safely",
    "toast_import_undone": "Restored data from before import",
    "toast_import_bad": "Invalid file — needs a Rattib JSON export",
    "toast_reset_demo": "Restored demo data",
    "toast_reset_undone": "Restored your data",
    "confirm_import": "Import will replace current data. Continue?",
    "confirm_reset": "This restores demo data — not a blank wipe. Continue?",
    "confirm_new_week": "New week? Hours, deliverables, and done marks reset. Incomplete tasks carry over; you can empty the week from the toast.",
    "empty_week_full": "Empty fully",
    "mark_done": "Done",
    "mark_done_all": "Done all",
    "move_to_proposal": "Send to proposal",
    "err_file_big": "File too large (max 2MB)",
    "err_not_json": "File is not valid JSON",
    "err_not_object": "File is not a valid JSON object",
    "err_bad_keys": "File contains disallowed keys",
    "err_not_rattib": "Not a Rattib export — no known sections",
    "week_clear_n_title": "Clear {n} day(s) with content or done",
    "week_clear_none_title": "No days with content or done",
    "no_name": "Untitled",
    "copy_client_head": "Client follow-up — Rattib",
    "copy_contact": "Contact",
    "copy_source": "Source",
    "copy_last": "Last contact",
    "copy_next": "Next follow-up",
    "copy_value": "Value",
    "copy_notes": "Notes",
    "copy_pricing_head": "Pricing summary — Rattib",
    "copy_fx_line": "FX: {fx} EGP per $1 · deposit {pct}%",
    "copy_pricing_total": "Total ({n}): {price} EGP · {usd} USD · deposit {dep} · balance {bal}",
    "copy_pricing_none": "No computed rows yet",
    "copy_row_n": "Row {n}",
    "copy_row_incomplete": "☐ {type} — missing hours/rate",
    "copy_pricing_row_head": "Pricing row — Rattib",
    "copy_week_head": "Work week summary — Rattib",
    "copy_week_progress": "Done {done} of 7 · focus hours: {hours}",
    "copy_tasks": "Tasks",
    "copy_hours": "Hours",
    "copy_deliverables": "Deliverables",
    "copy_day_head": "Work day — Rattib · {day}",
    "copy_day_head_today": "Work day — Rattib · {day} (today)",
    "total_label": "Total"
  }
};

const LANG_KEY = "lang";
const DAY_KEYS = ["day_sun", "day_mon", "day_tue", "day_wed", "day_thu", "day_fri", "day_sat"];
const DAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
let appLang = "ar";
function normalizeLang(v) { return v === "en" ? "en" : "ar"; }
function t(key, vars) {
  const pack = I18N[appLang] || I18N.ar;
  let s = pack[key];
  if (s == null) s = (I18N.ar && I18N.ar[key]) || key;
  if (vars && typeof vars === "object") {
    s = String(s).replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : ""));
  }
  return s;
}
function dayLabel(storedDay) {
  const idx = DAYS_AR.indexOf(storedDay);
  if (idx >= 0) return t(DAY_KEYS[idx]);
  return storedDay || "";
}
function applyDocumentLang() {
  const html = document.documentElement;
  if (appLang === "en") { html.setAttribute("lang", "en"); html.setAttribute("dir", "ltr"); }
  else { html.setAttribute("lang", "ar"); html.setAttribute("dir", "rtl"); }
  document.title = t("doc_title");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("doc_desc"));
}
function paintLangToggle() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const on = btn.dataset.lang === appLang;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}
function paintStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (key) el.title = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.setAttribute("placeholder", t(key));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (key) el.setAttribute("aria-label", t(key));
  });
  const chip = document.getElementById("demo-seed-chip");
  if (chip) chip.textContent = t("demo_chip");
  paintLangToggle();
}
function setAppLang(next, { persist = true, repaint = true } = {}) {
  appLang = normalizeLang(next);
  applyDocumentLang();
  if (persist) saveUi({ [LANG_KEY]: appLang });
  paintStaticI18n();
  if (repaint && typeof renderAll === "function") {
    try { renderAll(); } catch { /* boot */ }
  }
}
function initLangFromUi() {
  appLang = normalizeLang(loadUi()[LANG_KEY]);
  applyDocumentLang();
  paintStaticI18n();
}
function bindLangToggle() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.lang;
      if (normalizeLang(next) === appLang) return;
      setAppLang(next);
    });
  });
}


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

/** Persist current `state` as demo seed (chip on) or user-owned data (chip off + backup nudge eligible). */
function commitState({ asDemo }) {
  if (asDemo) {
    persistDemoSeed();
    return;
  }
  showingDemoSeed = false;
  try { localStorage.removeItem(DEMO_FLAG_KEY); } catch { /* private mode */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  // Demo export is not a real backup of owned data — don't suppress the nudge after first edit.
  if (!showingDemoSeed) saveUi({ lastExportAt: stamp });
  paintBackupNudge();
  showToast(t("toast_exported", { file: filename }));
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

function crmFilterLabel(id) {
  return t(`filter_${id}`) || id;
}
const CRM_FILTER_LABELS = new Proxy({}, {
  get(_t, prop) {
    if (typeof prop !== "string") return undefined;
    return crmFilterLabel(prop);
  },
});

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
      showToast(t("toast_filter_overdue"));
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
  const depCell = foot.querySelector('[data-label="المقدم"], [data-label^="مقدم"], [data-label^="Deposit"], [data-label^="Deposit "]');
  if (depCell) depCell.setAttribute("data-label", t("th_deposit", { pct: depositPct() }));
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
  if (depHead) depHead.textContent = t("th_deposit", { pct: depositPct() });

  const tbody = document.querySelector("#pricing-table tbody");
  tbody.innerHTML = "";
  state.pricing.forEach((row, i) => {
    const c = pricingCalcs(row);
    const tr = document.createElement("tr");
    tr.dataset.row = String(i);
    const depLabel = t("th_deposit", { pct: depositPct() });
    tr.innerHTML = `
      <td data-label="${esc(t("th_type"))}"><input data-i="${i}" data-k="type" value="${esc(row.type)}"></td>
      <td class="num" data-label="${esc(t("th_hours"))}"><input data-i="${i}" data-k="hours" type="number" value="${row.hours}"></td>
      <td class="num" data-label="${esc(t("th_rate"))}"><input data-i="${i}" data-k="rate" type="number" value="${row.rate}"></td>
      <td class="num" data-label="${esc(t("th_costs"))}"><input data-i="${i}" data-k="costs" type="number" value="${row.costs}"></td>
      <td class="num" data-label="${esc(t("th_margin"))}"><input data-i="${i}" data-k="margin" type="number" value="${row.margin}"></td>
      <td class="calc-cell" data-label="${esc(t("th_price"))}"><span class="calc">${c.empty ? "—" : money(c.price)}</span></td>
      <td class="calc-cell" data-label="USD"><span class="calc">${c.empty ? "—" : money(c.usd)}</span></td>
      <td class="calc-cell" data-label="${esc(depLabel)}"><span class="calc">${c.empty ? "—" : money(c.dep)}</span></td>
      <td class="calc-cell" data-label="${esc(t("th_balance"))}"><span class="calc">${c.empty ? "—" : money(c.bal)}</span></td>
      <td data-label="${esc(t("th_notes"))}"><input data-i="${i}" data-k="notes" value="${esc(row.notes)}"></td>
      <td class="row-actions" data-label="${esc(t("th_actions"))}">
        <button type="button" class="ghost tiny" data-use="${i}" title="${esc(t("use_for_proposal_title"))}">${t("use_for_proposal")}</button>
        <button type="button" class="ghost tiny" data-copy-row="${i}" title="${esc(t("copy_pricing_row_title"))}">${t("copy_text")}</button>
        <button type="button" class="ghost tiny" data-dup="${i}" title="${esc(t("dup_pricing_title"))}">${t("dup_row")}</button>
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
    btn.onclick = () => { usePricingRowForProposal(+btn.dataset.use); };
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

function usePricingRowForProposal(i) {
  const row = state.pricing[i];
  if (!row) return;
  const c = pricingCalcs(row);
  if (c.empty) { alert(t("toast_fill_hours")); return; }
  const previous = JSON.parse(JSON.stringify(state.proposal));
  state.proposal.project = row.type || state.proposal.project;
  state.proposal.price = Math.round(c.price);
  if (row.notes) state.proposal.summary = row.notes;
  save();
  goTab("proposal");
  renderProposal();
  offerProposalAfterPricingToast(t("toast_moved_proposal"), previous);
}

function fillProposalFromPricing() {
  const t = pricingTotals();
  if (t.n === 0) {
    alert(t("toast_fill_one_row"));
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
  offerProposalAfterPricingToast(t("toast_moved_total", { price: money(price) }), previous);
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
        label: t("copy_wa"),
        onAction: () => { copyProposalWhatsApp(); },
      },
      {
        label: t("undo"),
        onAction: () => {
          state.proposal = previous;
          save();
          renderProposal();
          showToast(t("toast_proposal_restored"));
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
    ? t("toast_copied_named", { name: copy.type })
    : t("toast_copied_pricing_row");
  showToast(label, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      const removeAt = state.pricing.indexOf(copy);
      if (removeAt < 0) return;
      state.pricing.splice(removeAt, 1);
      save();
      renderPricing();
      showToast(t("toast_undid_copy"));
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
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      const insertAt = Math.min(at, state.pricing.length);
      state.pricing.splice(insertAt, 0, removed);
      save();
      renderPricing();
      showToast(t("toast_pricing_row_restored"));
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
    showToast(t("toast_no_blank_pricing"));
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
    showToast(t("toast_no_blank_pricing"));
    return;
  }
  showToast(t("toast_cleared_blank_pricing", { n }), {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      state.pricing = previous.map((row) => ({ ...row }));
      save();
      renderPricing();
      showToast(t("toast_pricing_rows_restored"));
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
    showToast(t("toast_no_blank_clients"));
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
    showToast(t("toast_no_blank_clients"));
    return;
  }
  showToast(t("toast_cleared_blank_clients", { n }), {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      state.clients = previous.map((c) => ({ ...c }));
      save();
      renderCrm();
      showToast(t("toast_clients_restored"));
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
    ? t("toast_copied_named", { name: copy.name })
    : t("toast_copied_client");
  showToast(label, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      const removeAt = state.clients.indexOf(copy);
      if (removeAt < 0) return;
      state.clients.splice(removeAt, 1);
      save();
      renderCrm();
      showToast(t("toast_undid_copy"));
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
  const label = (removed && removed.name) ? t("toast_deleted_named", { name: removed.name }) : t("toast_deleted_client");
  showToast(label, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      const insertAt = Math.min(at, state.clients.length);
      state.clients.splice(insertAt, 0, removed);
      save();
      renderCrm();
      showToast(t("toast_client_restored"));
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
    actionLabel: t("add_to_crm"),
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
  offerProposalAddToCrmToast(t("toast_proposal_copied"));
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
      ? t("toast_proposal_long_client")
      : t("toast_proposal_long"));
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
  offerProposalAddToCrmToast(phone
    ? t("toast_wa_opened_client")
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
    ["date","prop_date","date"], ["validUntil","prop_valid","date"],
    ["client","prop_client","text"], ["contact","prop_contact","text"],
    ["project","prop_project","text"], ["price","prop_price","number"],
    ["depositPct","prop_deposit_pct","number"], ["revisions","prop_revisions","text"],
    ["duration","prop_duration","text"], ["payments","prop_payments","text"],
    ["summary","prop_summary","textarea", true], ["inScope","prop_in_scope","textarea", true],
    ["outScope","prop_out_scope","textarea", true], ["terms","prop_terms","textarea", true],
    ["next","prop_next","textarea", true],
  ];
  const box = document.getElementById("proposal-form");
  const dateLang = appLang === "en" ? "en-GB" : "ar-EG";
  box.innerHTML = fields.map(([k,labelKey,type,full]) => {
    const label = t(labelKey);
    const ar = type === "date" ? formatArDate(p[k]) : "";
    const control = type === "textarea"
      ? `<textarea data-k="${k}">${esc(p[k] ?? "")}</textarea>`
      : type === "date"
        ? `<input data-k="${k}" type="date" lang="${dateLang}" title="${esc(t("date_title"))}" value="${esc(p[k] ?? "")}">${ar ? `<div class="date-hint">${ar}</div>` : ""}`
        : `<input data-k="${k}" type="${type}" value="${esc(p[k] ?? "")}">`;
    return `<label class="${full ? "full" : ""}">${esc(label)}
      ${control}
    </label>`;
  }).join("") + `
    <label>${esc(t("prop_deposit_calc"))}
      <div class="calc" id="proposal-deposit-calc">${money(deposit)} ${t("egp")}</div>
    </label>
    <label>${esc(t("prop_balance_calc"))}
      <div class="calc" id="proposal-balance-calc">${money(balance)} ${t("egp")}</div>
    </label>
    <div class="full proposal-actions">
      <button type="button" id="btn-copy-wa" class="primary">${t("copy_wa")}</button>
      <button type="button" id="btn-open-wa" class="ghost">${t("open_wa")}</button>
      <button type="button" id="btn-from-pricing" class="ghost" title="${esc(t("from_pricing_title"))}">${t("from_pricing")}</button>
      <button type="button" id="btn-add-crm" class="ghost">${t("add_to_crm")}</button>
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
    const locale = appLang === "en" ? "en-GB" : "ar-EG";
    return new Date(iso + "T12:00:00").toLocaleDateString(locale, {
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
  if (diff === 0) return t("hint_today");
  if (diff === 1) return t("hint_tomorrow");
  if (diff === -1) return t("hint_late1");
  if (diff < 0) return t("hint_late_n", { n: Math.abs(diff) });
  return t("hint_in_n", { n: diff });
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

/** After proposal → CRM save: offer واتساب when phone present + تراجع (parity with markContacted #110). */
function offerProposalCrmSavedToast(msg, clientIndex, onUndo) {
  const c = state.clients[clientIndex];
  const hasWa = !!(c && whatsappPhone(c.contact));
  const actions = [];
  if (hasWa) {
    actions.push({
      label: t("whatsapp"),
      onAction: () => openClientWhatsApp(clientIndex),
    });
  }
  actions.push({
    label: t("undo"),
    onAction: onUndo,
  });
  showToast(msg, {
    actions,
    ms: hasWa ? 8000 : 6000,
  });
}

function addProposalToCrm() {
  const p = state.proposal || {};
  const name = String(p.client || "").trim();
  if (!name) {
    alert(t("toast_need_client_name"));
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
    offerProposalCrmSavedToast("اتحدّث العميل في المتابعة", idx, () => {
      if (state.clients[idx] !== c) return;
      c.contact = prev.contact;
      c.value = prev.value;
      c.notes = prev.notes;
      c.status = prev.status;
      c.last = prev.last;
      c.next = prev.next;
      save();
      renderCrm();
      showToast(t("toast_crm_update_undone"));
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
  const newIdx = state.clients.length - 1;
  revealClientInCrm(newIdx);
  renderCrm();
  offerProposalCrmSavedToast("اتضاف للعملاء — متابعة بعد 3 أيام", newIdx, () => {
    const at = state.clients.indexOf(copy);
    if (at < 0) return;
    state.clients.splice(at, 1);
    save();
    renderCrm();
    showToast(t("toast_crm_removed"));
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

function openClientWhatsApp(i, opts = {}) {
  const c = state.clients[i];
  if (!c) return;
  const phone = whatsappPhone(c.contact);
  if (!phone) {
    showToast(t("toast_need_wa_number"));
    return;
  }
  // Prefill a short Arabic follow-up; keep URL short so wa.me does not break.
  const text = clientFollowUpText(c);
  let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
  if (url.length > 1800) url = "https://wa.me/" + phone;
  window.open(url, "_blank", "noopener,noreferrer");
  // Offer تواصلت so the freelancer can close the loop without hunting the row button.
  // Match the row UI: no mark-contacted affordance once already won.
  // skipContactedOffer: reverse loop after markContacted — plain toast only.
  if (opts.skipContactedOffer || c.status === "won") {
    showToast(t("toast_wa_followup"));
    return;
  }
  showToast(t("toast_wa_followup"), {
    actionLabel: t("contacted"),
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
  const hasWa = !!whatsappPhone(c.contact);
  const actions = [];
  if (hasWa) {
    actions.push({
      label: t("whatsapp"),
      onAction: () => openClientWhatsApp(i, { skipContactedOffer: true }),
    });
  }
  actions.push({
    label: t("undo"),
    onAction: () => {
      if (state.clients[i] !== c) return;
      c.last = prev.last;
      c.next = prev.next;
      c.status = prev.status;
      save();
      renderCrm();
      showToast(t("toast_contact_undone"));
    },
  });
  showToast(t("toast_contacted"), {
    actions,
    ms: hasWa ? 8000 : 6000,
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
  const undo = () => {
    if (state.clients[i] !== c) return;
    c.next = prevNext;
    save();
    renderCrm();
    showToast(t("toast_snooze_undone"));
  };
  // Parity with markContacted (#110) / setClientNextToday: offer واتساب when phone present.
  if (whatsappPhone(c.contact)) {
    showToast(label, {
      ms: 8000,
      actions: [
        {
          label: t("whatsapp"),
          onAction: () => openClientWhatsApp(i, { skipContactedOffer: true }),
        },
        { label: t("undo"), onAction: undo },
      ],
    });
    return;
  }
  showToast(label, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: undo,
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
  const undo = () => {
    snapshots.forEach(({ c, i, prevNext }) => {
      if (state.clients[i] !== c) return;
      c.next = prevNext;
    });
    save();
    renderCrm();
    showToast(t("toast_snooze_bulk_undone"));
  };
  // Parity with setVisibleClientsNextToday / markVisibleContacted: offer واتساب for first target with phone.
  const waTarget = snapshots.find(({ c }) => !!whatsappPhone(c.contact));
  if (waTarget) {
    showToast(label, {
      ms: 8000,
      actions: [
        {
          label: t("whatsapp"),
          onAction: () => openClientWhatsApp(waTarget.i, { skipContactedOffer: true }),
        },
        { label: t("undo"), onAction: undo },
      ],
    });
    return;
  }
  showToast(label, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: undo,
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
  const hasWa = !!whatsappPhone(c.contact);
  const actions = [];
  if (hasWa) {
    actions.push({
      label: t("whatsapp"),
      onAction: () => openClientWhatsApp(i, { skipContactedOffer: true }),
    });
  }
  actions.push({
    label: t("undo"),
    onAction: () => {
      if (state.clients[i] !== c) return;
      c.next = prevNext;
      save();
      renderCrm();
      showToast(t("toast_today_undone"));
    },
  });
  showToast(t("toast_next_today"), {
    actions,
    ms: hasWa ? 8000 : 6000,
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
  const msg = `المتابعة بقت النهاردة لـ ${n} عميل`;
  const undo = () => {
    snapshots.forEach(({ c, i, prevNext }) => {
      if (state.clients[i] !== c) return;
      c.next = prevNext;
    });
    save();
    renderCrm();
    showToast(t("toast_today_bulk_undone"));
  };
  const waTarget = snapshots.find(({ c }) => !!whatsappPhone(c.contact));
  if (waTarget) {
    showToast(msg, {
      ms: 8000,
      actions: [
        {
          label: t("whatsapp"),
          onAction: () => openClientWhatsApp(waTarget.i, { skipContactedOffer: true }),
        },
        { label: t("undo"), onAction: undo },
      ],
    });
    return;
  }
  showToast(msg, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: undo,
  });
}


function clearVisibleClientsNext() {
  const targets = visibleCrmClients().filter(({ c }) =>
    ["lead", "proposal"].includes(c.status) && String(c.next || "").trim()
  );
  if (!targets.length) {
    showToast(t("toast_no_next_clear"));
    return;
  }
  const snapshots = targets.map(({ c, i }) => ({ c, i, prevNext: c.next }));
  snapshots.forEach(({ c }) => {
    c.next = "";
  });
  save();
  renderCrm();
  const n = snapshots.length;
  const label = `اتشال موعد المتابعة لـ ${n} عميل`;
  const undo = () => {
    snapshots.forEach(({ c, i, prevNext }) => {
      if (state.clients[i] !== c) return;
      c.next = prevNext;
    });
    save();
    renderCrm();
    showToast(t("toast_next_restored"));
  };
  // Parity with snoozeVisibleClients (#118) / markVisibleContacted: offer واتساب for first target with phone.
  const waTarget = snapshots.find(({ c }) => !!whatsappPhone(c.contact));
  if (waTarget) {
    showToast(label, {
      ms: 8000,
      actions: [
        {
          label: t("whatsapp"),
          onAction: () => openClientWhatsApp(waTarget.i, { skipContactedOffer: true }),
        },
        { label: t("undo"), onAction: undo },
      ],
    });
    return;
  }
  showToast(label, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: undo,
  });
}


function clearClientNext(i) {
  const c = state.clients[i];
  if (!c) return;
  if (!["lead", "proposal"].includes(c.status)) return;
  if (!String(c.next || "").trim()) {
    showToast(t("toast_no_next_one"));
    return;
  }
  const prevNext = c.next;
  c.next = "";
  save();
  renderCrm();
  const undo = () => {
    if (state.clients[i] !== c) return;
    c.next = prevNext;
    save();
    renderCrm();
    showToast(t("toast_next_one_restored"));
  };
  // Parity with snoozeClient (#118) / setClientNextToday: offer واتساب when phone present.
  if (whatsappPhone(c.contact)) {
    showToast(t("toast_next_cleared"), {
      ms: 8000,
      actions: [
        {
          label: t("whatsapp"),
          onAction: () => openClientWhatsApp(i, { skipContactedOffer: true }),
        },
        { label: t("undo"), onAction: undo },
      ],
    });
    return;
  }
  showToast(t("toast_next_cleared"), {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: undo,
  });
}


function markVisibleContacted() {
  const targets = visibleCrmClients().filter(({ c }) =>
    ["lead", "proposal"].includes(c.status) && (clientIsOverdue(c) || clientIsDueToday(c))
  );
  if (!targets.length) {
    showToast(t("toast_no_contactable"));
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
  // Parity with markContacted (#110): offer واتساب for first contacted client with a phone.
  const waTarget = snapshots.find(({ c }) => !!whatsappPhone(c.contact));
  const undo = () => {
    snapshots.forEach(({ c, i, prevLast, prevNext, prevStatus }) => {
      if (state.clients[i] !== c) return;
      c.last = prevLast;
      c.next = prevNext;
      c.status = prevStatus;
    });
    save();
    renderCrm();
    showToast(t("toast_contact_bulk_undone"));
  };
  const msg = `اتسجّل تواصل لـ ${n} عميل — المتابعة بعد 3 أيام`;
  if (waTarget) {
    showToast(msg, {
      actions: [
        {
          label: t("whatsapp"),
          onAction: () => openClientWhatsApp(waTarget.i, { skipContactedOffer: true }),
        },
        { label: t("undo"), onAction: undo },
      ],
      ms: 8000,
    });
    return;
  }
  showToast(msg, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: undo,
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
    el.append(document.createTextNode(t("pipeline_empty")));
    appendPipelineJump(el, "overdue", overdueN, t("pipeline_overdue", { n: overdueN }), t("pipeline_overdue_title"), t("toast_filter_overdue_pipe"));
    appendPipelineJump(el, "today", todayN, t("pipeline_today", { n: todayN }), t("pipeline_today_title"), t("toast_filter_today_pipe"));
    appendPipelineJump(el, "none", noneN, t("pipeline_none", { n: noneN }), t("pipeline_none_title"), t("toast_filter_none_pipe"));
    el.hidden = false;
    return;
  }
  const sum = visible.reduce((acc, { c }) => acc + n(c.value), 0);
  // Respect current search, same as chip counts.
  el.replaceChildren();
  el.append(document.createTextNode(t("pipeline_visible", { n: visible.length, sum: money(sum) })));
  // Overdue first, then today, then missing next — parity jumps.
  appendPipelineJump(el, "overdue", overdueN, t("pipeline_overdue", { n: overdueN }), t("pipeline_overdue_title"), t("toast_filter_overdue_pipe"));
  appendPipelineJump(el, "today", todayN, t("pipeline_today", { n: todayN }), t("pipeline_today_title"), t("toast_filter_today_pipe"));
  appendPipelineJump(el, "none", noneN, t("pipeline_none", { n: noneN }), t("pipeline_none_title"), t("toast_filter_none_pipe"));
  el.hidden = false;
}


function onClientStatusChange(i, prev, nextStatus) {
  const c = state.clients[i];
  if (!c || prev === nextStatus) return;
  const prevNext = c.next;
  let toast = "";
  if (nextStatus === "won" || nextStatus === "lost") {
    c.next = "";
    toast = nextStatus === "won" ? t("toast_won") : t("toast_lost");
  } else if ((nextStatus === "lead" || nextStatus === "proposal") && !String(c.next || "").trim()) {
    c.next = addDaysISO(localISODate(), 3);
    toast = nextStatus === "proposal"
      ? t("toast_as_proposal_next")
      : t("toast_back_lead");
  } else if (nextStatus === "proposal" && prev !== "proposal") {
    // lead→proposal with an existing next was silent — close the send-proposal loop.
    toast = t("toast_as_proposal");
  }
  save();
  renderCrm();
  if (!toast) return;
  const undo = () => {
    if (state.clients[i] !== c) return;
    c.status = prev;
    c.next = prevNext;
    save();
    renderCrm();
    showToast(t("toast_status_undone"));
  };
  // Active pipeline: offer واتساب when phone present (parity with markContacted #110).
  const offerWa = ["lead", "proposal"].includes(nextStatus) && !!whatsappPhone(c.contact);
  if (offerWa) {
    showToast(toast, {
      ms: 8000,
      actions: [
        {
          label: t("whatsapp"),
          // Keep تواصلت offer after WA — status change is not itself a contact.
          onAction: () => openClientWhatsApp(i),
        },
        { label: t("undo"), onAction: undo },
      ],
    });
    return;
  }
  showToast(toast, {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: undo,
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
      ? t("crm_empty_none")
      : (crmQuery || "").trim()
        ? t("crm_empty_search")
        : crmFilter === "today"
          ? t("crm_empty_today")
          : crmFilter === "none"
            ? t("crm_empty_none_next")
            : t("crm_empty_filter");
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
    const hasNext = String(c.next || "").trim();
    const clearNextBtn = hasNext
      ? `<button type="button" class="ghost tiny" data-clear-next="${i}" title="${esc(t("clear_next_title"))}">${t("clear_next")}</button>`
      : "";
    const dateLang = appLang === "en" ? "en-GB" : "ar-EG";
    const snoozeHtml = showSnooze ? `
        <div class="snooze-row" role="group" aria-label="${esc(t("snooze_group"))}">
          <button type="button" class="ghost tiny" data-today="${i}" title="${esc(t("today_btn_title"))}">${t("today_btn")}</button>
          <button type="button" class="ghost tiny" data-snooze="${i}" data-days="3" title="${esc(t("snooze3_title"))}">+3</button>
          <button type="button" class="ghost tiny" data-snooze="${i}" data-days="7" title="${esc(t("snooze7_title"))}">+7</button>
          ${clearNextBtn}
        </div>` : "";
    tr.innerHTML = `
      <td data-label="${esc(t("th_name"))}"><input data-i="${i}" data-k="name" value="${esc(c.name)}"></td>
      <td data-label="${esc(t("th_contact"))}">
        <input data-i="${i}" data-k="contact" value="${esc(c.contact)}" placeholder="${esc(t("contact_ph"))}">
        ${(!whatsappPhone(c.contact) && /واتساب|whatsapp/i.test(c.contact || "")) ? `<div class="date-hint">${esc(t("contact_hint_phone"))}</div>` : ""}
      </td>
      <td data-label="${esc(t("th_source"))}"><input data-i="${i}" data-k="source" value="${esc(c.source)}"></td>
      <td data-label="${esc(t("th_status"))}"><select data-i="${i}" data-k="status">${STATUS.map(s => `<option value="${s.value}" ${c.status===s.value?"selected":""}>${esc(statusLabel(s.value))}</option>`).join("")}</select></td>
      <td data-label="${esc(t("th_last"))}">
        <input data-i="${i}" data-k="last" type="date" lang="${dateLang}" title="${esc(t("date_title"))}" value="${esc(c.last)}">
        ${c.last && formatArDate(c.last) ? `<div class="date-hint">${formatArDate(c.last)}</div>` : ""}
      </td>
      <td data-label="${esc(t("th_next"))}" class="${["won","lost"].includes(c.status) ? "next-closed" : ""}">
        ${["won","lost"].includes(c.status)
          ? `<span class="muted next-na">—</span>`
          : `<input data-i="${i}" data-k="next" type="date" lang="${dateLang}" title="${esc(t("date_title"))}" value="${esc(c.next)}">
        ${c.next && formatArDate(c.next) ? `<div class="date-hint">${formatArDate(c.next)}</div>` : ""}
        ${hint ? `<div class="date-hint${overdue ? " late" : ""}">${hint}</div>` : ""}
        ${snoozeHtml}`}
      </td>
      <td class="num" data-label="${esc(t("th_value"))}"><input data-i="${i}" data-k="value" type="number" value="${c.value}"></td>
      <td data-label="${esc(t("th_notes"))}"><input data-i="${i}" data-k="notes" value="${esc(c.notes)}"></td>
      <td class="row-actions" data-label="${esc(t("th_actions"))}">
        ${whatsappPhone(c.contact) ? `<button type="button" class="ghost tiny" data-wa="${i}" title="${esc(t("whatsapp_title"))}">${t("whatsapp")}</button>` : ""}
        ${c.status !== "won" ? `<button type="button" class="ghost tiny" data-touch="${i}">${t("contacted")}</button>` : ""}
        <button type="button" class="ghost tiny" data-copy-card="${i}" title="${esc(t("copy_client_title"))}">${t("copy_text")}</button>
        <button type="button" class="ghost tiny" data-dup="${i}" title="${esc(t("dup_client_title"))}">${t("dup_row")}</button>
        <button type="button" class="icon-btn" data-del="${i}">✕</button>
      </td>`;
    tbody.appendChild(tr);
  });
  const badge = document.getElementById("crm-overdue-badge");
  if (badge) {
    badge.hidden = overdueCount === 0;
    badge.textContent = overdueCount ? t("overdue_badge", { n: overdueCount }) : "";
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
  tbody.querySelectorAll("[data-clear-next]").forEach((btn) => {
    btn.onclick = () => clearClientNext(+btn.dataset.clearNext);
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
    const filterLabel = crmFilterLabel(crmFilter);
    count.textContent = t.withValue
      ? t("crm_count_valued", { v: t.withValue, n: t.n, filter: filterLabel })
      : t("crm_count_plain", { n: t.n, filter: filterLabel });
  }
  const el = document.getElementById("crm-tot-value");
  if (el) el.textContent = `${money(t.sum)} ${t("egp")}`;
}

function statusLabel(value) {
  if (STATUS.some((s) => s.value === value)) return t(`status_${value}`);
  return String(value || "");
}

function visibleCrmClients() {
  return sortedClientIndexes().filter(({ c }) => clientMatchesFilter(c));
}


function clientCardPlainText(c) {
  const name = String(c.name || "").trim() || t("no_name");
  const lines = [
    t("copy_client_head"),
    "",
  ];
  let head = `• ${name} (${statusLabel(c.status)})`;
  const hint = nextDateHint(c.next);
  const nextAr = formatArDate(c.next);
  if (hint) head += ` — ${hint}`;
  else if (nextAr) head += ` — ${nextAr}`;
  lines.push(head);
  const contact = String(c.contact || "").trim();
  if (contact) lines.push(`  ${t("copy_contact")}: ${contact}`);
  const source = String(c.source || "").trim();
  if (source) lines.push(`  ${t("copy_source")}: ${source}`);
  const lastAr = formatArDate(c.last);
  if (lastAr) lines.push(`  ${t("copy_last")}: ${lastAr}`);
  else if (String(c.last || "").trim()) lines.push(`  ${t("copy_last")}: ${c.last}`);
  if (nextAr && !["won", "lost"].includes(c.status)) lines.push(`  ${t("copy_next")}: ${nextAr}`);
  else if (String(c.next || "").trim() && !["won", "lost"].includes(c.status)) lines.push(`  ${t("copy_next")}: ${c.next}`);
  if (n(c.value)) lines.push(`  ${t("copy_value")}: ${money(c.value)} ${t("egp")}`);
  const notes = String(c.notes || "").trim();
  if (notes) lines.push(`  ${t("copy_notes")}: ${notes}`);
  return lines.join("\n");
}

async function copyClientCard(i) {
  const c = state.clients[i];
  if (!c) return;
  await copyTextToClipboard(clientCardPlainText(c));
  const name = String(c.name || "").trim();
  const msg = name ? t("toast_copied_named", { name }) : t("toast_copied_client");
  // After نسخ نص: offer واتساب (when phone) + تواصلت — parity with markContacted #110 / row WA; skip won.
  if (c.status === "won") {
    showToast(msg);
    return;
  }
  const hasWa = !!whatsappPhone(c.contact);
  const actions = [];
  if (hasWa) {
    actions.push({
      label: t("whatsapp"),
      onAction: () => openClientWhatsApp(i),
    });
  }
  actions.push({
    label: t("contacted"),
    onAction: () => markContacted(i),
  });
  showToast(msg, {
    actions,
    ms: 8000,
  });
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

/** After CRM follow-ups copy: offer واتساب (first due w/ phone) + تواصلت للكل — parity with copyClientCard #114 / markVisibleContacted #112. */
function offerCrmFollowUpsContactedToast(msg) {
  const targets = visibleContactedTargets();
  if (!targets.length) {
    showToast(msg);
    return;
  }
  const waTarget = targets.find(({ c }) => !!whatsappPhone(c.contact));
  const actions = [];
  if (waTarget) {
    actions.push({
      label: t("whatsapp"),
      // Keep تواصلت offer after WA — copy is not itself a contact (same as copyClientCard).
      onAction: () => openClientWhatsApp(waTarget.i),
    });
  }
  actions.push({
    label: t("contacted_all"),
    onAction: () => markVisibleContacted(),
  });
  showToast(msg, {
    actions,
    ms: 8000,
  });
}

async function copyCrmFollowUps() {
  const visible = visibleCrmClients();
  if (!visible.length) {
    showToast(t("toast_no_crm_copy"));
    return;
  }
  await copyTextToClipboard(crmFollowUpPlainText());
  const filterLabel = crmFilterLabel(crmFilter);
  offerCrmFollowUpsContactedToast(t("toast_copied_followups", { n: visible.length, filter: filterLabel }));
}


function pricingPlainText() {
  const lines = [
    t("copy_pricing_head"),
    t("copy_fx_line", { fx: state.fx, pct: depositPct() }),
  ];
  const tot = pricingTotals();
  if (tot.n) {
    lines.push(t("copy_pricing_total", {
      n: tot.n,
      price: money(tot.price),
      usd: money(tot.usd),
      dep: money(tot.dep),
      bal: money(tot.bal),
    }));
  } else {
    lines.push(t("copy_pricing_none"));
  }
  lines.push("");
  state.pricing.forEach((row, i) => {
    const c = pricingCalcs(row);
    const type = String(row.type || "").trim() || t("copy_row_n", { n: i + 1 });
    if (c.empty) {
      lines.push(t("copy_row_incomplete", { type }));
    } else {
      lines.push(`• ${type}: ${row.hours}h × ${money(row.rate)} + ${money(row.costs)} (${row.margin}%) → ${money(c.price)} ${t("egp")} / ${money(c.usd)} USD`);
      lines.push(`  ${t("th_deposit", { pct: depositPct() })} ${money(c.dep)} · ${t("th_balance")} ${money(c.bal)}`);
    }
    const notes = String(row.notes || "").trim();
    if (notes) lines.push(`  ${t("copy_notes")}: ${notes}`);
  });
  return lines.join("\n");
}

function pricingRowPlainText(row, i = 0) {
  const c = pricingCalcs(row);
  const type = String(row.type || "").trim() || t("copy_row_n", { n: i + 1 });
  const lines = [
    t("copy_pricing_row_head"),
    t("copy_fx_line", { fx: state.fx, pct: depositPct() }),
    "",
  ];
  if (c.empty) {
    lines.push(t("copy_row_incomplete", { type }));
  } else {
    lines.push(`• ${type}: ${row.hours}h × ${money(row.rate)} + ${money(row.costs)} (${row.margin}%) → ${money(c.price)} ${t("egp")} / ${money(c.usd)} USD`);
    lines.push(`  ${t("th_deposit", { pct: depositPct() })} ${money(c.dep)} · ${t("th_balance")} ${money(c.bal)}`);
  }
  const notes = String(row.notes || "").trim();
  if (notes) lines.push(`  ${t("copy_notes")}: ${notes}`);
  return lines.join("\n");
}

async function copyPricingRow(i) {
  const idx = Number(i);
  if (!Number.isInteger(idx) || idx < 0 || idx >= state.pricing.length) return;
  const row = state.pricing[idx];
  await copyTextToClipboard(pricingRowPlainText(row, idx));
  const type = String(row.type || "").trim();
  const msg = type ? t("toast_copied_named", { name: type }) : t("toast_copied_pricing_row");
  // Offer انقل للعرض after نسخ نص when row has a computed price (parity with row button).
  // Use actions[] (multi-action toast shape) + suggested()>0 belt-and-suspenders so a
  // non-empty computed row never falls back to a plain «اتنسخ …» toast.
  const actionable = !pricingCalcs(row).empty || suggested(row) > 0;
  if (!actionable) {
    showToast(msg);
    return;
  }
  showToast(msg, {
    ms: 8000,
    actions: [{
      label: t("use_for_proposal"),
      onAction: () => usePricingRowForProposal(idx),
    }],
  });
}

/** After pricing summary copy: offer انقل لعرض السعر when any row is computed (proposal WA → أضف للعملاء parity). */
function offerPricingToProposalToast(msg) {
  const t = pricingTotals();
  if (!t.n) {
    showToast(msg);
    return;
  }
  showToast(msg, {
    actionLabel: t("move_to_proposal"),
    ms: 8000,
    onAction: () => fillProposalFromPricing(),
  });
}

async function copyPricingSummary() {
  if (!state.pricing.length) {
    showToast(t("toast_no_pricing_copy"));
    return;
  }
  await copyTextToClipboard(pricingPlainText());
  const t = pricingTotals();
  const msg = t.n
    ? t("toast_copied_pricing_n", { n: state.pricing.length, calc: t.n })
    : t("toast_copied_pricing_plain", { n: state.pricing.length });
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
    t("copy_week_head"),
    t("copy_week_progress", { done: weekDoneCount(), hours: weekTotal() }),
    "",
  ];
  state.week.forEach((w) => {
    const mark = w.done === "☑" ? "☑" : "☐";
    lines.push(`${mark} ${dayLabel(w.day)}`);
    if (String(w.tasks || "").trim()) lines.push(`  ${t("copy_tasks")}: ${w.tasks}`);
    if (n(w.hours)) lines.push(`  ${t("copy_hours")}: ${w.hours}`);
    const del = String(w.deliverables || "").trim();
    if (del && del !== "—") lines.push(`  ${t("copy_deliverables")}: ${w.deliverables}`);
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
    actionLabel: t("mark_done_all"),
    ms: 8000,
    onAction: () => markWeekDoneAll(),
  });
}

async function copyWeekSummary() {
  await copyTextToClipboard(weekPlainText());
  offerWeekSummaryDoneAllToast(t("toast_copied_week"));
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
  const dlab = dayLabel(w.day);
  const title = isToday
    ? t("copy_day_head_today", { day: dlab })
    : t("copy_day_head", { day: dlab });
  const lines = [title, `${mark} ${dlab}`];
  if (String(w.tasks || "").trim()) lines.push(`  ${t("copy_tasks")}: ${w.tasks}`);
  if (n(w.hours)) lines.push(`  ${t("copy_hours")}: ${w.hours}`);
  const del = String(w.deliverables || "").trim();
  if (del && del !== "—") lines.push(`  ${t("copy_deliverables")}: ${w.deliverables}`);
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
    showToast(t("toast_week_already_done", { day: dayLabel(w.day) }));
    return;
  }
  const prevDone = w.done;
  w.done = "☑";
  save();
  renderWeek();
  showToast(t("toast_week_now_done", { day: dayLabel(w.day) }), {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      if (state.week.indexOf(w) < 0) return;
      w.done = prevDone;
      save();
      renderWeek();
      showToast(t("toast_week_done_undone", { day: dayLabel(w.day) }));
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
    actionLabel: t("mark_done"),
    ms: 8000,
    onAction: () => markWeekDayDone(i),
  });
}

async function copyWeekDay(i) {
  if (!weekDayHasContent(i)) {
    showToast(t("toast_no_day_content"));
    return;
  }
  await copyTextToClipboard(weekDayPlainText(i));
  const w = state.week[i];
  offerWeekDayDoneToast(t("toast_copied_day", { day: w ? dayLabel(w.day) : t("hint_today") }), i);
}

async function copyTodayWeek() {
  const row = todayWeekRow();
  if (!row) {
    showToast(t("toast_no_day_content"));
    return;
  }
  await copyWeekDay(row.i);
}


function weekHasCarryTasks() {
  return state.week.some((w) => w.done !== "☑" && String(w.tasks || "").trim());
}

function resetWeek() {
  if (!confirm(t("confirm_new_week"))) return;
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
    showToast(t("toast_week_restored"));
  };
  if (!weekHasCarryTasks()) {
    applyReset(false);
    showToast(t("toast_week_ready"), {
      actionLabel: t("undo"),
      ms: 6000,
      onAction: restorePrevious,
    });
    return;
  }
  applyReset(true);
  showToast(t("toast_week_carried"), {
    ms: 8000,
    actions: [
      {
        label: t("empty_week_full"),
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
          showToast(t("toast_week_empty"), {
            actionLabel: t("undo"),
            ms: 6000,
            onAction: restorePrevious,
          });
        },
      },
      {
        label: t("undo"),
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
    showToast(t("toast_week_already_clear", { day: dayLabel(w.day) }));
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
  showToast(t("toast_day_cleared", { day: dayLabel(w.day) }), {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      if (state.week.indexOf(w) < 0) return;
      w.tasks = prev.tasks;
      w.hours = prev.hours;
      w.deliverables = prev.deliverables;
      w.done = prev.done;
      save();
      renderWeek();
      showToast(t("toast_day_restored", { day: dayLabel(w.day) }));
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
  showToast(w.done === "☑" ? t("toast_day_marked", { day: dayLabel(w.day) }) : t("toast_day_unmarked", { day: dayLabel(w.day) }), {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      if (state.week.indexOf(w) < 0) return;
      w.done = prevDone;
      save();
      renderWeek();
      showToast(t("toast_day_toggle_undone", { day: dayLabel(w.day) }));
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
    showToast(t("toast_no_incomplete"));
    return;
  }
  const snapshots = targets.map(({ w, i }) => ({ w, i, prevDone: w.done }));
  snapshots.forEach(({ w }) => { w.done = "☑"; });
  save();
  renderWeek();
  const n = snapshots.length;
  showToast(t("toast_marked_n", { n }), {
    actionLabel: t("undo"),
    ms: 6000,
    onAction: () => {
      snapshots.forEach(({ w, i, prevDone }) => {
        if (state.week[i] !== w) return;
        w.done = prevDone;
      });
      save();
      renderWeek();
      showToast(t("toast_done_all_undone"));
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
    showToast(t("toast_no_clearable"));
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
  showToast(t("toast_cleared_n_days", { n }), {
    actionLabel: t("undo"),
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
      showToast(t("toast_clear_all_undone"));
    },
  });
}

function paintWeekClearAllBtn() {
  const btn = document.getElementById("btn-week-clear-all");
  if (!btn) return;
  const n = weekClearableDays().length;
  btn.hidden = n === 0;
  btn.title = n
    ? t("week_clear_n_title", { n })
    : t("week_clear_none_title");
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
    const dlab = dayLabel(w.day);
    const dayHtml = w.day === todayName ? `${esc(dlab)} <span class="today-pill">${esc(t("today_pill"))}</span>` : esc(dlab);
    const doneOn = w.done === "☑";
    tr.innerHTML = `
      <td data-label="${esc(t("th_day"))}">${dayHtml}</td>
      <td data-label="${esc(t("th_tasks"))}"><input data-i="${i}" data-k="tasks" value="${esc(w.tasks)}"></td>
      <td class="num" data-label="${esc(t("th_focus"))}"><input data-i="${i}" data-k="hours" type="number" step="0.5" value="${w.hours}"></td>
      <td data-label="${esc(t("th_deliverables"))}"><input data-i="${i}" data-k="deliverables" value="${esc(w.deliverables)}"></td>
      <td data-label="${esc(t("th_done"))}" class="week-done-cell">
        <button type="button" class="done-toggle${doneOn ? " on" : ""}" data-done-toggle="${i}" aria-pressed="${doneOn ? "true" : "false"}" title="${esc(doneOn ? t("done_on_title") : t("done_off_title"))}">
          <span aria-hidden="true">${doneOn ? "☑" : "☐"}</span>
          <span class="done-toggle-label">${esc(doneOn ? t("done_yes") : t("done_no"))}</span>
        </button>
      </td>
      <td class="row-actions week-row-actions" data-label="${esc(t("th_actions"))}">
        <button type="button" class="ghost tiny" data-copy-day="${i}" title="${esc(t("copy_day_title"))}">${t("copy_text")}</button>
        <button type="button" class="ghost tiny" data-clear-day="${i}" title="${esc(t("clear_day_title"))}">${t("clear_day")}</button>
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
  if (!isPlainObject(data)) throw new Error(t("err_not_object"));
  // reject prototype-pollution keys and require at least one known section
  const keys = Object.keys(data);
  if (keys.some((k) => k === "__proto__" || k === "constructor" || k === "prototype")) {
    throw new Error(t("err_bad_keys"));
  }
  const hasSection = ["fx", "pricing", "proposal", "clients", "week"].some((k) => k in data);
  if (!hasSection) throw new Error(t("err_not_rattib"));

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
    }).filter((c) => !isBlankClient(c));
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
  bindLangToggle();
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
    showToast(t("toast_added_pricing"), {
      actionLabel: t("undo"),
      ms: 6000,
      onAction: () => {
        const at = state.pricing.indexOf(copy);
        if (at < 0) return;
        state.pricing.splice(at, 1);
        save();
        renderPricing();
        showToast(t("toast_removed_pricing"));
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
    showToast(t("toast_added_client"), {
      actionLabel: t("undo"),
      ms: 6000,
      onAction: () => {
        const at = state.clients.indexOf(copy);
        if (at < 0) return;
        state.clients.splice(at, 1);
        save();
        renderCrm();
        showToast(t("toast_removed_client"));
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
      if (file.size > 2_000_000) throw new Error(t("err_file_big"));
      const text = await file.text();
      let data;
      try { data = JSON.parse(text); }
      catch { throw new Error(t("err_not_json")); }
      const next = normalizeImportedState(data);
      if (!confirm(t("confirm_import"))) {
        e.target.value = "";
        return;
      }
      const previous = JSON.parse(JSON.stringify(state));
      const previousWasDemo = showingDemoSeed || matchesCurrentDemoSeed(previous);
      state = next;
      // Re-imported pristine seed → keep «بيانات تجريبية»; otherwise owned data.
      commitState({ asDemo: matchesCurrentDemoSeed(state) });
      renderAll();
      showToast(t("toast_imported"), {
        actionLabel: t("undo"),
        ms: 6000,
        onAction: () => {
          state = previous;
          commitState({ asDemo: previousWasDemo || matchesCurrentDemoSeed(previous) });
          renderAll();
          showToast(t("toast_import_undone"));
        },
      });
    } catch (err) {
      const msg = err?.message || t("toast_import_bad");
      showToast(msg, { ms: 7000 });
    }
    e.target.value = "";
  };
  document.getElementById("btn-reset").onclick = () => {
    if (!confirm(t("confirm_reset"))) return;
    const previous = JSON.parse(JSON.stringify(state));
    const previousWasDemo = showingDemoSeed;
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
    showToast(t("toast_reset_demo"), {
      actionLabel: t("undo"),
      ms: 6000,
      onAction: () => {
        state = previous;
        commitState({ asDemo: previousWasDemo });
        renderAll();
        showToast(t("toast_reset_undone"));
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
  initLangFromUi();
  paintCrmFilterChips();
  wire();
} finally {
  persistPauseDepth = Math.max(0, persistPauseDepth - 1);
}
if (showingDemoSeed) persistDemoSeed();
else paintDemoChip();
paintStaticI18n();