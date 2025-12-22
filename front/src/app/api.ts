import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_HOST;

export async function getWords(input: string, from: string) {
    const response = await axios.get(
        `${HOST}/api/find-words`,
        { params: { text: input, from } }
    );
    return response.data;
}

export async function getTranslated(input: string, from: string, to: string) {
    const response = await axios.post(
        `${HOST}/api/translate`,
        { text: input, from, to },
        { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
}

export async function addTranslation(index: number, translation: string, to: string) {
    const response = await axios.post(
        `${HOST}/api/add-translation`,
        { index, translation, to },
        { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
}
