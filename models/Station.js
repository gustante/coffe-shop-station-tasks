const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const StationSchema = new Schema({
    name:{type:String, required: true},
    color:{type:String, required: true},
    tasks:[{type: Schema.Types.ObjectId, ref: 'Task'}] //every station has a list of tasks
});

module.exports = mongoose.models.Station || mongoose.model('Station', StationSchema);

