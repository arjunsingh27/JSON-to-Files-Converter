import React from 'react';
import FileConverter from './components/FileConverter';
import './index.css'; // Ensure Tailwind CSS is imported

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">JSON to Files Converter</h1>
      </header>
      <main>
        <FileConverter />
      </main>
    </div>
  );
}

export default App;
