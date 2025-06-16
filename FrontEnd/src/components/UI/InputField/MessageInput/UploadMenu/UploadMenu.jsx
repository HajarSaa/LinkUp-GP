import { useDispatch, useSelector } from "react-redux";
import styles from "./UploadMenu.module.css";
import { FcAudioFile, FcFile, FcImageFile, FcVideoFile } from "react-icons/fc";
import { closeInputMenuModal } from "../../../../../API/redux_toolkit/modals/chat/inputMenu";
import { useParams, useLocation } from "react-router-dom";
import {
  addFile,
  addResponse,
  setFileStatus,
} from "../../../../../API/redux_toolkit/api_data/media/fileUploadSlice";
import useUploadMedia from "../../../../../API/hooks/media/useUploadMedia";

function UploadMenu() {
  const { isOpen, position } = useSelector((state) => state.inputMenu);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const isChannel = location.pathname.includes("/channels");
  const pageId = `${isChannel ? "channel" : "conversation"}-${id}`;

  const uploadMutation = useUploadMedia();

  const closeModal = () => dispatch(closeInputMenuModal());

  const handleFileUpload = (acceptType) => {
    dispatch(closeInputMenuModal());

    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptType;
    input.style.display = "none";

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

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
        {
          formData,
        },
        {
          onSuccess: (data) => {
            dispatch(addResponse({ pageId, responseFiles: data }));
            dispatch(setFileStatus({ pageId, previewURL, status: "done" }));
          },
          onError: (err) => {
            console.error("❌ Upload failed:", err);
            dispatch(setFileStatus({ pageId, previewURL, status: "done" }));
          },
        }
      );
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          position: "absolute",
          zIndex: 1000,
        }}
      >
        <ul className={styles.list}>
          <li
            className={styles.item}
            onClick={() => handleFileUpload("image/*")}
          >
            <span className={styles.item_icon}>
              <FcImageFile />
            </span>
            <span>Upload Image</span>
          </li>
          <li
            className={styles.item}
            onClick={() => handleFileUpload("video/*")}
          >
            <span className={styles.item_icon}>
              <FcVideoFile />
            </span>
            <span>Upload Video</span>
          </li>
          <li
            className={styles.item}
            onClick={() => handleFileUpload("audio/*")}
          >
            <span className={styles.item_icon}>
              <FcAudioFile />
            </span>
            <span>Upload Audio</span>
          </li>
          <li
            className={styles.item}
            onClick={() =>
              handleFileUpload(
                ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.json,.csv,.zip"
              )
            }
          >
            <span className={styles.item_icon}>
              <FcFile />
            </span>
            <span>Upload Document</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UploadMenu;
