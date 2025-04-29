import { GitFork } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const conditions: Lesson = {
    id: 'conditions',
    title: 'Verzweigungen',
    icon: GitFork,
    definition:'Mit Bedingungen kannst du steuern, was dein Programm tun soll, abhängig von bestimmten Eingaben oder Zuständen.\n\
\n\
if Bedingung: \n\
    Befehl\n\
elif Andere_Bedingung:\n\
    Anderer_Befehl\n\
else:\n\
    Standard_Befehl',
    functions: 'if: Führt den Codeblock aus, wenn die Bedingung wahr ist.\n\
elif: Führt den Codeblock aus, wenn die vorherige Bedingung falsch ist.\n\
else: Führt den Codeblock aus, wenn keine der Bedingungen wahr ist.',
    Example:'zahl = 10 \n\
if zahl > 5: \n\
| | print("Die Zahl ist groß.") \n\
elif zahl == 5:\n\
| | print("Die Zahl ist mittel.")\n\
else:\n\
| | print("Die Zahl ist klein.")',
    subLessons: [
      {
        id: 'conditions-1',
        title: 'If-Verzweigungen',
        difficulty: 'Leicht',
        content: 'Einfache Bedingungen in Python.',
        initialCode: 'zahl = 5\nif zahl > 0:\n    print("Zahl ist größer als 0")',
        task: 'Füge eine weitere Bedingung hinzu',
        solution: 'zahl = 10\nif zahl > 5:\n    print("Zahl ist größer als 0")\nif zahl < 10:\n    print("Zahl ist kleiner als 10")',
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
  };