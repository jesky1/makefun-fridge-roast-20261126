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
// would count against the 200-character budget and look sloppy. And
// enforce the brief itself: the line must name the fridge and the
// midnight refusal, so a future edit cannot drift off-brief.
export function validateEntry(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1..200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading/trailing whitespace");
  }
  if (!/fridge/i.test(line) || !/midnight/i.test(line)) {
    throw new Error("entry must name the fridge and the midnight refusal");
  }
}

validateEntry(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(LINE);
