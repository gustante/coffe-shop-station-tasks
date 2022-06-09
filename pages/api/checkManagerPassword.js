
export default async function handler(req, res) {
    console.log(req.body)

    if(req.body.managerPassword == "independent") {
        res.json({displayContent: "true"});
    }
}


