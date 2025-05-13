import { Swords } from "lucide-react";
import { Lesson } from "../components/LessonContent";

export const textadventure: Lesson = {
    id: 'textadventure',
    title: 'Text-Adventure',
    icon: Swords,
    definition: 'Ein Text-Adventure ist ein Spiel, bei dem der Spieler durch Texteingaben mit der Spielwelt interagiert. Der Spieler erhält eine Beschreibung der Umgebung und kann durch Eingabe von Befehlen Aktionen ausführen.',
    functions: 'In einem Text-Adventure können verschiedene Funktionen implementiert werden, z. B.:\nSpielerbewegungen (nach Norden, Süden, Osten, Westen), Interaktionen mit Objekten (nehmen, benutzen, untersuchen), Dialoge mit NPCs (nicht-spielbaren Charakteren).',
    Example: 'Ein einfaches Text-Adventure könnte so aussehen:\n"Du befindest dich in einem dunklen Raum. Es gibt eine Tür im Norden und eine Tür im Osten. Was möchtest du tun?"\n> Norden\n"Du gehst durch die Tür und betrittst einen hellen Raum. Es gibt ein Schwert auf dem Boden. Was möchtest du tun?"\n> Nehmen\n"Du nimmst das Schwert."',
    subLessons: [
      {
        id: 'textadventure-1',
        title: 'Grundlagen',
        difficulty: 'Leicht',
        content: 'Erstelle ein einfaches Text-Adventure mit begrenzten Funktionen.',
        initialCode: '',
        task: 'Erstelle eine Umgebung mit mindestens zwei Räumen und einer Verbindung zwischen ihnen. Der Code der schon im Editor ist, müsst ihr löschen.',
        solution: '',
        hint: 'Definiere die Räume und Verbindungen als Variablen.'
      },
      {
        id: 'textadventure-2',
        title: 'Erweitert',
        difficulty: 'Mittel',
        content: 'Erweitere das Text-Adventure um zusätzliche Funktionen.',
        initialCode: '',
        task: 'Füge mindestens eine Interaktion mit einem Objekt hinzu.',
        solution: '',
        hint: 'Definiere das Objekt als Variable und implementiere eine Funktion, um damit zu interagieren.'
      },
      {
        id: 'textadventure-3',
        title: 'Fortgeschritten',
        difficulty: 'Schwer',
        content: 'Implementiere ein komplexes Text-Adventure mit vielen Funktionen.',
        initialCode: '',
        task: 'Füge mindestens eine NPC-Interaktion hinzu. Und lasse deinen gedanken freien lauf.',
        solution: '',
        hint: 'Definiere den NPC als Variable und implementiere eine Funktion, um mit ihm zu interagieren.'
      }
    ]
  };