# Rattib promo v2 — ad script (15–25s)

**Brand:** Sarab · **Product:** Rattib (English public)  
**Signed:** Koldo  
**Parent / distribution:** Seli  
**UX review:** Roli (v1 → v2)  
**Length:** ~22s · 1920×1080 · 30fps  
**Tone:** clean, modern, high-ad — oasis green on night black  
**Visuals:** live web app UI only (no Excel)  
**CTA:** free web app + Whop $12  
**Links:** https://koldoishere.github.io/sarab-rattib-funnel/bio.html · /app/

---

## What changed vs v1 (Roli)

1. **RTL Ken Burns** — Arabic UI pans now **start with the RIGHT side** visible (`pan_x` near 1.0), then drift left. Pricing reveals `انقل للعرض` / `نسخ`; CRM reveals `واتساب` action buttons; Week reveals `تم؟` / `مش بعد`.
2. **Mobile-readable tables** — feature crops zoom to **~2–3 rows** (app feel, not a full spreadsheet dump).
3. **CRM post-#31** — fresh live capture from https://koldoishere.github.io/sarab-rattib-funnel/app/ with seed demo phones (`واتساب 010…`) and visible **واتساب** buttons.
4. **Latest landing HQ** — pricing / weekly / proposal refreshed from live app (weekly `تم`/`مش بعد`, pricing action pills).

Unchanged: Sarab carbon / oasis-green / white · English on-screen copy · Try free + $12 Whop · bio URL · ~22s · 1920×1080.

---

## On-screen + optional VO

| Time | Visual | On-screen text | VO (optional) |
|------|--------|----------------|---------------|
| **0:00–0:03** | Logo chip + wordmark on carbon | **SARAB** / **Rattib** / *Price. Propose. Follow up. Focus.* | “This is Rattib — from Sarab.” |
| **0:03–0:07** | Pricing UI — RTL start → `انقل للعرض`/`نسخ` (2–3 rows) | **01 · PRICING** / *Know your number before you send it.* / Hours · rate · costs · margin → clear price | “Start with pricing — hours, rate, costs, margin. Know your number.” |
| **0:07–0:11** | Quote / proposal UI (RTL pan) | **02 · QUOTE** / *Proposals that look ready to send.* / Scope in/out · deposit · revisions | “Then a clean proposal — scope, deposit, revisions.” |
| **0:11–0:15** | CRM — phones on right → واتساب buttons on left | **03 · CRM** / *Follow-ups that don't disappear.* / Status · next step · WhatsApp · late alerts | “A light CRM so follow-ups never get lost — WhatsApp ready.” |
| **0:15–0:18.5** | Week — days/tasks → `تم؟` / `مش بعد` | **04 · WEEK** / *Protect the week. Ship the work.* / Focus hours · deliverables · done | “Close the loop with your week — focus hours, then ship.” |
| **0:18.5–0:22** | End card | **Try free. Own it for $12.** / Web app free · Full kit on Whop / bio URL / *Sarab · Koldo* | “Try the free web app — or own the kit on Whop for twelve dollars.” |

---

## Compact VO (~20s, one take)

> This is Rattib — from Sarab. Price with clarity. Send proposals that look ready. Never lose a follow-up. Protect your week. Try the free web app — or own it on Whop for twelve dollars.

---

## Do / don't

- **Do:** English storefront copy; show Arabic UI from live app screenshots; $12 one-time; free try CTA; RTL-first pans; tight 2–3 row crops.
- **Don't:** legal name Yossef Fares; earnings claims; Excel workbook shots; cheesy hype; full-table spreadsheet zooms.

---

## Deliverables

- `rattib-promo-v2.mp4` — review cut
- `stills/still-open.png`, `still-pricing.png`, `still-crm.png` (demo phones), `still-cta.png`
- Builder: `build_promo_v2.py` (Pillow frames → ffmpeg H.264)
- Live captures: `captures/preview-*-hq.png` (CRM post-#31)
