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
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false); // ✅ جديد

  const fileSize = formatFileSize(file.size || file.fileSize);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);

      // ✅ لو المستخدم حاول يشغل قبل ما التحميل يخلص
      if (shouldAutoPlay) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setShouldAutoPlay(false);
          })
          .catch((err) => {
            console.warn("Play error after metadata load:", err);
            setShouldAutoPlay(false);
          });
      }
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
  }, [shouldAutoPlay]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        if (isNaN(audio.duration) || audio.readyState < 2) {
          setShouldAutoPlay(true); // ✅ استنى تحميل metadata
        } else {
          await audio.play();
          setIsPlaying(true);
        }
      } else {
        audio.pause();
        setIsPlaying(false);
        setShouldAutoPlay(false); // ✅ لو كان فيه نية للتشغيل، نلغيها
      }
    } catch (err) {
      console.warn("Play error:", err);
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

  function decodeBrokenFilename(name) {
    try {
      return decodeURIComponent(escape(name));
    } catch {
      return name;
    }
  }

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
          <span>{decodeBrokenFilename(file.fileName || file.name)}</span>
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
