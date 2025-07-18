import React from 'react';

// Definiert die Eigenschaften (Props), die an die Navigation-Komponente übergeben werden
interface Lesson {
  id: string;
  title: string;
  icon: React.ComponentType;
  subLessons: {
    id: string;
    title: string;
    difficulty: string;
  }[];
}

// Ist die hauptkomponente für die Navigation
interface NavigationProps {
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  selectedSubLesson: string;
  setSelectedSubLesson: (subLesson: string) => void;
  lessons: Lesson[];
}

function Navigation({ selectedTopic, setSelectedTopic, selectedSubLesson, setSelectedSubLesson, lessons }: NavigationProps) {
  return (
    // Navigationsleiste mit abgerundeten Kanten und Schatten
    <nav className="bg-white rounded-lg shadow-lg p-4">
      <ul className="space-y-2">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <div className="mb-2">
              {/* Hauptlektion-Button, setzt das ausgewählte Thema und die erste Unterlektion */}
              <button
                onClick={() => {
                  setSelectedTopic(lesson.id);
                  setSelectedSubLesson(lesson.subLessons[0].id);
                }}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  selectedTopic === lesson.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <lesson.icon/>
                {lesson.title}
              </button>
              
              {/* Anzeige der Unterlektionen, wenn das Thema ausgewählt ist */}
              {selectedTopic === lesson.id && (
                <div className="ml-8 mt-2 space-y-1">
                  {lesson.subLessons.map((subLesson) => (
                    // Button für jede Unterlektion, setzt die ausgewählte Unterlektion
                    <button
                      key={subLesson.id}
                      onClick={() => setSelectedSubLesson(subLesson.id)}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                        selectedSubLesson === subLesson.id ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {subLesson.title}
                      {/* Anzeige der Schwierigkeitsstufe mit entsprechender Farbe */}
                      <span className={`ml-2 text-xs px-2 py-1 rounded inline-block left ${
                        subLesson.difficulty === 'Leicht' ? 'bg-green-100 text-green-700' :
                        subLesson.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-700' :
                        subLesson.difficulty === 'Schwer' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {subLesson.difficulty}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
