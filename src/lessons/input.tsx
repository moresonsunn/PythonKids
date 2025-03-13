import { KeyRound } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const input: Lesson = {
    id: 'input',
    title: 'Input Befehle',
    icon: KeyRound,
    definition: 'Der input()-Befehl erlaubt es, Benutzereingaben in das Programm aufzunehmen. Warum? Damit dein Programm interaktiv wird, kannst du den Benutzer um Eingaben bitten.',
    functions: 'Der input()-Befehl gibt den eingegebenen Wert als Zeichenkette zurück.',
    Example: 'name = input("Wie heißt du? ")\nprint(f"Hallo, {name}!")',
    subLessons: [
      {
        id: 'input-1',
        title: 'Benutzereingaben',
        difficulty: 'Leicht',
        content: 'Eingaben vom Benutzer entgegennehmen.',
        initialCode: 'name = input("Wie heißt du?")\nprint(name)',
        task: 'Frage den Benutzer nach seinem Alter.',
        solution: 'alter = input("Wie alt bist du?")\nprint(alter)',
        hint: 'Nutze die Funktion input().'
      },
      {
        id: 'input-2',
        title: 'Zahlen einlesen',
        difficulty: 'Mittel',
        content: 'Zahlenwerte vom Benutzer entgegennehmen.',
        initialCode: 'zahl = input("Gib eine Zahl ein")\nprint(zahl)',
        task: 'Lass den Benutzer zwei Zahlen addieren.',
        solution: 'zahl1 = int(input("Gib die erste Zahl ein"))\nzahl2 = int(input("Gib die zweite Zahl ein"))\nprint(zahl1 + zahl2)',
        hint: 'Nutze die Funktion int().'
      },
      {
        id: 'input-3',
        title: 'Text einlesen',
        difficulty: 'Schwer',
        content: 'Textwerte vom Benutzer entgegennehmen.',
        initialCode: 'text = input("Gib einen Text ein")\nprint(text)',
        task: 'Lass den Benutzer einen Satz eingeben.',
        solution: 'satz = input("Gib einen Satz ein")\nprint(satz)',
        hint: 'Nutze die Funktion input().'
      }
    ],
  };