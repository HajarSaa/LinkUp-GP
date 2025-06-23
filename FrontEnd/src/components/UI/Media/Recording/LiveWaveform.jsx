import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./LiveWaveform.module.css";
import { FaTimes } from "react-icons/fa";

function LiveWaveform({ isRecording, onCancel }) {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const waveformRef = useRef(new Array(40).fill(10)); // الأعمدة

  useEffect(() => {
    if (!isRecording) {
      setSeconds(0);
      waveformRef.current = new Array(40).fill(10);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      streamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);
        const volume =
          dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        const normalizedHeight = Math.max(6, Math.min(40, volume / 2)); // 🔥 ظبطت الشدة

        waveformRef.current.shift();
        waveformRef.current.push(normalizedHeight);

        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        const barWidth = 3; // ✅ أعمدة أرفع
        const gap = 2;
        let x = 0;

        for (let h of waveformRef.current) {
          const centerY = HEIGHT / 2;
          ctx.fillStyle = "#007bff";
          ctx.fillRect(x, centerY - h / 2, barWidth, h);
          x += barWidth + gap;
        }
      };

      draw();
    });

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(intervalRef.current);
      audioContextRef.current?.close();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [isRecording]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  if (!isRecording) return null;

  return (
    <div className={styles.wrapper}>
      <button className={styles.cancelBtn} onClick={onCancel}>
        <FaTimes/>
      </button>

      <div className={styles.waveform_container}>
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={220}
          height={60}
        />
        <span className={styles.timer}>{formatTime(seconds)}</span>
      </div>
    </div>
  );
}

LiveWaveform.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  audioBlob: PropTypes.instanceOf(Blob),
  onCancel: PropTypes.func.isRequired,
};

export default LiveWaveform;
