const mongoose = require('mongoose');
const taskDetailSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true
        },
        assignedPerson: String,
        bucket: {
            type: String,
            required: true
        },
        progress: {
            type: String,
            default: "Not Started"
        },
        priority: {
            type: String,
            default: "Low"
        },
        startDate: Date,
        dueDate: Date,
        description: String,
        checklist: {
            id: Number,
            taskName: String,
            completed: Boolean
        },
        comments: {
            id: Number,
            comment: String,
            person: String,
            commentTime: Date
        }
    }
)

const TaskDetails = mongoose.model('taskDetails', taskDetailSchema)

module.exports = TaskDetails