// components/VoiceRecorder/WaveformRecorder.jsx
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";

function WaveformRecorder({ blob }) {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);

  useEffect(() => {
    if (!blob || !containerRef.current) return;

    const fileURL = URL.createObjectURL(blob);

    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#999",
      progressColor: "#06f",
      cursorColor: "transparent",
      height: 80,
      barWidth: 2,
    });

    waveSurferRef.current.load(fileURL);

    return () => {
      waveSurferRef.current?.destroy();
      waveSurferRef.current = null;
      URL.revokeObjectURL(fileURL);
    };
  }, [blob]);

  return <div ref={containerRef} />;
}
WaveformRecorder.propTypes = {
  blob: PropTypes.instanceOf(Blob),
};

export default WaveformRecorder;
