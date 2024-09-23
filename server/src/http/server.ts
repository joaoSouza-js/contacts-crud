import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { errorHandler } from "../utils/erros-handler";
import { routes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import { env } from "../env";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { uploadsFolderPath } from "../utils/uploads-folder-path";

const app = fastify({ logger: true });

app.register(fastifyStatic, {
    root: uploadsFolderPath, // Path to your uploads folder
    prefix: "/uploads/",
});

app.register(fastifySwagger, {
    swagger: {
        info: {
            title: "Contacts API",
            description: "API to manage contacts",
            version: "0.1.0",
            contact: {
                name: "João Souza",
                email: "joaosouzabn.js@gmail.com",
                url: "https://portifolio-lake-alpha.vercel.app/about",
            },
        },

        consumes: ["application/json"],
        produces: ["application/json"],
    },
});
app.register(fastifySwaggerUi, {
    prefix: "/docs",
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
