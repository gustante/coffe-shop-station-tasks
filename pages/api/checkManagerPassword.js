require('dotenv').config();
export default async function handler(req, res) {
    console.log(req.body)

    if(req.body.managerPassword == process.env.MANAGERPASSWORD) {
        res.json({displayContent: "true"});
    }
}


