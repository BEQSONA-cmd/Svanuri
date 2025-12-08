"use client";

import { Input, Output } from "@/components/placeholders";
import { useState, useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_HOST;

const TranslateLanguages = {
    ge: "Georgian",
    en: "English",
};

async function getTranslated(input: string, from: string, to: string) {
    try {
        const response = await axios.post(
            `${HOST}/api/translate`,
            { text: input, from, to },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data.translatedText;
    } catch (error) {
        toast.error("Translation failed. Please try again.");
        return "";
    }
}

export default function Home() {
    const [input, setInput] = useState("");
    const [translated, setTranslated] = useState("");
    const [inputLanguage, setInputLanguage] = useState(TranslateLanguages.ge);
    const [outputLanguage, setOutputLanguage] = useState(TranslateLanguages.en);

    useEffect(() => {
        if (!input) {
            setTranslated("");
            return;
        }

        const timeout = setTimeout(async () => {
            const translatedText = await getTranslated(
                input,
                inputLanguage,
                outputLanguage
            );
            setTranslated(translatedText);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [input, inputLanguage, outputLanguage]);

    const handleChange = (e: any) => {
        setInput(e.target.value);
    };

    const handleClear = () => {
        setInput("");
        setTranslated("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8">
            <div className="w-full max-w-3xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-white">
                    Translate
                </h1>

                <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-200 text-center text-sm">
                        <strong>Note:</strong> This tool translates Georgian text to English
                        and vice versa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <select
                                id="input-language"
                                value={inputLanguage}
                                onChange={(e) => setInputLanguage(e.target.value)}
                                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 text-white"
                            >
                                {Object.entries(TranslateLanguages).map(([key, value]) => (
                                    <option key={key} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleClear}
                                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
                            >
                                გასუფთავება <FaDeleteLeft size={14} />
                            </button>
                        </div>

                        <Input input={input} handleChange={handleChange} handleClear={handleClear} />
                    </div>

                    <div className="space-y-2">
                        <select
                            id="output-language"
                            value={outputLanguage}
                            onChange={(e) => setOutputLanguage(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 text-white"
                        >
                            {Object.entries(TranslateLanguages).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>

                        <Output translated={translated} />
                    </div>
                </div>
            </div>
        </div>
    );
}
