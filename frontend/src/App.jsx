import React from 'react';
import './App.css';
import NavBar from './assets/navbar';
import Columns from './assets/columns';

function App() {
  return (
    <div className="task-app">
      <NavBar />

      {/* Columns */}
      <Columns />
    </div>
  );
}

export default App;

