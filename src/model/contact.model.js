import mongoose from "mongoose"
const contactSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        minLen:[3, "Name must be at least 3 characters long"]
    }, 
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String
    },
    fileURL:{
        type:String
    },
    message:{
        type:String, 
        required:true
    }, 
    createdAt:{
        type:Date, 
        default:Date.now
    }, 
    viewLink:{
        type:String
    }, 
    downloadLink:{
        type:String
    }

})

const contactModel = mongoose.model("contact", contactSchema);
export default contactModel;