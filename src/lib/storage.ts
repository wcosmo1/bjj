import {
  AppState,
  DEFAULT_PROFILE,
  CurriculumProgressMap,
  Profile,
  SessionLog,
  TechniqueProgressMap,
} from "./types";

export const STORAGE_KEY = "long-game-lankybjj-v1";

export function createDefaultState(): AppState {
  return {
    profile: { ...DEFAULT_PROFILE },
    techniqueProgress: {},
    sessions: [],
    curriculumProgress: {},
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") {
    return createDefaultState();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      profile: { ...DEFAULT_PROFILE, ...parsed.profile },
      techniqueProgress: parsed.techniqueProgress ?? {},
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      curriculumProgress: parsed.curriculumProgress ?? {},
    };
  } catch {
    return createDefaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export type {
  AppState,
  Profile,
  SessionLog,
  TechniqueProgressMap,
  CurriculumProgressMap,
};
