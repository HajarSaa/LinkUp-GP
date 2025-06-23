import styles from "../MessageInput.module.css";
import { FaPlus } from "react-icons/fa6";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { GoMention } from "react-icons/go";
import { AiOutlineAudio } from "react-icons/ai";
import { CgShortcut } from "react-icons/cg";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { openInputMenuModal } from "../../../../../API/redux_toolkit/modals/chat/inputMenu";
import useAudioRecorder from "../../../../../API/hooks/global/useAudioRecorder.js";
import { useEffect, useRef, useState } from "react";
import { FaStop } from "react-icons/fa";
// import WaveformRecorder from "../../../Media/AudioMedia/WaveformRecorder.jsx";
import LiveWaveform from "../../../Media/Recording/LiveWaveform.jsx";


function LowerToolbar({ isThread, isEditing }) {
  const { isRecording, audioBlob, startRecording, stopRecording } =
    useAudioRecorder();
  const dispatch = useDispatch();
  const audioBtnRef = useRef(null);
  const [micPosition, setMicPosition] = useState({ top: 0, left: 0 });

  function handleOpenInputMenu(e) {
    const menuHeight = 140;
    const padding = 8;
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: buttonRect.left,
      y: buttonRect.top - menuHeight - padding,
    };
    dispatch(openInputMenuModal(position));
  }

  const startRecordingWithUI = async () => {
    if (audioBtnRef.current) {
      const rect = audioBtnRef.current.getBoundingClientRect();
      setMicPosition({
        top: rect.top - 70, // يظهر فوق الزر
        left: rect.left,
      });
    }
    await startRecording();
  };


  useEffect(() => {
    if (audioBlob) {
      console.log("🎙️ Audio Blob:", audioBlob);
    }
  }, [audioBlob]);


  return (
    <div
      className={`${styles.left_icons} ${
        isThread ? styles.small_left_icons : ""
      }`}
    >
      {!isEditing && (
        <div className={styles.tool_wrapper} onClick={handleOpenInputMenu}>
          <span className={styles.tool_icon}>
            <FaPlus />
          </span>
        </div>
      )}

      <div className={styles.tool_wrapper}>
        <span className={styles.tool_icon}>
          <RxLetterCaseCapitalize />
        </span>
      </div>

      <div className={styles.tool_wrapper}>
        <span className={styles.tool_icon}>
          <BsEmojiSmile />
        </span>
      </div>

      {!isEditing && (
        <>
          <div className={styles.tool_wrapper}>
            <span className={styles.tool_icon}>
              <GoMention />
            </span>
          </div>
          <div
            className={styles.tool_wrapper}
            onClick={isRecording ? stopRecording : startRecordingWithUI}
            ref={audioBtnRef}
          >
            <span
              className={styles.tool_icon}
              style={{ color: isRecording ? "red" : "" }}
            >
              {isRecording ? <FaStop /> : <AiOutlineAudio />}
            </span>
          </div>

          <LiveWaveform
            isRecording={isRecording}
            top={micPosition.top}
            left={micPosition.left}
            onPauseResume={() => {
              if (audioBtnRef.current?.state === "recording") {
                audioBtnRef.current.pause();
              } else if (audioBtnRef.current?.state === "paused") {
                audioBtnRef.current.resume();
              }
            }}
            onCancel={() => {
              if (audioBtnRef.current?.state !== "inactive") {
                audioBtnRef.current.stop();
              }
            }}
          />

          <div className={styles.tool_wrapper}>
            <span className={styles.tool_icon}>
              <CgShortcut />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

LowerToolbar.propTypes = {
  isThread: PropTypes.bool,
  isEditing: PropTypes.bool,
};

export default LowerToolbar;
