import React, { useState } from "react";

const TaskDetails = ({ currentTask, updateCallback }) => {
    const [taskName, setTaskName] = useState(currentTask.taskName || "");
    const [bucket, setBucket] = useState(currentTask.bucket || "");
    const [priority, setPriority] = useState(currentTask.priority || "");
    const [startDate, setStartDate] = useState(currentTask.startDate || "");
    const [dueDate, setDueDate] = useState(currentTask.dueDate || "");
    const [description, setDescription] = useState(currentTask.description || "");
    const [checklist, setChecklist] = useState(currentTask.checklist || []);
    const [comments, setComments] = useState(currentTask.comments || []);


    const updateTask = async (e) => {
        e.preventDefault();

        const data = {
            taskName,
            bucket,
            priority,
            startDate,
            dueDate,
            description,
            checklist,
            comments
        }
        const url ="http://127.0.0.1:5000/update_task/" + `${currentTask._id}` 
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status !== 200) {
            const data = await response.json()
            alert(data.message);
        } else {
            updateCallback(data);
        }
    }

    return (
        <dialog open className="task-details-modal">
            <span className='close' onClick={() => updateCallback()}>&times;</span>
            <form>
                <div>
                    <label htmlFor="task-name">Task Name:</label>
                    <input type="text" className="task-name" defaultValue={taskName} onClick={e => setTaskName(e.target.value)} />
                </div>
                <div>
                    <textarea type="text" rows="4" className="task-description" defaultValue={description} onClick={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <input type="text" className="task-bucket" defaultValue={bucket} onClick={e => setBucket(e.target.value)} />
                </div>
                <div>
                    <input type="text" className="task-priority" defaultValue={priority} onClick={e => setPriority(e.target.value)} />
                </div>
                <div>
                    <input type="date" className="task-start-date" defaultValue={startDate.slice(0, 10)} onClick={e => setStartDate(e.target.value)} />
                </div>
                <div>
                    <input type="date" className="task-due-date" defaultValue={dueDate.slice(0, 10)} onClick={e => setDueDate(e.target.value)} />
                </div>
                <div className="checklist">
                    <h2>Checklist</h2>
                    {checklist.map(item => {
                        return <div key={item._id} className="checklist-item">
                            <input type="text" className="checklist-item-input" defaultValue={item.taskName} />
                        </div>
                    })}
                </div>
                <div className="comments">
                    <h2>Comments</h2>
                    {comments.map(item => {
                        return (
                            <div key={item._id} className="comment-wrapper">
                                <div className="comment-item">{item.comment}</div>
                                <div className="comment-date">{item.commentTime}</div>
                                <div className="comment-person">{item.person}</div>
                            </div>
                        )
                    })}
                </div>
                <button className="submit-task-changes" type="submit" onClick={updateTask}>Save</button>
                <button className="reset-task-changes" type="reset">Reset Values</button>
            </form>


        </dialog>
    )
}

export default TaskDetails;