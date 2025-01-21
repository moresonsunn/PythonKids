import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import * as Sk from "skulpt";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onRun: () => Promise<void>;
}

export default function CodeEditor({ code, setCode, onRun }: CodeEditorProps) {
  const [isRunning, setIsRunning] = useState(false);

  const handleRunClick = () => {
    setIsRunning(true);
    runPythonCode(code).finally(() => setIsRunning(false));
  };

  const runPythonCode = (code: string) => {
    return new Promise<void>((resolve, reject) => {
      Sk.configure({
        output: (text: string) => console.log(text),
        read: (x: string) => {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw new Error("File not found: '" + x + "'");
          }
          return Sk.builtinFiles["files"][x];
        },
      });

      Sk.TurtleGraphics.target = "turtle-canvas";
      Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
        .then(() => resolve())
        .catch((err: any) => {
          console.error(err.toString());
          reject(err);
        });
    });
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
          {isRunning ? 'Wird ausgeführt...' : 'Run'}
        </button>
      </div>
      <Editor
        height="400px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || '')}
        options={{
          fontSize: 16,
          fontFamily: "'Comic Code', 'Cascadia Code', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "off",
          roundedSelection: true,
          padding: { top: 16 },
          theme: "vs",
          wordWrap: "on",
          tabSize: 3,
        }}
        theme="vs"
      />
      <div id="turtle-canvas" className="turtle-canvas"></div>
    </div>
  );
}