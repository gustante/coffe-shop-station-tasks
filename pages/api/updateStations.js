
import clientPromise from "../../mongodb/mongodb";

export default async function handler(req, res) {

    //await connectMongo();
    const client = await clientPromise;

    const db = client.db("SbuxOperations")

    const stations = await db.collection("stations").find({}).toArray();
    
    //populate stations.tasks   with tasks
    for (let station of stations) {
        station.tasks = await db.collection("tasks").find({ station: station._id }).toArray();
    } 

    //send back the stations
    res.json({ stations });



}









