import Video from '../models/Video.js';
import { classifyVideo } from '../utils/classificationHelper.js';
import { io } from '../config/socket.js';

export const uploadVideo = async (req, res) => {
    const { originalname, filename } = req.file;
    const video = await Video.create({ title: originalname, filename });

    let progress = 0;
    const interval = setInterval(async () => {
        progress += 20;
        io.emit('progress', { id: video._id, progress });
        await Video.findByIdAndUpdate(video._id, { progress });

        if (progress >= 100) {
            clearInterval(interval);
            const classification = classifyVideo();
            await Video.findByIdAndUpdate(video._id, { status: 'done', classification });
        }
    }, 1000);

    res.json({ message: 'Video uploaded', video });
};

export const getVideos = async (req, res) => {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
};