

const connection = require('../../mongodb/connection.js');
const Station = require('../../models/Station.js');
const Task = require('../../models/Task.js');




export default async function handler(req, res) {
    console.log(req.body)

    let station = await Station.findOne({ name: req.body.stationName })
    console.log(station)

    let task = new Task({
        station: station._id,
        time: req.body.taskTime,
        description: req.body.taskDescription,
        role: req.body.taskRole,
    })

    await task.save();
    station.tasks.push(task);
    await station.save();

  
    
    res.json({message: "success"})
   


}


