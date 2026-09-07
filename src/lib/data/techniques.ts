import type { Technique } from "../types";

export const TECHNIQUES: Technique[] = [
  // Why lanky
  {
    id: "long-frame-basics",
    name: "Long Frame Basics",
    moduleId: "why-lanky",
    whyLanky:
      "Your arms and shins create posts shorter athletes cannot match. Frames buy the space you need to hip escape.",
    cues: [
      "Bone on soft tissue — forearm to neck/shoulder, shin to hip",
      "Lock the elbow/knee; do not soft-arm press",
      "Breathe and shrimp while the frame holds",
    ],
    steps: [
      "From bottom side control, insert a near-side forearm frame across their neck/shoulder line.",
      "Add a shin or knee shield toward their hip to stop the crossface from flattening you.",
      "Once space appears, shrimp your hips out and recover a knee shield or full guard.",
      "Re-establish posture before attacking — frames first, offense second.",
    ],
    mistakes: [
      "Pressing with soft muscles instead of skeletal structure",
      "Framing then freezing — you must escape while space exists",
      "Letting them glue their chest to yours before you insert the frame",
    ],
  },
  {
    id: "distance-as-defense",
    name: "Distance as Defense",
    moduleId: "why-lanky",
    whyLanky:
      "Long limbs let you keep threats at range. Closing the distance is their job; making them climb is yours.",
    cues: [
      "Feet on hips / biceps before they settle chest-to-chest",
      "Extend, do not curl into a ball under pressure",
      "Angle off when they drive straight",
    ],
    steps: [
      "In open guard, place both feet on their hips or one foot on a hip and one on a biceps.",
      "Extend your legs to create a stiff platform; bend only to adjust angles.",
      "When they step in, use a collar or sleeve grip to off-balance sideways.",
      "If they pass your feet, immediately recompose with a knee shield — do not accept flat back.",
    ],
    mistakes: [
      "Pulling them into closed guard when you are tired and posture-broken",
      "Bent, floppy legs that collapse under pressure",
      "Ignoring grips — feet alone without upper-body control get walked around",
    ],
  },
  {
    id: "leverage-over-muscle",
    name: "Leverage Over Muscle",
    moduleId: "why-lanky",
    whyLanky:
      "At 6'4\" and light, winning strength battles is a bad business model. Off-balance and isolate instead.",
    cues: [
      "Break posture before any submission attempt",
      "Attack when they post a hand or overcommit",
      "Use your hips and legs as the engine",
    ],
    steps: [
      "Identify when the opponent posts a hand on the mat or reaches too far for a grip.",
      "Use that post as a pivot — sweep or attack the extended limb.",
      "For submissions, create an angle first (hip pivot) so you are not curling against their stacked strength.",
      "If the finish stalls, transition: triangle to armbar, armbar to omoplata, back take when they turn.",
    ],
    mistakes: [
      "Trying to finish triangles square-on against a strong base",
      "Armbarring without breaking the grip / stacking posture",
      "Muscling grips instead of using hip movement",
    ],
  },

  // Guard
  {
    id: "spider-guard-intro",
    name: "Spider Guard Intro",
    moduleId: "guard-long-legs",
    whyLanky:
      "Spider guard lives on long femurs and active feet on biceps. It is a natural home for lanky athletes.",
    cues: [
      "Feet on biceps, not chest",
      "Pull sleeves, push with feet — create tension",
      "Keep your shoulders off the mat when possible",
    ],
    steps: [
      "Establish double sleeve grips.",
      "Place both feet on their biceps and extend to break their posture forward or force a squat.",
      "Alternate: extend one leg while retracting the other to create off-balancing (pendulum feel).",
      "Look for the scissor sweep, triangle entries, or lasso transitions when they circle.",
    ],
    mistakes: [
      "Feet sliding to the chest where they can stack you",
      "Loose sleeve grips that they yank free",
      "Letting hips go flat — keep active hip engagement",
    ],
  },
  {
    id: "lasso-guard-intro",
    name: "Lasso Guard Intro",
    moduleId: "guard-long-legs",
    whyLanky:
      "The lasso wraps your long shin around their arm, turning length into a sticky control that frustrates passers.",
    cues: [
      "Deep lasso — shin behind their triceps/shoulder line",
      "Other foot on the hip or biceps",
      "Keep the lasso sleeve grip glued",
    ],
    steps: [
      "From spider or open guard, thread one leg outside their arm and wrap the shin behind their upper arm (lasso).",
      "Secure the sleeve of the lassoed arm and place your free foot on their hip.",
      "Use the lasso to off-balance them sideways; do not let them straighten and stack.",
      "Attack: wait for them to post, then sweep or enter omoplata / triangle chains.",
    ],
    mistakes: [
      "Shallow lasso that slips off the elbow",
      "Releasing the sleeve grip too early",
      "Allowing them to free the trapped arm by circling toward the lasso",
    ],
  },
  {
    id: "dlr-intro",
    name: "De La Riva Intro",
    moduleId: "guard-long-legs",
    whyLanky:
      "DLR hooks shine with long legs — you can hook deep, control the far sleeve, and threaten sweeps without needing heavy hips.",
    cues: [
      "Outside hook deep behind their lead calf",
      "Far sleeve + collar or belt for posture control",
      "Other foot on the hip ready to extend",
    ],
    steps: [
      "When they stand in your guard with a lead leg forward, wrap your outside leg around that lead calf (DLR hook).",
      "Grip the far sleeve and a collar/belt; place your free foot on their hip.",
      "Extend the hip foot and pull the sleeve to off-balance them backward or sideways.",
      "Follow the sweep to come on top, or invert/berimbolo later as you advance.",
    ],
    mistakes: [
      "Shallow hook that they kick free easily",
      "No upper-body grips — hook alone is not enough",
      "Letting them step over and smash the hook flat",
    ],
  },
  {
    id: "closed-guard-pitfalls",
    name: "Closed Guard Pitfalls for Lanky Frames",
    moduleId: "guard-long-legs",
    whyLanky:
      "Long closed guards often leave space at the hips. Opponents stand, stack, and pass. Learn when to close — and when not to.",
    cues: [
      "If you close, clamp high on the back — not low on the waist",
      "Break posture before attempting anything",
      "Be ready to open into knee shield / spider if they stand",
    ],
    steps: [
      "Only lock closed guard when you can get high on their back and control their head/posture.",
      "Immediately break posture with collar + sleeve or overhook + head control.",
      "If they stand successfully, open early into a structured open guard rather than getting stacked.",
      "Drill the transition: closed → knee shield → spider/DLR as a deliberate chain.",
    ],
    mistakes: [
      "Locking closed guard low and hoping for the best",
      "Holding closed while completely posture-broken and smashed",
      "No plan when they stand up in your closed guard",
    ],
  },

  // Standing
  {
    id: "collar-tie-angle",
    name: "Collar Tie & Outside Angle",
    moduleId: "standing-clinch",
    whyLanky:
      "Height helps you own the collar tie and look down into shorter opponents — use it to create angles, not stall.",
    cues: [
      "Strong posture — head up, hips back slightly",
      "Collar tie + elbow control, then step offline",
      "Do not hang on the tie without a plan",
    ],
    steps: [
      "Establish a collar tie on the back of their neck and control their near elbow.",
      "Step to an outside angle while pulling their head down and away.",
      "From the angle, attack a trip, ankle pick, or snap into front headlock.",
      "If they level-change on your legs, sprawl and keep the upper-body connection.",
    ],
    mistakes: [
      "Standing square and getting double-legged",
      "Collar tying with a bent, weak posture",
      "Ignoring their hand fighting on your legs",
    ],
  },
  {
    id: "guard-pull-with-structure",
    name: "Guard Pull with Structure",
    moduleId: "standing-clinch",
    whyLanky:
      "Pulling guard is fine for lanky players — but falling flat is not. Pull into hooks, not into a pancake.",
    cues: [
      "Secure at least one strong grip before sitting",
      "Land on a hip with a hook ready (DLR / shin-to-shin)",
      "Feet active the moment you hit the mat",
    ],
    steps: [
      "Grip a collar and sleeve (or double sleeves).",
      "Sit to a hip while placing a foot on their hip and inserting a DLR or shin-to-shin hook.",
      "Immediately extend to break their posture forward or sideways.",
      "Begin open-guard offense within the first two seconds — do not freeze.",
    ],
    mistakes: [
      "Pulling without grips and landing flat on your back",
      "Letting them settle in standing posture over you",
      "Pulling every time instead of mixing in stand-up attempts",
    ],
  },
  {
    id: "sprawl-and-hip-heaviness",
    name: "Sprawl & Hip Heaviness",
    moduleId: "standing-clinch",
    whyLanky:
      "Long torsos can sprawl effectively. Hip heaviness matters more than bodyweight when defending shots.",
    cues: [
      "Hips down and back, chest on their shoulders",
      "Crossface / underhook after the sprawl",
      "Do not leave your feet close together",
    ],
    steps: [
      "When they shoot, kick your legs back and drop hips onto their upper back.",
      "Crossface and work an underhook or front headlock.",
      "Circle toward the crossface side to clear their hooks.",
      "Decide: take the back, settle into side control, or reset to standing.",
    ],
    mistakes: [
      "Sprawling with hips high — they finish the takedown",
      "No upper-body control after the sprawl",
      "Panicking and giving up turtle without a fight",
    ],
  },

  // Passing
  {
    id: "knee-slice-pass",
    name: "Knee Slice Pass",
    moduleId: "passing-light",
    whyLanky:
      "Knee slice rewards mobility and long stepping. You do not need smash pressure to clear the knee line.",
    cues: [
      "Control the near sleeve / collar",
      "Knee through the middle, long step the trail leg",
      "Chest heavy once you clear — then elongate",
    ],
    steps: [
      "From half guard or after clearing one leg, pin their near wrist and load your knee across their thigh.",
      "Slice the knee toward their far hip while underhooking or controlling the head.",
      "Long-step your trail leg free and settle into side control.",
      "Extend your base — arms long, hips low — so their shrimp has farther to travel.",
    ],
    mistakes: [
      "Leaving the trail leg tangled",
      "No grip on the near arm — they underhook and reverse",
      "Settling soft so they instantly recover guard",
    ],
  },
  {
    id: "standing-pass-chain",
    name: "Standing Pass Chain",
    moduleId: "passing-light",
    whyLanky:
      "Light passers should chain: throw legs, torreando, knee cut. Standing keeps heavier guards from clamping you.",
    cues: [
      "Posture first — hands in safe places",
      "Move their legs, do not dig into a closed clamp",
      "Change direction when they block one path",
    ],
    steps: [
      "Stand in their open guard with strong posture and grip breaks as needed.",
      "Throw or circle their legs (torreando) to force a hip turn.",
      "If they recompose, switch to knee slice or long step to the other side.",
      "When you clear the legs, drop your hips and connect chest-to-chest before they recover.",
    ],
    mistakes: [
      "Bending over into their spider/lasso",
      "Committing to one pass and freezing when blocked",
      "Passing the legs but failing to secure upper-body control",
    ],
  },
  {
    id: "top-pressure-without-weight",
    name: "Top Pressure Without Weight",
    moduleId: "passing-light",
    whyLanky:
      "Pressure is connection and alignment, not pounds. Long frames can pin shoulders and hips from farther away.",
    cues: [
      "Shoulder pressure into their jaw/cheek, not floating",
      "Hips heavy, limbs long for base",
      "Block the hip escape path before hunting submissions",
    ],
    steps: [
      "In side control, drive your shoulder into their far jaw line and control the near hip with your hip or hand.",
      "Keep your knees wide and sprawled for base — lengthen your body.",
      "When they bridge, ride it and resettle; do not let them create a frame.",
      "Only then hunt crossface-to-mount, north-south, or far-side arm attacks.",
    ],
    mistakes: [
      "Floating on elbows with no shoulder connection",
      "Knees together — easy to bridge over",
      "Chasing submissions before the pin is stable",
    ],
  },

  // Submissions
  {
    id: "triangle-from-guard",
    name: "Triangle from Guard",
    moduleId: "subs-long-limbs",
    whyLanky:
      "Long femurs make triangles easier to lock high on the shoulders. Angle is still everything.",
    cues: [
      "Shoot the triangle when one arm is in and one is out",
      "Angle off — your belly button toward their trapped-arm shoulder",
      "Cut the angle; do not just squeeze square",
    ],
    steps: [
      "From closed or open guard, isolate one arm (overhook or posture break) so one shoulder is trapped.",
      "Throw your leg over the back of their neck and lock a figure-four with your legs.",
      "Pivot your hips toward the trapped arm, pull their head down, and squeeze with the angle.",
      "If they posture strong, adjust higher on the shoulders or transition to armbar / omoplata.",
    ],
    mistakes: [
      "Locking the triangle too low on the body",
      "Staying square and trying to curl them down",
      "Forgetting to control the posture before shooting",
    ],
  },
  {
    id: "armbar-from-guard",
    name: "Armbar from Guard",
    moduleId: "subs-long-limbs",
    whyLanky:
      "Long legs help you climb and pinch the arm. Break the grip and control the thumb line.",
    cues: [
      "Pinch knees, hips up",
      "Thumb pointing up / break the grip",
      "Control near shoulder so they cannot stack out",
    ],
    steps: [
      "Break posture and isolate an arm across your center line.",
      "Put one foot on their hip, pivot, and swing the other leg over their head.",
      "Pinch your knees, lift hips, and control their wrist with the thumb up.",
      "If they stack, push on their near knee/face and finish or transition to triangle.",
    ],
    mistakes: [
      "Loose knees — they pull the arm out",
      "Leaving the far leg off their head",
      "No grip break before finishing",
    ],
  },
  {
    id: "omoplata-intro",
    name: "Omoplata Intro",
    moduleId: "subs-long-limbs",
    whyLanky:
      "Omoplata uses your long legs to fold their shoulder. Great when triangles get stuffed.",
    cues: [
      "Hip pivot is the engine",
      "Sit up and face their hips after locking the figure-four",
      "Control the near hip so they cannot roll",
    ],
    steps: [
      "From triangle attempt or overhook guard, swing your leg over their shoulder and under their armpit.",
      "Figure-four your legs and pivot your hips toward their trapped arm.",
      "Sit up facing their hips, control the belt/hip, and lean to finish the shoulder lock.",
      "If they roll, follow to the top and settle into side control or mount.",
    ],
    mistakes: [
      "Staying flat on your back after locking the legs",
      "No hip control — they forward-roll free",
      "Finishing too early before you sit up",
    ],
  },
  {
    id: "back-attacks-seatbelt",
    name: "Back Attacks & Seatbelt",
    moduleId: "subs-long-limbs",
    whyLanky:
      "Long arms help lock a deep seatbelt. Long legs help insert hooks. Back control is a high-percentage lanky path.",
    cues: [
      "Seatbelt: one arm over the shoulder, one under the armpit, hands locked",
      "Hooks in, heels toward the mat",
      "Chase the collar or RNC when they hand-fight",
    ],
    steps: [
      "Take the back from turtle, failed passes, or when they turn away from a triangle.",
      "Lock the seatbelt and insert both hooks (or a body triangle if flexible and appropriate).",
      "Keep chest glued; follow them when they try to scoot hips down.",
      "Attack the rear naked choke or collar chokes while maintaining hook control.",
    ],
    mistakes: [
      "Seatbelt without hooks — they slide free",
      "Crossing feet in front (triangle on yourself risk)",
      "Giving up the back the moment they hand-fight",
    ],
  },

  // Strength & recovery
  {
    id: "fueling-for-training",
    name: "Fueling for Training",
    moduleId: "strength-recovery",
    whyLanky:
      "Light athletes often under-eat relative to hard mat sessions. Consistent fuel supports recovery and strength gain.",
    cues: [
      "Eat a solid meal 2–3 hours before class when possible",
      "Protein + carbs around training",
      "Hydrate across the day, not only at the gym",
    ],
    steps: [
      "Plan a pre-training meal you can actually digest (rice, fruit, yogurt, sandwich — find your staples).",
      "After class, get protein and carbs within a reasonable window (shake + food is fine).",
      "Track roughly whether weekly weight is stable, rising, or dropping — adjust portions, not panic day-to-day.",
      "If appetite is low, use calorie-dense additions (nut butters, olive oil, milk) rather than forcing giant salads alone.",
    ],
    mistakes: [
      "Training fasted repeatedly and wondering why you gas",
      "Only drinking water during class with no electrolytes on long hot sessions",
      "Treating this as medical advice — see a professional for personalized nutrition needs",
    ],
  },
  {
    id: "simple-strength-supports",
    name: "Simple Strength Supports",
    moduleId: "strength-recovery",
    whyLanky:
      "You do not need a bodybuilder split. A few lifts that build pulling strength, hinges, and carries transfer well.",
    cues: [
      "2–3 short sessions per week beats random maxing",
      "Pull-ups / rows, Romanian deadlifts, goblet squats, farmer carries",
      "Leave ego at the door — clean reps",
    ],
    steps: [
      "Pick 3–4 movements: a pull, a hinge, a squat pattern, and a carry.",
      "Train them 2–3x weekly after lighter mat days or on off days.",
      "Progress load slowly; stop sets before form breaks.",
      "Keep sessions 30–45 minutes so they do not destroy your BJJ recovery.",
    ],
    mistakes: [
      "Heavy squatting the morning before hard rolling",
      "Ignoring posterior chain — then wondering why your posture collapses",
      "Copying advanced powerlifting programs as a beginner grappler",
    ],
  },
  {
    id: "recovery-and-longevity",
    name: "Recovery & Longevity",
    moduleId: "strength-recovery",
    whyLanky:
      "Skinny beginners get smashed. Sleep, deloads, and smart drilling keep you on the mats long enough to get good.",
    cues: [
      "Sleep is a training variable",
      "Tap early while learning — ego injuries cost months",
      "One lighter week per month if you feel beat up",
    ],
    steps: [
      "Protect a consistent sleep window as much as your class schedule.",
      "On sore days, drill technical reps instead of hard rounds.",
      "Warm up fingers, hips, and neck — lanky frames often feel joint-heavy.",
      "If something hurts sharply (not normal DOMS), rest and get it checked — this app is not medical advice.",
    ],
    mistakes: [
      "Rolling hard seven days a week with zero drilling days",
      "Ignoring sleep then blaming \"cardio genetics\"",
      "Pushing through sharp joint pain to impress the room",
    ],
  },
];

export function getTechniqueById(id: string): Technique | undefined {
  return TECHNIQUES.find((t) => t.id === id);
}

export function getTechniquesByModule(moduleId: string): Technique[] {
  return TECHNIQUES.filter((t) => t.moduleId === moduleId);
}
