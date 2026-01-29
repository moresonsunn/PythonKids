import { Terminal } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const operators: Lesson = {
  id: 'operators',
  title: 'Operatoren',
  icon: Terminal,
  definition: 'Operatoren sind Werkzeuge, mit denen du Daten veränderst oder vergleichst.\n\
Python unterscheidet Rechen-, Vergleichs- und logische Operatoren.',
  functions: 'Überblick:\n\
- +, -, *, / verändern Zahlen.\n\
- ==, !=, <, > prüfen Beziehungen zwischen Werten.\n\
- and, or, not kombinieren Wahrheitswerte.',
  Example: 'punkte = 10\nbonus = 2\ngesamt = punkte + bonus\nprint(f"Gesamtpunkte: {gesamt}")\nprint(f"Bonus aktiv? {bonus > 0}")',
    subLessons: [
      {
        id: 'operators-1',
        title: 'Rechenoperatoren',
        difficulty: 'Leicht',
        content: 'Nutze den Multiplikationsoperator, um Flächen oder Produkte zu bestimmen.',
        initialCode: 'laenge = 7\nbreite = 3',
        task: 'Berechne die Fläche eines Rechtecks mit Länge und Breite. Speichere zuerst die Fläche in einer Variable und gib sie dann aus.',
        solution: 'flaeche = laenge * breite\nprint(f"Fläche: {flaeche}")',
        hint: 'Schreibe laenge * breite und speichere das Ergebnis in einer Variable.'
      },
      {
        id: 'operators-2',
        title: 'Vergleichsoperatoren',
        difficulty: 'Mittel',
        content: 'Eine Gleichheitsprüfung liefert dir einen Wahrheitswert.',
        initialCode: 'temperatur_heute = 18\ntemperatur_gestern = 18',
        task: 'Prüfe, ob beide Temperaturen gleich sind.',
        solution: 'print(temperatur_heute == temperatur_gestern)',
        hint: 'Nutze ==, nicht = (das würde neu zuweisen).' 
      },
      {
        id: 'operators-3',
        title: 'Logische Operatoren',
        difficulty: 'Schwer',
        content: 'Kombiniere zwei Aussagen zu einer Gesamtentscheidung.',
        initialCode: 'punkte = 5\nleben = 3',
        task: 'Überprüfe, ob sowohl Punkte als auch Leben größer als 0 sind.',
        solution: 'print(punkte > 0 and leben > 0)',
        hint: 'Mit and müssen beide Bedingungen wahr sein.'
      }
    ],
  };