//Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const sqlite = require('sqlite3').verbose();
const app = express();

app.use(cors());
app.use(bodyParser.json());


//Connect to DB
const filepath = "./SQL/PlannerClone.db"
const db = new sqlite.Database(filepath, (error) => {
    if (error) {
        console.error("Error Connecting to the database:", error.message);
    } else {
        console.log("connected to the SQLite database");
    }
})

// Get column names
app.get('/get_column_names', (req, res) => {
    let sql = "SELECT * FROM ColumnNames";
    try {
        db.all(sql, [], (err, rows) => {
            if (err) return res.status(300).json({ "message": err });
            res.status(200).json({ "tasks": rows });
        })
    } catch (error) {
        res.status(400).json({ "message": error });
    }  
})

// //Get specific column task details
// //Given a specific column id, get all the detail
// app.get('/tasks/:columnId', async (req, res) => {
//     let sql = "SELECT * FROM Tasks WHERE columnId=" + req.params.columnId;
//     try {
//         db.all(sql, [], (err, rows) => {
//             if (err) return res.status(300).json({ "message": err });
//             res.status(200).json({ "tasks": rows });
//         })
//     } catch (error) {
//         res.status(400).json({ "message": error });
//     }
// })

//Get all task details
//Given a specific task id, get all the detail and display in the modal pop-up
app.get('/tasks', (req, res) => {
    let sql = "SELECT Tasks.*, ColumnNames.columnName FROM Tasks LEFT JOIN ColumnNames ON Tasks.columnId = ColumnNames.columnId";
    try {
        db.all(sql, [], (err, rows) => {
            if (err) return res.status(300).json({ "message": err });
            res.status(200).json({ "tasks": rows });
        })
    } catch (error) {
        res.status(400).json({ "message": error });
    }
})

//Add new task
//Add a new task to the database
app.post('/create_task', (req, res) => {
    const { columnId, taskName, taskDescription, taskPriority, taskStatus, taskStartDate, taskDueDate, taskEndDate } = req.body;
    let sql = "INSERT INTO Tasks(columnId, taskName, taskDescription, taskPriority, taskStatus, taskStartDate, taskDueDate, taskEndDate) VALUES (?,?,?,?,?,?,?,?)";
    try {
        db.run(sql, [columnId, taskName, taskDescription, taskPriority, taskStatus, taskStartDate, taskDueDate, taskEndDate], (err) => {
            if (err) return res.status(300).json({ "message": err });
            res.status(201).json({ "message": "Task created" });
        })
    } catch (error) {
        res.status(400).json({ "message": "Server Error" });
    }
});

//Delete a task
//Deletes a task from the database
app.delete('/delete_task/:taskId', (req, res) => {
    try {
        const { taskId } = req.params
        let sql = "DELETE FROM Tasks WHERE taskId =?";
        db.run(sql, [taskId], (err) => {
            if (err) return res.status(300).json({ "message": err });
            res.status(201).json({ "message": "Task deleted" });
        })
    } catch (error) {
        res.status(400).json({ "message": error });
    }
})

//Update a task
app.patch('/update_task/:taskId', (req, res) => {
    try {
        const { taskId } = req.params;
        const { columnId, taskName, taskDescription, taskPriority, taskStatus, taskStartDate, taskDueDate, taskEndDate } = req.body
        let sql = "UPDATE Tasks SET columnId = ?, taskName = ?, taskDescription = ?, taskPriority = ?, taskStatus = ?, taskStartDate = ?, taskDueDate = ?, taskEndDate = ? WHERE taskId = ?";
        db.run(sql, [columnId, taskName, taskDescription, taskPriority, taskStatus, taskStartDate, taskDueDate, taskEndDate, taskId], (err) => {
            if (err) return res.status(300).json({ "message": err });
            res.status(200).json({ "message": "Task Updated" });
        })
    } catch (error) {
        res.status(400).json({ "message": error });
    }
})

app.listen(5000, () => {
    console.log("Listening on port 5000");
})


