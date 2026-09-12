# Rattib promo v3.1 — ad script (15–25s)

**Brand:** Sarab · **Product:** Rattib (English public)  
**Signed:** Koldo  
**Parent / distribution:** Seli  
**UX review:** Roli (v3 → v3.1 wide)  
**Length:** ~22s · 1920×1080 · 30fps  
**Tone:** clean, modern, high-ad — oasis green on night black  
**Visuals:** live web app UI only (no Excel)  
**CTA:** free web app + Whop $12  
**Links:** https://koldoishere.github.io/sarab-rattib-funnel/bio.html · /app/

---

## What changed vs v3 (wide distribution)

Roli on v3: `تم؟` / `مش بعد` **are** visible in the week scene, but only after the pan (~0:16–0:17). Fine for normal distribution; for **wide ads** the opening frame of the week beat must already show the buttons.

### v3.1 week-only fix
1. **Start already on buttons** — `pan_x0 = pan_x1 = 0.0` (no RTL reveal into the action column).
2. **`pan_arrive: 0`** — held on `تم؟` / `مش بعد` from the first frame of the week scene.
3. **Slightly wider zoom** — `1.48→1.55` so مش بعد pills keep left margin inside the card.

Unchanged: pricing / quote / CRM Ken Burns · Sarab carbon / oasis-green / white · English on-screen copy · Try free + $12 Whop · bio URL · ~22s · 1920×1080 · no Excel.

---

## On-screen + optional VO

| Time | Visual | On-screen text | VO (optional) |
|------|--------|----------------|---------------|
| **0:00–0:03** | Logo chip + wordmark on carbon | **SARAB** / **Rattib** / *Price. Propose. Follow up. Focus.* | “This is Rattib — from Sarab.” |
| **0:03–0:07** | Pricing UI — RTL → `انقل للعرض`/`نسخ` (unchanged) | **01 · PRICING** / *Know your number before you send it.* / Hours · rate · costs · margin → clear price | “Start with pricing — hours, rate, costs, margin. Know your number.” |
| **0:07–0:11** | Quote / proposal UI (RTL pan) | **02 · QUOTE** / *Proposals that look ready to send.* / Scope in/out · deposit · revisions | “Then a clean proposal — scope, deposit, revisions.” |
| **0:11–0:15** | CRM — phones → واتساب (unchanged) | **03 · CRM** / *Follow-ups that don't disappear.* / Status · next step · WhatsApp · late alerts | “A light CRM so follow-ups never get lost — WhatsApp ready.” |
| **0:15–0:18.5** | Week — **`تم؟` / `مش بعد` visible from first frame** (held) | **04 · WEEK** / *Protect the week. Ship the work.* / Focus hours · deliverables · done | “Close the loop with your week — focus hours, then ship.” |
| **0:18.5–0:22** | End card | **Try free. Own it for $12.** / Web app free · Full kit on Whop / bio URL / *Sarab · Koldo* | “Try the free web app — or own the kit on Whop for twelve dollars.” |

---

## Compact VO (~20s, one take)

> This is Rattib — from Sarab. Price with clarity. Send proposals that look ready. Never lose a follow-up. Protect your week. Try the free web app — or own it on Whop for twelve dollars.

---

## Do / don't

- **Do:** English storefront copy; show Arabic UI from live app screenshots; $12 one-time; free try CTA; week opening frame already on `تم؟`/`مش بعد`; keep pricing/CRM as v3.
- **Don't:** legal name Yossef Fares; earnings claims; Excel workbook shots; cheesy hype; full-table spreadsheet zooms; overhaul pricing/CRM crops that Roli already cleared.

---

## Deliverables

- `rattib-promo-v3.1.mp4` — wide-distribution cut (H.264, 1920×1080)
- `rattib-promo-v3.1-script.md` — this file
- `build_promo_v3_1.py` — Pillow frames → ffmpeg H.264
- `stills/still-open.png`, `still-pricing.png`, `still-crm.png`, **`still-week.png`** (opening week frame — buttons visible), `still-cta.png`
