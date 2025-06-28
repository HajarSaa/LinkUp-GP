import { useState } from "react";
import styles from "./YoutubeVideoPreview.module.css";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { IoPlayOutline } from "react-icons/io5";
import { FaRegShareSquare } from "react-icons/fa";

const YoutubeVideoPreview = ({ data, onDismiss }) => {
  const { title, thumbnail, channel, url, videoId } = data;
  const [showVideo, setShowVideo] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={styles.previewWrapper}>
      <button className={styles.outsideDismiss} onClick={onDismiss}>
        <IoClose size={20} />
      </button>

      <div className={styles.previewCard}>
        <div className={styles.content}>
          <div className={styles.header}>
            <FaYoutube className={styles.youtubeIcon} />
            <span className={styles.channel}>{channel}</span>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles.title}>
            {title}
          </a>
        </div>

        <div className={styles.thumbnailWrapper}>
          {showVideo ? (
            <>
              <iframe
                src={embedUrl}
                title={title}
                className={styles.iframe}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <div className={styles.closeVideoOverlay}>
                <button onClick={() => setShowVideo(false)}>
                  <IoClose size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <img src={thumbnail} alt={title} className={styles.thumbnail} />
              <div className={styles.overlayIcons}>
                <button onClick={() => setShowVideo(true)} className={styles.circleBtn}>
                  <IoPlayOutline size={55}/>
                </button>
                <a href={url} target="_blank" rel="noopener noreferrer" className={styles.circleBtn}>
                   <FaRegShareSquare size={45}/>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

YoutubeVideoPreview.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    channel: PropTypes.string,
    url: PropTypes.string,
    videoId: PropTypes.string,
  }).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default YoutubeVideoPreview;
