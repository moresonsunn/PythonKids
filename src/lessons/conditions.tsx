import { GitFork } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const conditions: Lesson = {
  id: 'conditions',
  title: 'Verzweigungen',
  icon: GitFork,
  definition:'Bedingungen entscheiden, welcher Programmzweig ausgeführt wird.\n\
Du formulierst eine Frage, Python antwortet mit True oder False.',
  functions: 'Struktur:\n\
if Bedingung:\n\
| | mache etwas\n\
elif andere_Bedingung:\n\
| | reagiere anders\n\
else:\n\
| | Standardaktion, falls alles andere falsch ist.',
  Example:'punktzahl = 8\n\
if punktzahl > 10:\n\
| | print("Wow, Bonus!")\n\
elif punktzahl >= 5:\n\
| | print("Gute Arbeit")\n\
else:\n\
| | print("Weiter üben")',
    subLessons: [
      {
        id: 'conditions-1',
        title: 'If-Verzweigungen',
        difficulty: 'Leicht',
        content: 'Starte mit einer klaren Bedingung und reagiere nur in diesem Fall.',
        initialCode: 'punkte = 12\n',
        task: 'Gib "Level geschafft!" aus, wenn die Punkte mindestens 10 betragen.',
        solution: 'punkte = 12\nif punkte >= 10:\n    print("Level geschafft!")',
        hint: 'Vergleiche den Wert mit >= und gib nur bei erfüllter Bedingung etwas aus.'  
      },
      {
        id: 'conditions-2',
        title: 'Else-Verzweigungen',
        difficulty: 'Mittel',
        content: 'Ordne Fälle von oben nach unten: zuerst der speziellste, am Ende der Standardfall.',
        initialCode: 'temperatur = 18\n',
        task: 'Gib aus, ob es heiß (>25°), angenehm (15-25°) oder kalt ist.',
        solution: 'temperatur = 18\nif temperatur > 25:\n    print("Es ist heiß.")\nelif temperatur >= 15:\n    print("Es ist angenehm.")\nelse:\n    print("Es ist kalt.")',
        hint: 'Sobald ein Block ausgeführt wurde, werden die übrigen übersprungen.'
      },
      {
        id: 'conditions-3',
        title: 'Bedingungen kombinieren',
        difficulty: 'Schwer',
        content: 'Verknüpfe Zahlenbereiche und Eigenschaften zu einer einzigen Bedingung.',
        initialCode: 'zahl = 7\n',
        task: 'Prüfe, ob die Zahl zwischen 1 und 10 liegt und gerade ist. Gib eine passende Nachricht aus.',
        solution: 'zahl = 7\nif zahl > 1 and zahl < 10 and zahl % 2 == 0:\n    print("Die Zahl erfüllt beide Bedingungen.")\nelse:\n    print("Mindestens eine Bedingung passt nicht.")',
        hint: 'Kombiniere Bedingungen mit and und nutze % 2 für gerade Zahlen.'
      },
    ],
  };