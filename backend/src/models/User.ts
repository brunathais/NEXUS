export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // ⚠️ em produção, nunca salve senhas assim! // In a real application, ensure to hash the password before saving
}