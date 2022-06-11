



import connectMongo from '../../mongodb/connection.js';
import Task from '../../models/Task.js';
import Station from '../../models/Station.js';

export default async function handler(req, res) {
    console.log(req.body)

    console.log("received request to check task: " + req.body.taskId);
    
    
    
    let currentDate = new Date();
    let timeNow = currentDate.getHours()

    await connectMongo();

    //reset all tasks
    //const taskList = await Task.updateMany({}, {"$set":{checked: false, completedAt: new Date(), completedBy: "Gustavo"}});
    const selectTask = await Task.findById(req.body.taskId).select('checked');
    console.log(selectTask)
    if(selectTask.checked == false) {
        console.log("switching task to checked");
        await Task.updateOne({_id: req.body.taskId}, {"$set":{checked: true, completedAt: new Date(), completedBy: "Gustavo"}});
    } else if(selectTask.checked == true) {
        console.log("switching task to unchecked");
        await Task.updateOne({_id: req.body.taskId}, {"$set":{checked: false, completedAt: new Date(), completedBy: "Gustavo"}});
    }
    
  
    
    const stations = await Station.find().populate('tasks');
    //send back the stations with updated task
    res.json({stations});
   


}



   





