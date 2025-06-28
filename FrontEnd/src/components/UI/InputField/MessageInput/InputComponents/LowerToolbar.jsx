/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "../MessageInput.module.css";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { GoMention } from "react-icons/go";
import { AiOutlineAudio } from "react-icons/ai";
import { CgShortcut } from "react-icons/cg";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import LiveWaveform from "../../../Media/Recording/LiveWaveform.jsx";
import useAudioRecorder from "../../../../../API/hooks/global/useAudioRecorder.js";
import useUploadMedia from "../../../../../API/hooks/media/useUploadMedia.js";

import {
  addFile,
  addResponse,
  removeFile,
  setFileStatus,
} from "../../../../../API/redux_toolkit/api_data/media/fileUploadSlice";
import { openInputMenuModal } from "../../../../../API/redux_toolkit/modals/chat/inputMenu";

function LowerToolbar({ isThread, isEditing }) {
  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    cancelRecording,
    setAudioBlob,
  } = useAudioRecorder();

  const dispatch = useDispatch();
  const audioBtnRef = useRef(null);
  const [shouldUpload, setShouldUpload] = useState(false);
  const [overlayClick, setOverlayClick] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const isChannel = location.pathname.includes("/channels");
  const pageId = `${isChannel ? "channel" : "conversation"}-${id}`;
  const uploadMutation = useUploadMedia();

  function handleOverlayClick() {
    setOverlayClick(true);
    setTimeout(() => {
      setOverlayClick(false);
    }, 1000);
  }

  const handleOpenInputMenu = (e) => {
    const menuHeight = 140;
    const padding = 8;
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: buttonRect.left,
      y: buttonRect.top - menuHeight - padding,
    };
    dispatch(openInputMenuModal(position));
  };

  const startRecordingWithUI = async () => {
    await startRecording();
  };

  const handleSaveRecording = () => {
    stopRecording();
    setShouldUpload(true); // ✅ استعد للرفع لما blob يتكون
  };

  useEffect(() => {
    if (!shouldUpload || !audioBlob) return;

    const fileName = "Record Clip.mp3";
    const file = new File([audioBlob], fileName, { type: "audio/mpeg" });
    const previewURL = URL.createObjectURL(file);

    const fileMeta = {
      name: file.name,
      type: file.type,
      size: file.size,
      previewURL,
      progress: 1,
      tempId: `${file.name}-${Date.now()}`,
    };

    dispatch(addFile({ pageId, file: fileMeta }));

    const formData = new FormData();
    formData.append("files", file);
    formData.append(isChannel ? "channelId" : "conversationId", id);

    uploadMutation.mutate(
      { formData },
      {
        onSuccess: (data) => {
          dispatch(addResponse({ pageId, responseFiles: data }));
          dispatch(setFileStatus({ pageId, previewURL, status: "done" }));
          setShouldUpload(false); // ✅ نوقف الرفع
          setAudioBlob(null); // ✅ نمسح البلووب بعد الرفع
        },
        onError: () => {
          dispatch(removeFile({ pageId, previewURL }));
          setShouldUpload(false);
          setAudioBlob(null); // ❗ بردو نمسحه في حالة الخطأ
        },
      }
    );
  }, [audioBlob, shouldUpload]);

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

      {/* <div className={styles.tool_wrapper}>
        <span className={styles.tool_icon}>
          <RxLetterCaseCapitalize />
        </span>
      </div> */}

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
            className={`${styles.tool_wrapper} ${
              isRecording ? styles.recording : ""
            }`}
            ref={audioBtnRef}
          >
            <span
              className={`${styles.tool_icon}`}
              onClick={isRecording ? handleSaveRecording : startRecordingWithUI}
            >
              {isRecording ? <FaCheck /> : <AiOutlineAudio />}
            </span>
          </div>
          {isRecording && (
            <div className={styles.overlay} onClick={handleOverlayClick}></div>
          )}
          {isRecording && (
            <LiveWaveform
              overlayClick={overlayClick}
              isRecording={isRecording}
              audioBlob={audioBlob}
              onCancel={cancelRecording}
            />
          )}

          {/* <div className={styles.tool_wrapper}>
            <span className={styles.tool_icon}>
              <CgShortcut />
            </span>
          </div> */}
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
