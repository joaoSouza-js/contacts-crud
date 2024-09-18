import type { FastifyInstance } from "fastify";
import z from "zod";
import { confirmUserCredentials } from "../../functions/confirm-user-credential";
import { createAccount } from "../../functions/create-account";

const sigInSchema = z.object({
    cpf: z.string(),
    password: z.string(),
});

const signUpSchema = z.object({
    cpf: z.string(),
    password: z.string(),
    name: z.string(),
});

export async function authRoutes(app: FastifyInstance) {
    app.post("/signin", async (request, reply) => {
        const { cpf, password } = sigInSchema.parse(request.body);
        const { cpfCleaned, name } = await confirmUserCredentials({
            cpf,
            password,
        });
        const token = app.jwt.sign(
            { cpf: cpfCleaned, name },
            { sub: cpf, expiresIn: 60 * 60 * 2 }
        ); // 2 hours
        reply.status(201).send({ token });
    });

    app.post("/signup", async (request, reply) => {
        const { cpf, password, name } = signUpSchema.parse(request.body);
        await createAccount({ cpf, password, name });
        reply.status(201);
    });
}
