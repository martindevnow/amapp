import React from "react";
import rtcService, { RtcService } from "./rtc.service";

type RtcContextType = {
  service: RtcService;
  // local: MediaStream | null;
  // remote: MediaStream | null;
};

const INITIAL = {
  service: rtcService,
  // local: null,
  // remote: null,
};

const RtcContext = React.createContext<RtcContextType>(INITIAL);

type RtcProviderProps = {
  children: React.ReactNode;
};

const RtcProvider = ({ children }: RtcProviderProps) => {
  return (
    <RtcContext.Provider
      value={{
        service: rtcService,
      }}
    >
      {children}
    </RtcContext.Provider>
  );
};

export default RtcProvider;
