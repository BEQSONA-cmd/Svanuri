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
export async function findWords(from: string, text: string): Promise<string[]> {
    const sourceFile = path.join(DATA_DIR, `words.${from}`);
    const sourceLines = readLines(sourceFile);

    const matchedWords = sourceLines.filter(word =>
        word.toLowerCase().includes(text.toLowerCase())
    );

    return matchedWords;
}

export async function addTranslation(to: string, index: number, translation: string): Promise<void> {
    const targetFile = path.join(DATA_DIR, `words.${to}`);
    const targetLines = readLines(targetFile);

    while (targetLines.length <= index) {
        targetLines.push("");
    }

    targetLines[index] = translation;
    writeLines(targetFile, targetLines);
}
