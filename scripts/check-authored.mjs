import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const skip = new Set([
  "src/data/quotes.ts",
  "scripts/check-authored.mjs",
]);
const banned = [
  "Datadog",
  "datadog",
  "Seagate",
  "seagate",
  "Acme",
  "acme",
  "Madeline",
  "madeline",
  "Ingleby",
  "Northwind",
  "Priya",
  "Jordan Hale",
  "Globex",
  "Initech",
  "Hooli",
  "Umbrella",
  "krista",
  "Bits AI",
  "Sev-2",
  "datadoghq",
  "where-cursor",
  "dd_horizontal",
  "dd_vertical",
  "dd_logo",
  "brand-dd",
  "datadog-wordmark",
];
const dash = /[\u2013\u2014]/;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, files);
    else if (/\.(ts|tsx|css|wgsl|md|mjs|json)$/.test(name)) files.push(path);
  }
  return files;
}

const files = walk(root).filter((file) => {
  const rel = relative(root, file);
  return !skip.has(rel) && !rel.startsWith("public/") && !rel.startsWith("private/");
});

const hits = [];
for (const file of files) {
  const rel = relative(root, file);
  const text = readFileSync(file, "utf8");
  for (const word of banned) {
    if (text.includes(word)) hits.push(`${rel}: banned ${word}`);
  }
  if (dash.test(text)) hits.push(`${rel}: U+2013 or U+2014`);
}

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log(`ok ${files.length} files`);
