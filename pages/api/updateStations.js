



import connectMongo from '../../mongodb/connection.js';
import Station from '../../models/Station.js';

export default async function handler(req, res) {

    await connectMongo();

    const stations = await Station.find().populate('tasks');
    //send back the stations
    res.json({stations});
   


}



   





