import express from "express";
import { upload } from "../services/uploadService.js";
import { processVideo } from "../services/videoProcessor.js";
import { getAllVideos, saveVideo } from "../services/videoStore.js";

const router = express.Router();

router.post("/upload", upload.single("video"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const fileData = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        status: "uploaded",
        progress: 0,
        classification: null,
    };

    saveVideo(fileData);
    res.json({ message: "Upload successful", file: fileData });

    const io = req.app.get("io");

    processVideo(req.file.path, req.file.filename, (progress, classification) => {
        const status = progress < 100 ? "processing" : "done";

        saveVideo({ filename: req.file.filename, progress, status, classification });

        io.emit("video_progress", { filename: req.file.filename, progress, status, classification });
    });
});


router.get("/", (req, res) => {
    const videos = getAllVideos();
    res.json(videos);
});

router.get("/stream/:filename", (req, res) => {
    const fs = require("fs");
    const path = require("path");
    const mime = require("mime");

    const { filename } = req.params;
    const filePath = path.join(process.cwd(), "uploads", filename);

    if (!fs.existsSync(filePath)) return res.status(404).send("Video not found");

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    const contentType = mime.getType(filePath) || "video/mp4";

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": contentType,
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        res.writeHead(200, { "Content-Length": fileSize, "Content-Type": contentType });
        fs.createReadStream(filePath).pipe(res);
    }
});


export default router;