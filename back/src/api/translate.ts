import { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";

const dictionaryPath = path.join(__dirname, "../../data.json");
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, "utf8"));

export default async function translateRoutes(fastify: FastifyInstance) {
    fastify.post("/api/translate", async (req, res) => {
        try {
            const { text, from, to } = req.body as {
                text: string;
                from: string;
                to: string;
            };

            const translated = translateText(text.toLowerCase());

            return res.send({ translatedText: translated });
        } catch (error) {
            console.error(error);
            return res.code(500).send({ message: "Internal Server Error" });
        }
    });
}

function translateText(text: string) {
    const words = text.split(/\s+/);

    const translatedWords: string[] = [];

    for (let i = 0; i < words.length; i++) {
        let foundPhrase = false;

        for (let len = 3; len >= 1; len--) {
            const slice = words.slice(i, i + len).join(" ");

            if (dictionary[slice]) {
                translatedWords.push(dictionary[slice]);
                i += len - 1;
                foundPhrase = true;
                break;
            }
        }

        if (!foundPhrase) {
            translatedWords.push(words[i]);
        }
    }

    return translatedWords.join(" ");
}
