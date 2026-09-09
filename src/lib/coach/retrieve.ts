import { TECHNIQUES } from "../data/techniques";
import { getMediaForTechnique } from "../data/media";
import type {
  CoachMemory,
  RuleSet,
  Technique,
  TechniqueMedia,
  TechniqueProgressMap,
  TechniqueStatus,
} from "../types";

export interface RetrievedCard {
  technique: Technique;
  media?: TechniqueMedia;
  score: number;
  reasons: string[];
}

export interface ParsedIntent {
  ruleSet: RuleSet | "any";
  positions: string[];
  keywords: string[];
  lightFrame: boolean;
  longLimbs: boolean;
  raw: string;
}

const POSITION_KEYWORDS: Record<string, string[]> = {
  "side control": ["side control", "sidecontrol", "crossface", "smashed in side"],
  "closed guard": ["closed guard", "full guard"],
  "open guard": ["open guard", "feet on hips", "long guard"],
  "spider guard": ["spider"],
  "lasso guard": ["lasso"],
  "de la riva": ["dlr", "de la riva", "delariva"],
  butterfly: ["butterfly"],
  "single leg x": ["slx", "single leg x", "single-leg x", "x guard"],
  "knee shield": ["knee shield", "z guard", "half guard"],
  mount: ["mount"],
  back: ["back take", "on the back", "seatbelt", "rear naked", "rnc"],
  standing: ["standing", "clinch", "takedown", "sprawl"],
  passing: ["pass", "passing", "knee slice", "knee cut"],
  triangle: ["triangle"],
  armbar: ["armbar", "arm bar"],
  omoplata: ["omoplata"],
  guillotine: ["guillotine", "front headlock"],
  darce: ["darce", "d'arce", "anaconda"],
  grips: ["grip", "collar", "sleeve"],
  frames: ["frame", "framing", "post"],
  recovery: ["recovery", "sleep", "sore", "fuel", "nutrition", "strength"],
};

const STATUS_BOOST: Record<TechniqueStatus | "not_started", number> = {
  not_started: 0,
  learning: 3,
  drilling: 4,
  can_hit: 1,
};

export function parseIntent(
  text: string,
  memory: CoachMemory
): ParsedIntent {
  const lower = text.toLowerCase();
  let ruleSet: RuleSet | "any" = memory.preferredRuleSet ?? "any";
  if (/\bno[-\s]?gi\b|\bnogi\b/.test(lower)) ruleSet = "nogi";
  else if (/\bgi\b/.test(lower) && !/\bno[-\s]?gi\b/.test(lower)) ruleSet = "gi";

  const positions: string[] = [];
  for (const [pos, keys] of Object.entries(POSITION_KEYWORDS)) {
    if (keys.some((k) => lower.includes(k))) positions.push(pos);
  }
  for (const focus of memory.focusPositions) {
    if (!positions.includes(focus)) {
      // soft bias later via memory; don't force into intent list
    }
  }

  const lightFrame =
    /\blight\b|\btoo light\b|\bunderweight\b|\b148\b|\bweight\b|\bsmashed\b|\bheavy\b/.test(
      lower
    );
  const longLimbs =
    /\blong\b|\blanky\b|\btall\b|\breach\b|\blegs\b|\bfemur\b|\bframe/.test(lower);

  const keywords = lower
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2)
    .slice(0, 40);

  return { ruleSet, positions, keywords, lightFrame, longLimbs, raw: text };
}

