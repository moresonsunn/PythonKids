import React, { useState, useEffect, useRef, useMemo } from 'react'; 
import { Code, BookOpen, GamepadIcon } from 'lucide-react'; // Importieren von Icons
import Navigation from './components/Navigation'; // Importieren der Navigation-Komponente
import CodeEditor from './components/CodeEditor'; // Importieren der CodeEditor-Komponente
import LessonContent from './components/LessonContent'; // Importieren der LessonContent-Komponente
import { lessons } from './lessons/index'; // Importieren der Lektionen
import * as tf from '@tensorflow/tfjs';

type TokenizerJson = {
  word_index: { [word: string]: number };
  oov_token?: string;
};

function textsToSequences(texts: string[], tokenizerJson: TokenizerJson): number[][] {
  const wordIndex = tokenizerJson.word_index;
  const oovTokenIndex = tokenizerJson.oov_token ? wordIndex[tokenizerJson.oov_token] : 1;
  return texts.map(text =>
    text
      .toLowerCase()
      .replace(/[\wäöüß]+/gi, " ")
      .split(/\s+/)
      .map(word => wordIndex[word] || oovTokenIndex)
  );
}

function preprocessCode(code: string): string {
  code = code.replace(/'[^']*'/g, "'<NAME>'");
  code = code.replace(/\b\d+\b/g, "<ZAHL>");
  return code;
}

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
  const [completedLessons, setCompletedLessons] = useState<string[]>([]); // Abgeschlossene Lektionen

  // Modell-Referenz für KI
  const modelRef = useRef<tf.LayersModel | null>(null);

  // State for tokenizer JSON loaded from local file
  const [tokenizerJson, setTokenizerJson] = useState<TokenizerJson | null>(null);

  // useEffect-Hook zum Initialisieren von Pyodide
  useEffect(() => {
    async function initPyodide() {
      function waitForPyodide() {
        return new Promise<void>((resolve) => {
          function check() {
            if ((window as any).loadPyodide) {
              resolve();
            } else {
              setTimeout(check, 50);
            }
          }
          check();
        });
      }
      await waitForPyodide();
      // Use offline path from preload.js
      // @ts-ignore
      const pyodideDir = window.offlinePaths?.pyodideDir;
      // @ts-ignore
      const py = await (window as any).loadPyodide({ indexURL: `file://${pyodideDir}/` });
      setPyodide(py);
    }
    initPyodide();
  }, []);

  // Modell nur einmal laden, im useEffect!
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Use offline path from preload.js
        // @ts-ignore
        const modelPath = window.offlinePaths?.modelJson;
        if (modelPath) {
          modelRef.current = await tf.loadLayersModel(`file://${modelPath}`);
          console.log("Modell erfolgreich geladen.");
        } else {
          console.error("Model path not found in offlinePaths.");
        }
      } catch (error) {
        console.error("Fehler beim Laden des Modells:", error);
      }
    };
    loadModel();
  }, []);

  // Load tokenizer JSON from local file
  useEffect(() => {
    // @ts-ignore
    const tokenizerPath = window.offlinePaths?.tokenizerJson;
    if (tokenizerPath) {
      fetch(`file://${tokenizerPath}`)
        .then(res => res.json())
        .then(json => {
          setTokenizerJson({
            word_index: json.config.word_index,
            oov_token: json.config.oov_token,
          });
        })
        .catch(err => {
          console.error("Fehler beim Laden des Tokenizer-JSON:", err);
        });
    } else {
      console.error("Tokenizer path not found in offlinePaths.");
    }
  }, []);

  useEffect(() => {
    const currentLesson = lessons.find(lesson => lesson.id === selectedTopic);
    const currentSubLesson = currentLesson?.subLessons.find(sub => sub.id === selectedSubLesson);

    // Nur den Code zurücksetzen, wenn die aktuelle Lektion nicht das Text-Adventure ist
    if (currentLesson?.id !== 'textadventure' && currentSubLesson) {
      setCode(currentSubLesson.initialCode);
    }
  }, [selectedTopic, selectedSubLesson]);

  // Punkte pro SubLesson (z.B. gleichmäßig verteilt)
  const subLessonPoints = useMemo(() => {
    const points: Record<string, number> = {};
    const totalPoints = 100;
    let totalSubLessons = 0;
    lessons.forEach(lesson => {
      lesson.subLessons.forEach(sub => {
        totalSubLessons += 1;
        points[sub.id] = 0; // Platzhalter, wird gleich gesetzt
      });
    });
    const pointsPerSubLesson = Math.floor(totalPoints / totalSubLessons);
    Object.keys(points).forEach(id => {
      points[id] = pointsPerSubLesson;
    });
    // Restpunkte auf die ersten Lektionen verteilen
    let rest = totalPoints - pointsPerSubLesson * totalSubLessons;
    Object.keys(points).slice(0, rest).forEach(id => {
      points[id] += 1;
    });
    return points;
  }, [lessons]);

  const calculateProgress = () => {
    let points = 0;
    completedLessons.forEach(id => {
      points += subLessonPoints[id] || 0;
    });
    return points;
  };

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

  const checkOutputWithModel = async (output: string): Promise<boolean> => {
    if (!modelRef.current) {
      console.error("Modell ist nicht geladen.");
      return false;
    }
    if (!tokenizerJson) {
      console.error("Tokenizer ist nicht geladen.");
      return false;
    }
    const preprocessed = preprocessCode(output);
    let seq = textsToSequences([preprocessed], tokenizerJson);
    while (seq[0].length < 50) seq[0].push(0);
    if (seq[0].length > 50) seq[0] = seq[0].slice(0, 50);

    const inputTensor = tf.tensor2d(seq, [1, 50]);
    const prediction = modelRef.current.predict(inputTensor) as tf.Tensor;
    const result = (await prediction.data())[0];
    return result > 0.5;
  };

  // Punkte nur vergeben, wenn KI-Auswertung korrekt ist UND keine Fehlermeldung im Output steht
  const executeCode = async (newInput: string = '') => {
    if (!pyodide) {
      setOutput('Python-Interpreter wird noch geladen. Bitte warte einen Moment und versuche es erneut.');
      setIsError(true);
      return;
    }
    setIsInputRequired(false); // <-- Status immer zurücksetzen, damit Button wieder funktioniert
    resetExecution();
    setIsLoading(true);
    try {
      const updatedQueue = newInput ? [...inputQueue, newInput] : inputQueue;
      setInputQueue(updatedQueue);

      const queueJson = JSON.stringify(updatedQueue);
      const errorHelpJson = JSON.stringify(errorHelp);
      const escapedCode = code.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

      await pyodide.runPythonAsync(`
import sys, io, builtins, json
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

      let output = pyodide.runPython("sys.stdout.getvalue()");

      // Prüfen, ob eine Eingabe erforderlich ist
      if (output && output.includes("Eingabe erforderlich")) {
        setIsInputRequired(true);
        setIsLoading(false);
        return; // Keine Modellprüfung, sondern auf Eingabe warten!
      }

      // Prüfen auf Fehlermeldungen im Output
      const hasError =
        /Fehler:|Syntaxfehler|SyntaxError|Exception|Traceback|Einrückungsfehler|TypeError|NameError|IndentationError|ZeroDivisionError|Keine Ausgabe|IndexError|KeyError|AttributeError|ValueError|ModuleNotFoundError|RecursionError|UnboundLocalError/.test(
          output
        );

      // KI prüft die Ausgabe und den Code (über Output)
      const isCorrect = !hasError && (await checkOutputWithModel(output.trim()));
      const currentLesson = lessons.find(lesson => lesson.id === selectedTopic);
      const currentSubLesson = currentLesson?.subLessons.find(sub => sub.id === selectedSubLesson);

      if (isCorrect && currentSubLesson) {
        // Punkte nur vergeben, wenn KI-Auswertung korrekt ist und keine Fehlermeldung im Output steht
        if (!completedLessons.includes(selectedSubLesson)) {
          setCompletedLessons([...completedLessons, selectedSubLesson]);
        }
        setIsError(false);
      } else {
        setIsError(true);
        setOutput(
          "Das Ergebnis ist nicht korrekt oder passt nicht zur aktuellen Aufgabe. Bitte überprüfe deinen Code.\n\n" +
          "Fehlerausgabe:\n" +
          (output && output.trim() !== "" ? output : "Keine Ausgabe")
        );
        console.error("Falsches Ergebnis oder falsche Lektion:", output);
        return;
      }
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
    // setInputQueue([]); // Entfernt! Nicht mehr bei jedem Ausführen leeren!
    setOutput(''); // Ausgabe zurücksetzen
    setIsInputRequired(false); // Eingabe erforderlich-Status zurücksetzen
    setIsError(false); // Fehlerstatus zurücksetzen
  };
  
  // inputQueue nur beim Wechsel der Lektion/Unterlektion zurücksetzen!
  useEffect(() => {
    setInputQueue([]);
  }, [selectedTopic, selectedSubLesson]);

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
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-indigo-600 h-4 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Fortschritt: {calculateProgress()} / 100 Punkte
        </p>
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
          Entwickelt von Philip Terber
        </footer> */}
      </div>
    </div>
  );
};

export default App;