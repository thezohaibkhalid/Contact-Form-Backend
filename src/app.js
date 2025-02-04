 import express from "express";
import contactRoute from "../routes/contact.routes'js";
const app = express()

const cors = require("cors")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.send("Hello Zohaib")
})

app.use("/contact", contactRoute)

module.export = app