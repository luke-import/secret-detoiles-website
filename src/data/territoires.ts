// Territoires couverts par la page « Où nous trouver ».
// Couleurs = tokens existants (src/styles/tokens.css), jamais de hex ici.
// Les points de vente eux-mêmes sont éditables dans Decap : src/content/points-de-vente.yaml.

export type TerritoireId = 'reunion' | 'guadeloupe' | 'martinique';

export type TypePointDeVente = 'pharmacie' | 'parapharmacie' | 'grande-surface' | 'supermarche';

export interface Territoire {
  id: TerritoireId;
  nom: string;
  /** Préposition + nom, pour les phrases : « à La Réunion », « en Guadeloupe »… */
  prep: string;
  /** Indicatif téléphonique international, pour les liens tel: (ex. « 02 62… » → tel:+262262…). */
  indicatif: string;
  region: string;
  /** Nom du token couleur, ex. 'blue-sky' → var(--color-blue-sky) / var(--tint-blue-sky). */
  couleur: 'blue-sky' | 'mint' | 'star' | 'coral';
  center: [number, number];
  zoom: number;
  /**
   * Fond de carte Protomaps : emprise extraite [ouest, sud, est, nord] et zoom max des tuiles.
   * Doit rester identique à scripts/cartes-tuiles.js.
   */
  carte: {
    bbox: [number, number, number, number];
    maxzoom: number;
  };
}

export interface PointDeVente {
  id: string;
  territoire: TerritoireId;
  nom: string;
  type: TypePointDeVente;
  adresse: string;
  codePostal: string;
  ville: string;
  /** null : adresse introuvable au géocodage → visible dans la liste, sans étoile sur la carte. */
  lat: number | null;
  lng: number | null;
  telephone?: string;
  horaires?: string;
}

export const TERRITOIRES: Territoire[] = [
  { id: 'reunion', nom: 'La Réunion', prep: 'à La Réunion', indicatif: '+262', region: 'Océan Indien', couleur: 'blue-sky', center: [-21.13, 55.53], zoom: 10, carte: { bbox: [55.2, -21.42, 55.85, -20.85], maxzoom: 15 } },
  { id: 'guadeloupe', nom: 'La Guadeloupe', prep: 'en Guadeloupe', indicatif: '+590', region: 'Antilles', couleur: 'star', center: [16.17, -61.55], zoom: 10, carte: { bbox: [-61.85, 15.8, -60.95, 16.55], maxzoom: 15 } },
  { id: 'martinique', nom: 'La Martinique', prep: 'en Martinique', indicatif: '+596', region: 'Antilles', couleur: 'coral', center: [14.64, -61.02], zoom: 10, carte: { bbox: [-61.25, 14.38, -60.8, 14.9], maxzoom: 15 } },
];

/**
 * Dossier des fonds de carte (public/cartes/<version>/<id>/{z}/{x}/{y}.pbf) = date du build Protomaps.
 * Changer de dossier à chaque mise à jour : les fichiers sont servis en cache « immutable » 1 an.
 */
export const CARTES_VERSION = '20261027';

export const TERRITOIRE_IDS = TERRITOIRES.map((t) => t.id) as [TerritoireId, ...TerritoireId[]];

export const TYPES_POINT_DE_VENTE: Record<TypePointDeVente, string> = {
  pharmacie: 'Pharmacie',
  parapharmacie: 'Parapharmacie',
  'grande-surface': 'Grande surface',
  supermarche: 'Supermarché',
};

/** Code pays Cloudflare (ISO 3166-1) → territoire ouvert automatiquement. */
export const PAYS_VERS_TERRITOIRE: Record<string, TerritoireId> = {
  RE: 'reunion',
  GP: 'guadeloupe',
  MQ: 'martinique',
};

/** Numéro affiché → lien tel: international (« 02 62 50 10 89 » → « tel:+262262501089 »). */
export function telInternational(tel: string, indicatif: string): string {
  const chiffres = tel.replace(/\D/g, '');
  if (tel.trim().startsWith('+')) return `tel:+${chiffres}`;
  return `tel:${indicatif}${chiffres.replace(/^0/, '')}`;
}

export function libellePointsDeVente(n: number): string {
  return `${n} point${n > 1 ? 's' : ''} de vente`;
}
