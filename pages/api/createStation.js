

import Station from '../../models/Station.js'
import connectMongo from '../../mongodb/connection.js';





export default async function handler(req, res) {

    console.log(req.body)

    await connectMongo();
    let station = new Station({
        name: req.body.stationName,
        color: req.body.stationColor,
    })

    await station.save()

    
    res.json(station);
   


}


