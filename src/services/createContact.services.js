import contactModel from "../model/contact.model.js";

const contactCreate = async (req, res) => {
    try {
        const { name, email, viewLink, downloadLink, message } = req.body;  // Extract from req.body

        const contact = await contactModel.create({
            name,
            email,
            viewLink,
            downloadLink,
            message,
        });

        res.status(201).json({ message: "Contact created successfully", contact });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default contactCreate;
