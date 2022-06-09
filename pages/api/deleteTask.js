const connection = require('../../mongodb/connection.js');
const Station = require('../../models/Station.js');
const Task = require('../../models/Task.js');



export default async function handler(req, res) {
    if (req.method == 'GET') {
        let station = await Station.findOne({ _id: req.query.stationId })
        let tasks = await Task.find({ station: station._id })
        console.log(tasks)
        res.json(tasks)
    } else if (req.method == 'DELETE') {
        console.log(req.body)

        let station = await Station.findById(req.body.stationId).populate('tasks'); //find by id
        station.tasks = station.tasks.filter(task => task._id != req.body.taskId);//delete req.body.taskId from station.tasks
        await station.save();//save station

        //delete task
        await Task.deleteOne({ _id: req.body.taskId });


        res.json({ message: "success" });
    }


}


