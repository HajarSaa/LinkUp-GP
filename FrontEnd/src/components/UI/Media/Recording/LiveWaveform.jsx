import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./LiveWaveform.module.css";

function LiveWaveform({ isRecording, audioBlob, onCancel, onSave }) {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const offsetRef = useRef(0); // ✅ لحركة الشريط لليمين

  useEffect(() => {
    if (!isRecording) {
      setSeconds(0); // ✅ reset بعد كل تسجيل
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
      analyser.fftSize = 32; // عدد قليل لأعمدة واضحة
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        const barWidth = 4;
        const gap = 2;
        const totalWidth = barWidth + gap;

        let x = offsetRef.current;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] * 0.6;
          const centerY = HEIGHT / 2;

          ctx.fillStyle = "#007bff";
          ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);

          x += totalWidth;
          if (x > WIDTH) break;
        }

        // ✅ نحرك الرسم شويه يمين
        offsetRef.current += 2;
        if (offsetRef.current > totalWidth) {
          offsetRef.current = 0;
        }
      };

      draw();
    });

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1); // ✅ تايمر حقيقي بيزيد كل ثانية
    }, 1000);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(intervalRef.current);
      offsetRef.current = 0;
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
        ✖
      </button>

      <div className={styles.waveform_container}>
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={200}
          height={60}
        />
        <span className={styles.timer}>{formatTime(seconds)}</span>
      </div>

      <button className={styles.saveBtn} onClick={() => onSave(audioBlob)}>
        ✔
      </button>
    </div>
  );
}

LiveWaveform.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  audioBlob: PropTypes.instanceOf(Blob),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default LiveWaveform;
