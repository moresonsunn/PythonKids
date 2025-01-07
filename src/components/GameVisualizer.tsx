import React from 'react';

interface GameVisualizerProps {
  code: string;
  topic: string;
  output: string;
}

function GameVisualizer({ code, topic, output }: GameVisualizerProps) {
  return (
    <div className="h-64 bg-gray-50 rounded-md border border-gray-200 p-4">
      {output ? (
        <div className="h-full flex flex-col">
          <div className="text-sm font-medium text-gray-700 mb-2">Ausgabe:</div>
          <div className="bg-white p-3 rounded border border-gray-200 flex-grow">
            {output}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          Führe den Code aus, um die Visualisierung zu sehen
        </div>
      )}
    </div>
  );
}

export default GameVisualizer;