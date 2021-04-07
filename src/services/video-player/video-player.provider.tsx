import React from "react";

export const VideoPlayerContext = React.createContext<null | HTMLVideoElement>(
  null
);

const VideoPlayerProvider: React.FC<{ player: null | HTMLVideoElement }> = ({
  player,
  children,
}) => {
  return (
    <VideoPlayerContext.Provider value={player}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayerProvider;
