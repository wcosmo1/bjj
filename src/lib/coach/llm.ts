import type { CoachLlmSettings, Profile, Technique } from "../types";
import type { RetrievedCard } from "./retrieve";
import { getMediaForTechnique } from "../data/media";

export function hasLlmKey(settings: CoachLlmSettings): boolean {
  return Boolean(settings.apiKey && settings.apiKey.trim().length > 8);
}

function buildSystemPrompt(
  profile: Profile,
  cards: RetrievedCard[],
  memorySummary: string
): string {
  const cardBlocks = cards
    .map((c) => {
      const media = c.media ?? getMediaForTechnique(c.technique.id);
      const videos = (media?.videos ?? [])
        .map(
          (v) =>
            `- ${v.title}: ${v.url}${v.instructor ? ` (${v.instructor})` : ""} — ${v.whyThisVideo}`
        )
        .join("\n");
      const t = c.technique;
      return [
        `### ${t.name} [${t.id}] (${t.ruleSet})`,
        `Why lanky: ${t.whyLanky}`,
        `Cues: ${t.cues.join("; ")}`,
        `Steps: ${t.steps.join(" | ")}`,
        `Mistakes: ${t.mistakes.join("; ")}`,
        videos ? `Required video links (MUST include in answer):\n${videos}` : "No curated video.",
      ].join("\n");
    })
    .join("\n\n");

  return [
    "You are the Long Game AI Coach for a tall, thin BJJ beginner.",
    "Educational grappling guidance only — NOT medical advice and NOT a replacement for a real coach.",
    "Be practical, encouraging, and concise (mobile chat). Prefer frames, angles, distance, and long-limb submissions.",
    `Athlete: ${profile.name}, ${profile.heightFeet}'${profile.heightInches}\", ${profile.weightLbs} lbs.`,
    `Profile notes: ${profile.notes || "(none)"}`,
    memorySummary ? `Coach memory: ${memorySummary}` : "",
    "You MUST ground advice in the retrieved technique cards below.",
    "You MUST include the exact curated video URLs listed for those cards (as markdown links).",
    "Cite videos as references. If unsure, say so and suggest drilling with their instructor.",
    "",
    "RETRIEVED TECHNIQUE CARDS:",
    cardBlocks || "(none — ask a clarifying question)",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function callCoachLlm(opts: {
  settings: CoachLlmSettings;
  profile: Profile;
  cards: RetrievedCard[];
  memorySummary: string;
  userMessage: string;
  history: { role: "user" | "assistant"; content: string }[];
}): Promise<string> {
  const { settings, profile, cards, memorySummary, userMessage, history } = opts;
  const base = settings.baseUrl.replace(/\/$/, "");
  const url = `${base}/chat/completions`;

  const body = {
    model: settings.model || "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: buildSystemPrompt(profile, cards, memorySummary),
      },
      ...history.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: userMessage },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey.trim()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `LLM request failed (${res.status}). Falling back to retrieval coach. ${text.slice(0, 180)}`
    );
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty LLM response");

  // Ensure curated URLs appear even if the model omitted one
  const missingUrls: string[] = [];
  for (const c of cards) {
    for (const v of c.media?.videos ?? getMediaForTechnique(c.technique.id)?.videos ?? []) {
      if (!content.includes(v.url)) missingUrls.push(`- [${v.title}](${v.url})`);
    }
  }
  if (missingUrls.length) {
    return `${content}\n\n**Watch (curated references):**\n${missingUrls.join("\n")}`;
  }
  return content;
}

export type { Technique };
