import express from "express";
import mongoose from "mongoose";
import contactModel from "../model/contact.model.js";
import upload from "../middleware/multer.middleware.js";
import contactController from "../controller/contact.controller.js";

const router = express.Router();



router.post('/', upload.single(file), contactController.createContact);

module.exports = router;
