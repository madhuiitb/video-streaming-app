import fs from "fs";
import path from "path";

const metadataFile = path.join(process.cwd(), "uploads", "videos.json");

export const getAllVideos = () => {
    if (!fs.existsSync(metadataFile)) return [];
    const data = fs.readFileSync(metadataFile);
    return JSON.parse(data);
};

export const saveVideo = (video) => {
    const videos = getAllVideos();
    const existingIndex = videos.findIndex(v => v.filename === video.filename);
    if (existingIndex >= 0) {
        videos[existingIndex] = { ...videos[existingIndex], ...video };
    } else {
        videos.push(video);
    }
    fs.writeFileSync(metadataFile, JSON.stringify(videos, null, 2));
};