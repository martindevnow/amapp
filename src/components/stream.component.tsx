import React from "react";
import { ButtonDark } from "./ui/button.component";
import rtcService from "../services/webrtc/rtc.service";

type StreamProps = {
  roomId: string;
};

const Stream = ({ roomId }: StreamProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const remoteRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    (videoRef.current as HTMLVideoElement).srcObject = rtcService.getLocal();
    (remoteRef.current as HTMLVideoElement).srcObject = rtcService.getRemote();
  }, []);

  const updateFeed = (
    ref: React.RefObject<HTMLVideoElement>,
    feed: MediaStream | null
  ) => {
    (ref.current as HTMLVideoElement).srcObject = feed;
  };

  const startWebcam = async () => {
    await rtcService.enableWebcam(() =>
      updateFeed(remoteRef, rtcService.getRemote())
    );
    updateFeed(videoRef, rtcService.getLocal());
  };

  const joinCall = async () => {
    await rtcService.joinCall(roomId, () =>
      updateFeed(remoteRef, rtcService.getRemote())
    );
  };

  const answerCall = async () => {
    await rtcService.answerCall(roomId, () =>
      updateFeed(remoteRef, rtcService.getRemote())
    );
  };

  return (
    <div>
      <ButtonDark onClick={startWebcam}>Enable Webcam</ButtonDark>
      <video ref={videoRef} autoPlay playsInline></video>
      <ButtonDark onClick={joinCall}>Join Call</ButtonDark>
      <ButtonDark onClick={answerCall}>Answer Call</ButtonDark>
      <video ref={remoteRef} autoPlay playsInline></video>

      <ButtonDark>Hangup</ButtonDark>
    </div>
  );
};

export default Stream;
