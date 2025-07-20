/*
TODO List
    - 

*/

import React, { useState, useEffect } from "react";
import './taskDetailsModal.css'

const TaskDetails = ({ task, updateCallback, columns }) => {
    const [taskData, setTaskData] = useState({
        columnId: task.columnId,
        taskName: task.taskName,
        taskPriority: task.taskPriority,
        taskStartDate: task.taskStartDate,
        taskEndDate: task.taskEndDate,
        taskDueDate: task.taskDueDate,
        taskDescription: task.taskDescription,
        taskStatus: task.taskStatus,
        checklist: task.checklist
    })
    const [columnName, setColumnName] = useState(columns.find(col => col.columnId === taskData.columnId).columnName);
    const [checklist, setChecklist] = useState([]);
    const [comments, setComments] = useState([]);
    const priorities = ["Low", "Medium", "High"];
    const statuses = ["Not Started", "In-Progress", "Completed", "On Hold"];

    useEffect(() => {
        fetchChecklist();
    }, []);

    useEffect(() => {
        fetchComments();
    }, []);

    const handleTaskChange = (field, value) => {
        setTaskData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleColumnChange = (e) => {
        const selectedValue = e.target.value;
        const cId = columns.find(col => col.columnName === selectedValue).columnId;
        setColumnName(selectedValue);
        setTaskData(prev => ({
            ...prev,
            columnId: cId,
        }));
    }


    const fetchChecklist = async () => {
        const response = await fetch("http://127.0.0.1:5000/tasks/checklist/" + `${task.taskId}`);
        const data = await response.json();
        setChecklist(data.checklist);
    }

    const updateCheckList = (e, index) => {
        const checkListCopy = [...checklist];
        checkListCopy[index].itemDescription = e.target.value;
        setChecklist(checkListCopy);
    }

    const fetchComments = async () => {
        const response = await fetch("http://127.0.0.1:5000/tasks/comments/" + `${task.taskId}`);
        const data = await response.json();
        setComments(data.comments)
    }

    const updateTask = async (e) => {
        e.preventDefault();
        const url = "http://127.0.0.1:5000/update_task/" + `${task.taskId}`
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
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
                    <input type="text" className="task-name" value={taskData.taskName} onChange={e => handleTaskChange('taskName', e.target.value)} />
                </div>
                <div>
                    <textarea type="text" rows="4" className="task-taskDescription" value={taskData.taskDescription} onChange={e => handleTaskChange('taskDescription', e.target.value)} />
                </div>
                <div className={taskData.columnId}>
                    <select className="task-bucket" value={columnName} onChange={(e) => handleColumnChange(e)}>
                        {columns.map((col) => {
                            return <option key={col.columnId} value={col.columnName}>{col.columnName}</option>
                        })}
                    </select>
                </div>
                <div>
                    <select className="task-status" value={taskData.taskStatus} onChange={e => handleTaskChange('taskStatus', e.target.value)}>
                        {statuses.map((stat) => {
                            return <option key={stat} value={stat}>{stat}</option>
                        })}
                    </select>
                </div>
                <div>
                    <select className="task-taskPriority" value={taskData.taskPriority} onChange={e => handleTaskChange('taskPriority', e.target.value)}>
                        {priorities.map((pri) => {
                            return <option key={pri} value={pri}>{pri}</option>
                        })}
                    </select>
                </div>
                <div>
                    <input type="date" className="task-start-date" value={taskData.taskStartDate} onChange={e => handleTaskChange('taskStartDate', e.target.value)} />
                </div>
                <div>
                    <input type="date" className="task-due-date" value={taskData.taskDueDate} onChange={e => handleTaskChange('taskDueDate', e.target.value)} />
                </div>
                <div className="checklist">
                    <h2>Checklist</h2>
                    {checklist.map((item, ind) => {
                        return <div key={item.checklistId} className="checklist-item">
                            <input type="text" className="checklist-item-input" defaultValue={item.itemDescription} OnChange={e => updateCheckList(e, item.checklistId)} />
                        </div>
                    })}
                </div>
                <div className="comments">
                    <h2>Comments</h2>
                    {comments.map((item, ind) => {
                        return (
                            <div key={item.commentId} className="comment-wrapper">
                                <div className="comment-person">{item.person}</div>
                                <div className="comment-date">{item.commentDate}</div>
                                <div className="comment-item">{item.comment}</div>
                            </div>
                        )
                    })}
                </div>
                <button className="submit-task-changes" onClick={updateTask}>Save</button>
                <button className="reset-task-changes" type="reset">Reset Values</button>
            </form>


        </dialog>
    )
}

export default TaskDetails;