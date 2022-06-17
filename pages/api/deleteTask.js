import { ObjectId } from "mongodb";
import clientPromise from "../../mongodb/mongodb";


export default async function handler(req, res) {
    console.log(req.query)
    const client = await clientPromise;
    const db = client.db("SbuxOperations")
    if (req.method == 'GET') {

        //find station by id
        let taskList = await db.collection("tasks").find({ station: ObjectId(req.query.stationId)}).toArray()
        res.json({tasks: taskList})
    } else if (req.method == 'DELETE') {
        console.log(req.body)

        // delete task that matched stationId 
        let task = await db.collection("tasks").findOneAndDelete({ _id: ObjectId(req.body.taskId) })
        console.log(task)
        res.json({ message: "success" });
    }


}