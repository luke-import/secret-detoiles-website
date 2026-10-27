// Cloudflare Pages Function — GET /api/geo
// Renvoie le pays du visiteur déduit de son IP par Cloudflare (request.cf.country),
// utilisé par /ou-nous-trouver pour ouvrir directement le bon territoire.
// Aucune donnée n'est stockée ni journalisée.

interface RequeteCloudflare extends Request {
  cf?: { country?: string };
}

export const onRequestGet = ({ request }: { request: RequeteCloudflare }): Response =>
  new Response(JSON.stringify({ country: request.cf?.country ?? null }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
