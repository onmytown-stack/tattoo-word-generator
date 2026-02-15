// ─────────────────────────────────────────────────────────────────────────────
// Configuration — update this constant to extend the quiz
// ─────────────────────────────────────────────────────────────────────────────

export const GUMROAD_URL = "https://monomaisonjp.gumroad.com/l/fhczf";

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

export interface TattooResult {
  // FREE preview (shown on site)
  word: string;
  tagline: string;

  // PAID content (shown only after purchase / in PDF)
  romaji: string;
  meaning: string;
  nuance: string;
}

export type ResultKey = `${Feeling}+${Theme}`;

// ─────────────────────────────────────────────────────────────────────────────
// The 9 tattoo word results (Feeling × Theme)
// ─────────────────────────────────────────────────────────────────────────────
export const RESULTS: Record<ResultKey, TattooResult> = {
  "calm+minimal": {
    word: "凪",
    tagline: "A quiet strength you can carry.",
    romaji: "Nagi",
    meaning: "Calm sea / stillness",
    nuance:
      "Quiet strength, inner calm, a pause in motion. This character captures a rare moment when the sea holds its breath — perfect for those who find peace by going still rather than by searching.",
  },

  "calm+nature": {
    word: "森",
    tagline: "Grounded calm, rooted in nature.",
    romaji: "Mori",
    meaning: "Forest",
    nuance:
      "Grounded calm, natural balance, a quiet place to breathe. 森 is built from three trees — a reminder that stillness grows in layers, rooted deep, never forced.",
  },

  "calm+bold": {
    word: "波",
    tagline: "Flow with presence — steady, alive.",
    romaji: "Nami",
    meaning: "Wave / flow",
    nuance:
      "Movement with calm presence; resilience through cycles. Waves don't resist — they arrive, shape, and recede. A strong visual that carries quiet wisdom beneath its energy.",
  },

  "strength+minimal": {
    word: "芯",
    tagline: "Your core stays steady.",
    romaji: "Shin",
    meaning: "Core / backbone",
    nuance:
      "Inner strength, staying true, a quiet but firm center. 芯 refers to the core of a plant or pencil — the essential part that holds everything together without showing off.",
  },

  "strength+nature": {
    word: "岩",
    tagline: "Unmoved. Unshaken. Enduring.",
    romaji: "Iwa",
    meaning: "Rock",
    nuance:
      "Stability and endurance; strength that doesn't need to shout. Unlike stone in motion, 岩 is the foundation that outlasts seasons, storms, and centuries — unmoved.",
  },

  "strength+bold": {
    word: "炎",
    tagline: "Fuel, will, and forward motion.",
    romaji: "Honoo",
    meaning: "Flame",
    nuance:
      "Passion and willpower; bold energy and drive. 炎 is formed from two fire radicals stacked — fire amplified. For those who burn with purpose and aren't afraid to show it.",
  },

  "change+minimal": {
    word: "移",
    tagline: "A clean shift into your next chapter.",
    romaji: "I",
    meaning: "Shift / transition",
    nuance:
      "A clean symbol of moving forward, subtle change, new direction. 移 speaks of transition without drama — a quiet step across a threshold, one era giving way to the next.",
  },

  "change+nature": {
    word: "風",
    tagline: "Move like wind — free and inevitable.",
    romaji: "Kaze",
    meaning: "Wind",
    nuance:
      "Momentum and freedom; change that arrives naturally. You don't see the wind — you feel it in everything it moves. This character holds the energy of invisible, unstoppable flow.",
  },

  "change+bold": {
    word: "暁",
    tagline: "Dawn energy. No apologies.",
    romaji: "Akatsuki",
    meaning: "Dawn",
    nuance:
      "A new beginning; transformation after darkness. 暁 captures the exact moment between night and day — that charged, luminous threshold most people sleep through. For those who don't.",
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
