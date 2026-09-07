export type TechniqueStatus = "not_started" | "learning" | "drilling" | "can_hit";

export interface Profile {
  name: string;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  notes: string;
}

export interface SessionLog {
  id: string;
  date: string;
  notes: string;
  drills: string;
  durationMins: number;
}

export interface TechniqueProgressMap {
  [techniqueId: string]: TechniqueStatus;
}

export interface CurriculumProgressMap {
  [itemId: string]: boolean;
}

export interface AppState {
  profile: Profile;
  techniqueProgress: TechniqueProgressMap;
  sessions: SessionLog[];
  curriculumProgress: CurriculumProgressMap;
}

export interface Technique {
  id: string;
  name: string;
  moduleId: string;
  whyLanky: string;
  steps: string[];
  mistakes: string[];
  cues: string[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  overview: string[];
  order: number;
}

export interface CurriculumWeek {
  id: string;
  week: number;
  title: string;
  focus: string;
  items: { id: string; label: string; tip?: string }[];
}

export const DEFAULT_PROFILE: Profile = {
  name: "Jay",
  heightFeet: 6,
  heightInches: 4,
  weightLbs: 148,
  notes:
    "Long limbs, light frame. Prefer frames, angles, and distance over brute force.",
};

export const STATUS_LABELS: Record<TechniqueStatus, string> = {
  not_started: "Not started",
  learning: "Learning",
  drilling: "Drilling",
  can_hit: "Can hit in rolls",
};

export const STATUS_ORDER: TechniqueStatus[] = [
  "not_started",
  "learning",
  "drilling",
  "can_hit",
];
