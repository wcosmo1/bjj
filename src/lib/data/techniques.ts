import type { Technique, RuleSet } from "../types";

export const TECHNIQUES: Technique[] = [
  // ── Shared: Why lanky ──
  {
    id: "long-frame-basics",
    name: "Long Frame Basics",
    moduleId: "why-lanky",
    ruleSet: "both",
    transferNote:
      "Transfers fully. In the gi you may add a collar post; in no-gi the same forearm/shin bones do the work without fabric.",
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
    ruleSet: "both",
    transferNote:
      "Principle transfers. Gi uses collar/sleeve to off-balance; no-gi uses ankle grips, two-on-one wrist control, or underhooks from sitting.",
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
      "When they step in, off-balance sideways (gi: collar/sleeve; no-gi: wrist/ankle or underhook).",
      "If they pass your feet, immediately recompose with a knee shield — do not accept flat back.",
    ],
    mistakes: [
      "Pulling them into closed guard when you are tired and posture-broken",
      "Bent, floppy legs that collapse under pressure",
      "Ignoring upper-body connection — feet alone get walked around",
    ],
  },
  {
    id: "leverage-over-muscle",
    name: "Leverage Over Muscle",
    moduleId: "why-lanky",
    ruleSet: "both",
    whyLanky:
      'At 6\'4" and light, winning strength battles is a bad business model. Off-balance and isolate instead.',
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

  // ── Part A: Gi grips & standing ──
  {
    id: "collar-sleeve-grip-fighting",
    name: "Collar & Sleeve Grip Fighting",
    moduleId: "gi-grips-standing",
    ruleSet: "gi",
    transferNote:
      "Gi-only handles. In no-gi, replace with underhook/overhook and wrist control — same idea (own the connection first), different tools.",
    whyLanky:
      "Long arms reach collar and sleeve before shorter athletes can glue inside body locks. Early grips set every lanky gi sequence.",
    cues: [
      "Cross-collar deep — fingers inside, thumb outside, high on the collar",
      "Sleeve at the cuff or just above for control",
      "Posture tall; do not bend into their head",
    ],
    steps: [
      "From standing or seated open guard, establish a strong cross-collar (or same-side collar) and a sleeve grip.",
      "Use the collar to break their posture forward or sideways while the sleeve prevents them posting that hand freely.",
      "Strip their preferred grips on your sleeves/collar before you commit to a pull or pass.",
      "Once you own both grips, choose: structured guard pull, trip/ankle pick, or force them to squat into your open guard.",
    ],
    mistakes: [
      "Shallow collar grips that pop out under pressure",
      "Reaching for grips while standing square — easy double-leg",
      "Winning grips then freezing with no next action",
    ],
  },
  {
    id: "standing-gi-grip-breaks",
    name: "Standing Gi Grip Breaks",
    moduleId: "gi-grips-standing",
    ruleSet: "gi",
    whyLanky:
      "Shorter grapplers love to clamp your sleeves and drag you down. Tall athletes must break grips early or get folded.",
    cues: [
      "Two hands on one of their grips when needed",
      "Step offline as you break — do not yank square",
      "Re-grip immediately after the break",
    ],
    steps: [
      "When they own your sleeve, circle your elbow and use your free hand to peel their fingers or strip at the wrist.",
      "Against a deep collar on you, posture up, bring your hands to their wrist/collar, and clear while stepping to an angle.",
      "After every break, re-establish your own collar-sleeve before they reset.",
      "Drill grip break → outside angle → either trip or structured pull as one chain.",
    ],
    mistakes: [
      "Yank-fighting grips with bent posture",
      "Breaking a grip and celebrating instead of regripping",
      "Ignoring the second hand while you fight the first",
    ],
  },
  {
    id: "collar-tie-angle",
    name: "Collar Control & Outside Angle (Gi)",
    moduleId: "gi-grips-standing",
    ruleSet: "gi",
    transferNote:
      "Same angle concept transfers to no-gi collar ties / underhooks — see No-Gi Clinch module.",
    whyLanky:
      "Height helps you own the collar and look down into shorter opponents — use it to create angles, not stall.",
    cues: [
      "Strong posture — head up, hips back slightly",
      "Collar + sleeve or elbow control, then step offline",
      "Do not hang on the grip without a plan",
    ],
    steps: [
      "Establish a deep collar grip and control their near sleeve or elbow.",
      "Step to an outside angle while pulling their head/collar down and away.",
      "From the angle, attack a trip, ankle pick, or snap them forward into your open guard.",
      "If they level-change on your legs, sprawl and keep upper-body connection via the collar.",
    ],
    mistakes: [
      "Standing square and getting double-legged",
      "Collar gripping with a bent, weak posture",
      "Ignoring their hand fighting on your legs",
    ],
  },
  {
    id: "guard-pull-with-structure",
    name: "Guard Pull with Structure (Gi)",
    moduleId: "gi-grips-standing",
    ruleSet: "gi",
    transferNote:
      "Transfers: pull into hooks, not flat. No-gi version uses wrist control / underhook and lands in butterfly or shin-to-shin.",
    whyLanky:
      "Pulling guard is fine for lanky players — but falling flat is not. Pull into hooks, not into a pancake.",
    cues: [
      "Secure collar + sleeve before sitting",
      "Land on a hip with a hook ready (DLR / shin-to-shin / spider feet)",
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
    moduleId: "gi-grips-standing",
    ruleSet: "both",
    transferNote: "Fully transfers to no-gi — often more important there because shots come more often.",
    whyLanky:
      "Long torsos can sprawl effectively. Hip heaviness matters more than bodyweight when defending shots.",
    cues: [
      "Hips down and back, chest on their shoulders",
      "Crossface / underhook (or collar) after the sprawl",
      "Do not leave your feet close together",
    ],
    steps: [
      "When they shoot, kick your legs back and drop hips onto their upper back.",
      "Crossface and work an underhook, collar control, or front headlock.",
      "Circle toward the crossface side to clear their hooks.",
      "Decide: take the back, settle into side control, or reset to standing.",
    ],
    mistakes: [
      "Sprawling with hips high — they finish the takedown",
      "No upper-body control after the sprawl",
      "Panicking and giving up turtle without a fight",
    ],
  },

  // ── Part A: Gi guard ──
  {
    id: "spider-guard-intro",
    name: "Spider Guard Intro",
    moduleId: "gi-guard",
    ruleSet: "gi",
    transferNote:
      "Gi-specific (needs sleeves). No-gi substitute: feet on biceps/hips with wrist control, or butterfly elevation — same distance idea, no sleeve tension.",
    whyLanky:
      "Spider guard lives on long femurs and active feet on biceps. It is a natural home for lanky athletes in the gi.",
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
    id: "spider-scissor-sweep",
    name: "Spider to Scissor Sweep",
    moduleId: "gi-guard",
    ruleSet: "gi",
    whyLanky:
      "Long legs create a wide scissor. Off-balance with sleeve tension first so you are not muscling a heavy partner over.",
    cues: [
      "Extend the far-side spider to load them onto the near-side leg",
      "Chop the near leg across as you pull the sleeve",
      "Come up on top — do not stay on your back celebrating",
    ],
    steps: [
      "From double-sleeve spider, extend one leg hard to tilt them toward your other side.",
      "Bring the retracted leg across their thigh/hip line (scissor) while pulling that side sleeve.",
      "As they fall, follow to mount or side control; keep at least one sleeve until you settle.",
      "If they post a hand, switch to triangle or omoplata instead of forcing the sweep.",
    ],
    mistakes: [
      "Scissoring with no prior off-balance",
      "Releasing both sleeves as you sweep",
      "Leaving the trail hook soft so they step over",
    ],
  },
  {
    id: "lasso-guard-intro",
    name: "Lasso Guard Intro",
    moduleId: "gi-guard",
    ruleSet: "gi",
    transferNote:
      "Classic lasso needs a sleeve. No-gi cousin: wrap an overhook + high knee shield / reverse De La Riva styles — sticky control without fabric.",
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
    name: "De La Riva Intro (Gi)",
    moduleId: "gi-guard",
    ruleSet: "gi",
    transferNote:
      "Hook transfers to no-gi; grips change. No-gi DLR uses ankle/pants-free grips — often pairs with SLX and wrestling-up.",
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
    moduleId: "gi-guard",
    ruleSet: "both",
    transferNote:
      "Pitfall is the same in both. Gi: break posture with collar+sleeve. No-gi: overhook + head control / two-on-one.",
    whyLanky:
      "Long closed guards often leave space at the hips. Opponents stand, stack, and pass. Learn when to close — and when not to.",
    cues: [
      "If you close, clamp high on the back — not low on the waist",
      "Break posture before attempting anything",
      "Be ready to open into knee shield / spider (gi) or butterfly (no-gi) if they stand",
    ],
    steps: [
      "Only lock closed guard when you can get high on their back and control their head/posture.",
      "Immediately break posture (gi: collar + sleeve; no-gi: overhook + head control).",
      "If they stand successfully, open early into a structured open guard rather than getting stacked.",
      "Drill the transition: closed → knee shield → your primary open guard as a deliberate chain.",
    ],
    mistakes: [
      "Locking closed guard low and hoping for the best",
      "Holding closed while completely posture-broken and smashed",
      "No plan when they stand up in your closed guard",
    ],
  },
  {
    id: "gi-posture-break-closed",
    name: "Gi Closed Guard Posture Break",
    moduleId: "gi-guard",
    ruleSet: "gi",
    whyLanky:
      "You cannot finish lanky triangles or armbars while they sit tall. Collar and sleeve give you the levers to fold posture without raw strength.",
    cues: [
      "One collar high, one sleeve — pull elbow across",
      "Feet on hips first if you need to break open space, then re-close high",
      "Head down to your chest line before you shoot attacks",
    ],
    steps: [
      "From closed guard, establish a cross-collar and same-side sleeve (or double sleeve + belt).",
      "Plant a foot on their hip if needed, hip out, and pull their elbow across your center while dragging the collar down.",
      "When their posture breaks, re-clamp high and choose triangle, armbar, cross-collar choke, or flower sweep.",
      "If they posture back up, reset grips — do not chase a submission from a broken angle.",
    ],
    mistakes: [
      "Shooting triangle while they still have strong posture",
      "Pulling collar with arms only — hips must help",
      "Closing guard low after the break and giving space back",
    ],
  },

  // ── Part A: Gi passing & subs ──
  {
    id: "knee-slice-pass",
    name: "Knee Slice Pass (Gi)",
    moduleId: "gi-passing-subs",
    ruleSet: "gi",
    transferNote:
      "Mechanics transfer. Gi: pin near sleeve/collar. No-gi: control near wrist and underhook or head.",
    whyLanky:
      "Knee slice rewards mobility and long stepping. You do not need smash pressure to clear the knee line.",
    cues: [
      "Control the near sleeve / collar",
      "Knee through the middle, long step the trail leg",
      "Chest heavy once you clear — then elongate",
    ],
    steps: [
      "From half guard or after clearing one leg, pin their near wrist/sleeve and load your knee across their thigh.",
      "Slice the knee toward their far hip while underhooking or controlling the head/collar.",
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
    name: "Standing Pass Chain (Gi)",
    moduleId: "gi-passing-subs",
    ruleSet: "gi",
    transferNote:
      "Transfers. Watch spider/lasso in gi — posture and grip breaks matter more than in no-gi.",
    whyLanky:
      "Light passers should chain: throw legs, torreando, knee cut. Standing keeps heavier guards from clamping you.",
    cues: [
      "Posture first — hands in safe places",
      "Move their legs, do not dig into a closed clamp",
      "Change direction when they block one path",
    ],
    steps: [
      "Stand in their open guard with strong posture; strip sleeve grips as needed.",
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
    moduleId: "gi-passing-subs",
    ruleSet: "both",
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
  {
    id: "triangle-from-guard",
    name: "Triangle from Guard",
    moduleId: "gi-passing-subs",
    ruleSet: "both",
    transferNote:
      "Finish transfers. Entries differ: gi often from collar-sleeve posture break; no-gi from overhook or butterfly elevation.",
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
    moduleId: "gi-passing-subs",
    ruleSet: "both",
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
    moduleId: "gi-passing-subs",
    ruleSet: "both",
    transferNote:
      "Works both. Gi: belt/hip grip helps stop the roll. No-gi: control the near hip with a tight waist lock.",
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
    id: "cross-collar-choke-guard",
    name: "Cross-Collar Choke from Guard",
    moduleId: "gi-passing-subs",
    ruleSet: "gi",
    transferNote: "Gi-only. No-gi equivalent path: break posture → triangle or armbar, or take the back for RNC.",
    whyLanky:
      "Long arms feed deep collars. You can finish from guard without needing smash pressure — posture break first.",
    cues: [
      "First collar deep — palm up, reach toward their neck",
      "Second hand feeds or grips high; elbows in",
      "Pull them in as you expand your elbows / curl",
    ],
    steps: [
      "Break posture in closed or high guard so their head is low.",
      "Feed a deep cross-collar; add the second collar grip (or palm-up / palm-down variation your gym teaches).",
      "Pull their head/chest into you while expanding elbows and using your legs to keep them broken down.",
      "If they posture out, switch to triangle or armbar off the same isolation — do not force a shallow choke.",
    ],
    mistakes: [
      "Shallow grips that only choke fabric",
      "No posture break before feeding collars",
      "Elbows flared with no leg control — they stand and pass",
    ],
  },
  {
    id: "back-attacks-seatbelt",
    name: "Back Attacks & Seatbelt (Gi)",
    moduleId: "gi-passing-subs",
    ruleSet: "gi",
    transferNote:
      "Seatbelt + hooks transfer. Finish changes: gi adds collar chokes; no-gi prioritizes RNC (see No-Gi Subs).",
    whyLanky:
      "Long arms help lock a deep seatbelt. Long legs help insert hooks. Back control is a high-percentage lanky path.",
    cues: [
      "Seatbelt: one arm over the shoulder, one under the armpit, hands locked",
      "Hooks in, heels toward the mat",
      "Chase collar chokes when they hand-fight",
    ],
    steps: [
      "Take the back from turtle, failed passes, or when they turn away from a triangle.",
      "Lock the seatbelt and insert both hooks (or a body triangle if flexible and appropriate).",
      "Keep chest glued; follow them when they try to scoot hips down.",
      "Attack collar chokes (bow-and-arrow family as you advance) while maintaining hook control.",
    ],
    mistakes: [
      "Seatbelt without hooks — they slide free",
      "Crossing feet in front (triangle on yourself risk)",
      "Giving up the back the moment they hand-fight",
    ],
  },

  // ── Part B: No-Gi clinch ──
  {
    id: "underhooks-overhooks-basics",
    name: "Underhooks & Overhooks Basics",
    moduleId: "nogi-clinch",
    ruleSet: "nogi",
    transferNote:
      "Replaces collar/sleeve as your primary standing connection. Same lanky goal: own upper body, then angle.",
    whyLanky:
      "Long arms excel at digging underhooks and draping overhooks. This is your no-gi grip fighting.",
    cues: [
      "Inside position — get the underhook, do not accept theirs",
      "Head on the outside of their shoulder when you underhook",
      "Overhook to stuff their underhook and set front headlock",
    ],
    steps: [
      "From collar tie or hand fighting, clear their arm and dig a deep underhook on one side.",
      "Step to that outside angle; keep hips back enough to discourage their shot.",
      "If they win the underhook, convert to an overhook, drop your weight, and look for a front headlock snap.",
      "Chain: underhook → trip or mat return; overhook → front headlock → guillotine or back exposure.",
    ],
    mistakes: [
      "Reaching for underhooks while standing square and upright",
      "Winning an underhook then stalling with no angle",
      "Overhooking soft — they shrug free and shoot",
    ],
  },
  {
    id: "body-lock-clinch-control",
    name: "Body Lock Clinch Control",
    moduleId: "nogi-clinch",
    ruleSet: "nogi",
    whyLanky:
      "Once you clamp a body lock, long torsos can lift, turn, and mat-return without needing heavyweight smash.",
    cues: [
      "Hands locked low around the waist / hips",
      "Hip connection — chest glued, head tight",
      "Move their hips before you try to lift",
    ],
    steps: [
      "From double underhooks or a successful snap, lock hands behind their hips (body lock).",
      "Keep your head tight to their chest/shoulder and your hips close.",
      "Step and turn to off-balance; look for mat return, outside trip, or ride to the back.",
      "If they drop level, stay heavy on the lock and sprawl rather than releasing to hand fight.",
    ],
    mistakes: [
      "High body lock around the ribs — easy to shrug",
      "Leaving space between hips — they underhook and reverse",
      "Trying to pure-strength lift a heavier partner",
    ],
  },
  {
    id: "nogi-collar-tie-snap",
    name: "Collar Tie Snap to Front Headlock",
    moduleId: "nogi-clinch",
    ruleSet: "nogi",
    whyLanky:
      "Height lets you own the collar tie and snap shorter athletes down into a front headlock — a lanky no-gi highway.",
    cues: [
      "Posture tall, then snap with legs + hands together",
      "Circle to the front headlock; do not stay square",
      "Hands locked, shoulder pressure on their neck/trap",
    ],
    steps: [
      "Establish a collar tie and control their near elbow or wrist.",
      "Snap their head down while stepping offline; catch the front headlock (hands locked under their chin/neck line).",
      "From front headlock: decide guillotine, go-behind, or force turtle.",
      "If they sprawl back to standing, reset hand fighting — do not hang on a dead collar tie.",
    ],
    mistakes: [
      "Snapping with arms only and losing balance forward",
      "Front headlock without hip pressure — they posture up",
      "Ignoring the go-behind when the choke is not there",
    ],
  },

  // ── Part B: No-Gi guards ──
  {
    id: "butterfly-guard-intro",
    name: "Butterfly Guard Intro",
    moduleId: "nogi-guards",
    ruleSet: "nogi",
    transferNote:
      "Also usable in gi, but it is a primary lanky no-gi home when spider/lasso are gone.",
    whyLanky:
      "Butterfly uses long femurs as elevators. You sweep and create angles without needing sleeve tension.",
    cues: [
      "Hooks inside their thighs, sitting on your hips — not flat",
      "Upper-body connection: underhooks or overhooks",
      "Elevate and angle; do not stall with soft hooks",
    ],
    steps: [
      "Sit up into butterfly with both hooks under their thighs and a strong upper-body connection (preferably double underhooks or under/over).",
      "Pull them onto your hooks, elevate one side, and off-balance them forward/sideways.",
      "Finish the sweep by coming to the top, or use elevation to enter a single-leg X / back take.",
      "If they smash flat, frame with a knee shield and recover hooks — do not accept chest-to-chest bottom.",
    ],
    mistakes: [
      "Butterfly while flat on your back with no upper-body grips",
      "Soft hooks that never elevate",
      "Letting them clear both hooks and knee-slice immediately",
    ],
  },
  {
    id: "single-leg-x-intro",
    name: "Single-Leg X (SLX) Intro",
    moduleId: "nogi-guards",
    ruleSet: "nogi",
    transferNote:
      "Works in gi too (often from DLR). Emphasized here as a no-gi lanky open-guard pillar.",
    whyLanky:
      "SLX wraps your long leg around their lead leg like a sticky hook — sweeps and wrestling-up entries without fabric.",
    cues: [
      "One leg over their thigh, other hooked behind their calf / ankle line",
      "Control the ankle; keep their knee bent",
      "Hips off the mat when attacking",
    ],
    steps: [
      "From butterfly, shin-to-shin, or a failed DLR, insert SLX: your outside leg wraps their lead leg with your shin across their hip/thigh.",
      "Control their ankle/heel and keep their knee from straightening.",
      "Off-balance backward for a sweep, or elevate into a technical stand-up / single-leg finish.",
      "If they dump you, transition to butterfly or knee shield rather than dying in a smashed X.",
    ],
    mistakes: [
      "Loose ankle control — they kick free",
      "Letting them straighten the trapped leg and smash",
      "Staying glued to SLX when the pass is already winning",
    ],
  },
  {
    id: "knee-shield-without-fabric",
    name: "Knee Shield Without Fabric",
    moduleId: "nogi-guards",
    ruleSet: "nogi",
    transferNote:
      "Same shield as gi half guard, but you cannot hold a sleeve — use frames, underhook fights, and active bottom knee.",
    whyLanky:
      "A long shin creates a wall across their chest. Essential when no-gi passers try to smash half guard.",
    cues: [
      "Shin across their chest/shoulder line — not soft thigh",
      "Bottom knee active; frame the biceps/neck with hands",
      "Hip escape the moment space appears",
    ],
    steps: [
      "When they settle in half guard, insert a high knee shield across their chest and frame their near upper arm/neck.",
      "Prevent the crossface; fight for an underhook or at least deny theirs.",
      "Off-balance them with the shield, then recover full butterfly/open guard or sweep toward the underhook side.",
      "If the shield collapses, shrimp hard and reinsert — do not accept flat half under a heavy chest.",
    ],
    mistakes: [
      "Low, floppy shield that they walk around",
      "No hand frames — they crossface and flatten you",
      "Holding a dead shield with no escape or sweep plan",
    ],
  },
  {
    id: "nogi-guard-pull-butterfly",
    name: "No-Gi Guard Pull to Butterfly / Shin-to-Shin",
    moduleId: "nogi-guards",
    ruleSet: "nogi",
    whyLanky:
      "Same rule as gi: pull with structure. Land in butterfly or shin-to-shin with an underhook, not flat on your back.",
    cues: [
      "Wrist control or underhook before you sit",
      "Land on a hip; hooks ready",
      "Elevate or frame within two seconds",
    ],
    steps: [
      "Hand-fight to a wrist and collar-tie or underhook.",
      "Sit to a hip into shin-to-shin or butterfly hooks while pulling them forward.",
      "Immediately connect upper body and look for elevation, SLX entry, or knee shield.",
      "If they stay heavy and standing, switch to SLX / DLR-style hook instead of freezing.",
    ],
    mistakes: [
      "Pulling with no grips and landing flat",
      "Pulling into closed guard and getting stacked",
      "Never mixing in stand-up / sprawl defense",
    ],
  },

  // ── Part B: No-Gi wrestling & passing ──
  {
    id: "wrestling-up-light-athlete",
    name: "Wrestling Up for Light Tall Athletes",
    moduleId: "nogi-wrestling-pass",
    ruleSet: "nogi",
    transferNote:
      "Possible in gi but cleaner in no-gi. Great when spider/lasso are unavailable and you need top position.",
    whyLanky:
      "Light athletes often survive better on top. Wrestling up from butterfly/SLX turns long legs into a stand-up engine.",
    cues: [
      "Create a frame + hook, then plant a foot and stand",
      "Keep a body lock or head position as you rise",
      "Do not stand empty — connect first",
    ],
    steps: [
      "From butterfly or SLX, off-balance them enough to free a posting hand and plant one foot.",
      "Technical stand-up into a single-leg or body lock; keep your head on the correct side.",
      "Finish the mat return or outside trip; settle into side control with long base.",
      "If the stand-up fails, drop back to butterfly with frames — do not leave your neck exposed.",
    ],
    mistakes: [
      "Standing with no upper-body connection — easy front headlock for them",
      "Turning away and giving the back while rising",
      "Forcing wrestling-up against a much heavier smash without a frame",
    ],
  },
  {
    id: "nogi-knee-slice",
    name: "No-Gi Knee Slice & Connection Pass",
    moduleId: "nogi-wrestling-pass",
    ruleSet: "nogi",
    whyLanky:
      "Same long-step knee cut as gi, but you pin wrists and drive chest connection instead of sleeve/collar.",
    cues: [
      "Control near wrist; underhook or head control",
      "Knee through, trail leg long-steps free",
      "Chest heavy on the settle — then elongate",
    ],
    steps: [
      "Clear one leg or start from half; pin their near wrist and load your knee across their thigh.",
      "Slice toward the far hip while keeping an underhook or strong crossface.",
      "Free the trail leg and drop hips into side control with wide knees.",
      "Elongate — make their shrimp travel the length of your frame.",
    ],
    mistakes: [
      "No wrist control — they underhook and roll you",
      "Floating after the cut with no chest connection",
      "Leaving the trail leg in and getting re-guarded",
    ],
  },
  {
    id: "nogi-standing-pass",
    name: "No-Gi Standing Pass Chain",
    moduleId: "nogi-wrestling-pass",
    ruleSet: "nogi",
    whyLanky:
      "Without spider sleeves, standing pass chains are friendlier for light athletes — throw legs, knee cut, float.",
    cues: [
      "Hands on ankles/knees in safe places — posture tall",
      "Circle and change direction",
      "Drop to connection the moment legs clear",
    ],
    steps: [
      "Stand in open guard with posture; control ankles or pants-line hips with your hands.",
      "Throw legs (torreando-style) or kick back to force a hip turn.",
      "Chain into knee slice or long step when they recompose.",
      "Secure chest-to-chest before hunting submissions.",
    ],
    mistakes: [
      "Bending over into butterfly elevation",
      "One-pass commitment when they block",
      "Clearing legs but letting them insert hooks again",
    ],
  },

  // ── Part B: No-Gi subs ──
  {
    id: "front-headlock-guillotine",
    name: "Front Headlock & Guillotine Awareness",
    moduleId: "nogi-subs",
    ruleSet: "nogi",
    transferNote:
      "Exists in gi but is a no-gi staple. Tall arms help lock — finish with body alignment, not arm-only curl.",
    whyLanky:
      "Snaps and sprawls feed front headlocks. Long arms can lock guillotines high; angle and hip position finish them.",
    cues: [
      "Elbow tight to their neck; hands locked correctly for your variation",
      "Step to the side / hide your hips",
      "If the choke fails, go behind — do not die on a bad squeeze",
    ],
    steps: [
      "From sprawl or snap-down, lock a front headlock and decide: high-elbow guillotine, arm-in, or go-behind.",
      "For the guillotine: seat the blade of your forearm under their neck, lock hands, and take a dominant angle.",
      "Fall to your side or back with closed guard / high hooks only if the finish is real — otherwise take the back.",
      "Drill the chain: guillotine attempt → they defend → go-behind → seatbelt.",
    ],
    mistakes: [
      "Arm-only squeeze with no body connection",
      "Jumping closed guard on a shallow guillotine against a heavy partner",
      "Ignoring the back take when they turtle from the headlock",
    ],
  },
  {
    id: "anaconda-darce-awareness",
    name: "Anaconda & Darce Awareness",
    moduleId: "nogi-subs",
    ruleSet: "nogi",
    whyLanky:
      "Long arms thread these front headlock chokes more easily — but beginners should prioritize position (side control / mount) over hunting low-percentage squeezes.",
    cues: [
      "Thread under the neck and through the armpit — shoulder deep",
      "Roll or walk to the finishing angle; do not stall on top belly-down",
      "If it is not there, keep side control — position over highlight-reel",
    ],
    steps: [
      "From front headlock or sprawled top, identify the arm-in neck exposure.",
      "For darce: thread your arm under their neck and through the far armpit, lock a figure-four, and walk toward the trapped-arm side.",
      "For anaconda: similar threading with a rolling finish toward the near side — learn the gym's preferred detail under a coach.",
      "Treat these as awareness + positional threats as a beginner; cement sprawl → front headlock → back/side first.",
    ],
    mistakes: [
      "Diving for darce and losing the top position entirely",
      "Shallow thread that only hugs the head",
      "Skipping basic side control stability to chase the choke every time",
    ],
  },
  {
    id: "back-take-rnc-no-collar",
    name: "Back Take & Rear Naked Choke",
    moduleId: "nogi-subs",
    ruleSet: "nogi",
    transferNote:
      "Same seatbelt/hooks as gi. Without collar chokes, RNC is the primary finish — hand-fighting matters more.",
    whyLanky:
      "Long arms lock a deep seatbelt and RNC. Long legs insert hooks. Highest-percentage lanky no-gi finish path.",
    cues: [
      "Seatbelt locked; hooks in; chest glued",
      "RNC: elbow under chin, support hand behind the head — not under your own elbow only",
      "Follow their hip scoots; do not float",
    ],
    steps: [
      "Take the back from turtle, go-behind, or when they turn away from a guillotine/triangle.",
      "Lock seatbelt, insert both hooks, and ride their movement.",
      "Clear the chin line and apply rear naked choke; use the second hand to seal behind the head.",
      "If they peel the choke, maintain hooks and re-attack — do not abandon the back early.",
    ],
    mistakes: [
      "Seatbelt without hooks",
      "Crossing feet in front of their body",
      "RNC across the face/mouth instead of under the chin",
    ],
  },
  {
    id: "nogi-triangle-armbar-chain",
    name: "No-Gi Triangle–Armbar Chain",
    moduleId: "nogi-subs",
    ruleSet: "nogi",
    whyLanky:
      "Your gi triangle/armbar mechanics still apply — enter from overhooks, butterfly, and failed guillotines instead of sleeve pulls.",
    cues: [
      "Overhook isolation often replaces collar-sleeve",
      "Angle off the same way — belly button to trapped shoulder",
      "Chain when stacked: triangle ↔ armbar ↔ back take",
    ],
    steps: [
      "From closed or butterfly, win an overhook and break posture so one arm is trapped.",
      "Shoot triangle or climb to armbar using the same lanky angle rules as in the gi.",
      "If they stack, transition; if they turn away, take the back for RNC.",
      "Drill the chain until the transitions are automatic under fatigue.",
    ],
    mistakes: [
      "Waiting for sleeve grips that do not exist",
      "Finishing square against a strong posture",
      "Abandoning the chain after one failed squeeze",
    ],
  },

  // ── Shared: Strength & recovery ──
  {
    id: "fueling-for-training",
    name: "Fueling for Training",
    moduleId: "strength-recovery",
    ruleSet: "both",
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
    ruleSet: "both",
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
    ruleSet: "both",
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
      'Ignoring sleep then blaming "cardio genetics"',
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

export function filterTechniquesByRuleSet(
  techniques: Technique[],
  filter: RuleSet | "all"
): Technique[] {
  if (filter === "all") return techniques;
  if (filter === "both") return techniques.filter((t) => t.ruleSet === "both");
  return techniques.filter((t) => t.ruleSet === filter || t.ruleSet === "both");
}
