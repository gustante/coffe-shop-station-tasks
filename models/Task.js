const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const TaskSchema = new Schema({
    description: {type:String, required: true},
    role: {type: String, required: true},
    time: {type: Number, required: true}, //time of the day it needs to me completed. (open-11, 4-close...)
    completedAt: {type: Date, required: false, default: new Date()},
    completedBy: {type: String, required: true},
});

module.exports =
    mongoose.models.Task || mongoose.model('Task', StationSchema);



