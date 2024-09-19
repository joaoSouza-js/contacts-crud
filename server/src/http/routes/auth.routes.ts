import type { FastifyInstance } from "fastify";
import z from "zod";
import { confirmUserCredentials } from "../../functions/confirm-user-credential";
import { createAccount } from "../../functions/create-account";

const sigInBodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
});

const signUpBodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
    name: z.string(),
});

export async function authRoutes(app: FastifyInstance) {
    app.post("/sign-in", async (request, reply) => {
        const { cpf, password } = sigInBodySchema.parse(request.body);
        const { user } = await confirmUserCredentials({
            cpf,
            password,
        });
        const token = app.jwt.sign(
            { name: user.name },
            { sub: user.id, expiresIn: 60 * 60 * 2 }
        ); // 2 hours
        reply.status(201).send({ token, user });
    });

    app.post("/signup", async (request, reply) => {
        const { cpf, password, name } = signUpBodySchema.parse(request.body);
        await createAccount({ cpf, password, name });
        reply.status(201);
    });
}
