import "@fastify/jwt";

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            cpf: string;
            name: string;
        };
    }
}
