Python-Lernplattform
Eine interaktive Webanwendung zum Erlernen von Python-Grundlagen.
Inhaltsverzeichnis
Überblick
Funktionen
Technologie-Stack
Installation
Projektstruktur
Verwendung
Beitragen
Lizenz
Überblick
Diese Anwendung bietet eine benutzerfreundliche Plattform für Anfänger, um Python durch interaktive Lektionen und praktische Übungen zu erlernen.
Funktionen
Strukturierte Lektionen zu Python-Grundlagen
Interaktiver Code-Editor mit Syntax-Highlighting
Aufgaben mit verschiedenen Schwierigkeitsgraden
Sofortiges Feedback und Lösungsvorschläge
Fortschrittsverfolgung für Benutzer
Technologie-Stack
Frontend: React
Code-Editor: Monaco Editor
Styling: CSS (möglicherweise mit einem Framework wie Tailwind)
Bundler: Vermutlich Create React App oder Vite
Installation
Klonen Sie das Repository:
bash
git clone https://github.com/your-username/python-learning-platform.git
Navigieren Sie in das Projektverzeichnis:
bash
cd python-learning-platform
Installieren Sie die Abhängigkeiten:
bash
npm install
Starten Sie die Entwicklungsumgebung:
bash
npm start
Projektstruktur
text
python-learning-platform/
├── src/
│   ├── components/
│   │   ├── CodeEditor.tsx
│   │   └── ...
│   ├── data/
│   │   └── LessonContent.tsx
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
└── README.md
Verwendung
Nach dem Start der Anwendung können Benutzer:
Lektionen aus der Seitenleiste auswählen
Lektionsinhalte lesen und Beispiele anschauen
Aufgaben im integrierten Code-Editor lösen
Sofortiges Feedback erhalten und Lösungen überprüfen
Code-Dokumentation
LessonContent.tsx
Dieses Modul definiert die Struktur und den Inhalt der Lektionen.
typescript
export interface SubLesson {
  id: string;
  title: string;
  difficulty: 'Leicht' | 'Mittel' | 'Schwer';
  content: string;
  initialCode: string;
  task: string;
  solution: string;
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: any;
  definition?: string;
  functions?: string;
  Example?: string;
  subLessons: SubLesson[];
}

export const lessons: Lesson[] = [
  // Lektionsdaten hier
];
Hauptfunktionen:
SubLesson: Definiert die Struktur einer Unterlektion
Lesson: Definiert die Struktur einer Hauptlektion
lessons: Array, das alle Lektionen und deren Inhalte enthält
CodeEditor.tsx
Implementiert den interaktiven Code-Editor mit Monaco Editor.
typescript
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onRun: () => void;
}

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  // Implementierung hier
}
Hauptfunktionen:
CodeEditor: React-Komponente, die den Monaco Editor rendert
code: Aktueller Code-Inhalt
setCode: Funktion zum Aktualisieren des Code-Inhalts
onRun: Callback-Funktion zum Ausführen des Codes
