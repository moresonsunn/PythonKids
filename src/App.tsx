import React, { useState } from 'react';

import { BookOpen, GamepadIcon, Code } from 'lucide-react';
import Navigation from './components/Navigation';
import CodeEditor from './components/CodeEditor';
import LessonContent, { lessons } from './components/LessonContent';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('variables');
  const [selectedSubLesson, setSelectedSubLesson] = useState('variables-1');
  const [learningStyle, setLearningStyle] = useState<'text' | 'interactive'>('text');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">PythonKids</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setLearningStyle('text')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  learningStyle === 'text'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="h-5 w-5 inline-block mr-1" />
                Erklärung
              </button>
              <button
                onClick={() => setLearningStyle('interactive')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  learningStyle === 'interactive'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <GamepadIcon className="h-5 w-5 inline-block mr-1" />
                Interaktiv
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Navigation 
              selectedTopic={selectedTopic} 
              setSelectedTopic={setSelectedTopic}
              selectedSubLesson={selectedSubLesson}
              setSelectedSubLesson={setSelectedSubLesson}
              lessons={lessons}
            />
          </div>
          
          <div className="col-span-9">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <LessonContent 
              topic={selectedTopic}
              learningStyle={learningStyle}
              selectedSubLesson={selectedSubLesson}
              isError={isError}
              onErrorCountChange={(count) => {
                console.log('Error count:', count);
              }}
            />
            </div>
            {learningStyle == 'interactive' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                  </div>
                  <CodeEditor 
                    code={code}
                    setCode={setCode}
                    setOutput={setOutput}
                    setIsError={setIsError}
                  />
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ausgabe</h3>
                  <div className="output-container bg-yellow-100 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap break-words">{output}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
