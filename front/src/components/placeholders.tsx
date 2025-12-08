"use client";

import { FiCopy, FiVolume2 } from "react-icons/fi";


interface inputProps {
    input: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleClear: () => void;
}

export function Input({ input, handleChange, handleClear }: inputProps) {
    return (
        <div className="relative">
            <textarea
                placeholder="ჩაწერეთ ქართულად აქ..."
                value={input}
                onChange={handleChange}
                className="w-full h-48 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-500 resize-none transition-all"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">{input.length}/500</div>
        </div>
    );
}

interface OutputProps {
    translated: string;
}

export function Output({ translated }: OutputProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(translated);
    };

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(translated);
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="relative">
            <div
                id="translated-output"
                className="w-full h-48 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white overflow-y-auto whitespace-pre-wrap"
            >
                {translated || <span className="text-gray-500">თარგმანი აქ გამოჩნდება</span>}
            </div>
            {translated && (
                <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                        onClick={handleSpeak}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
                        title="Speak"
                    >
                        <FiVolume2 size={16} />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
                        title="Copy"
                    >
                        <FiCopy size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}