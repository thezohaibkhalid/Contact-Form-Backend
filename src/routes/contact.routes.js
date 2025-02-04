const express = require("express"); 
const router = express.Router();
const mongoose = require("mongoose"); 
const contactModel = require("../model/contact.model");
const upload = require("../middleware/multer.middleware");
const createContact = require("../controller/contact.controller")
router.post('/contact', upload.fields([
    {
        name: "userFile", 
        maxCount: 1
    }
]), createContact);

module.exports = router;
