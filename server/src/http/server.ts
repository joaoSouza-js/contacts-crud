import fastify from "fastify";
import cors from "@fastify/cors";
import { errorHandler } from "../utils/erros-handler";
import { routes } from "./routes";
import fastifyJwt from "@fastify/jwt";

const app = fastify({ logger: true });

app.setErrorHandler(errorHandler);
app.register(fastifyJwt, {
    secret: String("secret"),
});

app.register(cors, {
    origin: true,
});

app.register(routes, { prefix: "/api" });
app.listen({
    port: 3000,
})
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .then(() => {
        console.log("Server listening http://localhost:3000");
    });
