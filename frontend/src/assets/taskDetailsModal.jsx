import React, { useState } from "react";
import './taskDetailsModal.css'

const TaskDetails = ({ currentTask, updateCallback, columns }) => {
    const [columnId, setColumnId] = useState(currentTask.columnId || "");
    const [taskName, setTaskName] = useState(currentTask.taskName || "");
    const [columnName, setColumnName] = useState(currentTask.columnName || "");
    const [taskPriority, setTaskPriority] = useState(currentTask.taskPriority || "");
    const [taskStartDate, setTaskStartDate] = useState(currentTask.taskStartDate || "");
    const [taskDueDate, setTaskDueDate] = useState(currentTask.taskDueDate || "");
    const [taskEndDate, setTaskEndDate] = useState(currentTask.taskEndDate || "");
    const [taskDescription, setTaskDescription] = useState(currentTask.taskDescription || "");
    const [taskStatus, setTaskStatus] = useState(currentTask.taskStatus || "")
    // const [checklist, setChecklist] = useState(currentTask.checklist || []);
    // const [comments, setComments] = useState(currentTask.comments || []);
    const priorities = ["Low", "Medium", "High"];
    const statuses = ["Not Started", "In-Progress", "Completed", "On Hold"];

    const handleColumnChange = (e) => {
        const selectedValue = e.target.value;
        const cId = columns.find(col => col.columnName === selectedValue);
        console.log(cId + "Hi");
        setColumnName(selectedValue);  
        setColumnId(cId.columnId);
    }

    const updateCheckList = (e, index) => {
        const checkListCopy = [...checklist];
        checkListCopy[index].taskName = e.target.value;
        setChecklist(checkListCopy);
    }

    const updateTask = async (e) => {
        e.preventDefault();

        const data = {
            columnId,
            taskName,
            taskDescription,
            taskPriority,
            taskStatus,
            taskStartDate,
            taskDueDate,
            taskEndDate
            // checklist,
            // comments
        }
        const url = "http://127.0.0.1:5000/update_task/" + `${currentTask.taskId}`
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        await fetch(url, options);
        updateCallback(true);
    }

    return (
        <dialog open className="task-details-modal">
            <span className='close' onClick={() => updateCallback(false)}>&times;</span>
            <form>
                <div>
                    <label htmlFor="task-name">Task Name:</label>
                    <input type="text" className="task-name" value={taskName} onChange={e => setTaskName(e.target.value)} />
                </div>
                <div>
                    <textarea type="text" rows="4" className="task-taskDescription" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
                </div>
                <div className={columnId}>
                    <select className="task-bucket" value={columnName} onChange={(e) => handleColumnChange(e)}>
                        {columns.map((col) => {
                            return <option key={col.columnId} value={col.columnName}>{col.columnName}</option>
                        })}
                    </select>
                </div>
                <div>
                    <select className="task-status" value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
                        {statuses.map((stat) => {
                            return <option key={stat} value={stat}>{stat}</option>
                        })}
                    </select>
                </div>
                <div>
                    {/* <input type="text" className="task-taskPriority" value={taskPriority} onChange={e => setTaskPriority(e.target.value)} /> */}
                    <select className="task-taskPriority" value={taskPriority} onChange={e => setTaskPriority(e.target.value)}>
                        {priorities.map((pri) => {
                            return <option key={pri} value={pri}>{pri}</option>
                        })}
                    </select>
                </div>
                <div>
                    <input type="date" className="task-start-date" value={taskStartDate} onChange={e => setTaskStartDate(e.target.value)} />
                </div>
                <div>
                    <input type="date" className="task-due-date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} />
                </div>
                {/* <div className="checklist">
                    <h2>Checklist</h2>
                    {checklist.map((item, ind) => {
                        return <div key={item._id} className="checklist-item">
                            <input type="text" className="checklist-item-input" defaultValue={item.taskName} onChange={(e) => updateCheckList(e, ind)} />
                        </div>
                    })}
                </div>
                <div className="comments">
                    <h2>Comments</h2>
                    {comments.map((item, ind) => {
                        return (
                            <div key={item._id} className="comment-wrapper">
                                <div className="comment-person">{item.person}</div>
                                <div className="comment-date">{item.commentTime.slice(0, 10)}</div>
                                <div className="comment-item">{item.comment}</div>
                            </div>
                        )
                    })}
                </div> */}
                <button className="submit-task-changes" onClick={updateTask}>Save</button>
                <button className="reset-task-changes" type="reset">Reset Values</button>
            </form>


        </dialog>
    )
}

export default TaskDetails;