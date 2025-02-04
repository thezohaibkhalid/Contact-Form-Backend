const http = require("http");
const app = require("./app");
const server  = http.createServer(app);
const PORT = process.env.PORT || 3000;
const dotenv  = require("dotenv");
dotenv.config;
const connectToDb = require("./db/db")
connectToDb();
server.listen(PORT, ()=>{
    console.log(`Server is runing on port no ${PORT}`)
})
