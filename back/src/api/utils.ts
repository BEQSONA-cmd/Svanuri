import fs from "fs";
import path from "path";

const DATA_DIR = path.join(__dirname, "../data/");

function readLines(file: string): string[] {
    if (!fs.existsSync(file)) return [];
    return fs.readFileSync(file, "utf-8").split("\n").map(l => l.trim());
}

function writeLines(file: string, lines: string[]) {
    fs.writeFileSync(file, lines.join("\n"), "utf-8");
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

export async function translateWord(from: string, to: string, word: string): Promise<TranslateResult> {
    const sourceFile = path.join(DATA_DIR, `translation.${from}`);
    const targetFile = path.join(DATA_DIR, `translation.${to}`);

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

export async function translate(from: string, to: string, text: string): Promise<TranslateResult> {
    return translateWord(from, to, text);
}

export async function findWords(from: string, text: string): Promise<string[]> {
    const sourceFile = path.join(DATA_DIR, `translation.${from}`);
    const sourceLines = readLines(sourceFile);

    const matchedWords = sourceLines.filter(word =>
        word.toLowerCase().includes(text.toLowerCase())
    );

    return matchedWords;
}

export async function addTranslation(to: string, index: number, translation: string): Promise<void> {
    const targetFile = path.join(DATA_DIR, `translation.${to}`);
    const targetLines = readLines(targetFile);

    while (targetLines.length <= index) {
        targetLines.push("");
    }

    targetLines[index] = translation;
    writeLines(targetFile, targetLines);
}
