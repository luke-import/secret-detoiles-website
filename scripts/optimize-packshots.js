import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

// Les PNG sources (3000×3000) vivent hors de public/ (non publiés).
// public/packshots/ ne contient que les WebP générés ci-dessous.
const IN = 'design-sources/packshots';
const OUT = 'public/packshots';

// Chaque PNG source produit 2 WebP :
//   - taille-X.webp        (800px)  → vignettes de la grille / page La gamme
//   - taille-X-large.webp  (1200px) → packshot du hero (page d'accueil)
const VARIANTS = [
  { suffix: '', width: 800 },
  { suffix: '-large', width: 1200 },
];

const files = (await readdir(IN)).filter(f => f.endsWith('.png'));

for (const file of files) {
  const src = join(IN, file);
  const base = basename(file, extname(file));

  for (const { suffix, width } of VARIANTS) {
    const name = `${base}${suffix}.webp`;
    const stats = await sharp(src)
      .resize(width, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(OUT, name));

    console.log(`✓ ${file} → ${name} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
}
