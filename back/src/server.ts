import Fastify from "fastify";
import cors from "@fastify/cors";
import translateRoutes from "./api/translate";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify();

const HOST: string = process.env.HOST as string;

fastify.register(cors, {
    origin: HOST,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});

fastify.register(translateRoutes);


const startServer = async () => {
    try {
        await fastify.listen({ port: 8080, host: "0.0.0.0" });
        console.log("Fastify server is running on https://localhost:8080");
    } catch (err) {
        fastify.log.error(err);
        console.log(err);
        process.exit(1);
    }
};

startServer();
