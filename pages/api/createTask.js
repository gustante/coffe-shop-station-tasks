import clientPromise from "../../mongodb/mongodb";


export default async function handler(req, res) {
    console.log(req.body)

    const client = await clientPromise;

    const db = client.db("SbuxOperations")

    let station = await db.collection("stations").findOne({ name: req.body.stationName })

    //insert new task into station
    let newTask = await db.collection("tasks").insertOne({ description: req.body.taskDescription, station: station._id, role: req.body.taskRole, time: req.body.taskTime, checked: false, completedAt: new Date(), completedBy: "Gustavo" })
    
    res.json({message: "success"})
   


}