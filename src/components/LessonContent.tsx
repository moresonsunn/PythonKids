import { 
  CircleDot,
  Code2,
  ListOrdered,
  Terminal, 
  AlertCircle,
  KeyRound,
  GitFork,
  Repeat,
  RotateCw
} from 'lucide-react';
import { useState, useEffect } from 'react';

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
  {
    id: 'variables',
    title: 'Variablen',
    icon: CircleDot,
    definition: 'Variablen sind wie Behälter, in denen du Informationen speicherst, um sie später im Programm zu verwenden. \
                Sie haben Namen, die du festlegst, und sie können verschiedene Arten von Daten speichern, wie Zahlen, Texte oder sogar Listen.',
    functions: 'Einen Namen für die Variable auswählen (z. B. alter, name, punkte). \
                Den Wert der Variable mit einem Gleichheitszeichen = zuweisen.',
    Example: 'zahl = 10  # Speichert die Zahl 10 in der Variable "zahl" \n\
text = "Hallo, Welt!"  # Speichert den Text in der Variable "text" \n\
ist_wahr = True  # Speichert einen Wahrheitswert',
    subLessons: [
      {
        id: 'variables-1',
        title: 'Erste Schritte mit Variablen',
        difficulty: 'Leicht',
        content: 'Lerne wie man Variablen erstellt und verwendet.',
        initialCode: 'name = "Max"\nprint(name)',
        task: 'Erstelle eine Variable mit deinem Namen',
        solution: 'name = "Dein Name"\nprint(name)',
        hint: 'Denk an die Anführungszeichen bei Text!'
      },
      {
        id: 'variables-2',
        title: 'Rechnen mit Variablen',
        difficulty: 'Mittel',
        content: 'Mathematische Operationen mit Variablen.',
        initialCode: 'zahl1 = 5\nzahl2 = 3',
        task: 'Addiere die beiden Zahlen',
        solution: 'ergebnis = zahl1 + zahl2\nprint(ergebnis)',
        hint: 'Nutze den Plus-Operator'
      },
      {
        id: 'variables-3',
        title: 'Variablen kombinieren',
        difficulty: 'Schwer',
        content: 'Text und Zahlen zusammen verwenden.',
        initialCode: 'alter = 10\nname = "Max"',
        task: 'Erstelle einen Satz mit Name und Alter',
        solution: 'print(f"{name} ist {alter} Jahre alt")',
        hint: 'Nutze f-Strings mit {}'
      }
    ],
  },
  {
    id: 'functions',
    title: 'Funktionen',
    icon: Code2,
    definition: 'Funktionen sind kleine Programme innerhalb deines Programms. \
                Sie helfen dir, Code zu organisieren und wiederzuverwenden.',
    functions: 'Mit dem Schlüsselwort def gefolgt von einem Namen und einer Klammer, z. B.:',
    Example: 'def begruessung():  # Funktion mit dem Namen "hallo_welt"\n\
   print("Hallo!")  # Code-Block der Funktion',
    subLessons: [
      {
        id: 'functions-1',
        title: 'Funktionen erstellen',
        difficulty: 'Leicht',
        content: 'Funktionen sind wiederverwendbare Code-Blöcke.',
        initialCode: 'def hallo_welt():\n    print("Hallo Welt!")',
        task: 'Erstelle eine Funktion mit deinem Namen',
        solution: 'def mein_name():\n    print("Dein Name")',
        hint: 'Nutze def um eine Funktion zu erstellen'
      },
      {
        id: 'functions-2',
        title: 'Funktionen mit Parametern',
        difficulty: 'Mittel',
        content: 'Funktionen können Werte übergeben bekommen.',
        initialCode: 'def hallo(name):\n    print(f"Hallo {name}")',
        task: 'Erstelle eine Funktion die zwei Zahlen addiert',
        solution: 'def addiere(zahl1, zahl2):\n    print(zahl1 + zahl2)',
        hint: 'Nutze die Parameter in der Funktion'
      },
      {
        id: 'functions-3',
        title: 'Funktionen mit Rückgabewert',
        difficulty: 'Schwer',
        content: 'Funktionen können Werte zurückgeben.',
        initialCode: 'def multipliziere(zahl1, zahl2):\n    return zahl1 * zahl2',
        task: 'Erstelle eine Funktion die zwei Zahlen multipliziert',
        solution: 'def multipliziere(zahl1, zahl2):\n    return zahl1 * zahl2',
        hint: 'Nutze return um einen Wert zurückzugeben'
      }
    ],
  },
  {
    id: 'Lists',
    title: 'Listen',
    icon: ListOrdered,
    definition: 'Listen sind wie eine Sammlung von Dingen, die du in \
                einer bestimmten Reihenfolge speichern kannst. Sie können \
                Zahlen, Texte oder sogar andere Listen enthalten. \n\
                Der Index einer Liste beginnt bei 0, d. h. \
                das erste Element hat den Index 0, das zweite den Index 1 usw. \n\
                Du kannst Elemente ändern, hinzufügen oder löschen.',
    functions: 'Eine Liste mit eckigen Klammern [] erstellen, z. B.:',
    Example: 'lieblingsessen = ["Pizza", "Burger", "Pasta"] \n\
print(lieblingsessen[0])  # Ausgabe: Pizza \n\
lieblingsessen.append("Salat")  # Fügt ein neues Element hinzu',
    subLessons: [
      {
        id: 'lists-1',
        title: 'Listen erstellen',
        difficulty: 'Leicht',
        content: 'Lerne wie man Listen erstellt und verwendet.',
        initialCode: 'namen = ["Max", "Moritz", "Erika"]\nprint(namen)',
        task: 'Erstelle eine Liste mit deinen Lieblingsfarben',
        solution: 'farben = ["Rot", "Grün", "Blau"]\nprint(farben)',
        hint: 'Nutze eckige Klammern []'
      },
      {
        id: 'lists-2',
        title: 'Elemente aus Listen auswählen',
        difficulty: 'Mittel',
        content: 'Einzelne Elemente aus Listen auswählen.',
        initialCode: 'farben = ["Rot", "Grün", "Blau"]',
        task: 'Wähle das erste Element aus der Liste aus',
        solution: 'print(farben[0])',
        hint: 'Nutze denn Index des Elements'
      },
      {
        id: 'lists-3',
        title: 'Listen verändern',
        difficulty: 'Schwer',
        content: 'Elemente hinzufügen, entfernen und verändern.',
        initialCode: 'farben = ["Rot", "Grün", "Blau"]',
        task: 'Füge der Liste eine weitere Farbe hinzu',
        solution: 'farben.append("Gelb")\nprint(farben)',
        hint: 'Nutze dafür die Methode append()'
      },
    ],
  },
  {
    id: 'operators',
    title: 'Operatoren',
    icon: Terminal,
    subLessons: [
      {
        id: 'operators-1',
        title: 'Rechenoperatoren',
        difficulty: 'Leicht',
        content: 'Die Grundrechenarten in Python.',
        initialCode: 'zahl1 = 5\nzahl2 = 3',
        task: 'Multipliziere die beiden Zahlen',
        solution: 'ergebnis = zahl1 * zahl2\nprint(ergebnis)',
        hint: 'Nutze den Stern-Operator'
      },
      {
        id: 'operators-2',
        title: 'Vergleichsoperatoren',
        difficulty: 'Mittel',
        content: 'Vergleiche Werte miteinander.',
        initialCode: 'zahl1 = 5\nzahl2 = 3',
        task: 'Vergleiche ob die Zahlen gleich sind',
        solution: 'print(zahl1 == zahl2)',
        hint: 'Nutze den doppelten Gleichheitszeichen'
      },
      {
        id: 'operators-3',
        title: 'Logische Operatoren',
        difficulty: 'Schwer',
        content: 'Verknüpfe Bedingungen miteinander.',
        initialCode: 'zahl1 = 5\nzahl2 = 3',
        task: 'Überprüfe ob beide Zahlen größer als 0 sind',
        solution: 'print(zahl1 > 0 and zahl2 > 0)',
        hint: 'Nutze das Schlüsselwort and'
      }
    ],
  },
  {
    id: 'errors',
    title: 'Fehlerausgaben',
    icon: AlertCircle,
    subLessons: [
      {
        id: 'errors-1',
        title: 'Syntaxfehler',
        difficulty: 'Leicht',
        content: 'Fehlermeldungen in Python verstehen.',
        initialCode: 'print("Hallo Welt")',
        task: 'Füge einen Syntaxfehler hinzu',
        solution: 'print("Hallo Welt"',
        hint: 'Vergiss nicht die schließende Klammer'
      },
      {
        id: 'errors-2',
        title: 'Laufzeitfehler',
        difficulty: 'Mittel',
        content: 'Fehler während der Ausführung des Programms.',
        initialCode: 'zahl = 5\nprint(zahl / 0)',
        task: 'Füge einen Laufzeitfehler hinzu',
        solution: 'zahl = 5\nprint(zahl / 0)',
        hint: 'Teile durch 0'
      },
      {
        id: 'errors-3',
        title: 'Logikfehler',
        difficulty: 'Schwer',
        content: 'Fehler in der Logik des Programms.',
        initialCode: 'zahl = 5\nif zahl > 10:\n    print("Zahl ist größer als 10")',
        task: 'Füge einen Logikfehler hinzu',
        solution: 'zahl = 5\nif zahl < 10:\n    print("Zahl ist größer als 10")',
        hint: 'Ändere das Vergleichszeichen'
      }
    ],
  },
  {
    id: 'input',
    title: 'Input Befehle',
    icon: KeyRound,
    subLessons: [
      {
        id: 'input-1',
        title: 'Benutzereingaben',
        difficulty: 'Leicht',
        content: 'Eingaben vom Benutzer entgegennehmen.',
        initialCode: 'name = input("Wie heißt du?")\nprint(name)',
        task: 'Frage den Benutzer nach seinem Alter',
        solution: 'alter = input("Wie alt bist du?")\nprint(alter)',
        hint: 'Nutze die Funktion input()'
      },
      {
        id: 'input-2',
        title: 'Zahlen einlesen',
        difficulty: 'Mittel',
        content: 'Zahlenwerte vom Benutzer entgegennehmen.',
        initialCode: 'zahl = input("Gib eine Zahl ein")\nprint(zahl)',
        task: 'Lass den Benutzer zwei Zahlen addieren',
        solution: 'zahl1 = int(input("Gib die erste Zahl ein"))\nzahl2 = int(input("Gib die zweite Zahl ein"))\nprint(zahl1 + zahl2)',
        hint: 'Nutze die Funktion int()'
      },
      {
        id: 'input-3',
        title: 'Text einlesen',
        difficulty: 'Schwer',
        content: 'Textwerte vom Benutzer entgegennehmen.',
        initialCode: 'text = input("Gib einen Text ein")\nprint(text)',
        task: 'Lass den Benutzer einen Satz eingeben',
        solution: 'satz = input("Gib einen Satz ein")\nprint(satz)',
        hint: 'Nutze die Funktion input()'
      }
    ],
  },
  {
    id: 'dictionaries',
    title: 'Dictionaries',
    icon: RotateCw,
    subLessons: [
      {
        id: 'dictionaries-1',
        title: 'Dictionaries erstellen',
        difficulty: 'Leicht',
        content: 'Schlüssel-Wert-Paare in Python.',
        initialCode: 'person = {"name": "Max", "alter": 30}\nprint(person)',
        task: 'Erstelle ein Dictionary mit deinen Lieblingsfarben',
        solution: 'farben = {"rot": "#ff0000", "grün": "#00ff00", "blau": "#0000ff"}\nprint(farben)',
        hint: ' Nutze geschweifte Klammern {}'
      },
      {
        id: 'dictionaries-2',
        title: 'Elemente aus Dictionaries auswählen',
        difficulty: 'Mittel',
        content: 'Einzelne Elemente aus Dictionaries auswählen.',
        initialCode: 'farben = {"rot": "#ff0000", "grün": "#00ff00", "blau": "#0000ff"}',
        task: 'Wähle die Farbe Grün aus dem Dictionary aus',
        solution: 'print(farben["grün"])',
        hint: ' Nutze den Schlüssel des Elements'
      },
      {
        id: 'dictionaries-3',
        title: 'Dictionaries verändern',
        difficulty: 'Schwer',
        content: 'Elemente hinzufügen, entfernen und verändern.',
        initialCode: 'farben = {"rot": "#ff0000", "grün": "#00ff00", "blau": "#0000ff"}',
        task: 'Füge dem Dictionary eine weitere Farbe hinzu',
        solution: 'farben["gelb"] = "#ffff00"\nprint(farben)',
        hint: 'Nutzte den Schlüssel zum Hinzufügen'
      },
    ],
  },
  {
    id: 'conditions',
    title: 'Verzweigungen',
    icon: GitFork,
    subLessons: [
      {
        id: 'conditions-1',
        title: 'If-Verzweigungen',
        difficulty: 'Leicht',
        content: 'Einfache Bedingungen in Python.',
        initialCode: 'zahl = 5\nif zahl > 0:\n    print("Zahl ist größer als 0")',
        task: 'Füge eine weitere Bedingung hinzu',
        solution: 'zahl = 5\nif zahl > 0:\n    print("Zahl ist größer als 0")\nif zahl < 10:\n    print("Zahl ist kleiner als 10")',
        hint: 'Nutze das Schlüsselwort if'
      },
      {
        id: 'conditions-2',
        title: 'Else-Verzweigungen',
        difficulty: 'Mittel',
        content: 'Zweigungen mit else und elif.',
        initialCode: 'zahl = 5\nif zahl > 10:\n    print("Zahl ist größer als 10")\nelse:\n    print("Zahl ist kleiner oder gleich 10")',
        task: 'Füge eine elif-Bedingung hinzu',
        solution: 'zahl = 5\nif zahl > 10:\n    print("Zahl ist größer als 10")\nelif zahl < 10:\n    print("Zahl ist kleiner als 10")',
        hint: 'Nutze das Schlüsselwort elif'
      },
      {
        id: 'conditions-3',
        title: 'Bedingungen kombinieren',
        difficulty: 'Schwer',
        content: 'Mehrere Bedingungen miteinander verknüpfen.',
        initialCode: 'zahl = 5\nif zahl > 0 and zahl < 10:\n    print("Zahl ist zwischen 0 und 10")',
        task: 'Füge eine weitere Bedingung hinzu',
        solution: 'zahl = 5\nif zahl > 0 and zahl < 10:\n    print("Zahl ist zwischen 0 und 10")\nif zahl % 2 == 0:\n    print("Zahl ist gerade")',
        hint: 'Nutze das Prozentzeichen für den Modulo-Operator'
      },
    ],
  },
  {
    id: 'loops',
    title: 'Schleifen',
    icon: Repeat,
    subLessons: [
      {
        id: 'loops-1',
        title: 'For-Schleifen',
        difficulty: 'Leicht',
        content: 'Schleifen mit einer festen Anzahl an Durchläufen.',
        initialCode: 'for zahl in range(5):\n    print(zahl)',
        task: 'Gebe die Zahlen von 1 bis 5 aus',
        solution: 'for zahl in range(1, 6):\n    print(zahl)',
        hint: 'Nutze range(1, 6) für die Zahlen von 1 bis 5'
      },
      {
        id: 'loops-2',
        title: 'While-Schleifen',
        difficulty: 'Mittel',
        content: 'Schleifen mit einer Bedingung.',
        initialCode: 'zahl = 1\nwhile zahl <= 5:\n    print(zahl)\n    zahl += 1',
        task: 'Gebe die Zahlen von 5 bis 1 aus',
        solution: 'zahl = 5\nwhile zahl >= 1:\n    print(zahl)\n    zahl -= 1',
        hint: 'Vergiss nicht die Abbruchbedingung'
      },
      {
        id: 'loops-3',
        title: 'Schleifen abbrechen',
        difficulty: 'Schwer',
        content: 'Schleifen vorzeitig beenden.',
        initialCode: 'for zahl in range(10):\n    if zahl == 5:\n        break\n    print(zahl)',
        task: 'Beende die Schleife wenn die Zahl 3 erreicht ist',
        solution: 'for zahl in range(10):\n    if zahl == 3:\n        break\n    print(zahl)',
        hint: 'Nutzte das Schlüsselwort break'
      },
    ],
  },
];

