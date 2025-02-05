import contactModel from "../model/contact.model.js";

const contactCreate = async (name, email, viewLink, downloadLink, message) => {
    try {
        const contact = await contactModel.create({
            name,
            email,
            viewLink,
            downloadLink,
            message,
        });

        return contact;
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error; 
    }
};

export default contactCreate;