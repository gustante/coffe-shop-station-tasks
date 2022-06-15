
import clientPromise from "../../mongodb/mongodb";

export default async function handler(req, res) {
    console.log(req.body)

    console.log("received request to check task: " + req.body.taskDescription);
    
    const client = await clientPromise;
    const db = client.db("SbuxOperations")
    
    let currentDate = new Date();
    let timeNow = currentDate.getHours()

    const selectTask = await db.collection("tasks").find({ description: req.body.taskDescription }).toArray()


    if(selectTask[0].checked == false){
        console.log("changing to checked")
        await db.collection("tasks").findOneAndUpdate({ description: req.body.taskDescription }, { "$set": { checked: true, completedAt: new Date(), completedBy: "Gustavo" } });
    } else if (selectTask[0].checked == true) {
        console.log("changing to unchecked")
        await db.collection("tasks").findOneAndUpdate({ description: req.body.taskDescription }, { "$set": { checked: false, completedAt: new Date(), completedBy: "Gustavo" } });
    }


    res.json({message: "task updated"});
   


}



   





