import fastify from "fastify";
import cors from "@fastify/cors";
import { errorHandler } from "../utils/erros-handler";

import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";



const app = fastify().withTypeProvider<ZodTypeProvider>();


app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);
app.register(routes);


app.register(cors, {
	origin: true,
});







app.listen({
    port: 3000
}).catch((err) => {
    console.error(err)
    process.exit(1)
}).then(() => {
    console.log("Server listening http://localhost:3000")
})