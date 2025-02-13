import { useState } from "react";
import Editor from "@monaco-editor/react";

// Definiert die Eigenschaften (Props), die an die CodeEditor-Komponente übergeben werden
interface CodeEditorProps {
  code: string; // Der aktuelle Code im Editor
  setCode: (code: string) => void; // Funktion zum Aktualisieren des Codes
  onRun: () => Promise<void>; // Funktion, die den Code ausführt
}

// Hauptkomponente für den Code-Editor
export default function CodeEditor({ code, setCode, onRun }: CodeEditorProps) {
  // Zustand, um zu tracken, ob der Code gerade ausgeführt wird
  const [isRunning, setIsRunning] = useState(false);

  // Handler für den "Ausführen"-Button
  const handleRunClick = () => {
    setIsRunning(true); // Setzt den Zustand auf "wird ausgeführt"
    onRun().finally(() => setIsRunning(false)); // Startet die onRun-Funktion und setzt den Zustand danach zurück
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border-4 border-purple-300">
      {/* Header-Bereich mit Titel und Ausführen-Button */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-3 flex justify-between items-center">
        <span className="text-xl font-bold text-white">🐍 Python Editor</span>
        <button
          onClick={handleRunClick}
          className={`bg-white text-blue-500 font-bold py-2 px-4 rounded shadow whitespace-nowrap ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isRunning} // Deaktiviert den Button, wenn der Code ausgeführt wird
        >
          {isRunning ? "Wird ausgeführt..." : "Ausführen"} {/* Button-Text passt sich an den Status an */}
        </button>
      </div>
      
      {/* Monaco-Editor für die Code-Eingabe */}
      <Editor
        height="300px" // Höhe des Editors
        defaultLanguage="python" // Standardmäßig Python als Sprache setzen
        value={code} // Der aktuelle Code
        onChange={(value) => setCode(value || "")} // Aktualisiert den Code bei Änderungen
        options={{
          fontSize: 16, // Schriftgröße
          fontFamily: "'Comic Code', 'Cascadia Code', monospace", // Schriftart
          minimap: { enabled: false }, // Deaktiviert die Minimap
          scrollBeyondLastLine: false, // Verhindert das Scrollen über die letzte Zeile hinaus
          lineNumbers: "on", // Zeilennummern aktivieren
          roundedSelection: true, // Abgerundete Auswahl
          padding: { top: 16 }, // Abstand oben
          theme: "vs", // Standard-Theme des Editors
          wordWrap: "on", // Zeilenumbruch aktivieren
          tabSize: 3, // Tab-Größe
        }}
        theme="vs" // Setzt das Theme des Editors
      />
    </div>
  );
}
