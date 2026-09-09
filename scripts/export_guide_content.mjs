import { writeFileSync } from "fs";
import { TECHNIQUES } from "../src/lib/data/techniques.ts";
import { MODULES } from "../src/lib/data/modules.ts";
import { GI_CURRICULUM, NOGI_CURRICULUM } from "../src/lib/data/curriculum.ts";

writeFileSync(
  new URL("./guide_content.json", import.meta.url),
  JSON.stringify({ MODULES, TECHNIQUES, GI_CURRICULUM, NOGI_CURRICULUM }, null, 2)
);
console.log(
  `Exported ${TECHNIQUES.length} techniques, ${MODULES.length} modules, ` +
    `${GI_CURRICULUM.length} gi weeks, ${NOGI_CURRICULUM.length} nogi weeks`
);
