import { ListOrdered } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const lists: Lesson = {
    id: 'lists',
    title: 'Listen',
    icon: ListOrdered,
    definition: 'Listen sind wie eine Sammlung von Dingen, die du in einer bestimmten Reihenfolge speichern kannst. Sie können Zahlen, Texte oder sogar andere Listen enthalten. Der Index einer Liste beginnt bei 0, d. h. das erste Element hat den Index 0, das zweite den Index 1 usw. Du kannst Elemente ändern, hinzufügen oder löschen.',
    functions: 'Eine Liste mit eckigen Klammern [] erstellen, z. B.:',
    Example: 'lieblingsessen = ["Pizza", "Burger", "Pasta"]\nprint(lieblingsessen[0])  # Ausgabe: Pizza\nlieblingsessen.append("Salat")  # Fügt ein neues Element hinzu',
    subLessons: [
      {
        id: 'lists-1',
        title: 'Listen erstellen',
        difficulty: 'Leicht',
        content: 'Lerne, wie man Listen erstellt und verwendet.',
        initialCode: 'namen = ["Max", "Moritz", "Erika"]\nprint(namen)',
        task: 'Erstelle eine Liste mit deinen Lieblingsfarben.',
        solution: 'farben = ["Rot", "Grün", "Blau"]\nprint(farben)',
        hint: 'Nutze eckige Klammern [] und vergiss nicht die Anführungszeichen.'
      },
      {
        id: 'lists-2',
        title: 'Elemente aus Listen auswählen',
        difficulty: 'Mittel',
        content: 'Einzelne Elemente aus Listen auswählen.',
        initialCode: 'farben = ["Rot", "Grün", "Blau"]',
        task: 'Wähle das erste Element aus der Liste aus.',
        solution: 'print(farben[0])',
        hint: 'Nutze den Index des Elements in eckigen Klammern beim print.'
      },
      {
        id: 'lists-3',
        title: 'Listen verändern',
        difficulty: 'Schwer',
        content: 'Elemente hinzufügen, entfernen und verändern.',
        initialCode: 'farben = ["Rot", "Grün", "Blau"]',
        task: 'Füge der Liste eine weitere Farbe hinzu.',
        solution: 'farben.append("Gelb")\nprint(farben)',
        hint: 'Nutze dafür die Methode append().'
      },
    ],
  };