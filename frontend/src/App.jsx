import { useState, useEffect } from 'react'
import './App.css';
import NavBar from './assets/navbar';
import Columns from './assets/columns';

function App(props) {

  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchColumns();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks");
    const data = await response.json();
    setTasks(data.tasks);
  }

  const fetchColumns = async () => {
    const response = await fetch("http://127.0.0.1:5000/get_column_names");
    const data = await response.json();
    setColumns(data.tasks);
  }

  return (
    <div className="task-app">
      <NavBar />

      {/* Columns */}
      <Columns tasks={tasks} columns={columns} />
    </div>
  );
}

export default App;

