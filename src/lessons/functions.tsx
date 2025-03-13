import { Code2 } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const functions: Lesson = {
    id: 'functions',
    title: 'Funktionen',
    icon: Code2,
    definition: 'Funktionen sind kleine Programme innerhalb deines Programms. Sie helfen dir, Code zu organisieren und wiederzuverwenden.',
    functions: 'Mit dem Schlüsselwort def gefolgt von einem Namen und einer Klammer, z. B.:',
    Example: 'def begruessung():  # Funktion mit dem Namen "begruessung"\n   print("Hallo!")  # Code-Block der Funktion\n   return("Hallo!") # Rückgabewert der Funktion',
    subLessons: [
      {
        id: 'functions-1',
        title: 'Funktionen erstellen',
        difficulty: 'Leicht',
        content: 'Funktionen sind wiederverwendbare Code-Blöcke.',
        initialCode: 'def hallo_welt():\n    print("Hallo Welt!")',
        task: 'Erstelle eine Funktion mit deinem Namen und gebe die Funktion in der Ausgabe aus.',
        solution: 'def mein_name():\n    name = "Dein Name"\n    print(name)',
        hint: 'Nutze def, um eine Funktion zu erstellen.'
      },
      {
        id: 'functions-2',
        title: 'Funktionen mit Parametern',
        difficulty: 'Mittel',
        content: 'Funktionen können Werte übergeben bekommen.',
        initialCode: 'def hallo(name):\n    print(f"Hallo {name}")',
        task: 'Erstelle eine Funktion, die zwei Zahlen addiert.',
        solution: 'def addiere(zahl1, zahl2):\n    print(zahl1 + zahl2)',
        hint: 'Nutze die Parameter in der Funktion.'
      },
      {
        id: 'functions-3',
        title: 'Funktionen mit Rückgabewert',
        difficulty: 'Schwer',
        content: 'Funktionen können Werte zurückgeben.',
        initialCode: 'def multipliziere(zahl1, zahl2):\n    return zahl1 * zahl2',
        task: 'Erstelle eine Funktion, die zwei Zahlen multipliziert.',
        solution: 'def multipliziere(zahl1, zahl2):\n    return zahl1 * zahl2',
        hint: 'Nutze return, um einen Wert zurückzugeben.'
      },
    ],
  };