function techniqueHaystack(t: Technique): string {
  return [
    t.name,
    t.moduleId,
    t.whyLanky,
    ...t.cues,
    ...t.steps,
    ...t.mistakes,
    t.transferNote ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

export function retrieveTechniques(
  intent: ParsedIntent,
  progress: TechniqueProgressMap,
  memory: CoachMemory,
  limit = 4
): RetrievedCard[] {
  const scored: RetrievedCard[] = [];

  for (const technique of TECHNIQUES) {
    let score = 0;
    const reasons: string[] = [];
    const hay = techniqueHaystack(technique);

    // Rule set
    if (intent.ruleSet !== "any") {
      if (technique.ruleSet === intent.ruleSet || technique.ruleSet === "both") {
        score += 4;
        reasons.push(`fits ${intent.ruleSet}`);
      } else {
        score -= 3;
      }
    }
    if (memory.preferredRuleSet !== "any") {
      if (
        technique.ruleSet === memory.preferredRuleSet ||
        technique.ruleSet === "both"
      ) {
        score += 1;
      }
    }

    // Positions / topic keywords
    for (const pos of intent.positions) {
      if (hay.includes(pos) || technique.name.toLowerCase().includes(pos.split(" ")[0])) {
        score += 5;
        reasons.push(`matches ${pos}`);
      }
    }
    for (const focus of memory.focusPositions) {
      if (hay.includes(focus.toLowerCase())) {
        score += 2;
        reasons.push(`focus ${focus}`);
      }
    }
    for (const tag of memory.struggleTags) {
      if (hay.includes(tag.toLowerCase())) {
        score += 2;
        reasons.push(`struggle ${tag}`);
      }
    }

    // Keyword overlap
    let hits = 0;
    for (const kw of intent.keywords) {
      if (hay.includes(kw)) hits += 1;
    }
    score += Math.min(hits, 8);
    if (hits >= 3) reasons.push("keyword match");

    // Lanky / light biases
    if (intent.lightFrame || intent.longLimbs) {
      if (
        /frame|distance|triangle|armbar|spider|lasso|dlr|slx|butterfly|leverage|light|pass/.test(
          hay
        )
      ) {
        score += 2;
        reasons.push("lanky/light fit");
      }
    }

    // Progress boost — prioritize what you're actively learning
    const status = progress[technique.id] ?? "not_started";
    score += STATUS_BOOST[status];
    if (status === "learning" || status === "drilling") {
      reasons.push(status);
    }

    // Frequency bias from past questions
    const asked = memory.askedTechniqueCounts[technique.id] ?? 0;
    if (asked > 0) {
      score += Math.min(asked, 3);
      reasons.push("asked before");
    }

    // Situation heuristics
    const raw = intent.raw.toLowerCase();
    if (/smashed|side control|crossface/.test(raw) && technique.id === "long-frame-basics") {
      score += 8;
      reasons.push("side control escape");
    }
    if (/triangle/.test(raw) && technique.id.includes("triangle")) {
      score += 6;
    }
    if (/too light|can't pass|pass/.test(raw) && /pass|knee|wrestling|standing/.test(hay)) {
      score += 3;
    }
    if (/closed guard/.test(raw) && technique.moduleId.includes("guard")) {
      score += 2;
    }

    if (score > 0) {
      scored.push({
        technique,
        media: getMediaForTechnique(technique.id),
        score,
        reasons,
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export function composeRetrievalAnswer(
  intent: ParsedIntent,
  cards: RetrievedCard[],
  profileName: string
): string {
  if (!cards.length) {
    return [
      `Hey ${profileName || "there"} — I couldn't map that to a specific card yet.`,
      "Try a situation chip or name a position (side control, spider, SLX, triangle, passing).",
      "This coach is educational only — not a replacement for your gym coach.",
    ].join("\n\n");
  }

  const top = cards[0];
  const lines: string[] = [];
  lines.push(
    `Here's a lanky-friendly plan for that situation (educational guidance — train with a real coach):`
  );
  lines.push("");
  lines.push(`**${top.technique.name}** (${top.technique.ruleSet})`);
  lines.push(top.technique.whyLanky);
  lines.push("");
  lines.push("**Do this:**");
  top.technique.steps.slice(0, 3).forEach((s, i) => {
    lines.push(`${i + 1}. ${s}`);
  });
  if (top.technique.cues[0]) {
    lines.push("");
    lines.push(`**Cue:** ${top.technique.cues[0]}`);
  }
  if (top.technique.mistakes[0]) {
    lines.push(`**Avoid:** ${top.technique.mistakes[0]}`);
  }

  const related = cards.slice(1);
  if (related.length) {
    lines.push("");
    lines.push("**Also worth drilling:**");
    for (const c of related) {
      lines.push(`- ${c.technique.name} — ${c.technique.whyLanky.slice(0, 110)}…`);
    }
  }

  lines.push("");
  lines.push(
    "Watch the linked videos on each card below — treat them as references, then ask your instructor to correct live."
  );

  if (intent.lightFrame) {
    lines.push("");
    lines.push(
      "Since weight/pressure is in play: prioritize frames, angles, and connection passes over smash contests."
    );
  }

  return lines.join("\n");
}
