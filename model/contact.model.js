const {  mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        minLen:[3, "Name must be at least 3 characters long"]
    }, 
    email:{
        type:email,
        required:true
    },
    file:{
        type:String
    },
    message:{
        type:String, 
        required:true
    }
})

const contactModel = mongoose.model("contact", contactSchema);