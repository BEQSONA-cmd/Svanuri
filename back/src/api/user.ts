import { FastifyInstance } from "fastify";
import User from "../data/models/user";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/api/user/:id", async (req, res) => {
        const { id } = req.params as { id: string };

        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return res.code(401).send({ message: "Invalid Token" });
            }

            return res.send({ user: user });
        } catch {
            return res.code(401).send({ message: "Invalid Token" });
        }
    });
}
