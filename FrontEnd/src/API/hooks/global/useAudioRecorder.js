import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { enableRecoding, setNotRecording } from "../../redux_toolkit/ui/recording";

function useAudioRecorder() {
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioChunksRef = useRef([]);
  const dispatch = useDispatch();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        cleanup(); // نوقف الستريم وننضف المراجع
      };

      mediaRecorder.start();
      setIsRecording(true);
      dispatch(enableRecoding());
      setIsPaused(false);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    dispatch(setNotRecording());
    setIsPaused(false);
  };

  const finishRecording = () => {
    // تستخدمها عند الضغط على ✔️ (يحفظ الصوت ويجهزه)
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop(); // ستجهز الـ Blob تلقائيًا من onstop
    }
    setIsRecording(false);
    dispatch(setNotRecording());
    setIsPaused(false);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      audioContextRef.current?.suspend();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      audioContextRef.current?.resume();
      setIsPaused(false);
    }
  };

  const cancelRecording = () => {
    try {
      if (mediaRecorderRef.current?.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    } catch (e) {
      console.warn("Cancel: mediaRecorder already inactive");
      console.log(e);
    }
    setIsRecording(false);
    dispatch(setNotRecording());
    setIsPaused(false);
    setAudioBlob(null);
    cleanup();
  };

  const cleanup = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();
    audioChunksRef.current = [];
    mediaRecorderRef.current = null;
    streamRef.current = null;
    audioContextRef.current = null;
  };

  return {
    isRecording,
    isPaused,
    audioBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    finishRecording,
    setAudioBlob,
  };
}

export default useAudioRecorder;
