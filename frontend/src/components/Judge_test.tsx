import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import submitCode from '../api/submitCode';

export const Judge_test = () => {
    const [language, setLanguage] = useState<string>("javascript");
    const [code, setCode] = useState<string>("// some comment");
    const [output, setOutput] = useState<string>("");
    const [input, setInput] = useState<string>("");

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    const handleCodeChange = (newValue: string | undefined) => {
        setCode(newValue || "");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = async () => {
        const result = await submitCode(language, code, input);
        setOutput(result);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="language-select" className="text-lg font-medium text-gray-700">
                    Choose Language:
                </label>
                <select
                    id="language-select"
                    value={language}
                    onChange={handleLanguageChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="javascript">JavaScript</option>
                </select>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </div>

            <div className="flex w-full h-[80vh]">
                <div className="w-3/4 pr-2">
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        onChange={handleCodeChange}
                        className="border border-gray-300 rounded-md"
                    />
                </div>
                <div className="w-1/4 pl-2 flex flex-col">
                    <div className="h-1/2 mb-4">
                        <label className="text-lg font-medium text-gray-700 mb-2 block">
                            Input
                        </label>
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            className="w-full h-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter input here..."
                        />
                    </div>
                    <div className="h-1/2 bg-white border border-gray-300 rounded-md p-4 overflow-y-auto">
                        <h2 className="text-lg font-semibold mb-2">Output</h2>
                        <pre className="text-gray-700 whitespace-pre-wrap">{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};
