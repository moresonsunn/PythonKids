import React, { useState, useEffect } from 'react'; 
import { loadPyodide } from "../public/pyodide/pyodide"; // Importieren der Pyodide-Bibliothek
import { Code, BookOpen, GamepadIcon } from 'lucide-react'; // Importieren von Icons
import Navigation from './components/Navigation'; // Importieren der Navigation-Komponente
import CodeEditor from './components/CodeEditor'; // Importieren der CodeEditor-Komponente
import LessonContent from './components/LessonContent'; // Importieren der LessonContent-Komponente
import { lessons } from './lessons/index'; // Importieren der Lektionen

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('variables'); // Standardmäßig die erste Lektion auswählen
  const [selectedSubLesson, setSelectedSubLesson] = useState('variables-1'); // Standardmäßig die erste Unterlektion auswählen
  const [learningStyle, setLearningStyle] = useState<'text' | 'interactive'>('text'); // Standardmäßig den Lernstil auf 'text' setzen
  const [code, setCode] = useState(''); // Code, der im Editor angezeigt wird
  const [output, setOutput] = useState(''); // Ausgabe des Codes
  const [isError, setIsError] = useState(false); // Fehlerstatus
  const [pyodide, setPyodide] = useState<any>(null); // Pyodide-Instanz
  const [input, setInput] = useState(''); // Eingabewert für den Benutzer
  const [inputQueue, setInputQueue] = useState<any[]>([]);  // Warteschlange für Benutzereingaben
  const [isInputRequired, setIsInputRequired] = useState(false); // Eingabe erforderlich-Status
  const [, setIsLoading] = useState(false); // Ladezustand

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

    // Nur den Code zurücksetzen, wenn die aktuelle Lektion nicht das Text-Adventure ist
    if (currentLesson?.id !== 'textadventure' && currentSubLesson) {
      setCode(currentSubLesson.initialCode);
    }
}, [selectedTopic, selectedSubLesson]);

  // Fehlermeldungen und Erklärungen
  const errorHelp: Record<string, string> = {
    "SyntaxError": "Syntaxfehler: Prüfe, ob alle Klammern, Doppelpunkte oder Anführungszeichen korrekt gesetzt sind.",
    "NameError": "Unbekannter Name: Überprüfe, ob du alle Variablen oder Funktionen korrekt benannt hast.",
    "IndentationError": "Einrückungsfehler: Achte auf die korrekte Einrückung mit Leerzeichen oder Tabs.",
    "TypeError": "Typfehler: Prüfe, ob du passende Datentypen (z. B. Zahl vs. Text) verwendest.",
    "ZeroDivisionError": "Division durch Null: Eine Zahl darf nicht durch Null geteilt werden.",
    "IndexError": "Indexfehler: Prüfe, ob du innerhalb der Grenzen einer Liste oder eines anderen Index-basierten Objekts bleibst.",
    "KeyError": "Schlüsselfehler: Prüfe, ob du den richtigen Schlüssel in Dictionaries verwendest.",
    "AttributeError": "Attributfehler: Prüfe, ob du auf existierende Attribute oder Methoden zugreifst.",
    "ValueError": "Wertfehler: Prüfe, ob der eingegebene Wert den erwarteten Typ oder das erwartete Format hat.",
    "ModuleNotFoundError": "Modul nicht gefunden: Prüfe, ob du das Modul korrekt importiert und installiert hast.",
    "RecursionError": "Rekursionsfehler: Deine Funktion ruft sich zu oft selbst auf - prüfe deine Abbruchbedingung.",
    "UnboundLocalError": "Ungebundener Lokaler Fehler: Prüfe, ob du eine Variable verwendest, bevor sie deklariert wurde."
  };

  const executeCode = async (newInput: string = '') => {
    resetExecution(); // Reset der Ausführung
    setIsLoading(true);
    try {
      // Aktualisierte Warteschlange mit dem neuen Input (wenn vorhanden)
      const updatedQueue = newInput ? [...inputQueue, newInput] : inputQueue;
      setInputQueue(updatedQueue);

      // Python-Eingabequeue als JSON-String vorbereiten
      const queueJson = JSON.stringify(updatedQueue);
      const errorHelpJson = JSON.stringify(errorHelp);
      const escapedCode = code.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

      // Reset der Pyodide-Umgebung (frisches exec)
      await pyodide.runPythonAsync(`
import sys, io, builtins, json

# Umgebung zurücksetzen
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
input_queue = iter(json.loads('${queueJson}'))

def custom_input(prompt=""):
    print(prompt, end="")
    try:
        return next(input_queue)
    except StopIteration:
        print("Eingabe erforderlich")
        raise Exception("Eingabe erforderlich")

builtins.input = custom_input
error_help = json.loads('${errorHelpJson}')
      `);

      // Python-Code ausführen
      try {
        await pyodide.runPythonAsync(`
try:
    exec("""${escapedCode}""")
except Exception as e:
    error_type = type(e).__name__
    if error_type == "Eingabe erforderlich":
          print("Eingabe erforderlich")
    elif error_type in error_help:
        print(error_help[error_type])
        print(f"Fehler: {error_type}: {str(e)}")
    else:
        print(f"Fehler: {str(e)}")
        `);
      } catch (runErr) {
        console.error("Pyodide execution error:", runErr);
      }

      // Ausgabe lesen
      const output = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(output || "Keine Ausgabe");

      // Prüfen, ob weitere Eingabe benötigt wird
      if (output.includes("Eingabe erforderlich")) {
        setIsInputRequired(true);
      } else {
        setIsInputRequired(false);
        resetExecution(); // Reset ausführen, wenn keine Eingabe mehr erforderlich ist
      }

      setIsError(false);
    } catch (err) {
      console.error("Execution error:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    setInput(''); // Eingabefeld zurücksetzen

    // Direkt mit neuer Eingabe ausführen
    await executeCode(trimmed);
  };

  // Reset-Funktion, um den Zustand zurückzusetzen
  const resetExecution = () => {
    setInputQueue([]); // Eingabe-Warteschlange zurücksetzen
    setIsInputRequired(false); // Eingabe erforderlich-Status zurücksetzen
    setIsError(false); // Fehlerstatus zurücksetzen
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
              {/*<div className="flex items-center"> 
                <img
                  src="src/pictures/banner.png"
                  alt="Banner"
                  className="h-8 rounded-full max-w-[30%] max-h-[30%]"
                />
              </div>*/}
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
                learningStyle={learningStyle == 'text' ? 'text' : 'interactive'}
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
                  <CodeEditor code={code} setCode={setCode} onRun={() => executeCode()}/>
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
        {/* <footer className="text-center mt-8 text-gray-600">
          Entwickelt von Philip
        </footer> */}
      </div>
    </div>
  );
};

export default App;