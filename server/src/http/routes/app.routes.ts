import type { FastifyInstance } from "fastify";
import { AuthErrorRequest } from "../../.error/AuthRequest";
import { contactRoutes } from "./contact.routes";

export async function appRoutes(app: FastifyInstance) {
    app.addHook("preHandler", async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            throw new AuthErrorRequest(error);
        }
    });

    app.register(contactRoutes);
}
