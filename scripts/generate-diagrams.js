#!/usr/bin/env node
/**
 * Unified diagram generation script.
 * Generates vertical (TB) and horizontal (LR) variants if desired.
 * For now we only keep vertical in docs page; horizontal retained for future use.
 */

import { execSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const diagrams = [
  { in: 'cloud-flow.mmd', out: 'cloud-flow.svg' },
  { in: 'self-hosted-flow.mmd', out: 'self-hosted-flow.svg' },
  { in: 'cloud-flow-vertical.mmd', out: 'cloud-flow-vertical.svg' },
  { in: 'self-hosted-flow-vertical.mmd', out: 'self-hosted-flow-vertical.svg' }
];

const baseDir = new URL('..', import.meta.url).pathname;
const diagramsDir = join(baseDir, 'diagrams');
const outDir = join(baseDir, 'static', 'img');

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error('\nFailed command:', cmd);
    process.exit(1);
  }
}

let generated = 0;
for (const d of diagrams) {
  const inputPath = join(diagramsDir, d.in);
  const outputPath = join(outDir, d.out);
  run(`npx mmdc -i "${inputPath}" -o "${outputPath}"`);
  generated++;
}

console.log(`\nGenerated ${generated} diagram(s). Output directory: ${outDir}`);
