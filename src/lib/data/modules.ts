import type { Module } from "../types";

export const MODULES: Module[] = [
  {
    id: "why-lanky",
    title: "Why Lanky Bodies Win Differently",
    subtitle: "Shared principles — leverage, frames, and space",
    order: 1,
    ruleSet: "both",
    overview: [
      "Tall, thin grapplers do not win by muscling through people. You win by making opponents work farther than they want to.",
      "Your limbs are levers. A frame that sits on a shorter person's shoulder or hip creates space they have to climb through. That climb costs energy and creates openings.",
      "Your game should prioritize: (1) long frames and posts, (2) distance management, (3) angles and off-balancing, (4) submissions that reward reach (triangles, armbars, back attacks).",
      "These principles apply in both gi and no-gi. What changes is the handle: fabric grips vs underhooks, body locks, and head control.",
    ],
  },
  {
    id: "gi-grips-standing",
    title: "Gi Grip Fighting & Standing",
    subtitle: "Collar, sleeve, and tall-athlete posture",
    order: 2,
    ruleSet: "gi",
    overview: [
      "In the gi, your first lanky advantage is reach into collar and sleeve. Own grips early; do not let shorter athletes glue inside ties on your body.",
      "Standing grip fighting for tall athletes: keep posture, break their preferred grips, and step to outside angles before you pull or shoot.",
      "If you pull guard, pull with collar-sleeve structure into an open guard — never into a flat pancake.",
    ],
  },
  {
    id: "gi-guard",
    title: "Gi Guard for Long Legs",
    subtitle: "Spider, lasso, DLR, closed-guard pitfalls",
    order: 3,
    ruleSet: "gi",
    overview: [
      "Long legs excel at open guards that use sleeve grips and extension. Spider, lasso, and De La Riva turn limb length into constant pressure.",
      "Closed guard can still work, but lanky beginners often get stacked because they leave space at the hips. Clamp high and break posture immediately — or open early.",
      "Default idea: keep them at the end of your legs. Fabric grips are the glue that lets you extend without them simply walking around.",
    ],
  },
  {
    id: "gi-passing-subs",
    title: "Gi Passing & Submissions",
    subtitle: "Light passing, triangles, collars, back takes",
    order: 4,
    ruleSet: "gi",
    overview: [
      "You will not smash through heavy closed guards with raw top pressure. Pass with connection, knee slices, long-stepping, and collar control.",
      "Triangles, armbars, and omoplatas reward femur length. Collar chokes add gi-only finishing paths from guard and the back.",
      "Finish with angles. Do not try to curl stronger opponents with raw squeeze — adjust the cutting angle and isolate the limb.",
    ],
  },
  {
    id: "nogi-clinch",
    title: "No-Gi Clinch for Tall Athletes",
    subtitle: "Underhooks, overhooks, body locks",
    order: 5,
    ruleSet: "nogi",
    overview: [
      "Without fabric, connection lives in underhooks, overhooks, head position, and body locks. Tall athletes can own the upper body — if they refuse to get stuck square.",
      "Prefer outside angles and underhook fights over hanging on a collar tie with no plan. Light tall athletes get double-legged when they stand square and reach.",
      "Sprawl with hip heaviness, then climb to front headlock or back exposure. Length helps you wrap; connection keeps you from floating.",
    ],
  },
  {
    id: "nogi-guards",
    title: "No-Gi Guards for Long Legs",
    subtitle: "Butterfly, SLX, knee shield without fabric",
    order: 6,
    ruleSet: "nogi",
    overview: [
      "Spider and classic lasso disappear without sleeves. Your lanky no-gi home becomes butterfly, knee shield / high-knee frames, and single-leg X (SLX) entries.",
      "Hooks and elevation replace fabric tension. Use feet on hips, shin frames, and underhooks from bottom to create the same distance principle.",
      "Closed guard still works in no-gi when you overhook and break posture — but open early if they stand and stack your long hips.",
    ],
  },
  {
    id: "nogi-wrestling-pass",
    title: "No-Gi Passing & Wrestling Up",
    subtitle: "Connection passes and stand-up options for light athletes",
    order: 7,
    ruleSet: "nogi",
    overview: [
      "No-gi passing for light athletes is about chest-to-chest connection, knee cuts, and long steps — not smash-only pressure.",
      "Wrestling up from guard is a high-value path when you are tall and light: create a frame, insert a hook, stand into a body lock or single, and finish on top.",
      "When you settle on top, elongate your base so their shrimp has farther to travel.",
    ],
  },
  {
    id: "nogi-subs",
    title: "No-Gi Submissions & Back Takes",
    subtitle: "Guillotine, darce/anaconda awareness, RNC",
    order: 8,
    ruleSet: "nogi",
    overview: [
      "Front headlock attacks (guillotine, anaconda, darce) punish opponents who shoot or duck their head. Tall arms help lock these — timing still matters more than squeeze.",
      "Without a collar, the rear naked choke is your primary back finish. Seatbelt + hooks first; choke second.",
      "Triangles and armbars still transfer from the gi — you just enter them from overhooks, butterfly elevation, and failed guillotine chains instead of sleeve pulls.",
    ],
  },
  {
    id: "strength-recovery",
    title: "Strength & Recovery Tips",
    subtitle: "Training tips for underweight grapplers (not medical advice)",
    order: 9,
    ruleSet: "both",
    overview: [
      "Underweight beginners often gas out from being smashed and from poor fueling — not from a lack of heart. Treat recovery as part of the curriculum.",
      "Prioritize protein-forward meals, sleep, and progressive strength work that supports grappling (pulls, hinges, carries, core anti-rotation).",
      "This is training guidance, not medical advice. If you have health concerns about weight, nutrition, or injuries, talk to a qualified professional.",
    ],
  },
];
