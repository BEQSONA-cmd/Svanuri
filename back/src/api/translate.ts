import { FastifyInstance } from "fastify";
import { addTranslation, findWords, translate } from "./utils";
export default async function translateRoutes(fastify: FastifyInstance) {

    fastify.get("/api/find-words", async (req, res) => {
        const { text, from } = req.query as { text: string; from: string };
        const result = await findWords(from, text);
        return res.send({ words: result });
    });


    fastify.post("/api/translate", async (req, res) => {
        const { text, from, to } = req.body as {
            text: string;
            from: string;
            to: string;
        };
        const result = await translate(from, to, text);
        return res.send(result);
    });

    fastify.post("/api/add-translation", async (req, res) => {
        const { index, translation, to } = req.body as {
            index: number;
            translation: string;
            to: string;
        };
        await addTranslation(to, index, translation);
        return res.send({ success: true });
    });
}

