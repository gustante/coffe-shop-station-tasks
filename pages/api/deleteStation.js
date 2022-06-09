const connection = require('../../mongodb/connection.js');
const Station = require('../../models/Station.js');
const Task = require('../../models/Task.js');



export default async function handler(req, res) {
    console.log(req.body)

    await Task.deleteMany({ station: req.body.stationId });//delete all tasks associated with station
    await Station.deleteOne({ name: req.body.stationName });//delete station
    
    res.json({message: "success"});
   


}


