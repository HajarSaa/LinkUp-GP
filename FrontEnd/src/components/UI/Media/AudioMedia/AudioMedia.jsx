import { useEffect, useRef, useState } from "react";
import { HiPlay, HiPause } from "react-icons/hi2";

import PropTypes from "prop-types";
import styles from "./AudioMedia.module.css";
import { formatFileSize } from "../../../../utils/filesUtils";

const AudioMedia = ({ file }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const fileSize = formatFileSize(file.fileSize);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
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
      <div className={styles.left_side}>
        <button className={styles.playButton} onClick={togglePlay}>
          <span className={styles.icon}>
            {isPlaying ? <HiPause size={18} /> : <HiPlay size={18} />}
          </span>
        </button>
      </div>
      <div className={styles.right_side}>
        <div className={styles.top_section_info}>
          <span>{file.fileName}</span>
          <span>{fileSize}</span>
        </div>
        <div className={styles.bottom_section}>
          <div className={styles.progressWrapper}>
            <input
              type="range"
              min="0"
              max={duration}
              step="0.01"
              value={currentTime}
              onChange={handleSeek}
              className={styles.progressBar}
              style={{
                "--progress": `${(currentTime / (duration || 1)) * 100}%`,
              }}
            />
            <span
              className={styles.customThumb}
              style={{
                left: `${(currentTime / (duration || 1)) * 100}%`,
                "--audio-thumb-color": isPlaying ? "#0074cc" : "#999",
              }}
            />
          </div>
          <span className={styles.time}>{formatTime(currentTime)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={file.fileUrl} />
    </div>
  );
};

AudioMedia.propTypes = {
  file: PropTypes.any.isRequired,
};

export default AudioMedia;
