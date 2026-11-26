import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LINE, validateEntry } from "./main.ts";

test("entry is exactly one roast line of 1-200 characters", () => {
  assert.equal(LINE.split("\n").length, 1, "must be exactly one line");
  assert.ok(LINE.length >= 1 && LINE.length <= 200, `length ${LINE.length} must be 1..200`);
  assert.equal(LINE, LINE.trim(), "no leading/trailing whitespace");
  assert.match(LINE, /fridge/i, "must roast the fridge");
  assert.match(LINE, /midnight/i, "must name the midnight refusal");
  assert.match(LINE, /outsmarted by a box that keeps milk cold/i, "punchline must land at the end");
  console.log(`LINE (${LINE.length} chars): ${LINE}`);
});

test("validateEntry rejects off-brief or malformed lines", () => {
  assert.throws(() => validateEntry(""), /1\.\.200/);
  assert.throws(() => validateEntry("x".repeat(201)), /1\.\.200/);
  assert.throws(() => validateEntry("fridge at midnight\nsecond line"), /one line/);
  assert.throws(() => validateEntry(" fridge at midnight "), /whitespace/);
  assert.throws(() => validateEntry("A joke about a toaster at noon"), /fridge and the midnight/);
  assert.doesNotThrow(() => validateEntry(LINE));
});

test("program writes the same line to /output/entry.txt", () => {
  const written = readFileSync("/output/entry.txt", "utf8");
  assert.equal(written, LINE, "entry.txt must hold exactly the line, no trailing newline");
  assert.ok(written.length >= 1 && written.length <= 200, `entry.txt is ${written.length} chars`);
});
