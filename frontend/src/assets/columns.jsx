import React from "react";
import { useState, useEffect } from "react";
import TaskDetails from "./taskDetailsModal";

function Columns() {
    const [tasks, setTasks] = useState([]);
    const [columns, setColumns] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState();
  
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

    const OpenModal = (task) => {
        setModalOpen(true);
        setCurrentTask(task);
    }

    const closeModal = () => {
        setModalOpen(false);
        setCurrentTask();
        fetchTasks();
    }

    return (
        <div className="taskArea">
            {columns.map((column) =>
                <div key={column} className="column">
                    <div className="columnName">{column}</div>
                    <div className='taskBtnWrapper'>
                        <button className="addTaskBtn">Add Task</button>
                    </div>
                    <div className='tasks-wrapper'>
                        {tasks.map(task => {
                            if (task.bucket == column) {
                                return <div onClick={() => OpenModal(task)} key={task._id} className="column-task">
                                    <div className="task-Name">{task.taskName}</div>
                                    <div className="task-Description">{task.description}</div>
                                    <div className="task-DueDate">{task.dueDate.slice(0, 10)}</div>
                                </div>
                            }
                        }

                        )}
                    </div>
                </div>
            )}
            {modalOpen && 
                <TaskDetails currentTask={currentTask} updateCallback={closeModal}/>
            }
        </div>
        
    );
}

export default Columns;