import mongoose from "mongoose";
export default function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT).then(
        ()=>{
            console.log("Connected to db")
        }
    ).catch(
        (err)=>{
            console.log(err)
        }
)
}

