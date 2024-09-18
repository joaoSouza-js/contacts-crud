import type { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import { appRoutes } from "./app.routes";

export async function routes(app: FastifyInstance) {
    app.register(authRoutes);
    app.register(appRoutes);
}
