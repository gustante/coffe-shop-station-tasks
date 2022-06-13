



//import connectMongo from '../../mongodb/connection.js';
import Station from '../../models/Station.js';
import clientPromise from "../../mongodb/mongodb";

export default async function handler(req, res) {

    //await connectMongo();
    const client = await clientPromise;

    const db = client.db("SbuxOperations")



    //const stations = await Station.find().populate('tasks');

    const stations = await db.collection("stations").find({}).toArray();
    //populate stations.tasks   with tasks
    for (let station of stations) {
        station.tasks = await db.collection("tasks").find({ station: station._id }).toArray();
    }

    //console.log(stations.map(station => station.tasks))


    //let data = JSON.stringify(stations);

    //console.log(stations)

    //send back the stations
    res.json({ stations });



}









