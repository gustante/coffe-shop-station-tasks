



import connectMongo from '../../mongodb/connection.js';
import Task from '../../models/Task.js';
import Station from '../../models/Station.js';
import clientPromise from "../../mongodb/mongodb";

export default async function handler(req, res) {
    console.log(req.body)

    console.log("received request to check task: " + req.body.taskDescription);
    
    const client = await clientPromise;
    const db = client.db("SbuxOperations")
    
    let currentDate = new Date();
    let timeNow = currentDate.getHours()

    //await connectMongo();

    //reset all tasks
    //const taskList = await Task.updateMany({}, {"$set":{checked: false, completedAt: new Date(), completedBy: "Gustavo"}});
    //await db.collection("tasks").find({ station: station._id }).toArray();
    
    const selectTask = await db.collection("tasks").find({ description: req.body.taskDescription }).toArray()


    console.log("selected task is: ")
    console.log(selectTask);
    console.log(selectTask);

    if(selectTask[0].checked == false){
        console.log("changing to checked")
        await db.collection("tasks").findOneAndUpdate({ description: req.body.taskDescription }, { "$set": { checked: true, completedAt: new Date(), completedBy: "Gustavo" } });
    } else if (selectTask[0].checked == true) {
        console.log("changing to unchecked")
        await db.collection("tasks").findOneAndUpdate({ description: req.body.taskDescription }, { "$set": { checked: false, completedAt: new Date(), completedBy: "Gustavo" } });
    }

    

    // const selectTask = await Task.findById(req.body.taskId).select('checked');
    // console.log(selectTask)
    // if(selectTask.checked == false) {
    //     console.log("switching task to checked");
    //     await Task.updateOne({_id: req.body.taskId}, {"$set":{checked: true, completedAt: new Date(), completedBy: "Gustavo"}});
    // } else if(selectTask.checked == true) {
    //     console.log("switching task to unchecked");
    //     await Task.updateOne({_id: req.body.taskId}, {"$set":{checked: false, completedAt: new Date(), completedBy: "Gustavo"}});
    // }
    
  
    const stations = await db.collection("stations").find({}).toArray();
    //const stations = await Station.find().populate('tasks');
    //send back the stations with updated task
    res.json({stations});
   


}



   





