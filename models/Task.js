
import { mongoose, Schema, model, models } from 'mongoose';


const TaskSchema = new Schema({
    description: {type:String, required: true},
    station: {type: Schema.Types.ObjectId, ref: 'Station'},
    role: {type: String, required: true},
    time: {type: String, required: true}, //time of the day it needs to me completed. (open-11, 4-close...)
    completedAt: {type: Date, required: false, default: new Date()},
    completedBy: {type: String, required: false},
    checked: {type: Boolean, required: false, default: false},
});



let Task

if(mongoose == undefined || mongoose.models == undefined) {
    Task = model('Task', TaskSchema);

    
    
} else {
        Task = models.Task 

    
}

export default Task;