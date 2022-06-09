

const connection = require('../../mongodb/connection.js');

const Station = require('../../models/Station.js');




export default async function handler(req, res) {
    console.log(req.body)

    let station = new Station({
        name: req.body.stationName,
    })

    await station.save()

    
    res.json(station);
   


}


