import type { FastifyInstance } from "fastify";

export async function contactRoutes(app: FastifyInstance) {
    app.post("/contact", async (request, reply) => {
        reply.send({ ok: true });
    });
}
