import { Terminal } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const operators: Lesson = {
    id: 'operators',
    title: 'Operatoren',
    icon: Terminal,
    definition: 'Operatoren sind Symbole, die Aktionen auf Werten ausführen. Es gibt verschiedene Arten: Rechenoperatoren: + (Addition), - (Subtraktion), * (Multiplikation), / (Division). Vergleichsoperatoren: == (gleich), != (ungleich), <, >, <=, >=. Logische Operatoren: and (und), or (oder), not (nicht).',
    functions: 'Operatoren werden in der Regel zwischen zwei Werten verwendet, z. B.:',
    Example: 'zahl1 = 10\nzahl2 = 5\nprint(zahl1 + zahl2)  # Ausgabe: 15\nprint(zahl1 > zahl2)  # Ausgabe: True',
    subLessons: [
      {
        id: 'operators-1',
        title: 'Rechenoperatoren',
        difficulty: 'Leicht',
        content: 'Die Grundrechenarten in Python.',
        initialCode: 'zahl1 = 7\nzahl2 = 3',
        task: 'Multipliziere die beiden Zahlen.',
        solution: 'ergebnis = zahl1 * zahl2\nprint(ergebnis)',
        hint: 'Nutze den Stern-Operator.'
      },
      {
        id: 'operators-2',
        title: 'Vergleichsoperatoren',
        difficulty: 'Mittel',
        content: 'Vergleiche Werte miteinander.',
        initialCode: 'zahl1 = 5\nzahl2 = 3',
        task: 'Vergleiche, ob die Zahlen gleich sind.',
        solution: 'print(zahl1 == zahl2)',
        hint: 'Nutze den doppelten Gleichheitszeichen.'
      },
      {
        id: 'operators-3',
        title: 'Logische Operatoren',
        difficulty: 'Schwer',
        content: 'Verknüpfe Bedingungen miteinander.',
        initialCode: 'zahl1 = 5\nzahl2 = 3',
        task: 'Überprüfe, ob beide Zahlen größer als 0 sind.',
        solution: 'print(zahl1 > 0 and zahl2 > 0)',
        hint: 'Nutze das Schlüsselwort and.'
      }
    ],
  };