import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "v1.1.4: fixed a bug where standing up after age 30 triggered an undocumented sound effect in the knees.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");

// Read back and verify the gate: 1-160 chars, single line, not only whitespace.
const back = readFileSync(outPath, "utf8");
const chars = [...back].length;
if (chars < 1 || chars > 160) throw new Error(`entry failed gate: ${chars} chars`);
if (back.trim().length === 0) throw new Error("entry failed gate: blank");
if (back.includes("\n")) throw new Error("entry failed gate: not a single line");
if (back !== LINE) throw new Error("entry mismatch on read-back");
console.log(`wrote ${outPath} (${chars} code points, verified)`);
