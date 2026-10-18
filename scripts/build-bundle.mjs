// Builds components/src into components/bundle.js: one classic script that reads
// window.React and assigns window.Afterglow. Usage: node scripts/build-bundle.mjs
import * as esbuild from 'esbuild';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'components/src');

// Display order of the components in the design system (the bundle header).
const ORDER = [
  'Button', 'IconButton', 'Link', 'Badge', 'Tag', 'MetaLine', 'Divider', 'Icon', 'Accent',
  'SiteHeader', 'ThemeToggle', 'BackLink', 'TableOfContents', 'Pagination', 'SiteFooter',
  'PostHeader', 'HeroArt', 'Prose', 'Callout', 'CodeBlock', 'AuthorByline',
  'PostCard', 'PostGrid', 'SearchField', 'NewsletterSignup', 'Container', 'ArticleBody',
];

const globalReact = {
  name: 'global-react',
  setup(b) {
    b.onResolve({ filter: /^react(-dom)?$/ }, (a) => ({ path: a.path, namespace: 'global' }));
    b.onLoad({ filter: /.*/, namespace: 'global' }, (a) => ({
      contents: `module.exports = window.${a.path === 'react' ? 'React' : 'ReactDOM'};`,
      loader: 'js',
    }));
  },
};

const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: 'Afterglow', components: ORDER.map((name) => ({ name })) })} */`;

const res = await esbuild.build({
  stdin: {
    contents: `import * as A from './index'; const w = window; w.Afterglow = Object.assign(w.Afterglow || {}, A);`,
    resolveDir: src,
    loader: 'ts',
  },
  bundle: true,
  format: 'iife',
  target: 'es2019',
  minify: true,
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  plugins: [globalReact],
  write: false,
  legalComments: 'none',
});
const js = res.outputFiles[0].text.trim();
if (/<\/script|<!--/i.test(js)) throw new Error('bundle contains </script or <!-- and could not be inlined');
writeFileSync(path.join(root, 'components/bundle.js'), header + '\n' + js + '\n');
console.log(`components/bundle.js written (${(js.length / 1024).toFixed(1)} KB)`);
