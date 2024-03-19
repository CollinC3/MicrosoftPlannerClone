const mongoose = require('mongoose');
const displayTaskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true
        },
        dueDate: Date,
        description: String,
    }
)

const DisplayTasks = mongoose.model('DisplayTasksInfo', displayTaskSchema)

module.exports = DisplayTasks