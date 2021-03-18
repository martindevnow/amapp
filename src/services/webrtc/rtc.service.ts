import firebaseService, { FirebaseService } from "../firebase/firebase.service";

const defaultServers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export class RtcService {
  private pc: RTCPeerConnection;
  private localStream: MediaStream | null;
  private remoteStream: MediaStream;
  private db: firebase.firestore.Firestore;

  constructor(servers = defaultServers, firebaseService: FirebaseService) {
    this.pc = new RTCPeerConnection(servers);
    this.localStream = new MediaStream();
    this.remoteStream = new MediaStream();
    this.db = firebaseService.db;
  }

  mount = (cb?: Function) => {
    this.pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream?.addTrack(track);
        cb?.(track);
      });
    };
  };

  enableWebcam = async (onAnswer: Function) => {
    console.log("Enable Webcam");
    this.localStream = await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((a) => a)
      .catch((error) => {
        console.error(error.name, error.message);
        return null;
      });
    console.log(this.localStream);

    if (this.localStream === null) {
      return Promise.reject("Failed to get local stream from user");
    }

    this.remoteStream = new MediaStream();

    this.localStream.getTracks().forEach((track) => {
      this.pc.addTrack(track, this.localStream as MediaStream);
    });

    this.mount(onAnswer);
  };

  joinCall = async (roomId: string, onAnswer: Function) => {
    console.log(`Joining room ${roomId}`);
    const callDoc = this.db.collection("calls").doc(roomId);
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    this.mount(onAnswer);

    this.pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await this.pc.createOffer();
    // Will start generation of ICE candidates
    await this.pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!this.pc.currentRemoteDescription && data?.answer) {
        console.log("Answer Received", { data });
        const answerDescription = new RTCSessionDescription(data.answer);
        this.pc.setRemoteDescription(answerDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New entry to answerCandidates");
          const candidate = new RTCIceCandidate(change.doc.data());
          this.pc.addIceCandidate(candidate);
        }
      });
    });
  };

  answerCall = async (roomId: string, onAnswer: Function) => {
    const callDoc = this.db.collection("calls").doc(roomId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    this.pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData?.offer;
    console.log("Answering Call: ", { callData });
    await this.pc.setRemoteDescription(
      new RTCSessionDescription(offerDescription)
    );

    const answerDescription = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });
    onAnswer?.();

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "added") {
          onAnswer?.();
          let data = change.doc.data();
          this.pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  getLocal = () => {
    return this.localStream;
  };

  getRemote = () => {
    return this.remoteStream;
  };
}

const rtcService = new RtcService(defaultServers, firebaseService);

export default rtcService;
