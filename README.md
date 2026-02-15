# Japanese Tattoo Word Generator

A calm, modern single-page quiz that guides non-Japanese audiences to a culturally considered Japanese tattoo word based on 3 quick questions.

---

## ✦ Stack

- **Next.js 14** (App Router) with **TypeScript**
- **Tailwind CSS** for styling
- **Google Fonts** — Cormorant Garamond + DM Sans + DM Mono
- No backend, no auth, no external services

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js 18.17+ (required by Next.js 14)
- npm 9+

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## 🗂 Project Structure

```
japanese-tattoo-quiz/
├── app/
│   ├── components/
│   │   └── QuizSection.tsx   ← All quiz + result UI (client component)
│   ├── data.ts               ← All quiz data, results & placement suggestions
│   ├── globals.css           ← Tailwind + custom styles
│   ├── layout.tsx            ← Root layout with metadata
│   └── page.tsx              ← Hero section + page shell
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## 🧩 Data Model

All quiz content lives in **`app/data.ts`** — a single file, easy to extend.

### Adding a new result

The results are keyed by `"feeling+theme"`. To add more options, extend the types and add entries:

```ts
// In data.ts
export const RESULTS: Record<ResultKey, TattooResult> = {
  "calm+minimal": { ... },   // existing
  // Add yours:
  "calm+minimal2": { ... },  // hypothetical new combo
};
```

### Setting your Gumroad URL

Replace the placeholder at the top of `app/data.ts`:

```ts
export const GUMROAD_URL = "https://YOUR_GUMROAD_URL_HERE";
// ↓ replace with:
export const GUMROAD_URL = "https://yourname.gumroad.com/l/your-product";
```

---

## 📐 Quiz Logic

| Q1 (Feeling) | Q2 (Theme) | Result word |
|---|---|---|
| calm | minimal | 凪 Nagi |
| calm | nature | 森 Mori |
| calm | bold | 波 Nami |
| strength | minimal | 芯 Shin |
| strength | nature | 岩 Iwa |
| strength | bold | 炎 Honoo |
| change | minimal | 移 I |
| change | nature | 風 Kaze |
| change | bold | 暁 Akatsuki |

**Q3 (Placement)** does not affect the word — it customises the placement suggestion line in the result card only.

---

## 🚀 Deploy

### Vercel (recommended)

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

### Netlify

```bash
npm run build
# Upload the .next folder via Netlify dashboard or CLI
```

---

## ✏️ Customisation Tips

- **Fonts**: Edit the `@import` in `app/globals.css` and update `tailwind.config.ts`
- **Colors**: Adjust the `colors` object in `tailwind.config.ts` — uses `ink`, `parchment`, `accent` tokens
- **New questions**: Extend `QUESTIONS`, `ResultKey`, and `RESULTS` in `data.ts`
- **Disclaimer text**: Edit directly in `QuizSection.tsx` inside the `ResultCard` component
