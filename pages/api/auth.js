
import cookie from "cookie";

export default function handler(req, res) {
    console.log(req.body)

    try{
        console.log(req.cookies.partnerName)
        if (req.cookies.partnerName) {
            res.json({partnerName: req.cookies.partnerName});
        } else  {
            throw new Error("Not logged in")
        }

    } catch(e){
        console.log(e.message)
        res.status(401).json({ partnerName: null });


    }
   






}




