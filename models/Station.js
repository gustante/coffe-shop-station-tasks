
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationSchema = new mongoose.Schema({
    name:{type:String, required: true},
    color:{type:String, required: false},
    tasks:[{type: Schema.Types.ObjectId, ref: 'Task'}] //every station has a list of tasks
})


module.exports = mongoose.models.Station || mongoose.model('Station', StationSchema);


