import PropTypes from "prop-types";
import styles from "./ChatMessage.module.css";

const AttachmentRenderer = ({ file }) => {
  const ext = file.fileName?.split(".").pop()?.toLowerCase();
  const type = file.fileType?.toLowerCase() || "";
  console.log("EXT:", ext);
  console.log("TYPE:", type);


  if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext)) {
    return (
      <img
        src={file.fileUrl}
        alt={file.fileName}
        className={styles.imageAttachment}
      />
    );
  }

  if (["mp3", "wav", "ogg", "m4a"].includes(ext) || type.startsWith("audio/")) {
    return (
      <audio controls src={file.fileUrl} className={styles.audioAttachment} />
    );
  }

  if (["mp4", "webm", "ogg"].includes(ext) || type.startsWith("video/")) {
    return (
      <video controls src={file.fileUrl} className={styles.videoAttachment} />
    );
  }

  return (
    <a
      href={file.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fileLink}
    >
      📄 {file.fileName}
    </a>
  );
};

AttachmentRenderer.propTypes = {
  file: PropTypes.object.isRequired,
};

export default AttachmentRenderer;
