import { useEffect, useRef, useState } from "react";
import { HiPlay, HiPause } from "react-icons/hi2";

import PropTypes from "prop-types";
import styles from "./AudioMedia.module.css";

const AudioMedia = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.playButton} onClick={togglePlay}>
        <span className={styles.icon}>{isPlaying ? <HiPause size={18} /> : <HiPlay size={18} />}</span>
      </button>

      <input
        type="range"
        min="0"
        max={duration}
        step="1"
        value={currentTime}
        onChange={handleSeek}
        className={styles.progressBar}
        style={{ "--progress": `${(currentTime / duration) * 100 || 0}%` }}
      />

      <span className={styles.time}>{formatTime(currentTime)}</span>

      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};

AudioMedia.propTypes = {
  audioUrl: PropTypes.string.isRequired,
};

export default AudioMedia;
