import express from "express";
import contactRoute from "./routes/contact.routes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

 app.use(cors());

 app.use(bodyParser.json({ limit: '15mb' }));   
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));  

 app.get("/", (req, res) => {
    res.send("Hello Zohaib");
});

 app.use("/contact", contactRoute);

export default app;
