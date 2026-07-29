import sharp from 'sharp';

const SRC = 'public/uploads/maman-bebe.png';
const OUT = 'public/uploads/maman-bebe.webp';

const stats = await sharp(SRC)
  .resize(1000, null, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(OUT);

console.log(`✓ ${SRC} → ${OUT} (${(stats.size / 1024).toFixed(1)} KB)`);
