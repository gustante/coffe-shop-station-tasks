require('dotenv').config();
import cookie from "cookie";

export default function handler(req, res) {
    console.log(req.body)

    try{
        if (req.body.password == process.env.LOGINPASSWORD) {
            console.log("logged in")
            res.setHeader("Set-Cookie", cookie.serialize("partnerName", req.body.partnerName, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 8, //lasts 8 hours
                sameSite: "strict",
                path: "/" //available for all pages in the website
            }));
            res.status(200).json({ message: "success" });
            
        } else {
            throw new Error("Invalid password")
        }

    } catch(e){
        console.log(e.message)
        res.status(401).json({ message: e.message });


    }
   

}