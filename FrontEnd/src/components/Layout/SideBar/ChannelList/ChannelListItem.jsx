import styles from "./ChannelList.module.css";
import { FaLock, FaHashtag } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ChannelListItem = ({ channelData, isActive }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/channels/${channelData.id}`);
  };

  return (
    <div
      className={`${styles.channel_item} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <div className={styles.left_side}>
        <span className={styles.icon}>
          {channelData.type === "private" ? <FaLock /> : <FaHashtag />}
        </span>
      </div>
      <span className={styles.channel_name}>{channelData.name}</span>
    </div>
  );
};

ChannelListItem.propTypes = {
  channelData: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
};

export default ChannelListItem;
