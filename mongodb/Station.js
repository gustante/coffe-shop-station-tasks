const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationSchema = new Schema({
    name:{type:String, required: true},
    tasks:[{type: Schema.Types.ObjectId, ref: 'Task'}] //every station has a list of tasks
});

const Station = mongoose.model("Station", StationSchema);

module.exports = Station;