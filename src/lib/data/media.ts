import type { TechniqueMedia } from "../types";

/** Build a YouTube search fallback when a direct watch URL is uncertain. */
export function ytSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function youtubeIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] || null;
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || null;
    }
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
  } catch {
    return null;
  }
  return null;
}

export function youtubeThumb(url: string): string | null {
  const id = youtubeIdFromUrl(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

/**
 * Curated public YouTube (and similar) instructionals for Long Game techniques.
 * Prefer well-known instructors. Mark needsReview when using search fallbacks.
 */
export const TECHNIQUE_MEDIA: TechniqueMedia[] = [
  {
    techniqueId: "long-frame-basics",
    imageAlt: "Forearm and shin frames creating space from bottom side control",
    videos: [
      {
        title: "Cross frames from bottom side control",
        url: "https://www.youtube.com/watch?v=HotK4SbxmmQ",
        instructor: "Public BJJ short instructional",
        ruleSet: "both",
        whyThisVideo:
          "Shows why soft push-frames fail and how structural cross-frames buy shrimp space — core lanky framing.",
      },
      {
        title: "Side control escape with shrimp + frames",
        url: "https://www.youtube.com/watch?v=9Gd8aQodtYA",
        instructor: "MoveMind",
        ruleSet: "both",
        whyThisVideo: "Pairs framing with the hip escape so you actually recover guard.",
      },
    ],
  },
  {
    techniqueId: "distance-as-defense",
    videos: [
      {
        title: "Using your feet in BJJ open guard",
        url: "https://www.youtube.com/watch?v=svCTW1kB2fk",
        instructor: "EvolveAll",
        ruleSet: "both",
        whyThisVideo:
          "Feet on hips/biceps as distance tools — exactly the lanky 'make them climb' idea.",
      },
      {
        title: "Passing long-legged open guard (study the problems)",
        url: "https://www.youtube.com/watch?v=YM5-20nu0eM",
        instructor: "Chewjitsu",
        ruleSet: "both",
        whyThisVideo:
          "Chewy shows how passers beat long legs — reverse-engineer these problems into your retention.",
      },
    ],
  },
  {
    techniqueId: "leverage-over-muscle",
    videos: [
      {
        title: "Leverage concepts in jiu-jitsu",
        url: "https://www.youtube.com/watch?v=v8Sro7pYK3w",
        instructor: "Haven BJJ",
        ruleSet: "both",
        whyThisVideo: "Conceptual video on leverage vs muscle — matches the lanky game plan.",
      },
    ],
  },
  {
    techniqueId: "collar-sleeve-grip-fighting",
    videos: [
      {
        title: "BJJ grip fighting guide",
        url: "https://www.youtube.com/watch?v=n6EUwvCkWJ8",
        instructor: "Jordan Teaches Jiujitsu",
        ruleSet: "gi",
        whyThisVideo: "Clear collar/sleeve priorities and grip fighting structure for gi.",
      },
    ],
  },
  {
    techniqueId: "standing-gi-grip-breaks",
    videos: [
      {
        title: "Standing grip breaks with Satoshi Ishii",
        url: "https://www.youtube.com/watch?v=tIrzgxvByzI",
        instructor: "Satoshi Ishii / Bernardo Faria",
        ruleSet: "gi",
        whyThisVideo: "Practical standing grip-break mechanics tall athletes need early.",
      },
    ],
  },
  {
    techniqueId: "collar-tie-angle",
    videos: [
      {
        title: "Inside & outside head/collar angles",
        url: "https://www.youtube.com/watch?v=_PxO3Ye49Rs",
        instructor: "Henry Akins",
        ruleSet: "gi",
        whyThisVideo: "Shows how head/collar position creates the outside angle before attacks.",
      },
    ],
  },
  {
    techniqueId: "guard-pull-with-structure",
    videos: [
      {
        title: "One-grip guard pull to collar-sleeve",
        url: "https://www.youtube.com/watch?v=s1l1pyN6DsE",
        instructor: "Carpio Jiu Jitsu",
        ruleSet: "gi",
        whyThisVideo: "Structured pull into open-guard grips instead of a flat pancake pull.",
      },
    ],
  },
  {
    techniqueId: "sprawl-and-hip-heaviness",
    videos: [
      {
        title: "Wrestling sprawl takedown defense",
        url: "https://www.youtube.com/watch?v=RyQC_VLi2cg",
        instructor: "Utopia Martial Arts",
        ruleSet: "both",
        whyThisVideo: "Basic sprawl mechanics — hips heavy, not just chest flopping.",
        needsReview: true,
      },
    ],
  },
  {
    techniqueId: "spider-guard-intro",
    videos: [
      {
        title: "How to enter spider guard — simple guide",
        url: "https://www.youtube.com/watch?v=BFa--LQUtrU",
        instructor: "Grappler Station",
        ruleSet: "gi",
        whyThisVideo: "Clean beginner entry: sleeves first, then feet to biceps with stretch.",
      },
    ],
  },
  {
    techniqueId: "spider-scissor-sweep",
    videos: [
      {
        title: "Spider guard scissor sweep (beginner)",
        url: "https://www.youtube.com/watch?v=SbGR8C63szA",
        instructor: "Chess Club Jiu-Jitsu",
        ruleSet: "gi",
        whyThisVideo: "Classic spider scissor mechanics for long-leg open guard.",
      },
    ],
  },
  {
    techniqueId: "lasso-guard-intro",
    videos: [
      {
        title: "Lasso guard guide",
        url: "https://www.youtube.com/watch?v=ZPfD3rgEYmM",
        instructor: "Precision MMA",
        ruleSet: "gi",
        whyThisVideo: "Full beginner-friendly lasso overview — great lanky gi control tool.",
      },
    ],
  },
  {
    techniqueId: "dlr-intro",
    videos: [
      {
        title: "Most important De La Riva concept",
        url: "https://www.youtube.com/watch?v=L3gkpR4w8cM",
        instructor: "Dubious Dom",
        ruleSet: "gi",
        whyThisVideo: "Core DLR hook pressure and structure before chasing fancy sweeps.",
      },
      {
        title: "DLR reset and weight-loading drills",
        url: "https://www.youtube.com/watch?v=2fkf18LFVGY",
        instructor: "Greg Hamilton BJJ",
        ruleSet: "gi",
        whyThisVideo: "Drills that keep the DLR hook alive when they stuff the knee.",
      },
    ],
  },
  {
    techniqueId: "closed-guard-pitfalls",
    videos: [
      {
        title: "Closed guard system (avoid stacking traps)",
        url: "https://www.youtube.com/watch?v=Z_FBT8ZDSmo",
        instructor: "Jon Thomas BJJ",
        ruleSet: "both",
        whyThisVideo:
          "Jon Thomas closed-guard system helps lanky beginners avoid getting stacked flat.",
      },
    ],
  },
  {
    techniqueId: "gi-posture-break-closed",
    videos: [
      {
        title: "Breaking posture in closed guard — complete guide",
        url: "https://www.youtube.com/watch?v=ZKsfnBbBdjk",
        instructor: "Jon Thomas BJJ",
        ruleSet: "gi",
        whyThisVideo: "Posture break is the prerequisite for every lanky closed-guard attack.",
      },
    ],
  },
  {
    techniqueId: "knee-slice-pass",
    videos: [
      {
        title: "Knee cut passing — complete guide",
        url: "https://www.youtube.com/watch?v=lOPh9K5kOcE",
        instructor: "Public BJJ instructional",
        ruleSet: "gi",
        whyThisVideo: "Broad knee-cut system from many grips — primary light-athlete pass.",
      },
      {
        title: "Best knee cut details — Lucas Lepri",
        url: "https://www.youtube.com/watch?v=3IqCi1GXmOg",
        instructor: "Lucas Lepri / Bernardo Faria",
        ruleSet: "gi",
        whyThisVideo: "High-level but clear knee-cut pressure without needing smash weight.",
      },
    ],
  },
  {
    techniqueId: "standing-pass-chain",
    videos: [
      {
        title: "Passing long-legged open guard",
        url: "https://www.youtube.com/watch?v=YM5-20nu0eM",
        instructor: "Chewjitsu",
        ruleSet: "both",
        whyThisVideo: "Standing/connection ideas when legs are long — useful for light passers too.",
      },
      {
        title: "Basic knee-cut pass",
        url: "https://www.youtube.com/watch?v=1e_ZiQYPAao",
        instructor: "Public BJJ instructional",
        ruleSet: "gi",
        whyThisVideo: "Simple knee-cut you can chain after standing grip work.",
      },
    ],
  },
  {
    techniqueId: "top-pressure-without-weight",
    videos: [
      {
        title: "Pressure passing concepts — Bernardo Faria",
        url: "https://www.youtube.com/watch?v=Ntd5AoAOlS4",
        instructor: "Bernardo Faria",
        ruleSet: "gi",
        whyThisVideo:
          "Shows connection/shoulder drive — translate to elongated base rather than raw mass.",
      },
    ],
  },
  {
    techniqueId: "triangle-from-guard",
    videos: [
      {
        title: "No-gi triangle from closed guard",
        url: "https://www.youtube.com/watch?v=9pjdpFCr4UI",
        instructor: "Chewjitsu",
        ruleSet: "both",
        whyThisVideo: "Classic Chewy triangle setup — works gi and no-gi; perfect for long femurs.",
      },
      {
        title: "Finish triangles tall or stocky",
        url: "https://www.youtube.com/watch?v=gz_elOYwY30",
        instructor: "Chewjitsu",
        ruleSet: "both",
        whyThisVideo: "Finishing details specifically for lanky frames vs thick opponents.",
      },
    ],
  },
  {
    techniqueId: "armbar-from-guard",
    videos: [
      {
        title: "Fundamental armbar from full guard",
        url: "https://www.youtube.com/watch?v=XUrxSihViJI",
        instructor: "Chewjitsu",
        ruleSet: "both",
        whyThisVideo: "Beginner-friendly armbar from guard with clear cues.",
      },
      {
        title: "Armbar from guard — elbow inside hip (Danaher)",
        url: "https://www.youtube.com/watch?v=pQ43Oy5k9yQ",
        instructor: "John Danaher",
        ruleSet: "both",
        whyThisVideo: "Key lanky detail: get their elbow inside your hip before the pivot.",
      },
    ],
  },
  {
    techniqueId: "omoplata-intro",
    videos: [
      {
        title: "Essential omoplata details — Clark Gracie",
        url: "https://www.youtube.com/watch?v=kWCreb5WVxw",
        instructor: "Clark Gracie / FloGrappling",
        ruleSet: "both",
        whyThisVideo: "Omoplata as control + finish — great triangle-chain partner for long legs.",
      },
    ],
  },
  {
    techniqueId: "cross-collar-choke-guard",
    videos: [
      {
        title: "Cross collar choke mechanics from closed guard",
        url: "https://www.youtube.com/watch?v=Krl3t53gVYY",
        instructor: "Jean Jacques Machado",
        ruleSet: "gi",
        whyThisVideo: "Classic gi finish from posture-broken closed guard.",
      },
    ],
  },
  {
    techniqueId: "back-attacks-seatbelt",
    videos: [
      {
        title: "Take the back with a seatbelt",
        url: "https://www.youtube.com/watch?v=8KJgigu9rjA",
        instructor: "Haven BJJ",
        ruleSet: "both",
        whyThisVideo: "Seatbelt introduction for white belts — control before the choke.",
      },
      {
        title: "Maintaining rear mount details",
        url: "https://www.youtube.com/watch?v=cKVqj71dcwQ",
        instructor: "Stephan Kesting",
        ruleSet: "both",
        whyThisVideo: "How to keep the back once you have seatbelt + hooks.",
      },
    ],
  },
  {
    techniqueId: "underhooks-overhooks-basics",
    videos: [
      {
        title: "Underhook fundamentals — Chael Sonnen",
        url: "https://www.youtube.com/watch?v=tIZmo7UXF3A",
        instructor: "Chael Sonnen / Fanatic Wrestling",
        ruleSet: "nogi",
        whyThisVideo: "Wrestling underhook basics that transfer directly to no-gi clinch.",
      },
    ],
  },
  {
    techniqueId: "body-lock-clinch-control",
    videos: [
      {
        title: "Over-under clinch foundation",
        url: "https://www.youtube.com/watch?v=5AeR9kPByLM",
        instructor: "Kata Jiu Jitsu",
        ruleSet: "nogi",
        whyThisVideo: "Body-lock / over-under clinch for tall athletes who need connection.",
      },
    ],
  },
  {
    techniqueId: "nogi-collar-tie-snap",
    videos: [
      {
        title: "Inside tie side-to-side snap downs — Danaher",
        url: "https://www.youtube.com/watch?v=gyf7Oh9lCiI",
        instructor: "John Danaher",
        ruleSet: "nogi",
        whyThisVideo: "Snap-down mechanics from collar ties without hanging square.",
      },
    ],
  },
  {
    techniqueId: "butterfly-guard-intro",
    videos: [
      {
        title: "Butterfly guard principles — Marcelo Garcia",
        url: "https://www.youtube.com/watch?v=0WG1MYvgXAM",
        instructor: "Marcelo Garcia",
        ruleSet: "nogi",
        whyThisVideo: "The gold-standard butterfly overview for elevation and underhooks.",
      },
    ],
  },
  {
    techniqueId: "single-leg-x-intro",
    videos: [
      {
        title: "How to play single-leg X",
        url: "https://www.youtube.com/watch?v=s56p7sV6qE4",
        instructor: "Lachlan Giles / Absolute MMA",
        ruleSet: "nogi",
        whyThisVideo: "Lachlan SLX intro — premier lanky no-gi open guard.",
      },
      {
        title: "SLX: forcing hands to the mat",
        url: "https://www.youtube.com/watch?v=LQul2ZvHyms",
        instructor: "Lachlan Giles",
        ruleSet: "nogi",
        whyThisVideo: "Off-balance detail that makes SLX sweeps work for lighter athletes.",
      },
    ],
  },
  {
    techniqueId: "knee-shield-without-fabric",
    videos: [
      {
        title: "Weaponize the knee shield",
        url: "https://www.youtube.com/watch?v=ATUzcKQk820",
        instructor: "Knight Jiu-Jitsu",
        ruleSet: "both",
        whyThisVideo: "Knee shield retention and offense without relying on sleeve grips.",
      },
    ],
  },
  {
    techniqueId: "nogi-guard-pull-butterfly",
    videos: [
      {
        title: "Technical stand-up / butterfly connections",
        url: "https://www.youtube.com/watch?v=JL4BgaEou98",
        instructor: "Ethos Jiu-Jitsu",
        ruleSet: "nogi",
        whyThisVideo:
          "Butterfly sit-up / stand connections useful when pulling into hooks no-gi.",
        needsReview: true,
      },
      {
        title: "Butterfly principles — Marcelo",
        url: "https://www.youtube.com/watch?v=0WG1MYvgXAM",
        instructor: "Marcelo Garcia",
        ruleSet: "nogi",
        whyThisVideo: "What good butterfly looks like after you sit to hooks.",
      },
    ],
  },
  {
    techniqueId: "wrestling-up-light-athlete",
    videos: [
      {
        title: "Technical stand-up from butterfly",
        url: "https://www.youtube.com/watch?v=JL4BgaEou98",
        instructor: "Ethos Jiu-Jitsu",
        ruleSet: "nogi",
        whyThisVideo: "Stand-up path from butterfly — high value for tall/light athletes.",
      },
    ],
  },
  {
    techniqueId: "nogi-knee-slice",
    videos: [
      {
        title: "No-gi knee cut — JT Torres",
        url: "https://www.youtube.com/watch?v=F1Nd4MmLuDk",
        instructor: "JT Torres / Bernardo Faria",
        ruleSet: "nogi",
        whyThisVideo: "Efficient no-gi knee cut without smash-only pressure.",
      },
    ],
  },
  {
    techniqueId: "nogi-standing-pass",
    videos: [
      {
        title: "Passing long-legged open guard",
        url: "https://www.youtube.com/watch?v=YM5-20nu0eM",
        instructor: "Chewjitsu",
        ruleSet: "nogi",
        whyThisVideo: "Standing pass concepts against length — connection over smash.",
      },
    ],
  },
  {
    techniqueId: "front-headlock-guillotine",
    videos: [
      {
        title: "Guillotine from full guard (white belt essential)",
        url: "https://www.youtube.com/watch?v=UbcqJETDUY8",
        instructor: "Chewjitsu",
        ruleSet: "nogi",
        whyThisVideo: "Clear high-percentage guillotine entry every light athlete should know.",
      },
    ],
  },
  {
    techniqueId: "anaconda-darce-awareness",
    videos: [
      {
        title: "Anaconda vs D'arce difference",
        url: "https://www.youtube.com/watch?v=6d6Wkgh9imU",
        instructor: "Matt Arroyo",
        ruleSet: "nogi",
        whyThisVideo: "Know which front-headlock finish you are building toward.",
      },
      {
        title: "Anaconda choke basics",
        url: "https://www.youtube.com/watch?v=vOlOmHRDyLY",
        instructor: "Matt Arroyo",
        ruleSet: "nogi",
        whyThisVideo: "Straightforward anaconda finish mechanics.",
      },
      {
        title: "Front headlock 3-choke sequence",
        url: "https://www.youtube.com/watch?v=kc8j-YrtRVM",
        instructor: "Chewjitsu",
        ruleSet: "nogi",
        whyThisVideo: "Chain guillotine / darce / anaconda ideas from one front headlock.",
      },
    ],
  },
  {
    techniqueId: "back-take-rnc-no-collar",
    videos: [
      {
        title: "Rear naked choke tutorial",
        url: "https://www.youtube.com/watch?v=176SLdBhj_A",
        instructor: "Stephan Kesting",
        ruleSet: "nogi",
        whyThisVideo: "Step-by-step RNC — primary no-gi back finish without a collar.",
      },
      {
        title: "Common RNC errors",
        url: "https://www.youtube.com/watch?v=K5IVkWszO8U",
        instructor: "Stephan Kesting",
        ruleSet: "nogi",
        whyThisVideo: "Fixes crossed ankles and bad hand placement that kill finishes.",
      },
    ],
  },
  {
    techniqueId: "nogi-triangle-armbar-chain",
    videos: [
      {
        title: "No-gi triangle from closed guard",
        url: "https://www.youtube.com/watch?v=9pjdpFCr4UI",
        instructor: "Chewjitsu",
        ruleSet: "nogi",
        whyThisVideo: "Triangle entry that chains to armbar when they posture or stack.",
      },
      {
        title: "Fundamental armbar from guard",
        url: "https://www.youtube.com/watch?v=XUrxSihViJI",
        instructor: "Chewjitsu",
        ruleSet: "nogi",
        whyThisVideo: "Armbar half of the triangle ↔ armbar chain.",
      },
    ],
  },
  {
    techniqueId: "fueling-for-training",
    videos: [
      {
        title: "Nutrition for BJJ overview",
        url: "https://www.youtube.com/watch?v=l_RXd-O3j88",
        instructor: "Kieren Lefevre",
        ruleSet: "both",
        whyThisVideo:
          "Practical fueling ideas for hard training — educational only, not medical advice.",
      },
    ],
  },
  {
    techniqueId: "simple-strength-supports",
    videos: [
      {
        title: "Strength exercises for BJJ — pulls",
        url: "https://www.youtube.com/watch?v=O56aGhdNtcE",
        instructor: "Kieren Lefevre",
        ruleSet: "both",
        whyThisVideo: "Pull-focused strength that supports frames and posture for light athletes.",
      },
    ],
  },
  {
    techniqueId: "recovery-and-longevity",
    videos: [
      {
        title: "BJJ recovery tips",
        url: "https://www.youtube.com/watch?v=TX-a-AGFqRk",
        instructor: "Danny Watkins",
        ruleSet: "both",
        whyThisVideo: "Sleep/recovery framing for beginners who gas out — not medical advice.",
        needsReview: true,
      },
    ],
  },
];

const mediaById = new Map(
  TECHNIQUE_MEDIA.map((m) => [m.techniqueId, m] as const)
);

export function getMediaForTechnique(
  techniqueId: string
): TechniqueMedia | undefined {
  return mediaById.get(techniqueId);
}

export function mediaCoverageStats() {
  const withDirect = TECHNIQUE_MEDIA.filter((m) =>
    m.videos.some((v) => /youtube\.com\/watch|youtu\.be\//.test(v.url) && !v.needsReview)
  ).length;
  const withAnyDirect = TECHNIQUE_MEDIA.filter((m) =>
    m.videos.some((v) => /youtube\.com\/watch|youtu\.be\//.test(v.url))
  ).length;
  const needsReviewCount = TECHNIQUE_MEDIA.filter((m) =>
    m.videos.some((v) => v.needsReview)
  ).length;
  const searchOnly = TECHNIQUE_MEDIA.filter(
    (m) =>
      m.videos.length > 0 &&
      m.videos.every((v) => v.url.includes("results?search_query"))
  ).length;
  return {
    totalTechniquesWithMedia: TECHNIQUE_MEDIA.length,
    withVerifiedDirectWatch: withDirect,
    withAnyDirectWatch: withAnyDirect,
    techniquesFlaggedNeedsReview: needsReviewCount,
    searchFallbackOnly: searchOnly,
  };
}
