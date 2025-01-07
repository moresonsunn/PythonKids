import React from 'react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

function CodeEditor({ code, setCode }: CodeEditorProps) {
  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="w-full h-64 font-mono text-sm p-4 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      placeholder="# Schreibe deinen Python-Code hier..."
    />
  );
}

export default CodeEditor;