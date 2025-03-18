// Importieren der notwendigen Module und Komponenten
import React, { useState, useEffect } from 'react';
import { loadPyodide } from "../public/pyodide/pyodide"; // Importieren der Pyodide-Bibliothek
import { Code, BookOpen, GamepadIcon } from 'lucide-react'; // Importieren von Icons
import Navigation from './components/Navigation'; // Importieren der Navigation-Komponente
import CodeEditor from './components/CodeEditor'; // Importieren der CodeEditor-Komponente
import LessonContent from './components/LessonContent'; // Importieren der LessonContent-Komponente
import { lessons } from './lessons/index'; // Importieren der Lektionen

// Hauptkomponente der Anwendung
const App: React.FC = () => {
  // Zustand für das ausgewählte Thema, die ausgewählte Unterlektion, den Lernstil, den Code, die Ausgabe und den Fehlerstatus
  const [selectedTopic, setSelectedTopic] = useState('variables');
  const [selectedSubLesson, setSelectedSubLesson] = useState('variables-1');
  const [learningStyle, setLearningStyle] = useState<'text' | 'interactive'>('text');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [, setPyodide] = useState<any>(null);
  const [, setIsLoading] = useState(false);

  // useEffect-Hook zum Initialisieren von Pyodide
  useEffect(() => {
    async function initPyodide() {
      // Laden und Initialisieren von Pyodide
      const py = await loadPyodide({ indexURL: "pyodide/" });
      setPyodide(py); // Speichern der Pyodide-Instanz im Zustand
    }
    initPyodide(); // Aufrufen der Initialisierungsfunktion
  }, []);

  useEffect(() => {
    const currentLesson = lessons.find(lesson => lesson.id === selectedTopic);
    const currentSubLesson = currentLesson?.subLessons.find(sub => sub.id === selectedSubLesson);
    if (currentSubLesson) {
      setCode(currentSubLesson.initialCode); // Setzen des initialen Codes
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

  // Funktion zum Ausführen des Codes
  const executeCode = async () => {
    setIsLoading(true); // Setzen des Ladezustands auf true
    try {
      const pyodide = await loadPyodide({ indexURL: "pyodide/" }); // Laden von Pyodide
      pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
      `); // Umleiten der Standardausgabe
      await pyodide.runPythonAsync(code); // Ausführen des Codes
      const output = pyodide.runPython("sys.stdout.getvalue()"); // Abrufen der Ausgabe
      setOutput(output || "Keine Ausgabe"); // Setzen der Ausgabe im Zustand
      setIsError(false); // Setzen des Fehlerzustands auf false
    } catch (error) {
      const errorMessage = (error as Error).message; // Abrufen der Fehlermeldung
      setIsError(true); // Setzen des Fehlerzustands auf true
      setOutput(errorMessage); // Setzen der Fehlermeldung als Ausgabe

      // Hilfestellung anzeigen
      const helpMessage = Object.keys(errorHelp).find(key => errorMessage.includes(key));
      if (helpMessage) {
        setOutput(prev => `${prev}\n💡 Tipp: ${errorHelp[helpMessage]}`); // Hinzufügen der Hilfestellung zur Ausgabe
      }
    }
    setIsLoading(false); // Setzen des Ladezustands auf false
  };

  // Funktion zum Ändern der Unterlektion
  const handleSubLessonChange = (subLesson: string) => {
    setSelectedSubLesson(subLesson); // Setzen der ausgewählten Unterlektion
    setLearningStyle('text'); // Setzen des Lernstils auf 'text'
    setCode(''); // Zurücksetzen des Codes
    setOutput(''); // Zurücksetzen der Ausgabe
    setIsError(false); // Zurücksetzen des Fehlerzustands
  };

  return (
    // Hauptcontainer der Anwendung mit einem Hintergrundgradienten
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* Navigationsleiste */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              {/* Icon und Titel der Anwendung */}
              <Code className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">PythonKids</span>
            </div>
            <div className="flex space-x-4">
              {/* Button zum Umschalten auf den Text-Lernstil */}
              <button
                onClick={() => setLearningStyle('text')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${learningStyle === 'text' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <BookOpen className="h-5 w-5 inline-block mr-1" />
                Erklärung
              </button>
              {/* Button zum Umschalten auf den interaktiven Lernstil */}
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

      {/* Hauptinhalt der Anwendung */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Navigation für die Lektionen */}
          <div className="col-span-3">
            <Navigation
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedSubLesson={selectedSubLesson}
              setSelectedSubLesson={handleSubLessonChange}
              lessons={lessons}
            />
          </div>

          {/* Inhalt der ausgewählten Lektion */}
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
                initialCode={code} // Übergeben des initialen Codes
              />
            </div>

            {/* Interaktiver Bereich mit Code-Editor und Ausgabe */}
            {learningStyle === 'interactive' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <CodeEditor
                    code={code}
                    setCode={setCode}
                    onRun={executeCode}
                  />
                </div>

                <div className={`bg-white rounded-lg shadow-lg p-6 ${isError ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ausgabe</h3>
                  <pre className="whitespace-pre-wrap break-words">{output}</pre>
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
