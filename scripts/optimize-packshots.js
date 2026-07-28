import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const IN = 'public/packshots';
const OUT = 'public/packshots';

const files = (await readdir(IN)).filter(f => f.endsWith('.png'));

for (const file of files) {
  const src = join(IN, file);
  const base = basename(file, extname(file));
  const dest = join(OUT, `${base}.webp`);

  const stats = await sharp(src)
    .resize(800, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);

  console.log(`✓ ${file} → ${base}.webp (${(stats.size / 1024).toFixed(1)} KB)`);
}
