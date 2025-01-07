import React from 'react';
import { 
  CircleDot,
  Code2,
  ListOrdered,
  Terminal, 
  AlertCircle,
  KeyRound,
  GitFork,
  Repeat,
  RotateCw
} from 'lucide-react';

const topics = [
  { id: 'variables', name: 'Variablen', icon: CircleDot },
  { id: 'functions', name: 'Funktionen', icon: Code2 },
  { id: 'lists', name: 'Listen', icon: ListOrdered },
  { id: 'operators', name: 'Operatoren', icon: Terminal },
  { id: 'errors', name: 'Fehlerausgabe', icon: AlertCircle },
  { id: 'input', name: 'Input Befehl', icon: KeyRound },
  { id: 'dictionaries', name: 'Dictionaries', icon: ListOrdered },
  { id: 'conditions', name: 'Verzweigungen', icon: GitFork },
  { id: 'loops', name: 'Schleifen', icon: Repeat },
  { id: 'while', name: 'While-Schleifen', icon: RotateCw },
];

interface NavigationProps {
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}

function Navigation({ selectedTopic, setSelectedTopic }: NavigationProps) {
  return (
    <nav className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Lektionen</h2>
      <ul className="space-y-2">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <li key={topic.id}>
              <button
                onClick={() => setSelectedTopic(topic.id)}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  selectedTopic === topic.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {topic.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;