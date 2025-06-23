import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import styles from "./AttachmentRender.module.css";
import AudioMedia from "../AudioMedia/AudioMedia";

const AttachmentRenderer = ({ files = [] }) => {
  const images = files.filter((file) => {
    const ext = file.fileName?.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext);
  });

  const videos = files.filter((file) => {
    const type = file.fileType?.toLowerCase() || "";
    return type.startsWith("video/");
  });

  const audios = files.filter((file) => {
    const type = file.fileType?.toLowerCase() || "";
    return type.startsWith("audio/");
  });

  const others = files.filter(
    (file) =>
      ![...images, ...videos, ...audios].some((f) => f.fileUrl === file.fileUrl)
  );

  return (
    <div className={styles.attachments}>
      {images.map((file) => (
        <img
          key={file.fileUrl}
          src={file.fileUrl}
          alt={file.fileName}
          className={`${styles.imageAttachment} ${styles.attachmentItem}`}
        />
      ))}

      {videos.map((file) => (
        <div key={file.fileUrl} className={styles.attachmentItem}>
          <ReactPlayer
            url={file.fileUrl}
            controls
            width="100%"
            height="300px"
            style={{ backgroundColor: "#f2f2f2" }}
          />
        </div>
      ))}

      {audios.map((file) => (
        <div key={file.fileUrl} className={styles.attachmentItem}>

          <AudioMedia
            file={file}
          />
        </div>
      ))}

      {others.map((file) => (
        <a
          key={file.fileUrl}
          href={file.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.fileLink} ${styles.attachmentItem}`}
        >
          📄 {file.fileName}
        </a>
      ))}
    </div>
  );
};

AttachmentRenderer.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AttachmentRenderer;
