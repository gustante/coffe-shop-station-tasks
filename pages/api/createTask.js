

const connection = require('../../mongodb/connection.js');

const Task = require('../../models/Task.js');




export default async function handler(req, res) {
    console.log(req.body)

    // let station = new Station({
    //     name: req.body.stationName,
    // })

    // await station.save()
    // connection.close();
    
    res.json({message: "success"})
   


}


