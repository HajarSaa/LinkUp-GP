import styles from "./ChannelList.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ChannelType from "../../../UI/Channel/ChannelType/ChannelType";

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
        <ChannelType type={channelData.type} />
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
