import { RotateCw } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const dictionaries: Lesson = {
    id: 'dictionaries',
    title: 'Dictionaries',
    icon: RotateCw,
  definition: 'Ein Dictionary ist wie ein echtes Telefonbuch: jeder Schlüssel (z. B. Name) zeigt auf genau einen Wert (z. B. Nummer).\n\
Damit kannst du Informationen schnell wiederfinden, ohne Positionen mitzuzählen.',
  functions: 'Weitere Helfer:\n\
update({...}) fügt neue Paare hinzu.\n\
get("Name") liefert den Wert oder None.\n\
keys() zeigt alle vorhandenen Schlüssel.',
  Example: 'telefonbuch = {"Anna": "12345", "Ben": "67890"}\ntelefonbuch.update({"Clara": "55555"})\nprint(telefonbuch.get("Anna"))\nprint(list(telefonbuch.keys()))',
    subLessons: [
      {
        id: 'dictionaries-1',
        title: 'Dictionaries erstellen',
        difficulty: 'Leicht',
        content: 'Schreibe zwei Paare in geschweiften Klammern.',
        initialCode: 'kontakte = {}',
        task: 'Erstelle ein Telefonbuch mit zwei Personen und gib das Dictionary aus.',
        solution: 'kontakte = {"Lina": "0151-123", "Noah": "0176-456"}\nprint(kontakte)',
        hint: 'Jeder Schlüssel braucht einen Wert: "Name": "Nummer".'
      },
      {
        id: 'dictionaries-2',
        title: 'Elemente aus Dictionaries auswählen',
        difficulty: 'Mittel',
        content: 'Frage einen Wert mit seinem Schlüssel ab.',
        initialCode: 'kontakte = {"Lina": "0151-123", "Noah": "0176-456"}',
        task: 'Gib die Nummer von Noah aus.',
        solution: 'print(kontakte["Noah"])',
        hint: 'Zugriff erfolgt mit dem Schlüssel in eckigen Klammern.'
      },
      {
        id: 'dictionaries-3',
        title: 'Dictionaries verändern',
        difficulty: 'Schwer',
        content: 'Füge einen neuen Schlüssel mit update() hinzu.',
        initialCode: 'kontakte = {"Lina": "0151-123", "Noah": "0176-456"}',
        task: 'Füge "Ella" mit einer eigenen Nummer hinzu und gib das Dictionary aus.',
        solution: 'kontakte.update({"Ella": "030-789"})\nprint(kontakte)',
        hint: 'Mit update({...}) kannst du mehrere neue Paare auf einmal ergänzen.'
      },
    ],
  };