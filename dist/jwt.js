"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_ISSUER = exports.JWT_SECRET = void 0;
exports.signJwt = signJwt;
// Minimal HS256 JWT signer. The Auth service is the ONLY token issuer.
// The secret + iss MUST match Kong's jwt_secrets in docker/kong/kong.yml,
// otherwise Kong's jwt plugin rejects the token at the edge.
const crypto_1 = require("crypto");
// Same default as scripts/mint-token.sh and kong.yml.
exports.JWT_SECRET = process.env.JWT_SECRET || 'mis-poc-dev-secret-change-me';
exports.JWT_ISSUER = 'mis-auth'; // == jwt_secrets[].key in kong.yml
const b64url = (b) => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
function signJwt(claims, ttlSeconds = 3600) {
    const now = Math.floor(Date.now() / 1000);
    const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = b64url(JSON.stringify({
        iss: exports.JWT_ISSUER,
        ...claims,
        iat: now,
        exp: now + ttlSeconds,
    }));
    const sig = b64url((0, crypto_1.createHmac)('sha256', exports.JWT_SECRET).update(`${header}.${payload}`).digest());
    return `${header}.${payload}.${sig}`;
}
//# sourceMappingURL=jwt.js.map