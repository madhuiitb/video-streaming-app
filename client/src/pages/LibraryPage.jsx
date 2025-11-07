import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import videoService from "../services/videoService";
import VideoCard from "../components/Video/VideoCard";

export default function LibraryPage() {
  const [videos, setVideos] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    videoService.getVideos().then((res) => setVideos(res.data));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("video_progress", (data) => {
      setVideos((prev) =>
        prev.map((v) =>
          v.filename === data.filename
            ? {
                ...v,
                progress: data.progress,
                status: data.status,
                classification: data.classification,
              }
            : v
        )
      );
    });

    return () => socket.off("video_progress");
  }, [socket]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Video Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.filename} video={video} />
        ))}
      </div>
    </div>
  );
}