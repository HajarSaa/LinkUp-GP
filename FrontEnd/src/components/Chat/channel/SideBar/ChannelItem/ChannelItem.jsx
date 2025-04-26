import styles from "./ChannelItem.module.css";
import { FaLock, FaHashtag } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ChannelItem = ({ id, name, isActive, hasUnread, isPrivate}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/channels/${id}`);
  };

  return (
    <div
      className={`${styles.channel} ${isActive && styles.active} ${
        !isActive && "sideBarHover"
      } ${hasUnread && styles.unread} sideBarButton`}
      onClick={handleClick}
    >
      <span className={`${styles.icon} iconsPadding`}>
        {isPrivate ? <FaLock /> : <FaHashtag />}
      </span>
      <span className={`iconsPadding`}>{name}</span>
    </div>
  );
};

ChannelItem.propTypes = {
  id: PropTypes.any.isRequired, // if number only , change it
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  hasUnread: PropTypes.bool,
  isPrivate: PropTypes.bool,
};

export default ChannelItem;
