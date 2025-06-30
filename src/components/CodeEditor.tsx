import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
    onRun: () => Promise<void>;
}

export default function CodeEditor({ code, setCode, onRun }: CodeEditorProps) {
    const [isRunning, setIsRunning] = useState(false);
    const editorRef = useRef<any>(null);

    useEffect(() => {
        // Sicherstellen, dass Monaco global verfügbar ist
        if (window && !((window as any).MonacoEnvironment)) {
            (window as any).MonacoEnvironment = {
                getWorkerUrl: function (_: string, label: string) {
                    // Für Vite: Worker aus dem public-Ordner laden
                    if (label === 'python') {
                        return '/monaco/python.worker.js';
                    }
                    return '/monaco/editor.worker.js';
                }
            };
        }
    }, []);

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleRunClick = () => {
        setIsRunning(true);
        onRun().finally(() => setIsRunning(false));
    };

    return (
        <div className="rounded-xl overflow-hidden shadow-lg border-4 border-purple-300">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-3 flex justify-between items-center">
                <span className="text-xl font-bold text-white">🐍 Python Editor</span>
                <button
                    onClick={handleRunClick}
                    className={`bg-white text-blue-500 font-bold py-2 px-4 rounded shadow whitespace-nowrap ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isRunning}
                >
                    {isRunning ? "Wird ausgeführt..." : "Ausführen"}
                </button>
            </div>
            <Editor
                height="300px"
                defaultLanguage="python"
                value={code}
                onChange={(value) => setCode(value || "")}
                onMount={handleEditorDidMount}
                options={{
                    fontSize: 13,
                    fontFamily: "'Comic Code', 'Cascadia Code', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    roundedSelection: true,
                    padding: { top: 16 },
                    theme: "vs",
                    wordWrap: "on",
                    tabSize: 2,
                }}
            />
        </div>
    );
}