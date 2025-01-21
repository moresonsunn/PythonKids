import { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onRun: () => Promise<void>;
}

export default function CodeEditor({ code, setCode, onRun }: CodeEditorProps) {
  const [isRunning, setIsRunning] = useState(false);

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
    </div>
  );
}