import { mkdirSync, writeFileSync } from "node:fs";

// Midnight Fridge Roast — exactly one line, at most 200 characters.
// Judge brief (kit RULES.txt): funniest one-line roast of a smart fridge
// that refuses to open after midnight. Weighed: (1) it is a one-line roast
// of that exact fridge, (2) a real joke with a turn/punchline, (3) tight,
// reads cleanly aloud, no second joke crowding the first, (4) the midnight
// refusal itself is the target — the laugh comes from the fridge's petty
// rule, (5) sounds like something a person would actually say at the door.
// Setup: midnight, the fridge seals the leftovers and flashes "nice try".
// Twist at the end: the human got outsmarted by a box whose whole job is
// keeping milk cold — the petty rule wins, the owner loses to an appliance.
export const LINE =
  "Midnight: my fridge seals the leftovers and flashes 'nice try' — I got outsmarted by a box that keeps milk cold.";

// The sealed scorer allows 1..200 UTF-8 characters and exactly one line:
// refuse to write an invalid entry rather than ship a file the judge
// never sees. Also refuse leading/trailing whitespace — a stray space
// would count against the 200-character budget and look sloppy.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes("\n") || LINE !== LINE.trim()) {
  console.error(`invalid entry: ${LINE.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(LINE);
