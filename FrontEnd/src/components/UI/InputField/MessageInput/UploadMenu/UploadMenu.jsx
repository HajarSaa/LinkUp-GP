import { useDispatch, useSelector } from "react-redux";
import styles from "./UploadMenu.module.css";
import { FcAudioFile, FcFile, FcImageFile, FcVideoFile } from "react-icons/fc";
import { closeInputMenuModal } from "../../../../../API/redux_toolkit/modals/chat/inputMenu";

function UploadMenu() {
  const { isOpen, position } = useSelector((state) => state.inputMenu);
  const dispatch = useDispatch();

  function handleFileUpload(acceptType) {
    dispatch(closeInputMenuModal());
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptType;
    input.style.display = "none";

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file);
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  
  const closeModal = () => {
    dispatch(closeInputMenuModal());
  };

  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={handleClose}>
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
