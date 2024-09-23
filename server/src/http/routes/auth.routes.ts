import type { FastifyInstance } from "fastify";
import { signInRestController } from "../controller/auth/sign-in";
import { swaggerSignInBodySchema } from "../validation/sign-in-body-schema";
import { signUpRestController } from "../controller/auth/sign-up";
import { swaggerSignUpBodySchema } from "../validation/sign-up-body-schema";

export async function authRoutes(app: FastifyInstance) {
    app.post(
        "/sign-in",
        {
            schema: {
                tags: ["Auth"],
                summary: "Authenticate a user",
                description: "route to authenticate a user",
                body: {
                    type: "object",
                    properties: swaggerSignInBodySchema,
                },
            },
        },
        async (request, reply) => signInRestController(request, reply, app)
    );

    app.post(
        "/signup",
        {
            schema: {
                tags: ["Auth"],
                summary: "Create a new user",
                description: "route to create a new user",
                body: {
                    type: "object",
                    properties: swaggerSignUpBodySchema,
                },
            },
        },
        signUpRestController
    );
}
