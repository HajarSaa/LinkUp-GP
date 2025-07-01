import { useRef } from "react";
import socket from "../../sockets/socketService";

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function useWebRTC(conversationId, onRemoteStream) {
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  const getLocalStream = async () => {
  try {
    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return localStream.current;
  } catch (err) {
    console.warn("⚠️ Camera/mic not found. Using dummy stream.");
    
    // fallback: create silent dummy stream
    const dummyStream = new MediaStream();

    // fake audio track
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const dst = audioCtx.createMediaStreamDestination();
    oscillator.connect(dst);
    oscillator.start();
    dummyStream.addTrack(dst.stream.getAudioTracks()[0]);

    // fake video track
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const stream = canvas.captureStream(5); // 5 fps
    dummyStream.addTrack(stream.getVideoTracks()[0]);

    localStream.current = dummyStream;
    return localStream.current;
  }
};


  const initCall = async () => {
    const stream = await getLocalStream();
    peerConnection.current = new RTCPeerConnection(config);

    stream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, stream);
    });

    peerConnection.current.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (onRemoteStream) onRemoteStream(remoteStream);
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("call:ice-candidate", {
          conversationId,
          candidate: event.candidate,
        });
      }
    };
  };

  const createOffer = async () => {
    if (!peerConnection.current) return;
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit("call:offer", { conversationId, offer });
  };

  const createAnswer = async (remoteOffer) => {
    if (!peerConnection.current) return;
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteOffer)
    );
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.emit("call:answer", { conversationId, answer });
  };

  const setRemoteAnswer = async (answer) => {
    if (!peerConnection.current) return;
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  const addIceCandidate = async (candidate) => {
    if (!peerConnection.current) return;
    await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const toggleTrack = (kind, enabled) => {
    localStream.current?.getTracks().forEach((t) => {
      if (t.kind === kind) t.enabled = enabled;
    });
  };

  const replaceVideoTrack = async (newTrack) => {
    if (!peerConnection.current) return;
    const sender = peerConnection.current
      .getSenders()
      .find((s) => s.track.kind === "video");
    if (sender) sender.replaceTrack(newTrack);
  };

  const stop = () => {
    localStream.current?.getTracks().forEach((t) => t.stop());
    peerConnection.current?.close();
    peerConnection.current = null;
  };

  return {
    getLocalStream,
    initCall,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    addIceCandidate,
    toggleTrack,
    replaceVideoTrack,
    stop,
    localStream,
  };
}
