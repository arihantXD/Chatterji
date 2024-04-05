import { useRef } from "react";
import {
  setLocalStream,
  setRemoteStream,
  localStream,
  remoteStream,
  pc,
} from "../utils/webrtc";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import socket from "../utils/socket";

const Testing = () => {
  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom");
  }, []);
  const myLocalStream = useRef(null);
  const myRemoteStream = useRef(null);
  let offer;

  const initialStreamHandler = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    myLocalStream.current.srcObject = stream;

    setRemoteStream(new MediaStream());

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    myRemoteStream.current.srcObject = remoteStream;
  };

  const createCallHandler = async () => {
    pc.onicecandidate = (event) => {
      event.candidate &&
        socket.emit("offerCandidate", event.candidate.toJSON());
    };
    const offerDesc = await pc.createOffer();
    await pc.setLocalDescription(offerDesc);

    offer = {
      sdp: offerDesc.sdp,
      type: offerDesc.type,
    };
    offer && socket.emit("offer", offer);
  };

  socket.on("answer", (answer) => {
    if (!pc.currentRemoteDescription) {
      const answerDes = new RTCSessionDescription(answer);
      pc.setRemoteDescription(answerDes);
    }
    console.log(localStream);
    console.log(remoteStream);
  });

  socket.on("answerCandidate", (answerCandidate) => {
    const candidate = new RTCIceCandidate(answerCandidate);
    pc.addIceCandidate(candidate);
  });

  socket.on("offer", (offer) => {
    let offerForAnswer = null;
    offerForAnswer = offer;
    pc.setRemoteDescription(new RTCSessionDescription(offerForAnswer));
    console.log("remote description set");
  });

  socket.on("offerCandidate", (offerCandidate) => {
    pc.onicecandidate = (event) => {
      event.candidate &&
        socket.emit("answerCandidate", event.candidate.toJSON());
    };
    pc.addIceCandidate(new RTCIceCandidate(offerCandidate));
    console.log("offer candidate is generated ");
  });
  const answerCallHandler = async () => {
    const answerDes = await pc.createAnswer();
    console.log(answerDes);
    await pc.setLocalDescription(answerDes);
    const answer = {
      type: answerDes.type,
      sdp: answerDes.sdp,
    };
    socket.emit("answer", answer);
  };

  return (
    <div className="h-[100vh] mt-[100px]">
      <h3 className="text-center">Video Call Karo Naa😈🫦</h3>
      <div className="flex justify-center text-center items-center mt-[100px]">
        <div className="w-1/2">
          <h3>Local Stream</h3>
          <video ref={myLocalStream} playsInline autoPlay muted></video>
          <Button onClick={initialStreamHandler}> Start Webcam</Button>
          <Button onClick={createCallHandler}>Start Call</Button>
        </div>
        <div className="w-1/2">
          <h3>Remote Stream</h3>
          <video ref={myRemoteStream} playsInline autoPlay muted></video>
          <button onClick={answerCallHandler}>Answer Call</button>
        </div>
      </div>
    </div>
  );
};
export default Testing;
