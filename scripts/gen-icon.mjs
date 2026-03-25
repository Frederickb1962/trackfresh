import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = (f) => join(__dirname, '../public', f);

const svgFull   = readFileSync(pub('icon.svg'), 'utf8');
const svgSimple = readFileSync(pub('icon-simple.svg'), 'utf8');

function render(svg, width) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

// New v2 files (force iOS cache bust via new filenames)
const png180 = render(svgSimple, 180);
const png192 = render(svgSimple, 192);
const png512 = render(svgFull,   512);
const png16  = render(svgSimple,  16);
const png32  = render(svgSimple,  32);
const png48  = render(svgSimple,  48);

writeFileSync(pub('touch-icon-v2.png'), png180);
writeFileSync(pub('icon-192-v2.png'),   png192);
writeFileSync(pub('icon-512-v2.png'),   png512);

const ico = await pngToIco([png16, png32, png48]);
writeFileSync(pub('favicon-v2.ico'), ico);

console.log('touch-icon-v2.png:', png180.length, 'bytes');
console.log('icon-192-v2.png:',   png192.length, 'bytes');
console.log('icon-512-v2.png:',   png512.length, 'bytes');
console.log('favicon-v2.ico:',    ico.length,    'bytes');

// Keep App Store master
writeFileSync(pub('icon-1024.png'), render(svgFull, 1024));
console.log('icon-1024.png: generated');

// Delete old filenames
const old = [
  'favicon.ico', 'apple-touch-icon.png', 'apple-touch-icon-precomposed.png',
  'apple-touch-icon-v2.png', 'icon-192.png', 'icon-512.png', 'icon.png',
];
for (const f of old) {
  try { unlinkSync(pub(f)); console.log('deleted:', f); } catch (_) {}
}
