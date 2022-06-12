

import connectMongo from "../../mongodb/connection";



export default function handler(req, res) {
    console.log(req.body)
    
   
    res.json( {partnerName: req.body.partnerName});
   


}




