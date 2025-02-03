import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { loadPyodide } from "pyodide";

export default function CodeEditor({ code, setCode, setIsError }) {
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    async function initPyodide() {
      const py = await loadPyodide();
      setPyodide(py);
    }
    initPyodide();
  }, []);

  const handleRunClick = async () => {
    if (!pyodide) return;
    setIsRunning(true);
    setOutput("");
    setIsError(false);

    try {
      const result = pyodide.runPython(code);
      setOutput(result);
    } catch (error) {
      setOutput(error.toString());
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
        height="352px"
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
