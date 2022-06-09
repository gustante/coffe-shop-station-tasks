

const connection = require('../../mongodb/connection.js');

const Station = require('../../models/Station.js');



export default function handler(req, res) {
    console.log(req.body)
    
    
   
    res.json( {partnerName: req.body.partnerName});
   


}


