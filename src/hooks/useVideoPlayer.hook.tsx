import React from "react";
import { VideoPlayerContext } from "../services/video-player/video-player.provider";

const useVideoPlayer = () => {
  const player = React.useContext(VideoPlayerContext);
  return player;
};

export default useVideoPlayer;
