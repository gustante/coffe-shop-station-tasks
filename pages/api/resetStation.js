
import clientPromise from "../../mongodb/mongodb";

export default async function handler(req, res) {

    const client = await clientPromise;

    const db = client.db("SbuxOperations")

    if (req.body.stationName == "all") {

        const updated = await db.collection("tasks").updateMany({}, { "$set": { checked: false } });
        console.log(updated)
        //send back the stations
        res.json({ stationId: "all" });

    } else {
        const station = await db.collection("stations").find({ name: req.body.stationName }).toArray();

        //update all tasks on req.query.stationName to checked: false
        //const updated = await db.collection("tasks").find({ station: station[0]._id }).toArray();
        const updated = await db.collection("tasks").updateMany({ station: station[0]._id }, { "$set": { checked: false } });


        console.log(updated)
        //send back the stations
        res.json({ stationId: station[0]._id });
    }








}









