const connection = require('../../mongodb/connection.js');
const Station = require('../../models/Station.js');
const Task = require('../../models/Task.js');



export default async function handler(req, res) {
    console.log(req.body)

    const taskList = await Task.find({ });//delete all tasks associated with station\

    for(let task in taskList){
        task.checked = false;
    }
    
    
    res.json({message: "success"});
   


}


