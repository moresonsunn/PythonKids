import { KeyRound } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const input: Lesson = {
    id: 'input',
    title: 'Input Befehle',
    icon: KeyRound,
  definition: 'Mit input() führst du einen Dialog zwischen Mensch und Programm.\n\
Du bekommst immer einen Text zurück und entscheidest selbst, wie du ihn weiterverarbeitest.',
  functions: 'Grundmuster:\n\
antwort = input("Frage: ")  # liefert einen String\n\
zahl = int(input("Zahl? "))  # in eine Zahl umwandeln\n\
Optional kannst du Eingaben prüfen, bevor du weiterrechnest.',
  Example: 'name = input("Wie heißt du? ")\nlieblingszahl = int(input("Lieblingszahl? "))\nprint(f"Hallo {name}, deine Zahl mal 2 ist {lieblingszahl * 2}")',
    subLessons: [
      {
        id: 'input-1',
        title: 'Benutzereingaben',
        difficulty: 'Leicht',
        content: 'Frage nach einem Text und formuliere eine Antwort daraus.',
        initialCode: '',
        task: 'Frage nach dem Namen des Benutzers und gib "Hallo, <Name>!" aus.',
        solution: 'name = input("Wie heißt du? ")\nprint(f"Hallo, {name}!")',
        hint: 'Speichere die Eingabe zuerst, sonst kannst du sie nicht mehrfach verwenden.'
      },
      {
        id: 'input-2',
        title: 'Zahlen einlesen',
        difficulty: 'Mittel',
        content: 'Numerische Eingaben müssen konvertiert werden, bevor du rechnen kannst.',
        initialCode: '',
        task: 'Frage nach zwei Zahlen und gib "Summe: X" aus.',
        solution: 'zahl1 = int(input("Erste Zahl: "))\nzahl2 = int(input("Zweite Zahl: "))\nprint(f"Summe: {zahl1 + zahl2}")',
        hint: 'Nutze int(), damit aus dem Text eine echte Zahl wird.'
      },
      {
        id: 'input-3',
        title: 'Text einlesen',
        difficulty: 'Schwer',
        content: 'Gib mehreren Antworten Platz und führe sie sinnvoll zusammen.',
        initialCode: '',
        task: 'Frage nach dem Lieblingsspiel und wie viele Stunden pro Woche es gespielt wird. Gib beides in einem Satz aus.',
        solution: 'spiel = input("Welches Spiel spielst du am liebsten? ")\nstunden = int(input("Wie viele Stunden pro Woche? "))\nprint(f"{spiel} spielst du {stunden} Stunden pro Woche.")',
        hint: 'F-Strings erlauben dir, Text und gerechnete Ergebnisse in einem Satz zu verbinden.'
      }
    ],
  };