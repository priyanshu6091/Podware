// components/videoplayer/VideoPlayer.tsx
import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="video-player">
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        className="rounded-lg"
        config={{
          file: {
            attributes: { type: 'video/x-matroska' } // MKV MIME type
          }
        }}
        onError={(e) => console.error('Error playing video:', e)}
      />
    </div>
  );
}
