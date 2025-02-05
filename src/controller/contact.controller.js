import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
import nodemailer from "nodemailer"; 
import contactCreate from "../services/createContact.services.js";

dotenv.config();

 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

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
      body: file.path ? fs.createReadStream(file.path) : Buffer.from(file.buffer),
    };

    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, name, webViewLink, webContentLink",
    });

    
    const mailOptions = {
      from: {email},
      to: process.env.NOTIFICATION_EMAIL, 
      subject: 'New File Upload Notification',
      html: `
        <h3>New File Uploaded to Google Drive</h3>
        <p><strong>Uploader Name:</strong> ${name}</p>
        <p><strong>Uploader Email:</strong> ${email}</p>
        <p><strong>File Name:</strong> ${driveResponse.data.name}</p>
        <p><strong>View Link:</strong> <a href="${driveResponse.data.webViewLink}">${driveResponse.data.webViewLink}</a></p>
        <p><strong>Download Link:</strong> <a href="${driveResponse.data.webContentLink}">${driveResponse.data.webContentLink}</a></p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      `
    };

     await transporter.sendMail(mailOptions);

    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    const viewLink = driveResponse.data.webViewLink;
    const downloadLink = driveResponse.data.webContentLink;

    await contactCreate(name, email, viewLink, downloadLink, message);

    return res.status(201).json({
      message: "File uploaded successfully",
      fileId: driveResponse.data.id,
      fileName: driveResponse.data.name,
      viewLink,
      downloadLink,
    });

  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default CreateContact;
