// Cloudflare Pages Function — POST /api/geo
// Renvoie le pays du visiteur déduit de son IP par Cloudflare (request.cf.country),
// utilisé par /ou-nous-trouver pour ouvrir directement le bon territoire.
// Aucune donnée n'est stockée ni journalisée.
// POST et non GET : la règle de cache du domaine met en cache les GET (même avec no-store),
// ce qui servirait le pays d'un visiteur à un autre. Cloudflare ne met jamais un POST en cache.

interface RequeteCloudflare extends Request {
  cf?: { country?: string };
}

export const onRequestPost = ({ request }: { request: RequeteCloudflare }): Response =>
  new Response(JSON.stringify({ country: request.cf?.country ?? null }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
