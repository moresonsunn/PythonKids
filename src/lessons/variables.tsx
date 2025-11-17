import { CircleDot } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const variables: Lesson = {
  id: 'variables',
  title: 'Variablen',
  icon: CircleDot,
  definition: 'Variablen sind benannte Speicherplätze im Arbeitsspeicher.\n\
Sie ermöglichen dir, ein Ergebnis zwischenzuspeichern, mit ihm zu rechnen\n\
oder es an anderer Stelle wiederzuverwenden.',
  functions: 'Gute Praxis:\n\
- Wähle sprechende Namen (z. B. punkte_stand).\n\
- Mit = weist du den Wert zu und kannst ihn später überschreiben.\n\
- print() macht sichtbar, was aktuell gespeichert ist.',
  Example: 'name = "Lina"\nlieblingszahl = 7\nname = name.upper()  # Variablen können angepasst werden\nprint(f"Hallo {name}, meine Zahl ist {lieblingszahl}")',
  subLessons: [
    {
      id: 'variables-1',
      title: 'Erste Schritte mit Variablen',
      difficulty: 'Leicht',
      content: 'Trainiere, einen Text sauber zu speichern und wieder auszugeben.',
      initialCode: 'username = ',
      task: 'Speichere deinen Namen in der Variable "username" und gib "Willkommen, <Name>!" aus.',
      solution: 'username = "Mia"\nprint(f"Willkommen, {username}!")',
      hint: 'Lege zuerst die Variable an, dann kannst du sie in einem f-String wiederverwenden.'
    },
    {
      id: 'variables-2',
      title: 'Rechnen mit Variablen',
      difficulty: 'Mittel',
      content: 'Sammle Messwerte oder Ergebnisse in Zahlenvariablen.',
      initialCode: 'tage_geuebt = ',
      task: 'Speichere, wie viele Tage du diese Woche geübt hast, und gib "Tage geübt: X" aus.',
      solution: 'tage_geuebt = 5\nprint(f"Tage geübt: {tage_geuebt}")',
      hint: 'Zahlen werden ohne Anführungszeichen geschrieben, sonst wären sie Texte.'
    },
    {
      id: 'variables-3',
      title: 'Variablen kombinieren',
      difficulty: 'Schwer',
      content: 'Beschreibe eine Situation durch mehrere Werte und verknüpfe sie.',
      initialCode: 'name = \nalter = ',
      task: 'Kombiniere zwei Variablen zu einem Satz wie "Mia ist 11 Jahre alt".',
      solution: 'name = "Mia"\nalter = 11\nprint(f"{name} ist {alter} Jahre alt")',
      hint: 'Mit f-Strings kannst du mehrere gespeicherte Werte in einem Satz kombinieren.'
    }
  ],
};
