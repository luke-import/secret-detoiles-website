import { createRequire } from 'node:module';
import { open, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

// Convertit les extraits Protomaps (.pmtiles, hors de public/) en tuiles statiques
// public/cartes/<version>/<territoire>/{z}/{x}/{y}.pbf.
// Pourquoi : Cloudflare Pages ne gère pas les requêtes Range, indispensables pour lire un .pmtiles.
// Usage : pnpm cartes:tuiles <AAAAMMJJ> <dossier des .pmtiles>   (voir CLAUDE.md §12)

// Même emprise et zoom max que src/data/territoires.ts (limite Cloudflare : 20 000 fichiers par déploiement).
const TERRITOIRES = {
  reunion: { bbox: [55.2, -21.42, 55.85, -20.85], maxzoom: 15 },
  guyane: { bbox: [-54.65, 2.1, -51.6, 5.8], maxzoom: 12 },
  guadeloupe: { bbox: [-61.85, 15.8, -60.95, 16.55], maxzoom: 15 },
  martinique: { bbox: [-61.25, 14.38, -60.8, 14.9], maxzoom: 15 },
};

const [version, dossierPmtiles] = process.argv.slice(2);
if (!/^\d{8}$/.test(version ?? '') || !dossierPmtiles) {
  console.error('Usage : pnpm cartes:tuiles <AAAAMMJJ> <dossier contenant reunion.pmtiles, guyane.pmtiles…>');
  process.exit(1);
}

// La bibliothèque pmtiles est déjà installée comme dépendance de protomaps-leaflet.
const require = createRequire(import.meta.url);
const { PMTiles } = createRequire(require.resolve('protomaps-leaflet'))('pmtiles');

const lon2x = (lon, z) => Math.floor(((lon + 180) / 360) * 2 ** z);
const lat2y = (lat, z) => {
  const r = (lat * Math.PI) / 180;
  return Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z);
};

let totalFichiers = 0;
for (const [id, { bbox, maxzoom }] of Object.entries(TERRITOIRES)) {
  const [ouest, sud, est, nord] = bbox;
  const fd = await open(join(dossierPmtiles, `${id}.pmtiles`), 'r');
  const pm = new PMTiles({
    getKey: () => id,
    getBytes: async (offset, length) => {
      const buf = Buffer.alloc(length);
      await fd.read(buf, 0, length, offset);
      return { data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + length) };
    },
  });
  const sortie = join('public/cartes', version, id);
  await rm(sortie, { recursive: true, force: true });
  let fichiers = 0;
  let octets = 0;
  for (let z = 0; z <= maxzoom; z++) {
    for (let x = lon2x(ouest, z); x <= lon2x(est, z); x++) {
      for (let y = lat2y(nord, z); y <= lat2y(sud, z); y++) {
        const tuile = await pm.getZxy(z, x, y); // données décompressées
        if (!tuile?.data) continue;
        await mkdir(join(sortie, String(z), String(x)), { recursive: true });
        await writeFile(join(sortie, String(z), String(x), `${y}.pbf`), Buffer.from(tuile.data));
        fichiers++;
        octets += tuile.data.byteLength;
      }
    }
  }
  await fd.close();
  totalFichiers += fichiers;
  console.log(`${id.padEnd(11)} z0–${maxzoom} : ${fichiers} fichiers, ${(octets / 1048576).toFixed(1)} Mo`);
}
console.log(`Total : ${totalFichiers} fichiers (limite Cloudflare Pages : 20 000 pour tout le site)`);
