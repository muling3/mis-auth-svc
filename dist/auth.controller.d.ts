interface LoginDto {
    usernameOrEmail?: string;
    password?: string;
}
export declare class AuthController {
    login(body: LoginDto): {
        access_token: string;
        token_type: string;
        expires_in: number;
        user: {
            id: string;
            name: string;
            email: string;
            roles: string[];
        };
    };
}
export {};
