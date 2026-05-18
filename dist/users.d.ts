export interface DemoUser {
    id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    roles: string[];
}
export declare const USERS: DemoUser[];
export declare function findUser(usernameOrEmail: string, password: string): DemoUser | undefined;
