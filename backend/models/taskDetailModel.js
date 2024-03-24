const mongoose = require('mongoose');
const taskDetailSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true
        },
        bucket: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            default: "Low"
        },
        startDate: Date,
        dueDate: Date,
        description: String,
        checklist: [{
            taskName: String,
            completed: Boolean
        }],
        comments: [{
            comment: String,
            person: String,
            commentTime: Date
        }]
    }
)

const TaskDetails = mongoose.model('taskDetails', taskDetailSchema)

module.exports = TaskDetails