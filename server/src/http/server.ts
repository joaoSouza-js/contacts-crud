import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { errorHandler } from "../utils/erros-handler";
import { routes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import { env } from "../env";
import { uploadsFolderPath } from "../utils/uploads-folder-path";

const app = fastify({ logger: true });

app.register(fastifyStatic, {
    root: uploadsFolderPath, // Path to your uploads folder
    prefix: "/uploads/",
});

app.setErrorHandler(errorHandler);
app.register(fastifyJwt, {
    secret: String(env.JWT_SECRET),
});

app.register(fastifyMultipart);
app.register(cors, {
    origin: true,
});

app.register(routes, { prefix: "/api" });
app.listen({
    port: env.PORT,
})
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .then(() => {
        console.log(`Server listening http://localhost:${env.PORT}`);
    });
