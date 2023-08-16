const express = require("express");
const routes = express.Router();
const upload = require("../folderUpload");

const videosController = require("../controllers/videosController");

routes.post("/aws", upload.single("video_name"), videosController.videoUpload);

module.exports = routes;
