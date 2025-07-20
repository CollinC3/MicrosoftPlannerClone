/*
TODO List
    - If taskId is empty, call a different route when saving a task
    - Check for no task id when fetching Checklist and Comments

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
        taskStatus: task.taskStatus
    })
    const [columnName, setColumnName] = useState(columns.find(col => col.columnId === taskData.columnId).columnName);
    const [checklist, setChecklist] = useState([]);
    const [comments, setComments] = useState([]);
    const priorities = ["Low", "Medium", "High"];
    const statuses = ["Not Started", "In-Progress", "Completed", "On Hold"];

    useEffect(() => {
        if (task.taskId !== "") {
            fetchChecklist();
        }
    }, []);

    useEffect(() => {
        if (task.taskId !== "") {
            fetchComments();
        }
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

    const saveTask = async (e) => {
        e.preventDefault();
        if (task.taskId === "") {
            var url = "http://127.0.0.1:5000/create_task/"
            var method = "POST";
        } else {
            var url = "http://127.0.0.1:5000/update_task/" + `${task.taskId}`
            var method = "PATCH";
        }
        const options = {
            method: method,
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
                    <label htmlFor="task-taskDescription">Task Description:</label>
                    <textarea type="text" rows="4" className="task-taskDescription" value={taskData.taskDescription} onChange={e => handleTaskChange('taskDescription', e.target.value)} />
                </div>
                <div className={taskData.columnId}>
                    <label htmlFor="task-bucket">Column:</label>
                    <select className="task-bucket" value={columnName} onChange={(e) => handleColumnChange(e)}>
                        {columns.map((col) => {
                            return <option key={col.columnId} value={col.columnName}>{col.columnName}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="task-status">Task Status:</label>
                    <select className="task-status" value={taskData.taskStatus} onChange={e => handleTaskChange('taskStatus', e.target.value)}>
                        {statuses.map((stat) => {
                            return <option key={stat} value={stat}>{stat}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="task-taskPriority">Priority:</label>
                    <select className="task-taskPriority" value={taskData.taskPriority} onChange={e => handleTaskChange('taskPriority', e.target.value)}>
                        {priorities.map((pri) => {
                            return <option key={pri} value={pri}>{pri}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="task-start-date">Start Date:</label>
                    <input type="date" className="task-start-date" value={taskData.taskStartDate} onChange={e => handleTaskChange('taskStartDate', e.target.value)} />
                </div>
                <div>
                    <label htmlFor="task-due-date">Due Date:</label>
                    <input type="date" className="task-due-date" value={taskData.taskDueDate} onChange={e => handleTaskChange('taskDueDate', e.target.value)} />
                </div>
                <div className="checklist">
                    <h2>Checklist</h2>
                    {checklist.map((item, ind) => {
                        return <div key={item.checklistId} className="checklist-item">
                            <input type="text" className="checklist-item-input" defaultValue={item.itemDescription} onChange={e => updateCheckList(e, item.checklistId)} />
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
                <button className="submit-task-changes" onClick={saveTask}>Save</button>
                <button className="delete-task-changes" type="reset">Reset Values</button>
            </form>


        </dialog>
    )
}

export default TaskDetails;