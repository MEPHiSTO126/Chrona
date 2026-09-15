#!/usr/bin/env node

/**
 * Chrona Design Linting Script
 * Enforces anti-generic design rules [R0]-[R9] from DESIGN_RULES.md
 */

import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve(process.cwd(), 'src');

const BANNED_PATTERNS = [
  {
    id: 'R0-CURRENCY-RESIDUAL',
    name: 'Residual Indian Rupee (₹) - Use Naira (₦) via formatPrice()',
    regex: /₹/g,
    exclude: ['translations.ts'], // translations might have legacy strings
  },
  {
    id: 'R1-BANNED-GRADIENT',
    name: 'Purple-to-orange / purple-to-blue decorative gradient fill',
    regex: /from-orange-600\/20\s+to-purple-900\/40/g,
  },
  {
    id: 'R4-GLASSMORPHISM-CARD',
    name: 'AI-generic frosted glassmorphism card container (backdrop-blur-xl)',
    regex: /backdrop-blur-xl/g,
  },
  {
    id: 'R5-FLOATING-ORB',
    name: 'AI-generic animated floating orbs class',
    regex: /\borb-\d\b|\borb\b/g,
    exclude: ['translations.ts'],
  },
  {
    id: 'R6-EMOJI-IN-UI',
    name: 'Raw emoji in UI component (use Lucide icon instead)',
    // Matches common emojis like fire, wave, cart, dress, shirt, etc.
    regex: /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u,
    exclude: ['translations.ts'],
  },
];

let totalViolations = 0;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      lintFile(fullPath);
    }
  }
}

function lintFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const relativePath = path.relative(process.cwd(), filePath);

  lines.forEach((line, index) => {
    // Ignore pure comment lines
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    for (const pattern of BANNED_PATTERNS) {
      if (pattern.exclude && pattern.exclude.some((ex) => filePath.includes(ex))) {
        continue;
      }

      if (pattern.regex.test(line)) {
        console.error(
          `\x1b[31m[FAIL ${pattern.id}]\x1b[0m ${relativePath}:${index + 1} - ${pattern.name}`
        );
        console.error(`   \x1b[90m${line.trim()}\x1b[0m\n`);
        totalViolations++;
        // Reset regex state if global
        pattern.regex.lastIndex = 0;
      }
    }
  });
}

console.log('🔍 Running Chrona Anti-Generic Design Linter...\n');
scanDir(SRC_DIR);

if (totalViolations > 0) {
  console.log(`\x1b[31m✖ Found ${totalViolations} design rule violation(s).\x1b[0m`);
  process.exitCode = 1;
} else {
  console.log('\x1b[32m✔ All design rules passed cleanly! No AI-generic patterns detected.\x1b[0m\n');
}
