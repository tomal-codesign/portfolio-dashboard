export interface RolesResponse {
    message: string;
    roles: Roles[];
}
export interface Roles {
    id: number;
    name: string;
}