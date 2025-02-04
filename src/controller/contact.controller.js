const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const contactModel = require("../model/contact.model");

const KEY_FILE_PATH = path.join(__dirname, "../config/your-service-account.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

 const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES
});

const drive = google.drive({ version: "v3", auth });

 const FOLDER_ID = "your_google_drive"

module.exports.CreateContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const file = req.files?.userFile ? req.files.userFile[0] : null;

        let fileUrl = null;

        if (file) {
            const response = await drive.files.create({
                requestBody: {
                    name: file.originalname,
                    parents: [FOLDER_ID], 
                },
                media: {
                    mimeType: file.mimetype,
                    body: fs.createReadStream(file.path),
                }
            });

            const fileId = response.data.id;
            fileUrl = `https://drive.google.com/uc?id=${fileId}`;

            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                }
            });

            fs.unlinkSync(file.path);
        }

        // Save form data to MongoDB
        const contact = new contactModel({
            name,
            email,
            message,
            fileUrl,
        });

        await contact.save();

        res.status(201).json({ message: "Contact form submitted successfully!", contact });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};