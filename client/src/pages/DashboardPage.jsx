import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import videoService from "../services/videoService";

export default function DashboardPage() {
  const socket = useContext(SocketContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    videoService.getVideos().then((res) => setVideos(res.data));

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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.filename}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{video.originalname}</p>
              <p>Status: {video.status}</p>
              <div className="w-48 bg-gray-200 rounded mt-1">
                <div
                  className="bg-blue-600 text-white text-center text-xs rounded"
                  style={{ width: `${video.progress}%` }}
                >
                  {video.progress}%
                </div>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded text-sm ${
                video.classification === "safe"
                  ? "bg-green-200 text-green-800"
                  : video.classification === "sensitive"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {video.classification || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}