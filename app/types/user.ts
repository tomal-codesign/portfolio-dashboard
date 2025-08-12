
export interface userResponse {
    message: string;
    users: User[];
}
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    profileImg: string;
    roleId: number;
    roleName: string;
}