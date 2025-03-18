import React, { useState, useEffect } from 'react';
import { loadPyodide } from "../public/pyodide/pyodide"; // Importieren der Pyodide-Bibliothek
import { Code, BookOpen, GamepadIcon } from 'lucide-react'; // Importieren von Icons
import Navigation from './components/Navigation'; // Importieren der Navigation-Komponente
import CodeEditor from './components/CodeEditor'; // Importieren der CodeEditor-Komponente
import LessonContent from './components/LessonContent'; // Importieren der LessonContent-Komponente
import { lessons } from './lessons/index'; // Importieren der Lektionen

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('variables');
  const [selectedSubLesson, setSelectedSubLesson] = useState('variables-1');
  const [learningStyle, setLearningStyle] = useState<'text' | 'interactive'>('text');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [input, setInput] = useState('');
  const [isInputRequired, setIsInputRequired] = useState(false);
  const [, setIsLoading] = useState(false);

  // useEffect-Hook zum Initialisieren von Pyodide
  useEffect(() => {
    async function initPyodide() {
      const py = await loadPyodide({ indexURL: "pyodide/" });
      setPyodide(py);
    }
    initPyodide();
  }, []);

  useEffect(() => {
    const currentLesson = lessons.find(lesson => lesson.id === selectedTopic);
    const currentSubLesson = currentLesson?.subLessons.find(sub => sub.id === selectedSubLesson);
    if (currentSubLesson) {
      setCode(currentSubLesson.initialCode);
    }
  }, [selectedTopic, selectedSubLesson]);

  const executeCode = async (userInput: string = '') => {
    setIsLoading(true); // Ladezustand aktivieren
    try {
      // Benutzerdefinierter Python-Code, der den Input-Befehl korrekt abfängt
      const pythonCode = `
import sys
import io
sys.stdout = io.StringIO()  # Umleiten der Ausgabe
sys.stderr = sys.stdout

# Benutzerdefinierte input-Funktion
def custom_input(prompt):
    print(prompt, end="")  # Prompt wird im UI angezeigt
    return "${userInput}";  # Rückgabe der Benutzereingabe

input = custom_input  # 'input' auf unsere benutzerdefinierte Funktion setzen

# Ausführung des Benutzercodes
exec("""
${code.replace(/"/g, '\\"')}
""")
`;
  
      // Führen Sie den Python-Code aus
      await pyodide.runPythonAsync(pythonCode);
  
      // Ausgabe abrufen
      const output = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(output || "Keine Ausgabe");
      setIsError(false);
      setIsInputRequired(true);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setIsError(true);
      setOutput(errorMessage);
  
      // Überprüfen, ob eine Eingabe erforderlich ist
      if (errorMessage.includes("EOFError")) {
        setIsInputRequired(true); // Setzen des Eingabezustands auf true
      }
    }
    setIsLoading(false);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeCode(input); // Ausführen des Codes mit der Benutzereingabe
    setInput(''); // Zurücksetzen der Eingabe
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">PythonKids</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setLearningStyle('text')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${learningStyle === 'text' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <BookOpen className="h-5 w-5 inline-block mr-1" />
                Erklärung
              </button>
              <button
                onClick={() => setLearningStyle('interactive')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${learningStyle === 'interactive' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <GamepadIcon className="h-5 w-5 inline-block mr-1" />
                Interaktiv
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Navigation
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedSubLesson={selectedSubLesson}
              setSelectedSubLesson={(subLesson: string) => setSelectedSubLesson(subLesson)}
              lessons={lessons}
            />
          </div>

          <div className="col-span-9">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <LessonContent
                topic={selectedTopic}
                selectedSubLesson={selectedSubLesson}
                learningStyle={learningStyle}
                isError={isError}
                onErrorCountChange={(count) => {
                  console.log('Error count:', count);
                }}
                initialCode={code}
              />
            </div>

            {learningStyle === 'interactive' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <CodeEditor code={code} setCode={setCode} onRun={() => executeCode()} />
                </div>

                <div className={`bg-white rounded-lg shadow-lg p-6 ${isError ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ausgabe</h3>
                  <pre className="whitespace-pre-wrap break-words">{output}</pre>
                  <div className="output-container"></div>
                  {isInputRequired && (
                    <form onSubmit={handleInputSubmit}>
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Benutzereingabe..."
                      />
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;