import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import useVoiceRecorder from "./useVoiceRecorder";

const AudioRecord = () => {
  const { isRecording, audioUrl, startRecording, stopRecording } =
    useVoiceRecorder();
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (audioUrl && waveformRef.current) {
      if (wavesurferRef.current) wavesurferRef.current.destroy();

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ccc",
        progressColor: "#4f46e5",
        height: 60,
        barWidth: 2,
      });

      wavesurferRef.current.load(audioUrl);
    }
  }, [audioUrl]);

  return (
    <div className="p-4 rounded-xl border border-gray-300 w-[300px]">
      <div className="flex items-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="p-2 bg-green-500 rounded-full text-white"
          >
            <FaMicrophone />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="p-2 bg-red-500 rounded-full text-white"
          >
            <FaStop />
          </button>
        )}
        <span>{isRecording ? "Recording..." : "Click to record"}</span>
      </div>

      {audioUrl && (
        <div>
          <div ref={waveformRef} className="mt-4" />
          <audio src={audioUrl} controls className="mt-2 w-full" />
        </div>
      )}
    </div>
  );
};


export default AudioRecord;