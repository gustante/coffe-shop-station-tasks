import { mongoose, Schema, model, models } from 'mongoose';


const StationSchema = new Schema({
    name:{type:String, required: true},
    color:{type:String, required: false},
    tasks:[{type: Schema.Types.ObjectId, ref: 'Task'}] //every station has a list of tasks
})

let Station

if(mongoose == undefined || mongoose.models == undefined) {
    Station = model('Station', StationSchema);

    
    
} else {
        Station = models.Station 

    
}

export default Station;