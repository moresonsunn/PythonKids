import React, { useState, useEffect } from 'react';
import { lessons } from '../lessons';

// Definiert die Struktur der Lektionen für die Aufgaben
export interface SubLesson {
  id: string; // Eindeutige ID der Unterlektion (z.B. 'variables-1')
  title: string; // Titel der Unterlektion (z.B. 'Erste Schritte mit Variablen')
  difficulty: 'Leicht' | 'Mittel' | 'Schwer'; // Schwierigkeitsgrad der Unterlektion
  content: string; // Beschreibender Inhalt der Unterlektion
  initialCode: string; // Initialer Code, der im Editor angezeigt wird
  task: string; // Aufgabenstellung für den Benutzer
  solution: string; // Lösung der Aufgabe
  hint: string; // Hinweis zur Lösung der Aufgabe
}

//Definiert die Struktur der Lektionen für die Inhalte
export interface Lesson {
  id: string; // Eindeutige ID der Lektion (z.B. 'variables')
  title: string; // Titel der Lektion (z.B. 'Variablen')
  icon: any; // Ein Icon für die Lektion (wahrscheinlich eine React-Komponente von lucide-react)
  definition?: string; // Definition des Themas der Lektion
  functions?: string; // Erklärung der zugehörigen Funktionen/Konzepte
  Example?: string; // Beispielcode zur Veranschaulichung
  subLessons: SubLesson[]; // Array von Unterlektionen, die zu dieser Lektion gehören
}

// Ist das Interface für die Sitebar mit dem Titel
interface LessonContentProps {
  topic: string;
  selectedSubLesson: string;
  learningStyle: 'text' | 'interactive';
  isError: boolean;
  onErrorCountChange: (count: number) => void; 
  initialCode: string; // Neue Prop für den initialen Code
}
// Hier wird der Inhalt auf der App dargestellt
const LessonContent: React.FC<LessonContentProps> = ({
  topic, 
  selectedSubLesson,
  learningStyle,
  isError,
  onErrorCountChange,
  initialCode, // Neue Prop für den initialen Code
}) => {
  const [showHint, setShowHint] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // Hier wird der Fehler gezählt und die Hilfe angezeigt
  useEffect(() => {
    if (isError) {
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);
      onErrorCountChange(newErrorCount);
    }
  }, [isError]);
  // Hier wird die Hilfe zurückgesetzt
  useEffect(() => {
    setShowHint(false);
    setErrorCount(0);
    onErrorCountChange(0);
  }, [topic, selectedSubLesson]);

  // Einfach suche von den Lektionen
  const currentLesson = lessons.find(lesson => lesson.id === topic);
  const currentSubLesson = currentLesson?.subLessons.find(sub => sub.id === selectedSubLesson);

  if (!currentLesson) {
    return <div>Lektion nicht gefunden</div>;
  }

  // Wenn der Lernstil auf Text ist dann wird die Lernbasierte Ansicht angezeigt
  if (learningStyle === 'text') {
    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-md">
          <h4 className="font-bold text-purple-700 mb-2">Was sind {currentLesson.title}?</h4>
          <pre className="text-gray-700">{currentLesson.definition}</pre>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-bold text-blue-700 mb-2">Wie funktioniert das?</h4>
          <pre className="text-gray-700 ">{currentLesson.functions}</pre>
        </div>
        
        <div className="bg-green-50 p-4 rounded-md">
          <h4 className="font-bold text-green-700 mb-2">Beispiel:</h4>
          <pre className="bg-white p-3 rounded border border-green-200 text-sm font-mono">
            {currentLesson.Example}
          </pre>
        </div>
      </div>
    );
  }
  
  if (!currentSubLesson) {
    return <div>Übung nicht gefunden</div>;
  }

  return (
    <div>
      <p>{currentSubLesson.content}</p>
      <div className="prose max-w-none">
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Deine Aufgabe:</h3>
      <div className="bg-gray-50 p-4 rounded-md">
        <pre className="text-sm">{currentSubLesson.task}</pre>
        {/* {!showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Terminal className="flex h-4 w-4 mr-2" />
            Hilfe
          </button>
        )}
        {(showHint || errorCount >= 3) && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md animate-fade-in">
            <p className="text-sm text-gray-600">{currentSubLesson.hint}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LessonContent;