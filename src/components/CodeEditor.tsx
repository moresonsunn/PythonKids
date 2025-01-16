import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border-4 border-purple-300">
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-3 flex justify-between items-center">
        <span className="text-xl font-bold text-white">🐍 Python Spielplatz</span>
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