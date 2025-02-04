
import { contactCreate } from "../services/createContact.services.js";
import google from "googleapis";
import fs from "fs";
import pah from "path";


 const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

 const drive = google.drive({ version: "v3", auth: oauth2Client });

 
export default  CreateContact = async (req, res) => {
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

    return res.status(201).json({
      message: "File uploaded successfully",
      fileId: driveResponse.data.id,
      fileName: driveResponse.data.name,
      viewLink: driveResponse.data.webViewLink,  
      downloadLink: driveResponse.data.webContentLink, 
    });

  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  contactCreate(name, email, viewLink, downloadLink, message)
};
