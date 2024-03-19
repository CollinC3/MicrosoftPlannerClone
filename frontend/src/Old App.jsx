import './App.css';

function App(props) {
  return (
    <body>
      <div className="task-app">
        {/* Nav Bar */}


        {/* Columns */}
        <div className="taskArea">
          {/* Column 1 */}
          <div className="column">
            <div className="columnName">Scope</div>
            <div className='taskBtnWrapper'>
              <button className="addTaskBtn">Add Task</button>
            </div>
            {/* A number of divs that will go in the column */}
            <div className='tasks-wrapper'>
              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description. This will hopefully not change the length of the other columns just this one. We probably should have a columns task max-height. That is the next thing that I am going to work on to see if I can get to work.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>
            </div>

          </div>

          {/* Column 2 */}
          <div className="column">
            <div className="columnName">Analysis/Software Requirements</div>
            <div className='taskBtnWrapper'>
              <button className="addTaskBtn">Add Task</button>
            </div>
            {/* A number of divs that will go in the column */}
            <div className='tasks-wrapper'>
              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>

              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="column">
            <div className="columnName">Design</div>
            <div className='taskBtnWrapper'>
              <button className="addTaskBtn">Add Task</button>
            </div>
            {/* A number of divs that will go in the column */}
            <div className='tasks-wrapper'>
              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>
            </div>
          </div>

          {/* Column 4 */}
          <div className="column">
            <div className="columnName">Development</div>
            <div className='taskBtnWrapper'>
              <button className="addTaskBtn">Add Task</button>
            </div>
            {/* A number of divs that will go in the column */}
            <div className='tasks-wrapper'>
              <div className="column-task">
                <div className="task-Name">Task Name</div>
                <div className="task-Description">This is the task description.</div>
                <div className="task-DueDate">Due Date</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;

