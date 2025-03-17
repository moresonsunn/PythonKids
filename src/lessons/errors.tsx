import { AlertCircle } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const errors: Lesson = {
    id: 'errors',
    title: 'Fehlerausgaben',
    icon: AlertCircle,
    definition: 'Beim Programmieren passieren Fehler – und das ist völlig normal! Python hilft dir, diese Fehler zu finden, indem es dir anzeigt, was falsch ist und wo der Fehler liegt. Arten von Fehlern: Syntaxfehler: Falsche Schreibweise, z. B. fehlende Klammern oder Anführungszeichen. Logikfehler: Das Programm läuft, aber es tut nicht das, was du willst. Runtime-Fehler: Fehler, die während der Programmausführung auftreten, z. B. eine Division durch null.',
    functions: 'Python hilft dir: Es zeigt dir die Zeile des Fehlers und eine kurze Beschreibung, z. B.:',
    Example: 'print("Hallo\n      ^\nSyntaxError: unterminated string literal (detected at line 1)',
    subLessons: [
      {
        id: 'errors-1',
        title: 'Syntaxfehler',
        difficulty: 'Leicht',
        content: 'Fehlermeldungen in Python verstehen.',
        initialCode: 'print("Hallo Welt',
        task: 'Korrigiere den Syntaxfehler.',
        solution: 'print("Hallo Welt")',
        hint: 'Vergiss nicht die schließende Klammer.'
      },
      {
        id: 'errors-2',
        title: 'Laufzeitfehler',
        difficulty: 'Mittel',
        content: 'Fehler während der Ausführung des Programms.',
        initialCode: 'zahl = 5\nprint(zahl / 0)',
        task: 'Füge einen Laufzeitfehler hinzu.',
        solution: 'zahl = 5\nprint(zahl / 0)',
        hint: 'Teile durch 0.'
      },
      {
        id: 'errors-3',
        title: 'Logikfehler',
        difficulty: 'Schwer',
        content: 'Fehler in der Logik des Programms.',
        initialCode: 'zahl = 5\nif zahl > 10:\n    print("Zahl ist größer als 10")',
        task: 'Füge einen Logikfehler hinzu.',
        solution: 'zahl = 5\nif zahl < 10:\n    print("Zahl ist größer als 10")',
        hint: 'Ändere das Vergleichszeichen.'
      }
    ],
  };