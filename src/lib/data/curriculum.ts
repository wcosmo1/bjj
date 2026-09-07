import type { CurriculumWeek } from "../types";

export const CURRICULUM: CurriculumWeek[] = [
  {
    id: "w1",
    week: 1,
    title: "Survive & Frame",
    focus: "Learn to create space under pressure without panicking.",
    items: [
      { id: "w1-a", label: "Drill long frame from side control (10 reps each side)" },
      { id: "w1-b", label: "Practice shrimp + knee shield recovery" },
      { id: "w1-c", label: "Ask a partner to smash lightly while you frame out" },
      { id: "w1-d", label: "Log one training session with notes on where you got stuck" },
    ],
  },
  {
    id: "w2",
    week: 2,
    title: "Open Guard Feet",
    focus: "Put feet on hips/biceps and keep distance.",
    items: [
      { id: "w2-a", label: "Feet-on-hips distance drill for 5 minutes" },
      { id: "w2-b", label: "Learn double-sleeve grips for spider entries" },
      { id: "w2-c", label: "Mark Spider Guard Intro as Learning" },
      { id: "w2-d", label: "Film or mental-note: did you pull flat or with structure?" },
    ],
  },
  {
    id: "w3",
    week: 3,
    title: "Spider & Lasso Foundations",
    focus: "Build your primary lanky open-guard home.",
    items: [
      { id: "w3-a", label: "Spider extension / retraction off-balance drill" },
      { id: "w3-b", label: "Insert lasso from spider 10 times each side" },
      { id: "w3-c", label: "Hit one intentional open-guard pass defense in rolls" },
      { id: "w3-d", label: "Update technique status: Spider or Lasso → Drilling" },
    ],
  },
  {
    id: "w4",
    week: 4,
    title: "De La Riva Hook Week",
    focus: "Control standing passers with a deep outside hook.",
    items: [
      { id: "w4-a", label: "DLR hook insertion drill vs standing partner" },
      { id: "w4-b", label: "Add far-sleeve grip + hip foot extension" },
      { id: "w4-c", label: "Attempt one DLR sweep in live training (success optional)" },
      { id: "w4-d", label: "Review Closed Guard Pitfalls — open early if stacked" },
    ],
  },
  {
    id: "w5",
    week: 5,
    title: "Standing Presence",
    focus: "Collar ties, angles, and purposeful guard pulls.",
    items: [
      { id: "w5-a", label: "Collar tie + outside step drill (both sides)" },
      { id: "w5-b", label: "Practice structured guard pull into DLR/shin-to-shin" },
      { id: "w5-c", label: "Sprawl reaction drill vs friendly level changes" },
      { id: "w5-d", label: "Note in profile: preferred stand-up vs pull tendency" },
    ],
  },
  {
    id: "w6",
    week: 6,
    title: "Pass Without Smash",
    focus: "Knee slice and standing pass chains for lighter athletes.",
    items: [
      { id: "w6-a", label: "Knee slice mechanics drill — clear trail leg every rep" },
      { id: "w6-b", label: "Torreando → knee cut chain for 5 minutes" },
      { id: "w6-c", label: "Side control elongate/base drill (wide knees)" },
      { id: "w6-d", label: "Mark one passing technique as Drilling" },
    ],
  },
  {
    id: "w7",
    week: 7,
    title: "Triangle & Armbar Mechanics",
    focus: "Use length — finish with angles, not raw squeeze.",
    items: [
      { id: "w7-a", label: "Triangle entry + angle pivot drill (10/side)" },
      { id: "w7-b", label: "Armbar climb from guard — pinch knees cue" },
      { id: "w7-c", label: "Triangle ↔ armbar transition when stacked" },
      { id: "w7-d", label: "Attempt one triangle or armbar intentionally in rolls" },
    ],
  },
  {
    id: "w8",
    week: 8,
    title: "Omoplata & Back Takes",
    focus: "Chain attacks when primary finishes stall.",
    items: [
      { id: "w8-a", label: "Omoplata sit-up and hip control drill" },
      { id: "w8-b", label: "Seatbelt + hooks insertion from turtle" },
      { id: "w8-c", label: "From failed triangle, flow to omoplata or back" },
      { id: "w8-d", label: "Mark Back Attacks as Learning or Drilling" },
    ],
  },
  {
    id: "w9",
    week: 9,
    title: "Fuel & Strength Supports",
    focus: "Support the mat with recovery habits (not medical advice).",
    items: [
      { id: "w9-a", label: "Plan pre/post class meal staples for the week" },
      { id: "w9-b", label: "Complete 2 short strength sessions (pull/hinge/carry)" },
      { id: "w9-c", label: "Protect one full sleep-priority night around hard training" },
      { id: "w9-d", label: "Read Strength & Recovery module end-to-end" },
    ],
  },
  {
    id: "w10",
    week: 10,
    title: "Integrate Your A-Game",
    focus: "Pick a lanky A-game path and repeat it.",
    items: [
      { id: "w10-a", label: "Choose primary guard: spider, lasso, or DLR" },
      { id: "w10-b", label: "Every roll this week: attempt to establish that guard first" },
      { id: "w10-c", label: "Pair it with one submission chain (triangle/armbar/back)" },
      { id: "w10-d", label: "Update at least 3 techniques to Drilling or Can Hit" },
    ],
  },
  {
    id: "w11",
    week: 11,
    title: "Pressure Testing",
    focus: "Test under fatigue; refine mistakes.",
    items: [
      { id: "w11-a", label: "Harder rounds: still start with frames/distance" },
      { id: "w11-b", label: "Ask a higher belt to smash your open guard — note leaks" },
      { id: "w11-c", label: "Fix one recurring mistake from session notes" },
      { id: "w11-d", label: "Log sessions with specific drill names this week" },
    ],
  },
  {
    id: "w12",
    week: 12,
    title: "Review & Next Cycle",
    focus: "Measure progress and set the next 12-week focus.",
    items: [
      { id: "w12-a", label: "Review Progress page — count Can Hit techniques" },
      { id: "w12-b", label: "Re-read Why Lanky module — update profile notes" },
      { id: "w12-c", label: "Pick next cycle focus: guard depth OR passing OR finishing" },
      { id: "w12-d", label: "Celebrate consistency — streaks beat perfect weeks" },
    ],
  },
];

export function allCurriculumItemIds(): string[] {
  return CURRICULUM.flatMap((w) => w.items.map((i) => i.id));
}
