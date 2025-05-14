import { Repeat } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const loops: Lesson = {
    id: 'loops',
    title: 'Schleifen',
    icon: Repeat,
    definition:'Schleifen erlauben es, Code mehrmals auszuführen.\n\
\n\
For-Schleife:\n\
Wird genutzt, wenn du weißt, wie oft du etwas wiederholen möchtest.',
    functions: 'for Element in Liste: \n\
    Befehl\n\
    \n\
    While-Schleife:\n\
    Anzahl an Wiederholungen',
    Example:'for i in range(5):  # Wiederhole 5 Mal\n\
| | print("Hallo!")\n\
While-Schleife:\n\
Wird genutzt, wenn du eine Bedingung hast, die während der Ausführung überprüft wird.\n\
\n\
count = 0\n\
while count < 5:\n\
| | print("Zahl:", count)\n\
| | count += 1\n\
| | break  # Beende die Schleife, wenn count 5 erreicht',
    subLessons: [
      {
        id: 'loops-1',
        title: 'For-Schleifen',
        difficulty: 'Leicht',
        content: 'Schleifen mit einer festen Anzahl an Durchläufen.',
        initialCode: 'for zahl in range(5):\n',
        task: 'Gebe die Zahlen von 1 bis 5 aus',
        solution: 'for zahl in range(1, 6):\n    print(zahl)',
        hint: 'Nutze range(1, 6) für die Zahlen von 1 bis 5'
      },
      {
        id: 'loops-2',
        title: 'While-Schleifen',
        difficulty: 'Mittel',
        content: 'Schleifen mit einer Bedingung.',
        initialCode: 'zahl = 1\nwhile zahl <= 5:\n',
        task: 'Gebe die Zahlen von 5 bis 1 aus',
        solution: 'zahl = 5\nwhile zahl >= 1:\n    print(zahl)\n    zahl += 1',
        hint: 'Vergiss nicht die Abbruchbedingung'
      },
      {
        id: 'loops-3',
        title: 'Schleifen abbrechen',
        difficulty: 'Schwer',
        content: 'Schleifen vorzeitig beenden.',
        initialCode: 'for zahl in range(10):',
        task: 'Beende die Schleife wenn die Zahl 3 erreicht ist',
        solution: 'for zahl in range(10):\n',
        hint: 'Nutzte das Schlüsselwort break'
      },
    ],
  };