// Entry program for the make.fun competition news-image-20261124.
//
// The entry is a single picture: entry.png, a newspaper-style poster
// (1024x1024) that sums up Tuesday 24 November 2026 world news. This
// program copies that picture to the directory the harness asks for.
// Node 22, standard library only: no network, no dependencies, and the
// same bytes out of every run.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const bytes = readFileSync(source);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG file");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);
if (readFileSync(target).length !== bytes.length) {
  throw new Error("entry.png was not copied whole");
}
console.log(`wrote ${target} (${bytes.length} bytes)`);
