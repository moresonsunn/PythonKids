import React from 'react';

interface LessonContentProps {
  topic: string;
  learningStyle: string;
}

function LessonContent({ topic, learningStyle }: LessonContentProps) {
  const lessons = {
    variables: {
      title: "Variablen in Python",
      text: "Variablen sind wie Behälter, in denen du Werte speichern kannst.",
      interactive: {
        task: "Erstelle eine Variable name und speichere deinen Namen darin.",
        example: 'name = "Max"\nprint(name)',
        game: "Hilf dem Roboter, sich Namen zu merken!"
      }
    },
    functions: {
      title: "Funktionen",
      text: "Funktionen sind wie kleine Helfer, die bestimmte Aufgaben für dich erledigen.",
      interactive: {
        task: "Schreibe eine Funktion, die 'Hallo' sagt.",
        example: 'def sage_hallo():\n    print("Hallo")',
        game: "Programmiere einen Roboter, der Aufgaben ausführt!"
      }
    },
  lists: {
    title: "Listen in Python",
    text: "Listen sind wie Behälter, in denen du mehrere Werte speichern kannst.",
    interactive: {
      task: "Erstelle eine Liste mit deinen Lieblingsobstsorten.",
      example: 'obst = ["Apfel", "Banane", "Orange"]\nprint(obst)',
      game: "Hilf dem Roboter, Gegenstände in Kisten zu sortieren!"
    }
  },
  operators: {
    title: "Operatoren",
    text: "Operatoren sind wie mathematische Symbole, mit denen du Berechnungen durchführen kannst.",
    interactive: {
      task: "Berechne das Ergebnis von 5 + 3 * 2.",
      example: 'ergebnis = 5 + 3 * 2\nprint(ergebnis)',
      game: "Löse Matheaufgaben, um den Roboter durch ein Labyrinth zu führen!"
    }
  },
  errors: {
    title: "Fehlerausgabe",
    text: "Fehlerausgaben helfen dir zu verstehen, was in deinem Code nicht funktioniert.",
    interactive: {
      task: "Finde den Fehler im folgenden Code: print('Hallo Welt'",
      example: 'print("hello world" \n     ^ SyntaxError: ( was never closed',
      game: "Hilf dem Roboter, Bugs in seinem System zu finden und zu beheben!"
    }
  },
  input: {
    title: "Input Befehl",
    text: "Mit dem Input-Befehl kannst du Benutzereingaben in deinem Programm verwenden.",
    interactive: {
      task: "Frage nach dem Namen des Benutzers und begrüße ihn.",
      example: 'name = input("Wie heißt du? ")\nprint("Hallo,", name)',
      game: "Programmiere einen Roboter, der Fragen stellt und auf Antworten reagiert!"
    }
  },
  dictionaries: {
    title: "Dictionaries",
    text: "Dictionaries sind wie Wörterbücher, in denen du Werte mit Schlüsseln verknüpfen kannst.",
    interactive: {
      task: "Erstelle ein Dictionary mit Tiernamen und ihren Lauten.",
      example: 'tiere = {"Hund": "Wuff", "Katze": "Miau"}\nprint(tiere["Hund"])',
      game: "Hilf dem Roboter, eine Tierstimmen-Datenbank zu erstellen!"
    }
  },
  conditions: {
    title: "Verzweigungen",
    text: "Verzweigungen erlauben deinem Programm, verschiedene Wege einzuschlagen.",
    interactive: {
      task: "Schreibe eine Verzweigung, die prüft, ob eine Zahl positiv oder negativ ist.",
      example: 'zahl = 5\nif zahl > 0:\n    print("Positiv")\nelse:\n    print("Negativ")',
      game: "Führe den Roboter durch ein Labyrinth mit verschiedenen Wegen!"
    }
  },
  loops: {
    title: "Schleifen",
    text: "Schleifen helfen dir, Aktionen zu wiederholen, ohne den Code mehrmals zu schreiben.",
    interactive: {
      task: "Schreibe eine Schleife, die von 1 bis 5 zählt.",
      example: 'for i in range(1, 6):\n    print(i)',
      game: "Lass den Roboter eine bestimmte Strecke mehrmals ablaufen!"
    }
  },
  while: {
    title: "While-Schleifen",
    text: "While-Schleifen wiederholen Aktionen, solange eine Bedingung wahr ist.",
    interactive: {
      task: "Schreibe eine While-Schleife, die rückwärts von 5 bis 1 zählt.",
      example: 'zahl = 5\nwhile zahl > 0:\n    print(zahl)\n    zahl -= 1',
      game: "Hilf dem Roboter, eine Aufgabe so lange zu wiederholen, bis ein Ziel erreicht ist!"
    }
  }
};
  const currentLesson = lessons[topic as keyof typeof lessons];

  if (!currentLesson) {
    return <div>Lektion wird geladen...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentLesson.title}</h2>
      
      {learningStyle === 'text' ? (
        <div className="prose max-w-none">
          <p>{currentLesson.text}</p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Deine Aufgabe:</h3>
          <p className="mb-4">{currentLesson.interactive.task}</p>
          <div className="bg-gray-50 p-4 rounded-md">
            <pre className="text-sm">{currentLesson.interactive.example}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonContent;