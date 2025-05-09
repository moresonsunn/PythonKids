import { KeyRound } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const input: Lesson = {
    id: 'input',
    title: 'Input Befehle',
    icon: KeyRound,
    definition: 'Der input()-Befehl erlaubt es, Benutzereingaben in das Programm aufzunehmen. Warum? Damit dein Programm interaktiv wird, kannst du den Benutzer um Eingaben bitten.',
    functions: 'Der input()-Befehl gibt den eingegebenen Wert als Zeichenkette zurück.',
    Example: 'name = input("Wie heißt du? ")\nalter = int(input("Wie alt bist du?"))\nprint(f"Hallo, {name} du bist {alter}!")',
    subLessons: [
      {
        id: 'input-1',
        title: 'Benutzereingaben',
        difficulty: 'Leicht',
        content: 'Eingaben vom Benutzer entgegennehmen.',
        initialCode: 'alter = ',
        task: 'Erstelle ein Programm, das dich nach deinem Alter fragt und es ausgibt.',
        solution: 'alter = int(input("Wie alt bist du?"))\nprint(alter)',
        hint: 'Nutze die Funktion input().'
      },
      {
        id: 'input-2',
        title: 'Zahlen einlesen',
        difficulty: 'Mittel',
        content: 'Zahlenwerte vom Benutzer entgegennehmen.',
        initialCode: 'zahl1 =\nzahl2 =',
        task: 'Erstelle ein Programm, wo du zwei Zahlen eingibst und sie addierst.',
        solution: 'zahl1 = int(input("Gib die erste Zahl ein"))\nzahl2 = int(input("Gib die zweite Zahl ein"))\nprint(zahl1 + zahl2)',
        hint: 'Nutze die Funktion int().'
      },
      {
        id: 'input-3',
        title: 'Text einlesen',
        difficulty: 'Schwer',
        content: 'Textwerte vom Benutzer entgegennehmen.',
        initialCode: 'name = \nalter = ',
        task: 'Frage denn Benutzer nach seinem Namen und alter und gib beides aus.',
        solution: 'name = input("Wie heißt du?")\nalter = int(input("Wie alt bist du?"))\nprint(f"Hallo, {name} du bist {alter}!")',
        hint: 'Nutze die Funktion input().'
      }
    ],
  };