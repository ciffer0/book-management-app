export interface SignupParams {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface SigninParams {
    email: string;
    password: string;
}

export interface UserInfo {
    id: number;
    email: string;
    iat: number;
    exp: number;
}