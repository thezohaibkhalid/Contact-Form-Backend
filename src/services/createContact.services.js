import contactModel from "../model/contact.model.js";

export default contactCreate = async (name, email , viewLink, downloadLink, message )=>{
    try{
        const contact= await user.Model.create({
            name,
            email, 
            viewLink, 
            downloadLink, 
            message,
        })
    }catch(error){
        console.error("Error creating contact:", error);
        res.status(500).json({error:"Internal Server Error"});
    }
}