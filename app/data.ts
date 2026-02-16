// ─────────────────────────────────────────────────────────────────────────────
// Configuration — quiz data + per-result Gumroad links
// ─────────────────────────────────────────────────────────────────────────────

// Quiz question definitions
export const QUESTIONS = {
  feeling: {
    label: "What feeling do you want to carry?",
    options: [
      { value: "calm", label: "Calm", description: "Stillness, peace, serenity" },
      { value: "strength", label: "Strength", description: "Power, resilience, courage" },
      { value: "change", label: "Change", description: "Growth, transformation, momentum" },
    ],
  },
  theme: {
    label: "Which aesthetic speaks to you?",
    options: [
      { value: "minimal", label: "Minimal", description: "Clean, quiet, understated" },
      { value: "nature", label: "Nature", description: "Organic, grounded, alive" },
      { value: "bold", label: "Bold", description: "Striking, expressive, unapologetic" },
    ],
  },
  placement: {
    label: "Where are you thinking of placing it?",
    options: [
      { value: "arm", label: "Arm", description: "Forearm or upper arm" },
      { value: "rib", label: "Rib", description: "Ribcage or side torso" },
      { value: "back", label: "Back", description: "Upper or lower back" },
    ],
  },
} as const;

export type Feeling = "calm" | "strength" | "change";
export type Theme = "minimal" | "nature" | "bold";
export type Placement = "arm" | "rib" | "back";

export type ResultKey = `${Feeling}+${Theme}`;

export interface TattooResult {
  // FREE preview (shown on site)
  word: string;
  tagline: string;

  // PAID content (in PDF)
  romaji: string;
  meaning: string;
  nuance: string;

  // Per-result CTA link
  gumroadUrl: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// The 9 tattoo word results (Feeling × Theme)
// ─────────────────────────────────────────────────────────────────────────────
export const RESULTS: Record<ResultKey, TattooResult> = {
  "calm+minimal": {
    word: "凪",
    tagline: "A quiet strength you can carry.",
    romaji: "Nagi",
    meaning: "Calm sea / stillness",
    nuance: "Quiet strength, inner calm, a pause in motion…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/fwovvc",
  },

  "calm+nature": {
    word: "静謐",
    tagline: "Stillness — calm you can return to.",
    romaji: "Seihitsu",
    meaning: "Tranquility / profound stillness",
    nuance: "…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/xrtden",
  },

  "calm+bold": {
    word: "波",
    tagline: "Flow with presence — steady, alive.",
    romaji: "Nami",
    meaning: "Wave / flow",
    nuance: "…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/fhczf",
  },

  "strength+minimal": {
    word: "力",
    tagline: "Quiet power — simple and direct.",
    romaji: "Chikara",
    meaning: "Strength / power",
    nuance: "…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/sdmuiv",
  },

  "strength+nature": {
    word: "不動",
    tagline: "Unmoved. Unshaken. Enduring.",
    romaji: "Fudou",
    meaning: "Unshakable / immovable",
    nuance: "…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/rfqyr",
  },

  "strength+bold": {
    word: "炎",
    tagline: "Fuel, will, and forward motion.",
    romaji: "Honoo",
    meaning: "Flame",
    nuance: "…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/fisvhn",
  },

  "change+minimal": {
    word: "新章",
    tagline: "A clean shift into your next chapter.",
    romaji: "Shinshou",
    meaning: "New chapter",
    nuance: "…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/zhzvvy",
  },

  "change+nature": {
    word: "風",
    tagline: "Move like wind — free and inevitable.",
    romaji: "Kaze",
    meaning: "Wind",
    nuance: "…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/fpbnq",
  },

  "change+bold": {
    word: "暁",
    tagline: "Dawn energy. No apologies.",
    romaji: "Akatsuki",
    meaning: "Dawn",
    nuance: "…",
    gumroadUrl: "https://monomaisonjp.gumroad.com/l/yqbrfk",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Placement suggestions (Q3 customisation)
// ─────────────────────────────────────────────────────────────────────────────
export const PLACEMENT_SUGGESTIONS: Record<Placement, string> = {
  arm: "Works well on the forearm or upper arm. Medium size reads clearly at a glance — no crowding needed.",
  rib: "Rib placement suits slightly smaller or flowing layouts. Discuss line weight with your artist; finer strokes age gracefully here.",
  back: "Back placement allows for larger scale and strong visual impact. The character's structure will carry at virtually any size.",
};
