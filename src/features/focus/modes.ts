import type { FocusMode } from "../../types/settings";

export interface ModeDefinition {
  id: FocusMode;
  label: string;
  emoji: string;
  description: string;
  allowKeywords: string[];
  blockKeywords: string[];
}

export const MODES: Record<Exclude<FocusMode, "off" | "custom">, ModeDefinition> = {
  education: {
    id: "education",
    label: "Education",
    emoji: "🎓",
    description: "Science, history, academics, documentaries",
    allowKeywords: [
      "science", "history", "math", "mathematics", "physics", "chemistry",
      "biology", "geography", "economics", "psychology", "philosophy",
      "sociology", "political", "law", "ethics", "linguistics",
      "documentary", "lecture", "professor", "university", "academic",
      "research", "study", "analysis", "experiment", "discovery",
      "explained", "explanation", "ted", "ted talk", "debate",
      "book", "literature", "theory", "proof", "theorem",
      "mit", "stanford", "harvard", "khan academy",
    ],
    blockKeywords: [
      "funny", "prank", "gaming", "gameplay", "vlog", "challenge",
      "reaction", "meme", "compilation", "roast", "drama", "exposed",
      "storytime", "mukbang", "asmr", "24 hours", "gone wrong",
      "celebrity", "gossip", "unboxing", "haul",
    ],
  },

  business: {
    id: "business",
    label: "Business",
    emoji: "💼",
    description: "Finance, startups, marketing, leadership",
    allowKeywords: [
      "business", "startup", "entrepreneur", "entrepreneurship",
      "finance", "investing", "stocks", "money", "wealth", "budgeting",
      "accounting", "marketing", "sales", "branding", "growth hacking",
      "leadership", "management", "strategy", "operations", "b2b", "saas",
      "product", "product management", "venture", "funding", "pitch",
      "career", "professional", "interview", "resume", "job", "freelance",
      "remote work", "negotiation", "networking", "productivity",
      "design", "ux", "ui", "case study", "analysis", "review",
    ],
    blockKeywords: [
      "funny", "prank", "gaming", "gameplay", "vlog", "challenge",
      "reaction", "meme", "compilation", "roast", "drama", "exposed",
      "storytime", "mukbang", "asmr", "24 hours", "gone wrong",
      "celebrity", "gossip", "unboxing", "haul", "grwm",
    ],
  },

  learning: {
    id: "learning",
    label: "Learning",
    emoji: "💻",
    description: "Tutorials, coding, courses, how-to guides",
    allowKeywords: [
      "tutorial", "how to", "howto", "learn", "learning", "course",
      "lesson", "class", "training", "masterclass", "workshop", "bootcamp",
      "beginner", "advanced", "step by step", "crash course", "full course",
      "complete guide", "introduction", "in depth", "deep dive",
      "programming", "coding", "code", "development", "software",
      "data science", "machine learning", "ai", "artificial intelligence",
      "web development", "mobile", "python", "javascript", "react",
      "skills", "tips", "tricks", "guide", "explained", "walkthrough",
      "setup", "install", "build", "project",
    ],
    blockKeywords: [
      "funny", "prank", "gaming gameplay", "vlog", "challenge",
      "reaction", "meme", "compilation", "roast", "drama", "exposed",
      "storytime", "mukbang", "asmr", "24 hours", "gone wrong",
      "celebrity", "gossip", "unboxing", "haul",
    ],
  },

  deepwork: {
    id: "deepwork",
    label: "Deep Work",
    emoji: "🧠",
    description: "Maximum focus — only pure learning content",
    allowKeywords: [
      "tutorial", "lecture", "course", "lesson", "explained",
      "how to", "programming", "coding", "science", "math",
      "research", "study", "analysis", "documentary", "ted talk",
      "full course", "masterclass", "deep dive", "in depth",
      "university", "professor", "academic",
    ],
    blockKeywords: [
      "funny", "fun", "prank", "gaming", "vlog", "challenge", "reaction",
      "meme", "compilation", "roast", "drama", "exposed", "storytime",
      "mukbang", "asmr", "24 hours", "gone wrong", "celebrity", "gossip",
      "unboxing", "haul", "grwm", "flex", "rich", "luxury", "viral",
      "trending", "shorts", "best of", "highlights", "top 10", "top 5",
      "review", "unboxing", "vs", "try", "eating", "food",
    ],
  },
};

export function getModeDefinition(mode: FocusMode): ModeDefinition | null {
  if (mode === "off" || mode === "custom") return null;
  return MODES[mode];
}
