
import clientPromise from "../../mongodb/mongodb";

export default async function handler(req, res) {
    console.log(req.body)

    console.log("received request to check task: " + req.body.taskDescription + " to " + req.body.checked);
    
    const client = await clientPromise;
    const db = client.db("SbuxOperations")
    
    let updatedTask;
    if(req.body.checked == false){
        console.log("changing to unchecked")
        updatedTask =  await db.collection("tasks").findOneAndUpdate({ description: req.body.taskDescription }, { "$set": { checked: false, completedBy: "Gustavo" } });
    } else if (req.body.checked == true) {
        console.log("changing to checked")
        updatedTask = await db.collection("tasks").findOneAndUpdate({ description: req.body.taskDescription }, { "$set": { checked: true, completedAt: req.body.date, completedBy: req.body.partnerName } });
    }

    //find station whose id is equal to updatedTask.station
    console.log(updatedTask)
    const station = await db.collection("stations").find({ _id: updatedTask.value.station }).toArray()
    //populate station tasks with tasks
    station[0].tasks = await db.collection("tasks").find({ station: station[0]._id }).toArray()
    

    
    res.json({station: station[0]});
   


}



   





