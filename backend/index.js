//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Tasks = require('./models/taskDetailModel');

//Setup app
const app = express();
app.use(express.json());
app.use(cors());

//Variables
const port = 5000;
const uri = 'mongodb+srv://CollinC3:<password>@test-for-full-stack.xmzfkxh.mongodb.net/?retryWrites=true&w=majority&appName=Test-for-Full-Stack'

//Connect to MongoDB
async function connect() {
    await mongoose.connect(uri);
    console.log("Connected to Database");
}

//Get task details
//Given a specific task id, get all the detail and display in the modal pop-up
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.status(200).json({ "tasks": tasks });
    } catch (error) {
        res.status(400).json({ "message": error });
    }

});

//Add new task
//Add a new task to the database
app.post('/create_task', async (req, res) => {
    try {
        const data = req.body;
        if (!data.taskName || !data.bucket) {
            return res.status(400).json({ "message": "Please enter a Task name and Bucket" });
        }
        Tasks.create(req.body);
        res.status(201).json({ "message": "Task created" });
    } catch (error) {
        res.status(400).json({ "message": "Server Error" });
    }
});

//Get column names
//Figure out what columns are used in the database
app.get('/get_column_names', async (req, res) => {
    try {
        const columns = await Tasks.distinct("bucket");
        res.status(200).json({ "tasks": columns });
    } catch (error) {
        res.status(400).json({ "message": error });
    }
});

//Delete a task
//Deletes a task from the database
app.delete('/delete_task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Tasks.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ "message": "Cannot find task" });
        }
        res.status(200).json({ "message": "Task deleted" });
    } catch (error) {
        res.status(400).json({ "message": error });
    }
})

app.listen(port, () => {
    console.log("Listening on port 5000");
})

connect();