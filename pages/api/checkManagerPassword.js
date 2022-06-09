
export default async function handler(req, res) {
    console.log(req.body)

    if(req.body.managerPassword == "teamindependent") {
        res.json({displayContent: "true"});
    }
}


