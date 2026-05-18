// Minimal HS256 JWT signer. The Auth service is the ONLY token issuer.
// The secret + iss MUST match Kong's jwt_secrets in docker/kong/kong.yml,
// otherwise Kong's jwt plugin rejects the token at the edge.
import { createHmac } from 'crypto';

// Same default as scripts/mint-token.sh and kong.yml.
export const JWT_SECRET =
  process.env.JWT_SECRET || 'mis-poc-dev-secret-change-me';
export const JWT_ISSUER = 'mis-auth'; // == jwt_secrets[].key in kong.yml

const b64url = (b: Buffer | string) =>
  Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export interface TokenClaims {
  sub: string;
  name: string;
  email: string;
  roles: string[];
}

export function signJwt(claims: TokenClaims, ttlSeconds = 3600): string {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = b64url(
    JSON.stringify({
      iss: JWT_ISSUER,
      ...claims,
      iat: now,
      exp: now + ttlSeconds,
    }),
  );
  const sig = b64url(
    createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest(),
  );
  return `${header}.${payload}.${sig}`;
}
