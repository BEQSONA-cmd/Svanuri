import fs from "fs";
import path from "path";

const DATA_DIR = path.join(__dirname, "../data/");

function readLines(file: string): string[] {
    if (!fs.existsSync(file)) return [];
    return fs.readFileSync(file, "utf-8").split("\n").map(l => l.trim());
}

export enum TranslateStatus {
    Success = 0,
    Missing = 1,
    NotFound = 2
}

interface TranslateResult {
    translatedText: string;
    status: TranslateStatus;
    index?: number;
}

async function translateWord(from: string, to: string, word: string): Promise<TranslateResult> {
    const sourceFile = path.join(DATA_DIR, `words.${from}`);
    const targetFile = path.join(DATA_DIR, `words.${to}`);

    const sourceLines = readLines(sourceFile);
    const targetLines = readLines(targetFile);

    const index = sourceLines.findIndex(
        w => w.toLowerCase() === word.toLowerCase()
    );

    if (index === -1) {
        return { translatedText: "", status: TranslateStatus.NotFound };
    }

    if (targetLines[index]) {
        return {
            translatedText: targetLines[index],
            status: TranslateStatus.Success
        };
    }

    return {
        translatedText: "",
        status: TranslateStatus.Missing,
        index
    };
}

async function translateSentence(from: string, to: string, sentence: string): Promise<TranslateResult> {
    return translateWord(from, to, sentence);
}

export async function translate(from: string, to: string, text: string): Promise<TranslateResult> {
    if (!text.includes(" ")) {
        return translateWord(from, to, text);
    }

    const sentenceResult = await translateSentence(from, to, text);
    return sentenceResult;
}