



const connection = require('../../mongodb/connection.js');
const Station = require('../../models/Station.js');
const Task = require('../../models/Task.js');

export default async function handler(req, res) {
    console.log(req.body)

    console.log("received request to check task: " + req.body.taskId);
    
    
    
    let currentDate = new Date();
    let timeNow = currentDate.getHours()

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
    

  
    
    
    res.json({message: "success"});
   


}



   





