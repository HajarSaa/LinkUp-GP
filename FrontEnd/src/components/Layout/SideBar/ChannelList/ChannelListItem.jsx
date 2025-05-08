/* eslint-disable no-unused-vars */
import styles from "./ChannelList.module.css";
import { FaLock, FaHashtag } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ChannelListItem = ({
  id,
  name,
  isActive = false,
  hasUnread,
  isPrivate,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/channels/${id}`);
  };

  return (
    <div className={`${styles.channel_item}`} onClick={handleClick}>
      <div className={styles.left_side}>
        <span className={styles.icon}>
          {isPrivate ? <FaLock /> : <FaHashtag />}
        </span>
      </div>
      <span className={styles.channel_name}>{name}</span>
    </div>
  );
};

ChannelListItem.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  isActive: PropTypes.bool,
  hasUnread: PropTypes.bool,
  isPrivate: PropTypes.bool,
};

export default ChannelListItem;
