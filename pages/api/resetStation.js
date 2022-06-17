
import { ObjectId } from "mongodb";
import clientPromise from "../../mongodb/mongodb";

export default async function handler(req, res) {
    console.log(req.body)
    const client = await clientPromise;

    const db = client.db("SbuxOperations")

    if (req.body.stationId == "all") {

        const updated = await db.collection("tasks").updateMany({}, { "$set": { checked: false } });
        console.log(updated)
        //send back the stations
        res.json({ stationId: "all" });

    } else {

        //update all tasks on req.query.stationName to checked: false
        //const updated = await db.collection("tasks").find({ station: station[0]._id }).toArray();
        const updated = await db.collection("tasks").updateMany({ station: ObjectId(req.body.stationId), time: req.body.time }, { "$set": { checked: false } });


        console.log(updated)
        //send back the stations
        res.json({ stationId: "success"});
    }

}









