const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const StationSchema = new Schema({
    name:{type:String, required: true},
    color:{type:String, required: false},
    tasks:[{type: Schema.Types.ObjectId, ref: 'Task'}] //every station has a list of tasks
});




if(mongoose.models == undefined) {
    module.exports = mongoose.model('Station', StationSchema);
    
} else {
    module.exports = mongoose.models.Station
}


