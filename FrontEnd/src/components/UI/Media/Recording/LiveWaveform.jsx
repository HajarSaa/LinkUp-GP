import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./LiveWaveform.module.css";

function LiveWaveform({ isRecording, top, left, onPauseResume, onCancel }) {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pauseStart, setPauseStart] = useState(null);
  const [pauseDuration, setPauseDuration] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isRecording) return;

    setSeconds(0);
    setPaused(false);
    setPauseDuration(0);
    setStartTime(Date.now());

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        if (paused) return;

        analyser.getByteTimeDomainData(dataArray);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#06f";
        ctx.beginPath();

        let sliceWidth = (WIDTH * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0;
          let y = (v * HEIGHT) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      };

      draw();
    });

    timerRef.current = setInterval(() => {
      if (!paused && startTime) {
        const now = Date.now();
        const time = Math.floor((now - startTime - pauseDuration) / 1000);
        setSeconds(time);
      }
    }, 1000);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(timerRef.current);
      audioContextRef.current?.close();
    };
  }, [isRecording]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handlePauseResume = () => {
    setPaused((prev) => !prev);

    if (!paused) {
      setPauseStart(Date.now());
    } else {
      setPauseDuration((prev) => prev + (Date.now() - pauseStart));
      setPauseStart(null);
    }

    onPauseResume(); // نداء للوظيفة الخارجية
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div className={styles.header}>
        <span>{formatTime(seconds)}</span>
        <div className={styles.actions}>
          <button
            onClick={handlePauseResume}
            className={`${styles.btn} ${paused ? styles.resume : styles.pause}`}
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={onCancel}
            className={`${styles.btn} ${styles.cancel}`}
          >
            Cancel
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={300}
        height={70}
        className={styles.canvas}
      />
    </div>
  );
}

LiveWaveform.propTypes = {
  isRecording: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  onPauseResume: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LiveWaveform;
