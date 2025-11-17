import { Code2 } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const functions: Lesson = {
    id: 'functions',
    title: 'Funktionen',
    icon: Code2,
  definition: 'Funktionen kapseln eine Idee und geben ihr einen Namen.\n\
So kannst du denselben Ablauf mehrfach aufrufen, anstatt ihn zu kopieren.',
  functions: 'Aufbau:\n\
def name(parameter):\n\
| | # Code\n\
| | return ergebnis\n\
Parameter nehmen Werte entgegen, return gibt ein Ergebnis zurück.',
  Example: 'def begruessung(name):\n| | text = f"Hallo {name}!"\n| | return text\n\nprint(begruessung("Lina"))',
    subLessons: [
      {
        id: 'functions-1',
        title: 'Funktionen erstellen',
        difficulty: 'Leicht',
        content: 'Formuliere eine Funktion, die ein Ergebnis liefert, statt nur zu drucken.',
        initialCode: 'def zeige_lieblingsfarbe():\n    ',
        task: 'Schreibe eine Funktion, die einen Satz zu deiner Lieblingsfarbe zurückgibt und gib das Ergebnis aus.',
        solution: 'def zeige_lieblingsfarbe():\n    return "Meine Lieblingsfarbe ist Blau"\n\nprint(zeige_lieblingsfarbe())',
        hint: 'return beendet die Funktion und liefert das Ergebnis an den Aufrufer.'
      },
      {
        id: 'functions-2',
        title: 'Funktionen mit Parametern',
        difficulty: 'Mittel',
        content: 'Parameter machen deine Funktion flexibel und wiederverwendbar.',
        initialCode: 'def addiere(zahl1, zahl2):\n    ',
        task: 'Gib die Summe zweier Zahlen zurück und gib das Ergebnis aus.',
        solution: 'def addiere(zahl1, zahl2):\n    return zahl1 + zahl2\n\nprint(addiere(3, 4))',
        hint: 'Berechne im Funktionskörper und gib das Resultat mit return weiter.'
      },
      {
        id: 'functions-3',
        title: 'Funktionen mit Rückgabewert',
        difficulty: 'Schwer',
        content: 'Kombiniere mehrere Werte, führe eine Rechnung aus und gib das Resultat zurück.',
        initialCode: 'def berechne_reisezeit(strecke_km, geschwindigkeit_kmh):\n    ',
        task: 'Schreibe eine Funktion, die aus Strecke und Geschwindigkeit die Reisezeit berechnet und zurückgibt.',
        solution: 'def berechne_reisezeit(strecke_km, geschwindigkeit_kmh):\n    return strecke_km / geschwindigkeit_kmh\n\nprint(berechne_reisezeit(300, 100))',
        hint: 'Nutze eine Division und gib das Ergebnis mit return zurück.'
      },
    ],
  };