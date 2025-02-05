import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import createContact from "../controller/contact.controller.js";
import multer from "multer"
const router = express.Router();

 router.post('/upload', upload.single("file"), createContact, (err, req, res, next) => {
     if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: "File size exceeds the 15MB limit." });
        }
    }
    
     next(err);
});

export default router;
