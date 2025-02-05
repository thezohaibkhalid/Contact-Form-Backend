import http from "http";
import app from "./app.js"
const server  = http.createServer(app);
const PORT = process.env.PORT || 3000;
import dotenv from "dotenv";
dotenv.config;
import connectToDb  from "./db/db.js";
connectToDb();
server.listen(PORT, ()=>{
    console.log(`Server is runing on port no ${PORT}`)
})
