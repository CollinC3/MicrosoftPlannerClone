//Imports
const express = require('express');
const sqlite = require('sqlite3').verbose();
const app = express();


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
app.listen(5000, () => {
    console.log("Listening on port 5000");
})

// const mongoose = require('mongoose');
// const Tasks = require('./models/taskDetailModel')

// //Variables
// const port = 5000;
// const uri = process.env.MONGO_KEY

// //Connect to MongoDB
// async function connect() {
//     await mongoose.connect(uri);
//     console.log("Connected to Database");
// }

// //Get task details
// //Given a specific task id, get all the detail and display in the modal pop-up
// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Tasks.find({});
//         res.status(200).json({ "tasks": tasks });
//     } catch (error) {
//         res.status(400).json({ "message": error });
//     }

// });

// //Get column names
// //Figure out what columns are used in the database
// app.get('/get_column_names', async (req, res) => {
//     try {
//         const columns = await Tasks.distinct("bucket");
//         res.status(200).json({ "tasks": columns });
//     } catch (error) {
//         res.status(400).json({ "message": error });
//     }
// });

// //Update column name

// //Add new task
// //Add a new task to the database
// app.post('/create_task', async (req, res) => {
//     try {
//         const data = req.body;
//         if (!data.taskName || !data.bucket) {
//             return res.status(400).json({ "message": "Please enter a Task name and Bucket" });
//         }
//         Tasks.create(data);
//         res.status(201).json({ "message": "Task created" });
//     } catch (error) {
//         res.status(400).json({ "message": "Server Error" });
//     }
// });

// //Update a task
// app.patch('/update_task/:id', async (req, res) => {
//     try {
//         const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {"returnDocument": "after"});
//         if (!task) {
//             return res.status(404).json({ "message": "Cannot find task" });
//         }
//         res.status(200).json({ "message": "Task updated"});
//     } catch (error) {
//         res.status(400).json({ "message": error });
//     }
// })

// //Delete a task
// //Deletes a task from the database
// app.delete('/delete_task/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const task = await Tasks.findByIdAndDelete(id);
//         if (!task) {
//             return res.status(404).json({ "message": "Cannot find task" });
//         }
//         res.status(200).json({ "message": "Task deleted" });
//     } catch (error) {
//         res.status(400).json({ "message": error });
//     }
// })

// app.listen(port, () => {
//     console.log("Listening on port 5000");
// })

// connect();