import React from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

const VideoCard = ({ video }) => {
  return (
    <div className="border rounded-md shadow hover:shadow-lg transition p-4">
      <VideoPlayer
        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${
          video.filename
        }`}
      />
      <div className="mt-2">
        <h3 className="font-semibold text-lg truncate">
          {video.originalname || "Untitled"}
        </h3>
        <p className="text-sm text-gray-600">{video.status}</p>
        <div className="w-full bg-gray-200 rounded mt-1 h-3">
          <div
            className="bg-blue-600 h-3 rounded text-xs text-white text-center"
            style={{ width: `${video.progress}%` }}
          >
            {video.progress}%
          </div>
        </div>
        <span
          className={`mt-2 px-2 py-1 rounded text-sm self-start ${
            video.classification === "safe"
              ? "bg-green-200 text-green-800"
              : video.classification === "sensitive"
              ? "bg-red-200 text-red-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {video.classification || "N/A"}
        </span>

        <Link
          to={`/videos/${video.filename}`}
          className="text-blue-500 text-sm hover:underline mt-2 block"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default VideoCard;