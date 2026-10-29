import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TERRITOIRE_IDS } from './data/territoires';

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/pages' }),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }).passthrough(),
});

// Champ optionnel saisi dans Decap : vide, null ou espaces → absent.
const texteOptionnel = z
  .string()
  .nullish()
  .transform((v) => v?.trim() || undefined);

// Le widget « map » de Decap enregistre une chaîne GeoJSON :
// '{"type":"Point","coordinates":[lng, lat]}'.
const positionSchema = z.string().transform((val, ctx) => {
  try {
    const geo: unknown = JSON.parse(val);
    if (
      typeof geo === 'object' && geo !== null &&
      'coordinates' in geo && Array.isArray(geo.coordinates)
    ) {
      const [lng, lat] = geo.coordinates as unknown[];
      if (typeof lat === 'number' && typeof lng === 'number') return { lat, lng };
    }
  } catch {
    // traité ci-dessous
  }
  ctx.addIssue({ code: 'custom', message: `Position invalide (GeoJSON Point attendu) : ${val}` });
  return z.NEVER;
});

// Points de vente de la page « Où nous trouver », éditables dans Decap.
const pointsDeVente = defineCollection({
  loader: glob({ pattern: 'points-de-vente.yaml', base: './src/content' }),
  schema: z.object({
    points: z.array(
      z.object({
        territoire: z.enum(TERRITOIRE_IDS),
        nom: z.string(),
        type: z.enum(['pharmacie', 'parapharmacie', 'grande-surface', 'supermarche']),
        adresse: z.string(),
        codePostal: z.coerce.string(),
        ville: z.string(),
        telephone: texteOptionnel,
        horaires: texteOptionnel,
        // Facultative : vide → géocodage automatique de l'adresse au build (src/lib/geocodage.ts).
        position: z.preprocess((v) => (v === '' || v === null ? undefined : v), positionSchema.optional()),
      }),
    ),
  }),
});

export const collections = { pages, pointsDeVente };
