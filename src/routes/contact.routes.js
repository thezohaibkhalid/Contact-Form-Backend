import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import createContact from "../controller/contact.controller.js";

const router = express.Router();

router.post('/upload', upload.single("file"), createContact);

export default router;