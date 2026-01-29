import { AlertCircle } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const errors: Lesson = {
    id: 'errors',
    title: 'Fehlerausgaben',
    icon: AlertCircle,
    definition: 'Fehler sind Lernchancen: Die Meldung verrät dir Dateiname, Zeile und Fehlertyp.\n\
Ließ die letzte Zeile der Ausgabe besonders genau – hier steht meist die Lösungsidee.',
    functions: 'Typische Fehlerklassen:\n\
- SyntaxError: Python kann den Code nicht lesen (z. B. fehlendes Anführungszeichen).\n\
- ZeroDivisionError: Eine Division hat einen Null-Divisor.\n\
- ValueError/Logikfehler: Der Code läuft, aber deine Idee war falsch formuliert.',
    Example: '# Fehlersuche: Meldung lesen, Ursache ändern\nprint("Hallo")  # korrekt\nprint("Welt)   # SyntaxError, schließendes Anführungszeichen fehlt',
    subLessons: [
      {
        id: 'errors-1',
        title: 'Syntaxfehler',
        difficulty: 'Leicht',
        content: 'Korrigiere Schritt für Schritt, bis keine Fehlermeldung mehr auftaucht.',
        initialCode: 'print("Hallo Welt',
        task: 'Schließe die Zeichenkette korrekt, damit der Code läuft.',
        solution: 'print("Hallo Welt")',
        hint: 'Achte auf Paare: "Text" oder \'Text\'.'
      },
      {
        id: 'errors-2',
        title: 'Laufzeitfehler',
        difficulty: 'Mittel',
        content: 'Verhindere zur Laufzeit Situationen, die unmöglich sind (z. B. Teilen durch 0).',
        initialCode: 'zahl = 5\nprint(zahl / 0)',
        task: 'Verhindere die Division durch Null.',
        solution: 'zahl = 5\ndivisor = 1\nprint(zahl / divisor)',
        hint: 'Überprüfe die Werte, bevor du eine Operation ausführst.'
      },
      {
        id: 'errors-3',
        title: 'Logikfehler',
        difficulty: 'Schwer',
        content: 'Logikfehler erkennst du daran, dass zwar kein Fehler erscheint, aber das Ergebnis nicht stimmt.',
        initialCode: 'zahl = 5\nif zahl > 10:\n    print("Zahl ist größer als 10")',
        task: 'Passe die Bedingung an, damit sie für kleinere Zahlen ebenfalls reagiert.',
        solution: 'zahl = 5\nif zahl > 10:\n    print("Zahl ist größer als 10")\nelse:\n    print("Zahl ist 10 oder kleiner")',
        hint: 'Denke in Fällen: Was soll passieren, wenn die Bedingung nicht erfüllt ist?'
      }
    ],
  };