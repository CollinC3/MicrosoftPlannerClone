import React from "react";

function Columns({ tasks, columns }) {
    console.log(columns)
    return (
        <div className="taskArea">
            {columns.map((column) =>
                <div key={column} className="column">
                    <div className="columnName">{column}</div>
                    <div className='taskBtnWrapper'>
                        <button className="addTaskBtn">Add Task</button>
                    </div>
                    <div className='tasks-wrapper'>
                        {tasks.map((task) =>
                            <div key={task._id} className="column-task">
                                <div className="task-Name">{task.taskName}</div>
                                <div className="task-Description">{task.description}</div>
                                <div className="task-DueDate">{task.dueDate.slice(0,10)}</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Columns;