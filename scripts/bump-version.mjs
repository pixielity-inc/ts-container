#!/usr/bin/env node

/**
 * Bump version across all packages in the monorepo.
 *
 * Usage:
 *   pnpm version:bump 1.2.0        # set exact version
 *   pnpm version:bump patch         # bump patch (1.0.0 → 1.0.1)
 *   pnpm version:bump minor         # bump minor (1.0.0 → 1.1.0)
 *   pnpm version:bump major         # bump major (1.0.0 → 2.0.0)
 *
 * After bumping, commit and tag:
 *   git add -A && git commit -m "release: v1.2.0"
 *   git tag v1.2.0
 *   git push origin main --tags
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const packages = [
  'packages/container/package.json',
  'packages/react/package.json',
  'packages/application/package.json',
];

const arg = process.argv[2];

if (!arg) {
  console.error('Usage: pnpm version:bump <version|patch|minor|major>');
  process.exit(1);
}

// Read current version from the first package
const firstPkg = JSON.parse(readFileSync(resolve(root, packages[0]), 'utf8'));
const current = firstPkg.version;
const [major, minor, patch] = current.split('.').map(Number);

let newVersion;
switch (arg) {
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  default:
    // Exact version
    if (!/^\d+\.\d+\.\d+/.test(arg)) {
      console.error(`Invalid version: ${arg}`);
      process.exit(1);
    }
    newVersion = arg;
}

console.log(`\n📦 Bumping version: ${current} → ${newVersion}\n`);

for (const pkgPath of packages) {
  const fullPath = resolve(root, pkgPath);
  const pkg = JSON.parse(readFileSync(fullPath, 'utf8'));
  pkg.version = newVersion;
  writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`  ✅ ${pkg.name}@${newVersion}`);
}

// Also update the monorepo root
const rootPkgPath = resolve(root, 'package.json');
const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf8'));
rootPkg.version = newVersion;
writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');
console.log(`  ✅ ${rootPkg.name}@${newVersion} (root)`);

console.log(`\n🏷️  Next steps:`);
console.log(`  git add -A`);
console.log(`  git commit -m "release: v${newVersion}"`);
console.log(`  git tag v${newVersion}`);
console.log(`  git push origin main --tags\n`);
