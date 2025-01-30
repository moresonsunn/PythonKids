import { useState } from "react";
import Editor from "@monaco-editor/react";

declare global {
  interface Window {
    __BRYTHON__?: {
      run_script: (code: string) => void;
    };
  }
}

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setIsError: (isError: boolean) => void;
}
export default function CodeEditor({ code, setCode, setOutput, setIsError }: CodeEditorProps) {
  const [isRunning, setIsRunning] = useState(false);

  const handleRunClick = async () => {
    setIsRunning(true);
    setOutput("");
    setIsError(false);

    try {
      if (!window.__BRYTHON__ || typeof window.__BRYTHON__.run_script !== "function") {
        setOutput("Fehler: Brython ist nicht korrekt geladen.");
        setIsError(true);
        return;
      }

      // Ausgabe abfangen
      let capturedOutput = "";
      const originalPrint = console.log;
      console.log = (message) => {
        capturedOutput += message + "/";
      };

      console.log("Starte Brython-Code-Ausführung...");

      // Python-Code sicher ausführen
      window.__BRYTHON__.run_script(code);

      console.log = originalPrint; // Konsole zurücksetzen
      setOutput(capturedOutput.trim());
    } catch (error) {
      setOutput(`Fehler: ${(error as Error).toString()}`);
      setIsError(true);
    }

    setIsRunning(false);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border-4 border-purple-300">
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-3 flex justify-between items-center">
        <span className="text-xl font-bold text-white">🐍 Python Editor</span>
        <button
          onClick={handleRunClick}
          className={`bg-white text-blue-500 font-bold py-2 px-4 rounded shadow ${
            isRunning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isRunning}
        >
          {isRunning ? "Wird ausgeführt..." : "Ausführen"}
        </button>
      </div>
      <Editor
        height="316px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 16,
          fontFamily: "'Comic Code', 'Cascadia Code', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          roundedSelection: true,
          padding: { top: 16 },
          theme: "vs",
          wordWrap: "on",
          tabSize: 3,
        }}
        theme="vs"
      />
    </div>
  );
}
