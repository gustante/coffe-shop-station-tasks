
// import connectMongo from "../../mongodb/connection";
// import Task from "../../models/Task";
// import Station from "../../models/Station";

// export default async function handler(req, res) {
//     console.log(req.body)

//     await connectMongo();
//     await Task.deleteMany({ station: req.body.stationId });//delete all tasks associated with station
//     await Station.deleteOne({ name: req.body.stationName });//delete station
    
//     res.json({message: "success"});
   


// }


