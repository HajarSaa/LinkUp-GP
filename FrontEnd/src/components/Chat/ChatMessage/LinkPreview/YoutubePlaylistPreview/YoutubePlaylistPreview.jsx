import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import styles from "./YoutubePlaylistPreview.module.css";

const YoutubePlaylistPreview = ({ data, onDismiss }) => {
  const { title, url } = data;

  return (
    <div className={styles.previewWrapper}>
      <button className={styles.outsideDismiss} onClick={onDismiss}>
        <IoClose size={20} />
      </button>

      <div className={styles.previewCard}>
        <div className={styles.meta}>
          <div className={styles.header}>
            <FaYoutube className={styles.youtubeIcon} />
            <span className={styles.channel}>youtube</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.title}
          >
            {title}
          </a>
          <p className={styles.description}>Share your videos with friends, family, and the world</p>
        </div>
      </div>
    </div>
  );
};

YoutubePlaylistPreview.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default YoutubePlaylistPreview;
