export const ENDPOINTS = {
    auth: {
        login: "/auth/login",
        me: "/auth/me",
    },
    transacoes: {
        list: "/transacoes",
        create: "/transacoes",
        update: (id: string | number) => `/transacoes/${id}`,
        remove: (id: string | number) => `/transacoes/${id}`,
    },
} as const;
