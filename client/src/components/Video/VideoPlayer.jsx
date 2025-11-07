import React from "react";

export default function VideoPlayer({ src }) {
  return (
    <video
      className="w-full max-w-3xl rounded-lg shadow-md"
      controls
      src={src}
    />
  );
}