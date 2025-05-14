# Python-Lernplattform

Eine interaktive Webanwendung/WebApp zum Erlernen von Python-Grundlagen.

## Inhaltsverzeichnis

-   [Überblick](#überblick)
-   [Funktionen](#funktionen)
-   [Technologie-Stack](#technologie-stack)
-   [Installation](#installation)
-   [Projektstruktur](#projektstruktur)
-   [Verwendung](#verwendung)
-   [Lektionen](#lektionen)
-   [Befehle](#befehle)
-   [Komponenten](#komponenten)
-   [Lektionsdetails](#lektionsdetails)

## Überblick

Diese Anwendung bietet eine benutzerfreundliche Plattform für Anfänger, um Python durch interaktive Lektionen und praktische Übungen zu erlernen.

## Funktionen

-   Strukturierte Lektionen zu Python-Grundlagen
-   Interaktiver Code-Editor mit Syntax-Highlighting
-   Aufgaben mit verschiedenen Schwierigkeitsgraden
-   Sofortiges Feedback und Lösungsvorschläge
-   Fortschrittsverfolgung für Benutzer
-   Möglichkeit, Benutzereingaben in den Code zu integrieren
-   Anzeige von Fehlermeldungen und Hilfestellungen

## Technologie-Stack

-   Frontend: React
-   Code-Editor: Monaco Editor
-   Styling: CSS (möglicherweise mit einem Framework wie Tailwind)
-   Bundler: Vite
-   Python-Ausführung im Browser: Pyodide

## Installation

1.  Klonen Sie das Repository:

    ```bash
    git clone <repository-url>
    ```
2.  Navigieren Sie in das Projektverzeichnis:

    ```bash
    cd PythonKids
    ```
3.  Installieren Sie die Abhängigkeiten:

    ```bash
    npm install
    ```
4.  Starten Sie die Entwicklungsumgebung:

    ```bash
    npm run dev
    ```

## Projektstruktur

PythonKids/
│
├── src/
│   ├── components/
│   │   ├── CodeEditor.tsx
│   │   ├── LessonContent.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── lessons/
│   │   ├── index.tsx
│   │   ├── conditions.tsx
│   │   ├── dictionaries.tsx
│   │   ├── errors.tsx
│   │   ├── functions.tsx
│   │   ├── input.tsx
│   │   ├── lists.tsx
│   │   ├── loops.tsx
│   │   ├── operators.tsx
│   │   ├── textadventure.tsx
│   │   └── variables.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
│
├── public/
├── package.json
└── README.md

## Verwendung

Nach dem Start der Anwendung können Benutzer:

1.  Lektionen aus der Seitenleiste auswählen
2.  Lektionsinhalte lesen und Beispiele anschauen
3.  Aufgaben im integrierten Code-Editor lösen
4.  Sofortiges Feedback erhalten und Lösungen überprüfen

## Lektionen

Die Plattform bietet folgende Lektionen:

1.  Variablen
2.  Funktionen
3.  Listen
4.  Operatoren
5.  Fehlerausgaben
6.  Input-Befehle
7.  Dictionaries
8.  Verzweigungen (Conditions)
9.  Schleifen (Loops)
10. Textadventure

Jede Lektion enthält:

-   Eine Definition des Konzepts
-   Beispiele zur Verwendung
-   Praktische Übungen mit verschiedenen Schwierigkeitsgraden

## Befehle

1.  `npm install` - Installiert alle notwendigen Dateien
2.  `npm run dev` - Um die Anwendung lokal in einem Webbrowser auszuführen
3.  `npm run build` - Erstellt eine `dist`-Datei, in der alle Dateien gespeichert werden
4.  `npm start` - Für kurze Tests
5.  `npx electron-packager . PythonLernApp --platform=win32 --arch=x64 --out=release-build --overwrite` - Um eine ausführbare Datei zu erstellen
6.  npm run dist - Für eine ausführbare .exe datei zuerstellen (Installations.exe datei ausführen und alles wird automatisch installiert)

## Komponenten

### `CodeEditor.tsx`

-   Stellt einen interaktiven Code-Editor zur Verfügung.
-   Verwendet den Monaco Editor für Syntax-Highlighting und Autovervollständigung.
-   Ermöglicht das Ausführen von Python-Code direkt im Browser mit Pyodide.
-   Props:
    -   `code`: Der aktuelle Code im Editor.
    -   `setCode`: Funktion zum Aktualisieren des Codes.
    -   `onRun`: Funktion zum Ausführen des Codes.

### `LessonContent.tsx`

-   Zeigt den Inhalt der ausgewählten Lektion an.
-   Unterstützt Textinhalte, Beispiele und Aufgabenstellungen.
-   Verwendet die in `lessons/index.tsx` definierten Lektionen und Unterlektionen.
-   Props:
    -   `topic`: Die ID der aktuellen Lektion.
    -   `selectedSubLesson`: Die ID der ausgewählten Unterlektion.
    -   `learningStyle`: Der ausgewählte Lernstil ('text' oder 'interactive').
    -   `isError`: Ein Flag, das angibt, ob ein Fehler aufgetreten ist.
    -   `onErrorCountChange`: Funktion zum Melden der Fehleranzahl.
    -   `initialCode`: Der initiale Code für die Unterlektion.

### `Navigation.tsx`

-   Zeigt die Navigationsleiste mit der Liste der Lektionen und Unterlektionen an.
-   Ermöglicht die Auswahl von Lektionen und Unterlektionen.
-   Props:
    -   `selectedTopic`: Die ID des aktuell ausgewählten Themas.
    -   `setSelectedTopic`: Funktion zum Setzen des ausgewählten Themas.
    -   `selectedSubLesson`: Die ID der aktuell ausgewählten Unterlektion.
    -   `setSelectedSubLesson`: Funktion zum Setzen der ausgewählten Unterlektion.
    -   `lessons`: Ein Array von Lektionen.

### `App.tsx`

-   Die Hauptkomponente der Anwendung.
-   Verwaltet den Zustand der Anwendung, einschließlich der ausgewählten Lektion, des Codes, der Ausgabe und des Lernstils.
-   Initialisiert Pyodide und führt den Code aus.
-   Stellt die Hauptstruktur der Anwendung dar, einschließlich Navigation, Code-Editor und Lektionsinhalte.

## Lektionsdetails

Die Lektionen sind in einzelne Dateien unter `src/lessons/` organisiert. Jede Lektion enthält Definitionen, Beispiele und eine oder mehrere Unterlektionen mit Aufgaben.

### Beispiele für Lektionen:

#### `conditions.tsx`

-   Thema: Verzweigungen (Bedingungen)
-   Enthält Unterlektionen zu `if`, `else` und `elif`-Anweisungen.
-   Beispiel:

    ```python
    zahl = 10
    if zahl > 5:
        print("Die Zahl ist groß.")
    elif zahl == 5:
        print("Die Zahl ist mittel.")
    else:
        print("Die Zahl ist klein.")
    ```

#### `dictionaries.tsx`

-   Thema: Dictionaries
-   Erklärt, wie man Dictionaries erstellt, auf Elemente zugreift und sie verändert.
-   Beispiel:

    ```python
    telefonbuch = {"Anna": "12345", "Ben": "67890"}
    print(telefonbuch["Anna"])  # Ausgabe: 12345
    ```

#### `errors.tsx`

-   Thema: Fehlerausgaben
-   Behandelt verschiedene Arten von Fehlern in Python und wie man sie behebt.
-   Beispiel:

    ```
    print("Hallo
          ^
    SyntaxError: unterminated string literal (detected at line 1)
    ```

#### `functions.tsx`

-   Thema: Funktionen
-   Erklärt, wie man Funktionen definiert und aufruft.
-   Beispiel:

    ```python
    def begruessung():  # Funktion mit dem Namen "begruessung"
        sag = "Hallo!"  # Code-Block der Funktion
        return sag      # Rückgabewert der Funktion
    print(begruessung())  # Aufruf der Funktion
    ```

#### `input.tsx`

-   Thema: Input-Befehle
-   Zeigt, wie man Benutzereingaben entgegennimmt.
-   Beispiel:

    ```python
    name = input("Wie heißt du? ")
    alter = int(input("Wie alt bist du?"))
    print(f"Hallo, {name} du bist {alter}!")
    ```

usw.
