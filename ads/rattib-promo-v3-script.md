# Rattib promo v3 — ad script (15–25s)

**Brand:** Sarab · **Product:** Rattib (English public)  
**Signed:** Koldo  
**Parent / distribution:** Seli  
**UX review:** Roli (v2 → v3)  
**Length:** ~22s · 1920×1080 · 30fps  
**Tone:** clean, modern, high-ad — oasis green on night black  
**Visuals:** live web app UI only (no Excel)  
**CTA:** free web app + Whop $12  
**Links:** https://koldoishere.github.io/sarab-rattib-funnel/bio.html · /app/

---

## What changed vs v2 (Roli)

Roli full-watch of v2: overall modern, web-app (not Excel), landing HQ clean — good.  
Pricing + CRM RTL pans **already fine** — promised buttons appear before those scenes end.  
**Only miss:** Week scene — `تم؟` / `مش بعد` never clearly visible (arrived only in the last ~0.4s, clipped by the left crop edge, then CTA crossfade).

### v3 week-only fix
1. **Widen week zoom** — `1.52→1.58` (was `1.72→1.82`) so the 2–3 row crop has more horizontal room for the left action column.
2. **Full left end** — `pan_x1 = 0.0` (was `0.04`).
3. **Front-load + HOLD** — week pan reaches the left by ~55% of the beat (`pan_arrive: 0.55`), then holds so `تم؟` / `مش بعد` stay readable for the second half of the scene (~1.7s).

Unchanged: pricing / quote / CRM Ken Burns · Sarab carbon / oasis-green / white · English on-screen copy · Try free + $12 Whop · bio URL · ~22s · 1920×1080 · no Excel.

---

## On-screen + optional VO

| Time | Visual | On-screen text | VO (optional) |
|------|--------|----------------|---------------|
| **0:00–0:03** | Logo chip + wordmark on carbon | **SARAB** / **Rattib** / *Price. Propose. Follow up. Focus.* | “This is Rattib — from Sarab.” |
| **0:03–0:07** | Pricing UI — RTL → `انقل للعرض`/`نسخ` (unchanged from v2) | **01 · PRICING** / *Know your number before you send it.* / Hours · rate · costs · margin → clear price | “Start with pricing — hours, rate, costs, margin. Know your number.” |
| **0:07–0:11** | Quote / proposal UI (RTL pan) | **02 · QUOTE** / *Proposals that look ready to send.* / Scope in/out · deposit · revisions | “Then a clean proposal — scope, deposit, revisions.” |
| **0:11–0:15** | CRM — phones → واتساب (unchanged from v2) | **03 · CRM** / *Follow-ups that don't disappear.* / Status · next step · WhatsApp · late alerts | “A light CRM so follow-ups never get lost — WhatsApp ready.” |
| **0:15–0:18.5** | Week — days/tasks → **HOLD on `تم؟` / `مش بعد`** | **04 · WEEK** / *Protect the week. Ship the work.* / Focus hours · deliverables · done | “Close the loop with your week — focus hours, then ship.” |
| **0:18.5–0:22** | End card | **Try free. Own it for $12.** / Web app free · Full kit on Whop / bio URL / *Sarab · Koldo* | “Try the free web app — or own the kit on Whop for twelve dollars.” |

---

## Compact VO (~20s, one take)

> This is Rattib — from Sarab. Price with clarity. Send proposals that look ready. Never lose a follow-up. Protect your week. Try the free web app — or own it on Whop for twelve dollars.

---

## Do / don't

- **Do:** English storefront copy; show Arabic UI from live app screenshots; $12 one-time; free try CTA; RTL-first pans; tight 2–3 row crops; week HOLD on `تم؟`/`مش بعد`.
- **Don't:** legal name Yossef Fares; earnings claims; Excel workbook shots; cheesy hype; full-table spreadsheet zooms; overhaul pricing/CRM crops that Roli already cleared.

---

## Deliverables

- `rattib-promo-v3.mp4` — review cut (H.264, 1920×1080)
- `rattib-promo-v3-script.md` — this file
- `build_promo_v3.py` — Pillow frames → ffmpeg H.264
- `stills/still-open.png`, `still-pricing.png`, `still-crm.png`, **`still-week.png`** (تم؟ / مش بعد), `still-cta.png`
