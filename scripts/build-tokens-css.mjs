// Generates tokens.css from tokens.json: @font-face rules, one block per theme, the
// non-colour tokens as custom properties and one class per type style.
// Usage: node scripts/build-tokens-css.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tk = JSON.parse(readFileSync(path.join(root, 'tokens.json'), 'utf8'));
const themes = tk.color.themes.map((t) => t.id);
const first = themes[0];

const valueFor = (v, theme) => (typeof v === 'string' ? v : v[theme] ?? v[first]);
const css = (v) => (/^\{(.+)\}$/.test(v) ? `var(--${v.slice(1, -1)})` : v);
const cssName = (n) => n.replace(/\./g, '\\.');

const out = [`/* ${tk.name} — generated from tokens.json */`, ''];

for (const f of tk.type.fonts) {
  const file = f.file.includes('/') ? f.file : `fonts/${f.file}`;
  out.push(`@font-face { font-family: "${f.family}"; src: url("${file}") format("woff2"); font-weight: ${f.weight}; font-style: ${f.style || 'normal'}; font-display: swap; }`);
}
out.push('');

for (const theme of themes) {
  out.push(theme === first ? `:root, [data-theme="${theme}"] {` : `[data-theme="${theme}"] {`);
  for (const t of tk.color.tokens) out.push(`  --${cssName(t.name)}: ${css(valueFor(t.value, theme))};`);
  for (const t of tk.shadow?.tokens ?? []) out.push(`  --${cssName(t.name)}: ${valueFor(t.value, theme)};`);
  out.push('}', '');
}

out.push(':root {');
for (const [key, fam] of Object.entries(tk)) {
  if (['name', 'version', 'color', 'type', 'shadow'].includes(key) || !fam?.tokens) continue;
  for (const t of fam.tokens) out.push(`  --${cssName(t.name)}: ${t.value};`);
}
for (const [key, stack] of Object.entries(tk.type.families)) out.push(`  --font-${key}: ${stack};`);
out.push('}', '');

for (const g of tk.type.groups) {
  for (const s of g.styles) {
    const fam = s.family || g.family;
    const decl = [`font-family: var(--font-${fam})`, `font-size: ${s.fontSize}`, `line-height: ${s.lineHeight}`, `font-weight: ${s.fontWeight}`];
    if (s.letterSpacing) decl.push(`letter-spacing: ${s.letterSpacing}`);
    if (s.fontStyle) decl.push(`font-style: ${s.fontStyle}`);
    out.push(`.${cssName(s.name)} { ${decl.join('; ')}; }`);
  }
}

writeFileSync(path.join(root, 'tokens.css'), out.join('\n') + '\n');
console.log('tokens.css written');
