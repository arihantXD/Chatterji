const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export let localStream = null;
export let remoteStream = null;
export const pc = new RTCPeerConnection(servers);
export const setLocalStream = (stream) => {
  localStream = stream;
};
export const setRemoteStream = (stream) => {
  remoteStream = stream;
};
