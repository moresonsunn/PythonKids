import { Swords } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const textadventure: Lesson = {
    id: 'textadventure',
    title: 'Text-Adventure',
    icon: Swords,
  definition: 'Ein Text-Adventure ist ein interaktives Buch.\n\
Dein Programm erzählt eine Szene, fragt nach einer Aktion und reagiert auf die Eingabe.',
  functions: 'Du verbindest Variablen (Zustand der Welt), input() (Aktionen der Spielenden) und Bedingungen (Was passiert als Nächstes?).',
  Example: 'ort = "Raum"\nprint("Du stehst in einem Raum. Eine Tür führt nach Norden.")\nantwort = input("Wohin willst du gehen? ")\nif antwort.lower() == "norden":\n| | ort = "Flur"\n| | print("Du öffnest die Tür und gehst in den Flur.")\nelse:\n| | print("Du bleibst im Raum.")',
    subLessons: [
      {
        id: 'textadventure-1',
        title: 'Grundlagen',
        difficulty: 'Leicht',
        content: 'Definiere mindestens zwei Orte und beschreibe jeden Ort kurz.',
        initialCode: '',
        task: 'Beschreibe Raum A und Raum B. Frage den Spieler, ob er wechseln möchte, und gib passende Texte aus.',
        solution: '',
        hint: 'Speichere den aktuellen Raum in einer Variable und ändere sie bei Bedarf.'
      },
      {
        id: 'textadventure-2',
        title: 'Erweitert',
        difficulty: 'Mittel',
        content: 'Halte fest, ob ein Gegenstand aufgehoben wurde, und nutze das in späteren Ausgaben.',
        initialCode: '',
        task: 'Lege ein Objekt in einen Raum und lass den Spieler entscheiden, ob er es nimmt.',
        solution: '',
        hint: 'Ein boolescher Wert wie hat_objekt = False hilft dir beim Verfolgen.',
      },
      {
        id: 'textadventure-3',
        title: 'Fortgeschritten',
        difficulty: 'Schwer',
        content: 'Lass Entscheidungen Einfluss auf den Dialog mit dem NPC haben.',
        initialCode: '',
        task: 'Frage den Spieler, wie er mit einem NPC sprechen möchte, und reagiere mit unterschiedlichen Texten.',
        solution: '',
        hint: 'Nutze mehrere if/elif-Zweige für verschiedene Antworten.'
      }
    ]
  };