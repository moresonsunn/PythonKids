import { CircleDot } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const variables: Lesson = {
  id: 'variables',
  title: 'Variablen',
  icon: CircleDot,
  definition: 'Variablen sind wie Behälter, in denen du Informationen speicherst, um sie später im Programm zu verwenden. Sie haben Namen, die du festlegst, und sie können verschiedene Arten von Daten speichern, wie Zahlen (Int), Texte (Str) oder sogar Listen.',
  functions: 'Einen Namen für die Variable auswählen (z. B. alter, name, punkte).\nDann einen Wert der Variable mit einem Gleichheitszeichen "=" zuweisen.',
  Example: 'zahl = 10  # Speichert die Zahl 10 in der Variable "zahl"\ntext = "Hallo, Welt!"  # Speichert den Text in der Variable "text"\nist_wahr = True  # Speichert einen Wahrheitswert\nprint(text) # Ausgabe: Hallo, Welt!\nprint(f"Die Zahl ist {zahl}") # Ausgabe: Die Zahl ist 10',
  subLessons: [
    {
      id: 'variables-1',
      title: 'Erste Schritte mit Variablen',
      difficulty: 'Leicht',
      content: 'Lerne, wie man Variablen erstellt und verwendet.',
      initialCode: 'name = "Max"\nprint(name)',
      task: 'Erstelle eine Variable mit deinem Namen und gebe sie aus, so dass dein Name ausgegeben wird.',
      solution: 'name = "Dein Name"\nprint(name)',
      hint: 'Denk an die Anführungszeichen beim Text!'
    },
    {
      id: 'variables-2',
      title: 'Rechnen mit Variablen',
      difficulty: 'Mittel',
      content: 'Mathematische Operationen mit Variablen.',
      initialCode: 'zahl1 = 5\nzahl2 = 3\nprint(zahl1 + zahl2)',
      task: 'Addiere die beiden Zahlen 10 und 20 und gebe das Ergebnis aus.',
      solution: 'zahl1 = 10\nzahl2 = 20\nergebnis = zahl1 + zahl2\nprint(ergebnis)',
      hint: 'Nutze den Plus-Operator.'
    },
    {
      id: 'variables-3',
      title: 'Variablen kombinieren',
      difficulty: 'Schwer',
      content: 'Text und Zahlen zusammen verwenden.',
      initialCode: 'alter = 10\nname = "Max"',
      task: 'Erstelle zwei Variablen, z.B. name und alter, und gebe sie aus.',
      solution: 'name = "Max"\nalter = 10\nprint(f"{name} ist {alter} Jahre alt")',
      hint: 'Nutze f-Strings mit {}.'
    }
  ],
};
