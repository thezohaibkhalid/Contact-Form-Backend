import http from "http";
import app from "./app.js"
const server  = http.createServer(app);
const PORT = process.env.PORT || 3000;
import dotenv from "dotenv";
dotenv.config;
const connectToDb = require("./db/db")
connectToDb();
server.listen(PORT, ()=>{
    console.log(`Server is runing on port no ${PORT}`)
})
