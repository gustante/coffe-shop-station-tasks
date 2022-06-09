const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const TaskSchema = new Schema({
    description: {type:String, required: true},
    station: {type: Schema.Types.ObjectId, ref: 'Station'},
    role: {type: String, required: true},
    time: {type: String, required: true}, //time of the day it needs to me completed. (open-11, 4-close...)
    completedAt: {type: Date, required: false, default: new Date()},
    completedBy: {type: String, required: false},
});

module.exports =
    mongoose.models.Task || mongoose.model('Task', TaskSchema);



