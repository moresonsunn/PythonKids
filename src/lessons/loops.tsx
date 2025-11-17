import { Repeat } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const loops: Lesson = {
  id: 'loops',
  title: 'Schleifen',
  icon: Repeat,
  definition:'Schleifen sparen Zeit, wenn du Anweisungen mehrfach brauchst.\n\
For-Schleifen arbeiten mit abzählbaren Bereichen, while-Schleifen mit Bedingungen.',
  functions: 'For-Schleife:\n\
for i in range(3):\n\
| | print(i)  # 0,1,2\n\
While-Schleife:\n\
zahl = 3\n\
while zahl > 0:\n\
| | print(zahl)\n\
| | zahl -= 1  # Zustand anpassen!',
  Example:'for i in range(1, 4):\n\
| | print(f"Runde {i}")\n\
zahl = 3\n\
while zahl >= 1:\n\
| | print(f"Countdown: {zahl}")\n\
| | zahl -= 1',
    subLessons: [
      {
        id: 'loops-1',
        title: 'For-Schleifen',
        difficulty: 'Leicht',
        content: 'Nutze range(start, stop), um eine klar definierte Anzahl an Schritten zu erhalten.',
        initialCode: 'for zahl in range(1, 4):\n    ',
        task: 'Gib die Zahlen 1, 2 und 3 untereinander aus.',
        solution: 'for zahl in range(1, 4):\n    print(zahl)',
        hint: 'Der zweite Wert in range ist exklusiv: range(1, 4) erzeugt 1,2,3.'
      },
      {
        id: 'loops-2',
        title: 'While-Schleifen',
        difficulty: 'Mittel',
        content: 'Überlege dir, wann die Schleife stoppen soll, und verändere die Variable entsprechend.',
        initialCode: 'zahl = 3\nwhile zahl >= 1:\n    ',
        task: 'Lass einen kurzen Countdown 3, 2, 1 entstehen.',
        solution: 'zahl = 3\nwhile zahl >= 1:\n    print(zahl)\n    zahl -= 1',
        hint: 'Ohne zahl -= 1 würde die Bedingung immer wahr bleiben – Endlosschleife!'
      },
      {
        id: 'loops-3',
        title: 'Schleifen abbrechen',
        difficulty: 'Schwer',
        content: 'Nutze break, um aus einer Schleife zu springen, sobald ein Kriterium erfüllt ist.',
        initialCode: 'zahlen = [1, 2, 3, 4]\nfor zahl in zahlen:\n    ',
        task: 'Gib die Zahlen aus und stoppe, sobald die 3 erreicht wird. Schreibe "Stop bei 3".',
        solution: 'zahlen = [1, 2, 3, 4]\nfor zahl in zahlen:\n    if zahl == 3:\n        print("Stop bei 3")\n        break\n    print(zahl)',
        hint: 'Prüfe die Zahl zuerst und nutze dann break.'
      },
    ],
  };