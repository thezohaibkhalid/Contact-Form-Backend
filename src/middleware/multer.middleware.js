
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const tempDir = path.join(process.cwd(), 'public', 'upload');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

var maxSize = 15 * 1024 * 1024;  

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, tempDir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
  onFileUploadStart: function (file, req, res) {
    if (file.size > maxSize) {
      return false;  
    }
  }
});

export const upload = multer({ storage: storage });