import React, { useState, useEffect } from 'react';

interface ShellProps {
  pyodide: any;
  code: string;
  setOutput: (output: string) => void;
}

const Shell: React.FC<ShellProps> = ({ pyodide, code, setOutput }) => {
  const [input, setInput] = useState('');
  const [output, setShellOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    pyodide.runPython(`
      import sys
      import io
      sys.stdout = io.StringIO()
      sys.stderr = io.StringIO()
      sys.stdin = io.StringIO()
    `);
  }, [pyodide]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setShellOutput((prev) => [...prev, `>>> ${input}`]);
    setIsRunning(true);

    try {
      pyodide.runPython(`sys.stdin = io.StringIO("${input}")`);
      const result = await pyodide.runPythonAsync(code);
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      const stderr = pyodide.runPython("sys.stderr.getvalue()");
      const combinedOutput = stdout || stderr || result;
      setShellOutput((prev) => [...prev, combinedOutput]);
      setOutput(combinedOutput);
    } catch (error) {
      setShellOutput((prev) => [...prev, `Error: ${(error as Error).message}`]);
    }

    setInput('');
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleInputSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Input eingeben..."
          disabled={isRunning}
        />
      </form>
    </div>
  );
};

export default Shell;