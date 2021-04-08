import React from "react";

const useVideoPlaybackRate = (video: null | HTMLVideoElement) => {
  const [playback, setPlayback] = React.useState(1);

  React.useEffect(() => {
    if (!video) {
      return;
    }
    video.playbackRate = playback;
  }, [playback, video]);

  return [playback, setPlayback] as const;
};

export default useVideoPlaybackRate;
