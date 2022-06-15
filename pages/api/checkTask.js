
import clientPromise from "../../mongodb/mongodb";

export default async function handler(req, res) {
    console.log(req.body)

    console.log("received request to check task: " + req.body.taskDescription);
    
    const client = await clientPromise;
    const db = client.db("SbuxOperations")
    
    let currentDate = new Date();
    let timeNow = currentDate.getHours()

    const selectTask = await db.collection("tasks").find({ description: req.body.taskDescription }).toArray()

    let updatedTask;

    if(selectTask[0].checked == false){
        console.log("changing to checked")
        updatedTask =  await db.collection("tasks").findOneAndUpdate({ description: req.body.taskDescription }, { "$set": { checked: true, completedAt: new Date(), completedBy: "Gustavo" } });
    } else if (selectTask[0].checked == true) {
        console.log("changing to unchecked")
        updatedTask = await db.collection("tasks").findOneAndUpdate({ description: req.body.taskDescription }, { "$set": { checked: false, completedAt: new Date(), completedBy: "Gustavo" } });
    }

    //find station whose id is equal to updatedTask.station
    console.log(updatedTask)
    const station = await db.collection("stations").find({ _id: updatedTask.value.station }).toArray()
    //populate station tasks with tasks
    station[0].tasks = await db.collection("tasks").find({ station: station[0]._id }).toArray()
    

    
    res.json({station: station[0]});
   


}



   





