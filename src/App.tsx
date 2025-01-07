import React, { useState } from 'react';
import { BookOpen, Play, GamepadIcon, Code } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import GameVisualizer from './components/GameVisualizer';
import LessonContent from './components/LessonContent';
import Navigation from './components/Navigation';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('variables');
  const [learningStyle, setLearningStyle] = useState('interactive');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  
  const executeCode = () => {
    try {
      // Basic variable visualization
      if (selectedTopic === 'variables') {
        const variableMatch = code.match(/(\w+)\s*=\s*["']?([^"']+)["']?/);
        if (variableMatch) {
          const [_, varName, value] = variableMatch;
          setOutput(`Variable "${varName}" hat den Wert: ${value}`);
        }
      }
      // Basic function visualization
      else if (selectedTopic === 'functions') {
        const functionMatch = code.match(/def\s+(\w+)\s*\([^)]*\)\s*:\s*print\(["']Hallo["']\)/);
        if (functionMatch) {
          const [_, functionName, functionBody] = functionMatch;
          setOutput(`Funktion "${functionName[1]}" wurde definiert und gibt denn Wert: "${functionBody}"`);
        }
      }
      // Basic loop visualization
      else if (selectedTopic === 'loops') {
        const loopMatch = code.match(/for\s+(\w+)\s+in\s+range\([^)]*\)\s*:/);
        if (loopMatch) {
          const [_, loopVar] = loopMatch;
          setOutput(`Schleife mit der Variable "${loopVar}" wurde ausgeführt`);
        }
      }
      // Basic condition visualization
      else if (selectedTopic === 'conditions') {
        const conditionMatch = code.match(/if\s+True\s*:/);
        if (conditionMatch) {
          setOutput('Bedingung wurde erfüllt');
        }
      }
      // Basic list visualization
      else if (selectedTopic === 'lists') {
        const listMatch = code.match(/(\w+)\s*=\s*\[[^\]]*\]/);
        if (listMatch) {
          const [_, listName] = listMatch;
          setOutput(`Liste "${listName}" wurde erstellt`);
        }
      }
      // Basic dictionary visualization
      else if (selectedTopic === 'dictionaries') {
        const dictMatch = code.match(/(\w+)\s*=\s*{[^}]*}/);
        if (dictMatch) {
          const [_, dictName] = dictMatch;
          setOutput(`Dictionary "${dictName}" wurde erstellt`);
        }
      }
      // Basic input visualization
      else if (selectedTopic === 'input') {
        const inputMatch = code.match(/(\w+)\s*=\s*input\(["']([^"']+)["']\)/);
        if (inputMatch) {
          const [_, varName, prompt] = inputMatch;
          setOutput(`Benutzer wurde nach "${prompt}" gefragt`);
        }
      }
      // Basic error visualization
      else if (selectedTopic === 'errors') {
        const errorMatch = code.match(/print\(["']([^"']+)["']\)/);
        if (errorMatch) {
          const [_, errorMessage] = errorMatch;
          setOutput(`Fehler: ${errorMessage}`);
        }
      }
      // Basic operator visualization
      else if (selectedTopic === 'operators') {
        const operatorMatch = code.match(/(\w+)\s*=\s*5\s*\+\s*3\s*\*\s*2/);
        if (operatorMatch) {
          const [_, varName] = operatorMatch;
          setOutput(`Variable "${varName}" hat den Wert: 11`);
        }
      }
      // Basic While loop visualization
      else if (selectedTopic === 'while') {
        const whileMatch = code.match(/while\s+True\s*:/);
        if (whileMatch) {
          setOutput('While-Schleife wurde ausgeführt');
        }
      }
    } catch (error) {
      setOutput(`Fehler: ${error.message}`);
    }
  };

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
                Text
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
            />
          </div>
          
          <div className="col-span-9">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <LessonContent 
                topic={selectedTopic} 
                learningStyle={learningStyle}
              />
            </div>
            
            {learningStyle === 'interactive' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Code Editor</h3>
                    <button
                      onClick={executeCode}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Ausführen
                    </button>
                  </div>
                  <CodeEditor 
                    code={code}
                    setCode={setCode}
                  />
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Visualisierung</h3>
                  <GameVisualizer 
                    code={code}
                    topic={selectedTopic}
                    output={output}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;