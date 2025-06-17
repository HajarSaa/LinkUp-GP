import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import styles from "./ChatMessage.module.css";

const AttachmentRenderer = ({ file }) => {
  const ext = file.fileName?.split(".").pop()?.toLowerCase();
  const type = file.fileType?.toLowerCase() || "";
  const url = file.fileUrl;

  const isImage = ["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext);
  const isAudio =
    ["mp3", "wav", "ogg", "m4a"].includes(ext) || type.startsWith("audio/");
  const isVideo =
    ["mp4", "webm", "ogg"].includes(ext) || type.startsWith("video/");

  if (isImage) {
    return (
      <img
        src={url}
        alt={file.fileName}
        className={`${styles.imageAttachment} ${styles.attachmentItem}`}
      />
    );
  }

  if (isAudio) {
    return (
      <audio
        controls
        src={url}
        className={`${styles.audioAttachment} ${styles.attachmentItem}`}
      />
    );
  }

  if (isVideo) {
    return (
      <div className={styles.attachmentItem}>
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="300px"
          style={{ backgroundColor: "#f2f2f2" }}
        />
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.fileLink} ${styles.attachmentItem}`}
    >
      📄 {file.fileName}
    </a>
  );
};

AttachmentRenderer.propTypes = {
  file: PropTypes.object.isRequired,
};

export default AttachmentRenderer;
