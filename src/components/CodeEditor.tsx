import { useState } from "react";
import Editor from "@monaco-editor/react";

declare global {
  interface Window {
    __BRYTHON__: any;
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

    // Deklariere originalPrint hier, damit sie im finally-Block verfügbar ist
    const originalPrint = console.log;

    try {
      if (!window.__BRYTHON__) {
        throw new Error("Brython ist nicht initialisiert");
      }

      // Ausgabe-Handler
      let outputBuffer = "";
      console.log = (...args: any[]) => {
        outputBuffer += args
          .map((arg) => (arg !== undefined && arg !== null ? arg.toString() : "undefined"))
          .join(" ") + "\n";
      };

      // Fehler-Handler
      window.__BRYTHON__.exceptionHandler = (err: any) => {
        setOutput(`Fehler: ${err.info || err.message}`);
        setIsError(true);
      };

      // Code ausführen
      await window.__BRYTHON__.run_script(code, "__main__");
      setOutput(outputBuffer.trim() || "Programm erfolgreich ausgeführt!");

    } catch (error: any) {
      setOutput(`Schwerer Fehler: ${error.message}`);
      setIsError(true);
    } finally {
      // Setze die Konsole zurück
      console.log = originalPrint;
      setIsRunning(false);
    }
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