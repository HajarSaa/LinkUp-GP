import styles from "./MediaCard.module.css";
import audioIcon from "/assets/icons/media_icons/audio-waves.png";
import zipIcon from "/assets/icons/media_icons/zip.png";
import pdfIcon from "/assets/icons/media_icons/pdf.jpeg";
import defaultIcon from "/assets/icons/media_icons/default.png";
import PropTypes from "prop-types";
import { formatDateToLong } from "../../../../utils/formatedDate";
import { useSelector } from "react-redux";
import { findMemberById } from "../../../../utils/workspaceUtils";

function MediaCard({ file, onClick }) {
  const { workspace } = useSelector((state) => state.workspace);
  const createdAt = formatDateToLong(file?.createdAt);
  const uploadedBy = findMemberById(workspace, file?.uploadedBy);
  const getIcon = () => {
    const type = file.fileType.toLowerCase();
    if (type.includes("audio")) return audioIcon;
    if (type.includes("zip")) return zipIcon;
    if (type.includes("pdf")) return pdfIcon;
    return defaultIcon;
  };

  return (
    <div className={styles.card} onClick={() => onClick(file)}>
      <div className={styles.icon}>
        <img
          src={getIcon()}
          alt="file type icon"
          className={styles.iconImage}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{file.fileName || "Unknown File"}</p>
        <span className={styles.meta}>
          Shared by {uploadedBy?.userName} on {createdAt}
        </span>
      </div>
    </div>
  );
}

MediaCard.propTypes = {
  file: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

export default MediaCard;
