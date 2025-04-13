import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaCaretDown, FaCaretRight, FaChevronDown } from "react-icons/fa";
import styles from "./ChannelHeader.module.css";
import { useDispatch } from "react-redux";
import { closeConvActionModal, openConvActionModal } from "../../../../../API/redux/modals/convActionModal";
import ConvActionsModal from "../../../../UI/Modal/ConvActionModal/ConvActionsModal";
import { openCreateChannel } from "../../../../../API/redux/modals/createChannelmodalSlice";

const ChannelsHeader = ({ isAnyChannelActive, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  const handleToggle = () => {
    if (!isAnyChannelActive) {
      setIsOpen((prev) => !prev);
      onToggle(!isOpen);
    }
  };

  function handleCreateButton() {
    dispatch(closeConvActionModal());
    dispatch(openCreateChannel());
  }

  return (
    <>
      <div className={styles.header} ref={buttonRef}>
        <span
          className={`iconsPadding align-items-center sideBarHover`}
          onClick={handleToggle}
        >
          {isOpen || isAnyChannelActive ? <FaCaretDown /> : <FaCaretRight />}
        </span>
        <div
          className={`${styles.title} iconsPadding sideBarHover align-items-center gap-8`}
          onClick={() => dispatch(openConvActionModal())}
        >
          Channels
          <span className={`${styles.icon} align-items-center`}>
            <FaChevronDown />
          </span>
        </div>
      </div>
      <ConvActionsModal
        targetRef={buttonRef}
        createClick={handleCreateButton}
      />
    </>
  );
};

ChannelsHeader.propTypes = {
  isAnyChannelActive: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onAddChannel: PropTypes.func.isRequired,
};

export default ChannelsHeader;
