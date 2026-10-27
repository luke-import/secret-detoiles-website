// Territoires couverts par la page « Où nous trouver ».
// Couleurs = tokens existants (src/styles/tokens.css), jamais de hex ici.
// Les points de vente eux-mêmes sont éditables dans Decap : src/content/points-de-vente.yaml.

export type TerritoireId = 'reunion' | 'guyane' | 'guadeloupe' | 'martinique';

export type TypePointDeVente = 'pharmacie' | 'parapharmacie' | 'grande-surface' | 'supermarche';

export interface Territoire {
  id: TerritoireId;
  nom: string;
  region: string;
  /** Nom du token couleur, ex. 'blue-sky' → var(--color-blue-sky) / var(--tint-blue-sky). */
  couleur: 'blue-sky' | 'mint' | 'star' | 'coral';
  center: [number, number];
  zoom: number;
}

export interface PointDeVente {
  id: string;
  territoire: TerritoireId;
  nom: string;
  type: TypePointDeVente;
  adresse: string;
  codePostal: string;
  ville: string;
  lat: number;
  lng: number;
  telephone?: string;
  horaires?: string;
}

export const TERRITOIRES: Territoire[] = [
  { id: 'reunion', nom: 'La Réunion', region: 'Océan Indien', couleur: 'blue-sky', center: [-21.13, 55.53], zoom: 10 },
  { id: 'guyane', nom: 'La Guyane', region: 'Amérique du Sud', couleur: 'mint', center: [4.6, -52.9], zoom: 8 },
  { id: 'guadeloupe', nom: 'La Guadeloupe', region: 'Antilles', couleur: 'star', center: [16.17, -61.55], zoom: 10 },
  { id: 'martinique', nom: 'La Martinique', region: 'Antilles', couleur: 'coral', center: [14.64, -61.02], zoom: 10 },
];

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
  GF: 'guyane',
  GP: 'guadeloupe',
  MQ: 'martinique',
};

export function libellePointsDeVente(n: number): string {
  return `${n} point${n > 1 ? 's' : ''} de vente`;
}
