import { ListOrdered } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const lists: Lesson = {
    id: 'lists',
    title: 'Listen',
    icon: ListOrdered,
  definition: 'Listen speichern mehrere Werte geordnet hintereinander. Du kannst sie durchsuchen, erweitern und nach Position sortieren.',
  functions: 'len(liste) zählt Einträge. append(x) hängt etwas hinten an. Mit eckigen Klammern wählst du ein Element über seinen Index.',
  Example: 'farben = ["rot", "blau", "grün"]\nprint(f"Erster Eintrag: {farben[0]}")\nfarben.append("gelb")\nprint(f"Alle Farben: {farben}")',
    subLessons: [
      {
        id: 'lists-1',
        title: 'Listen erstellen',
        difficulty: 'Leicht',
        content: 'Übe das Schreiben einer Liste mit mindestens drei Elementen.',
        initialCode: 'aufgaben = []\n',
        task: 'Erstelle eine Liste mit drei Hausaufgaben und gib die Liste aus.',
        solution: 'aufgaben = ["Mathe", "Deutsch", "Englisch"]\nprint(aufgaben)',
        hint: 'Zwischen den Elementen stehen Kommas, die gesamte Liste steckt in [].'
      },
      {
        id: 'lists-2',
        title: 'Elemente aus Listen auswählen',
        difficulty: 'Mittel',
        content: 'Wähle ein Element per Index aus.',
        initialCode: 'aufgaben = ["Mathe", "Deutsch", "Englisch"]',
        task: 'Gib das zweite Element aus der Liste aus.',
        solution: 'print(aufgaben[1])',
        hint: 'Denke daran: liste[0] erstes Element, liste[1] zweites Element.'
      },
      {
        id: 'lists-3',
        title: 'Listen verändern',
        difficulty: 'Schwer',
        content: 'Erweitere deine Liste gezielt, ohne die vorhandenen Werte zu überschreiben.',
        initialCode: 'aufgaben = ["Mathe", "Deutsch"]',
        task: 'Füge "Sport" zur Liste hinzu und gib die Liste aus.',
        solution: 'aufgaben.append("Sport")\nprint(aufgaben)',
        hint: 'Mit append() hängst du ein neues Element ans Ende der Liste.'
      },
    ],
  };