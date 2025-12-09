import { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";

const ge_en = path.join(__dirname, "../../ge-en.json");
const en_ge = path.join(__dirname, "../../en-ge.json");

const dictionary_ge_en = JSON.parse(fs.readFileSync(ge_en, "utf8"));
const dictionary_en_ge = JSON.parse(fs.readFileSync(en_ge, "utf8"));

export default async function translateRoutes(fastify: FastifyInstance) {
    fastify.post("/api/translate", async (req, res) => {
        try {
            const { text, from, to } = req.body as {
                text: string;
                from: string;
                to: string;
            };

            const translated = translateText(text.toLowerCase(), from, to);

            return res.send({ translatedText: translated });
        } catch (error) {
            console.error(error);
            return res.code(500).send({ message: "Internal Server Error" });
        }
    });
}

function translateText(text: string, from: string, to: string): string {
    const words = text.split(/\s+/);

    const translatedWords: string[] = [];
    let dictionary: { [key: string]: string } = {};
    console.log(from, to);
    if (from === "Georgian" && to === "English") {
        dictionary = dictionary_ge_en;
    } else if (from === "English" && to === "Georgian") {
        dictionary = dictionary_en_ge;
    } else {
        return text;
    }


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
