export declare const JWT_SECRET: string;
export declare const JWT_ISSUER = "mis-auth";
export interface TokenClaims {
    sub: string;
    name: string;
    email: string;
    roles: string[];
}
export declare function signJwt(claims: TokenClaims, ttlSeconds?: number): string;
