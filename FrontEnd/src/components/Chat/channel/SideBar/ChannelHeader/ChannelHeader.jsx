import { useState } from "react";
import PropTypes from "prop-types";
import { FaCaretDown, FaCaretRight, FaChevronDown } from "react-icons/fa";
import styles from "./ChannelHeader.module.css";

const ChannelsHeader = ({ isAnyChannelActive, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    if (!isAnyChannelActive) {
      setIsOpen((prev) => !prev);
      onToggle(!isOpen);
    }
  };

  return (
    <div className={styles.header}>
      <span
        className={`iconsPadding align-items-center sideBarHover`}
        onClick={handleToggle}
      >
        {isOpen || isAnyChannelActive ? <FaCaretDown /> : <FaCaretRight />}
      </span>
      <div
        className={`${styles.title} iconsPadding sideBarHover align-items-center gap-8`}
      >
        Channels
        <span className={`${styles.icon} align-items-center`}>
          <FaChevronDown />
        </span>
      </div>
    </div>
  );
};

ChannelsHeader.propTypes = {
  isAnyChannelActive: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onAddChannel: PropTypes.func.isRequired,
};

export default ChannelsHeader;
