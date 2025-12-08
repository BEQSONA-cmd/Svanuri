import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import User from "../data/models/user";

export default async function registerRoutes(fastify: FastifyInstance) {
    fastify.post("/api/register", async (req, res) => {
        const username: string = "testUser";
        const password: string = "testPassword";

        try {
            const existingUser = await User.findOne({ where: { username } });

            if (existingUser !== null) {
                return res.code(400).send({ message: "Username already exists" });
            }

            const hashedPassword = bcrypt.hashSync(password, 10);

            await User.create({
                username,
                password: hashedPassword,
            });

            return res.send({ message: "Registration successful" });
        } catch (error) {
            console.error(error);
            return res.code(500).send({ message: "Internal Server Error" });
        }
    });
}
