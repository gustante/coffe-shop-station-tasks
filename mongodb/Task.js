const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    description: {type:String, required: true},
    role: {type: String, required: true},
    time: {type: Number, required: true}, //time of the day it needs to me completed. (open-11, 4-close...)
    completedAt: {type: Date, required: false, default: new Date()},
    completedBy: {type: String, required: true},
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;