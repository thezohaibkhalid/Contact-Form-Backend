import { google } from "googleapis";
import fs from "fs";
import path from "path";
import contactCreate from "../services/createContact.services.js";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

const CreateContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const file = req.file; 

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileMetadata = {
      name: file.originalname,
      parents: [process.env.FOLDER_ID],
    };
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };

    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, name, webViewLink, webContentLink",
    });

    fs.unlinkSync(file.path);

    const viewLink = driveResponse.data.webViewLink;
    const downloadLink = driveResponse.data.webContentLink;

    // Call contactCreate function
    await contactCreate(name, email, viewLink, downloadLink, message);

    return res.status(201).json({
      message: "File uploaded successfully",
      fileId: driveResponse.data.id,
      fileName: driveResponse.data.name,
      viewLink,
      downloadLink,
    });

  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default CreateContact;
