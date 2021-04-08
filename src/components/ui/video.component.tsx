import React from "react";
import styled from "styled-components";

import useVideoPlaybackRate from "../../hooks/useVideoPlaybackRate.hook";
import InlineAnchor from "./inline-anchor.component";

const VideoControls = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SpeedControls = styled.div``;

const VideoElement = styled.video`
  width: 100%;
`;

const PlaybackSpeedLink = styled(InlineAnchor)`
  margin: 0 0.5rem;
`;

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.5, 2];

interface VideoProps {
  videoRef: React.MutableRefObject<null | HTMLVideoElement>;
  videoId?: string;
  figureId?: string;
  posterUrl?: string;
}

const Video = ({ videoRef, videoId, figureId, posterUrl }: VideoProps) => {
  const [playbackRate, setPlaybackRate] = useVideoPlaybackRate(
    videoRef.current
  );

  return (
    <figure id={figureId} data-fullscreen="false">
      <VideoElement
        id={videoId}
        ref={videoRef}
        controls // This can be removed if we implement custom styles...
        preload="metadata"
        poster={posterUrl}
      ></VideoElement>
      <VideoControls data-state="hidden">
        <SpeedControls>
          Playback Speed:{" "}
          {PLAYBACK_SPEEDS.map((speed) => (
            <PlaybackSpeedLink
              key={speed}
              stealth={playbackRate !== speed}
              onClick={() => setPlaybackRate(speed)}
            >
              {speed}x
            </PlaybackSpeedLink>
          ))}
        </SpeedControls>
        {/* 
        // TODO: Build a beautiful styled video player controls
        
        <button
          id="playpause"
          type="button"
          data-state="play"
          onClick={() => handlePlayPause()}
        >
          Play/Pause
        </button>
        <button id="stop" type="button" data-state="stop">
          Stop
        </button>
        <div className="progress">
          <progress id="progress" value="0">
            <span id="progress-bar"></span>
          </progress>
        </div>
        <button id="mute" type="button" data-state="mute">
          Mute/Unmute
        </button>
        <button id="volinc" type="button" data-state="volup">
          Vol+
        </button>
        <button id="voldec" type="button" data-state="voldown">
          Vol-
        </button>
        <button id="fs" type="button" data-state="go-fullscreen">
          Fullscreen
        </button> */}
      </VideoControls>
      {/* <figcaption>
        &copy; Thrillworks |{" "}
        <a href="http://www.thrillworks.com">thrillworks.com</a>
      </figcaption> */}
    </figure>
  );
};

export default Video;
