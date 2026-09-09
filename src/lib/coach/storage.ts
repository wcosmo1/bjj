import {
  CoachLlmSettings,
  CoachMemory,
  CoachMessage,
  CoachState,
  DEFAULT_COACH_LLM,
  DEFAULT_COACH_MEMORY,
} from "../types";

export const COACH_STORAGE_KEY = "long-game-coach-v1";
export const MAX_CHAT_MESSAGES = 40;

export function createDefaultCoachState(): CoachState {
  return {
    messages: [],
    memory: { ...DEFAULT_COACH_MEMORY, askedTechniqueCounts: {} },
    llm: { ...DEFAULT_COACH_LLM },
  };
}

export function loadCoachState(): CoachState {
  if (typeof window === "undefined") return createDefaultCoachState();
  try {
    const raw = window.localStorage.getItem(COACH_STORAGE_KEY);
    if (!raw) return createDefaultCoachState();
    const parsed = JSON.parse(raw) as Partial<CoachState>;
    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
      memory: {
        ...DEFAULT_COACH_MEMORY,
        ...parsed.memory,
        askedTechniqueCounts: {
          ...DEFAULT_COACH_MEMORY.askedTechniqueCounts,
          ...(parsed.memory?.askedTechniqueCounts ?? {}),
        },
        focusPositions: parsed.memory?.focusPositions ?? [],
        struggleTags: parsed.memory?.struggleTags ?? [],
      },
      llm: { ...DEFAULT_COACH_LLM, ...parsed.llm },
    };
  } catch {
    return createDefaultCoachState();
  }
}

export function saveCoachState(state: CoachState): void {
  if (typeof window === "undefined") return;
  const trimmed: CoachState = {
    ...state,
    messages: state.messages.slice(-MAX_CHAT_MESSAGES),
  };
  window.localStorage.setItem(COACH_STORAGE_KEY, JSON.stringify(trimmed));
}

export function clearCoachMemory(keepLlm = true): CoachState {
  const current = loadCoachState();
  const next = createDefaultCoachState();
  if (keepLlm) next.llm = current.llm;
  saveCoachState(next);
  return next;
}

export function deriveMemorySummary(
  memory: CoachMemory,
  techniqueNames: Record<string, string>
): string {
  const topAsked = Object.entries(memory.askedTechniqueCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, n]) => `${techniqueNames[id] ?? id} (${n})`);
  const bits: string[] = [];
  if (memory.preferredRuleSet && memory.preferredRuleSet !== "any") {
    bits.push(`Prefers ${memory.preferredRuleSet}`);
  }
  if (memory.focusPositions.length) {
    bits.push(`Focus: ${memory.focusPositions.join(", ")}`);
  }
  if (memory.struggleTags.length) {
    bits.push(`Struggles: ${memory.struggleTags.join(", ")}`);
  }
  if (topAsked.length) bits.push(`Often asks about: ${topAsked.join(", ")}`);
  if (memory.notes.trim()) bits.push(`Notes: ${memory.notes.trim().slice(0, 160)}`);
  return bits.join(" · ");
}

export type { CoachState, CoachMessage, CoachMemory, CoachLlmSettings };