interface LessonContentProps {
  topic: string;
  selectedSubLesson: string;
  learningStyle: 'text' | 'interactive';
  output: string;  
  isError: boolean;
  onErrorCountChange: (count: number) => void; 
}

export default function LessonContent({ 
  topic, 
  selectedSubLesson,
  learningStyle,
  output,
  isError,
  onErrorCountChange 
}: LessonContentProps) {
  const [showHint, setShowHint] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (isError) {
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);
      onErrorCountChange(newErrorCount);
    }
  }, [output, isError]);

  useEffect(() => {
    setShowHint(false);
    setErrorCount(0);
    onErrorCountChange(0);
  }, [topic, selectedSubLesson]);

  const currentLesson = lessons.find(lesson => lesson.id === topic);
  const currentSubLesson = currentLesson?.subLessons.find(sub => sub.id === selectedSubLesson);

  if (!currentLesson) {
    return <div>Lektion nicht gefunden</div>;
  }

  if (learningStyle === 'text') {
    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-md">
          <h4 className="font-bold text-purple-700 mb-2">Was sind {currentLesson.title}?</h4>
          <p className="text-gray-700">{currentLesson.definition}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-bold text-blue-700 mb-2">Wie funktioniert das?</h4>
          <p className="text-gray-700">{currentLesson.functions}</p>
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
        <p className="mb-4">{currentSubLesson.task}</p>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Deine Aufgabe:</h3>
      <div className="bg-gray-50 p-4 rounded-md">
        <pre className="text-sm">{currentSubLesson.task}</pre>
        {!showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Terminal className="h-4 w-4 mr-2" />
            Hilfe
          </button>
        )}
        {(showHint || errorCount >= 2) && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md animate-fade-in">
            <p className="text-sm text-gray-600">{currentSubLesson.hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}