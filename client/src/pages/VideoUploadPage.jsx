import React, { useState, useContext, useEffect } from "react";
import videoService from "../services/videoService";
import { SocketContext } from "../context/SocketContext";

const VideoUploadPage = ()=> {
  const socket = useContext(SocketContext);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [videoStatus, setVideoStatus] = useState("");
  const [sensitivity, setSensitivity] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a video");

    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await videoService.uploadVideo(formData, (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      });

      setUploadedVideo(res.data.file);
      setFile(null);
      setProgress(0);
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  useEffect(() => {
    if (!socket || !uploadedVideo) return;

    const handleProgress = (data) => {
      if (data.filename === uploadedVideo.filename) {
        if (data.progress !== undefined) setProgress(data.progress);
        if (data.status) setVideoStatus(data.status);
        if (data.classification) setSensitivity(data.classification);
      }
    };

    socket.on("video_progress", handleProgress);
    return () => socket.off("video_progress", handleProgress);
  }, [socket, uploadedVideo]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700"
        onClick={handleUpload}
      >
        Upload
      </button>

      {uploadedVideo && (
        <div className="mt-4">
          <p>Uploaded: {uploadedVideo.originalname}</p>

          <div className="w-full bg-gray-200 rounded mt-2">
            <div
              className="bg-blue-600 text-white text-center rounded"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>

          {videoStatus && <p>Status: {videoStatus}</p>}
          {sensitivity && <p>Classification: {sensitivity}</p>}
        </div>
      )}
    </div>
  );
}

export default VideoUploadPage;