import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { errorHandler } from "../utils/erros-handler";
import { routes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import path from "node:path";
import { env } from "../env";

const app = fastify({ logger: true });

const imagesFolder = path.join(__dirname, "../../uploads");
app.register(fastifyStatic, {
    root: imagesFolder, // Path to your uploads folder
    prefix: "/uploads/",
});

app.setErrorHandler(errorHandler);
app.register(fastifyJwt, {
    secret: String("secret"),
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
