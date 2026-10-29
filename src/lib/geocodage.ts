// Géocodage des points de vente au build, via la Base Adresse Nationale (gratuite, sans clé,
// couvre La Réunion, la Guyane, la Guadeloupe et la Martinique).
// Règle : une position saisie dans Decap est toujours prioritaire ; sinon on géocode l'adresse.
// Le build ne doit JAMAIS échouer à cause du géocodage : en cas de doute, avertissement dans le
// log de build (Cloudflare Pages → déploiement → Build log) et pas d'étoile sur la carte.

const API = 'https://api-adresse.data.gouv.fr/search/';
/** Résultat fiable : adresse trouvée au numéro avec un bon score. */
const SCORE_FIABLE = 0.8;
/**
 * En dessous, la BAN propose souvent une rue sans rapport dans la même commune
 * (ex. adresse inexistante → « Rue Sainte Suzanne », score 0,49) : traité comme « introuvable ».
 */
const SCORE_MINIMUM = 0.5;

export interface Position {
  lat: number;
  lng: number;
}

interface ReponseBan {
  features?: {
    geometry: { coordinates: [number, number] };
    properties: { label: string; score: number; type: string };
  }[];
}

const avertir = (message: string) => console.warn(`⚠️  [points de vente] ${message}`);

export async function geocoder(
  nom: string,
  adresse: string,
  codePostal: string,
  ville: string,
): Promise<Position | null> {
  const recherche = `${adresse} ${codePostal} ${ville}`;
  const url = `${API}?${new URLSearchParams({ q: recherche, postcode: codePostal, limit: '1' })}`;
  let reponse: ReponseBan;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    reponse = (await res.json()) as ReponseBan;
  } catch (e) {
    avertir(`« ${nom} » : géocodage impossible (API injoignable : ${(e as Error).message}). Pas d'étoile sur la carte.`);
    return null;
  }

  const resultat = reponse.features?.[0];
  if (!resultat || resultat.properties.score < SCORE_MINIMUM) {
    const trouve = resultat ? ` (meilleure proposition rejetée : « ${resultat.properties.label} », score ${resultat.properties.score.toFixed(2)})` : '';
    avertir(`« ${nom} » : adresse introuvable « ${recherche} »${trouve}. Pas d'étoile sur la carte — vérifier l'adresse ou placer le point à la main dans Decap.`);
    return null;
  }

  const { label, score, type } = resultat.properties;
  if (score < SCORE_FIABLE || type !== 'housenumber') {
    avertir(`« ${nom} » : position approximative — trouvé « ${label} » (${type === 'housenumber' ? 'numéro' : type === 'street' ? 'rue seulement' : type}, score ${score.toFixed(2)}). Vérifier sur la carte.`);
  }
  const [lng, lat] = resultat.geometry.coordinates;
  return { lat, lng };
}
