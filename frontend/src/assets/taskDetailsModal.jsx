import React from "react";

const TaskDetails = ({currentTask, updateCallback}) => {
    return (
        <dialog open className="task-details-modal">
            <span className='close' onClick={() => updateCallback()}>&times;</span>
            <div className="task-name">{currentTask.taskName}</div>
            <div className="assigned-person">Assigned person</div>
            <div className="task-description">{currentTask.description}</div>
            <div className="task-bucket">{currentTask.bucket}</div>
            <div className="task-priority">{currentTask.priority}</div>
            <div className="task-progress">{currentTask.progress}</div>
            <div className="task-start-date">{currentTask.startDate.slice(0, 10)}</div>
            <div className="task-due-date">{currentTask.dueDate.slice(0, 10)}</div>

        </dialog>
    )
}

export default TaskDetails;