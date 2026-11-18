// news-image-20261117 entrypoint.
// Validates the bundled entry.png (PNG magic, IHDR dimensions, size cap)
// and copies it to $MAKEFUN_OUTPUT_DIR/entry.png (default /output).
// Node 22, standard library only, no network.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const MAX_DIM = 1024;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");

const bytes = readFileSync(source);
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the ${MAX_BYTES} limit`);
}
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png does not start with the PNG magic bytes");
}
if (bytes.length < 24 || bytes.toString("ascii", 12, 16) !== "IHDR") {
  throw new Error("entry.png has no IHDR chunk where one is expected");
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > MAX_DIM || height > MAX_DIM) {
  throw new Error(`entry.png is ${width}x${height}, over the ${MAX_DIM}x${MAX_DIM} limit`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, dest);
const written = statSync(dest).size;
if (written !== bytes.length || !readFileSync(dest).equals(bytes)) {
  throw new Error("copied entry.png differs from the bundled entry.png");
}
console.log(`wrote ${dest} (${width}x${height}, ${written} bytes)`);
