import { RotateCw } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const dictionaries: Lesson = {
    id: 'dictionaries',
    title: 'Dictionaries',
    icon: RotateCw,
    definition: 'Dictionaries sind wie Listen, aber statt einer Position haben sie Schlüssel, um Werte zu speichern. Warum? Sie sind ideal, wenn du Daten strukturieren möchtest, z. B. eine Telefonnummer für jede Person.',
    functions: 'Ein Dictionary mit geschweiften Klammern {} erstellen, z. B.:',
    Example: 'telefonbuch = {"Anna": "12345", "Ben": "67890"}\nprint(telefonbuch["Anna"])  # Ausgabe: 12345',
    subLessons: [
      {
        id: 'dictionaries-1',
        title: 'Dictionaries erstellen',
        difficulty: 'Leicht',
        content: 'Schlüssel-Wert-Paare in Python.',
        initialCode: 'farben = {}',
        task: 'Erstelle ein Dictionary mit deinen Lieblingsfarben.',
        solution: 'farben = {"rot", "grün", "blau""}\nprint(farben)',
        hint: 'Nutze geschweifte Klammern {}.'
      },
      {
        id: 'dictionaries-2',
        title: 'Elemente aus Dictionaries auswählen',
        difficulty: 'Mittel',
        content: 'Einzelne Elemente aus Dictionaries auswählen.',
        initialCode: 'farben = {"rot": "#ff0000", "grün": "#00ff00", "blau": "#0000ff"}',
        task: 'Wähle die Farbe Grün aus dem Dictionary aus.',
        solution: 'print(farben["grün"])',
        hint: 'Nutze den Schlüssel des Elements.'
      },
      {
        id: 'dictionaries-3',
        title: 'Dictionaries verändern',
        difficulty: 'Schwer',
        content: 'Elemente hinzufügen, entfernen und verändern.',
        initialCode: 'farben = {"rot": "#ff0000", "grün": "#00ff00", "blau": "#0000ff"}',
        task: 'Füge dem Dictionary eine weitere Farbe hinzu. Falls Internet verfügbar ist google denn Hex-Code für deine Farbe. Falls du keine Farbe hast, nutze Gelb: #ffff00',
        solution: 'farben.update({"gelb": "#ffff00"})\nprint(farben)',
        hint: 'Nutze den Schlüssel zum Hinzufügen.'
      },
    ],
  };