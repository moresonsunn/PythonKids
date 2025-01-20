# Python-Lernplattform

Eine interaktive Webanwendung/WebApp zum Erlernen von Python-Grundlagen.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Funktionen](#funktionen)
- [Technologie-Stack](#technologie-stack)
- [Installation](#installation)
- [Projektstruktur](#projektstruktur)
- [Verwendung](#verwendung)
- [Lektionen](#lektionen)
- [Befehle](#befehle)

## Überblick

Diese Anwendung bietet eine benutzerfreundliche Plattform für Anfänger, um Python durch interaktive Lektionen und praktische Übungen zu erlernen.

## Funktionen

- Strukturierte Lektionen zu Python-Grundlagen
- Interaktiver Code-Editor mit Syntax-Highlighting
- Aufgaben mit verschiedenen Schwierigkeitsgraden
- Sofortiges Feedback und Lösungsvorschläge
- Fortschrittsverfolgung für Benutzer

## Technologie-Stack

- Frontend: React
- Code-Editor: Monaco Editor
- Styling: CSS (möglicherweise mit einem Framework wie Tailwind)
- Bundler: Vite

## Installation

1. Klonen Sie das Repository:

2. Navigieren Sie in das Projektverzeichnis:

3. Installieren Sie die Abhängigkeiten:

4. Starten Sie die Entwicklungsumgebung:


## Projektstruktur

```
python-learning-platform/
│
├── src/
│   ├── components/
│   │   ├── CodeEditor.tsx
│   │   ├── LessonContent.tsx
│   │   └── ...
│   │
│   ├── App.tsx
│   └── index.tsx
│
├── public/
├── package.json
└── README.md
```


## Verwendung

Nach dem Start der Anwendung können Benutzer:

1. Lektionen aus der Seitenleiste auswählen
2. Lektionsinhalte lesen und Beispiele anschauen
3. Aufgaben im integrierten Code-Editor lösen
4. Sofortiges Feedback erhalten und Lösungen überprüfen

## Lektionen

Die Plattform bietet folgende Lektionen:

1. Variablen
2. Funktionen
3. Listen
4. Operatoren
5. Fehlerausgaben
6. Input-Befehle
7. Dictionaries
8. Verzweigungen
9. Schleifen
10. Turtle-Grafik

Jede Lektion enthält:
- Eine Definition des Konzepts
- Beispiele zur Verwendung
- Praktische Übungen mit verschiedenen Schwierigkeitsgraden

# Befehle
1. npm install // Installiert alle nötwendigen dateien
2. npx vite // Um es Lokal auszuführen in einem Webbrowser
## Für eine App
1. npm install
2. npm run build // Erstellt eine datei names dist wo alle dateien gespeichert werden
3. npm start // Für kurze tests
4. npx electron-packager . PythonLernApp --platform=win32 --arch=x64 --out=release-build --overwrite // Um einen Ordner zuerstellen wo eine 
