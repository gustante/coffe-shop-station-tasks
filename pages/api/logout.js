require('dotenv').config();
import cookie from "cookie";

export default function handler(req, res) {
    console.log(req.body)


    res.setHeader("Set-Cookie", cookie.serialize("partnerName", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        sameSite: "strict",
        path: "/" //available for all pages in the website
    }));

    res.status(200).json({ message: "logged out" });









}




