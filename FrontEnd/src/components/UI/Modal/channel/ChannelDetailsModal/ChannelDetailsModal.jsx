import { IoIosClose } from "react-icons/io";
import { BsBell, BsCopy, BsHeadphones } from "react-icons/bs";
import styles from "./ChannelDetailsModal.module.css";
import PropTypes from "prop-types";
import { FaHashtag, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChannelDetails,
  setActiveTab,
} from "../../../../../API/redux/modals/channelDetailsSlice";

const ChannelDetailsModal = ({ channel }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.channelDetails);
  const activeTab = useSelector((state) => state.channelDetails.activeTab);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeChannelDetails());
    }
  };

  if (!isOpen) return;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={`align-items-center gap-3`}>
            <span className={`padd-3 align-items-center`}>
              <FaHashtag />
            </span>
            <span className={`f-bold f-18`}>{channel.name}</span>
          </div>
          <span
            className={`${styles.closeBtn} iconsPadding align-items-center`}
            onClick={() => dispatch(closeChannelDetails())}
          >
            <IoIosClose />
          </span>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={`${styles.actionBtn}`}>
            <span className={`${styles.icon} align-items-center`}>
              <FaRegStar />
            </span>
          </div>
          <div className={styles.actionBtn}>
            <span className={`${styles.icon} align-items-center`}>
              <BsBell />
            </span>
            <span>Get notifications for all messages</span>
          </div>
          <div className={styles.actionBtn}>
            <span className={`${styles.icon} align-items-center`}>
              <BsHeadphones />
            </span>
            <span>Huddle</span>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {["about", "members", "tabs", "integrations", "settings"].map(
            (tab) => (
              <div
                key={tab}
                className={activeTab === tab ? styles.activeTab : ""}
                onClick={() => dispatch(setActiveTab(tab))}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            )
          )}
        </div>

        {/* Content */}
        <div className={styles.tabContent}>
          {activeTab === "about" && (
            <div className={styles.editContent}>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div className={styles.rightSide}>
                    <span className={styles.infoTitle}>Channel name</span>
                    <div className="align-items-center gap-3">
                      <span className={`align-items-center f-15`}>
                        <FaHashtag />
                      </span>
                      <span>{channel.name}</span>
                    </div>
                  </div>
                  <span className={styles.infoEdit}>Edit</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoTopic}>
                  <div className={styles.rightSide}>
                    <div className={styles.infoTitle}>Topic</div>
                    <p>Add a topic</p>
                  </div>
                  <span className={styles.infoEdit}>Edit</span>
                </div>
                <div className={styles.infoTopic}>
                  <div className={styles.rightSide}>
                    <span className={styles.infoTitle}>Description</span>
                    <p>Add a description</p>
                  </div>
                  <span className={styles.infoEdit}>Edit</span>
                </div>
                <div className={styles.infoTopic}>
                  <div className={styles.rightSide}>
                    <span className={styles.infoTitle}>Created by</span>
                    <p>Ahmed Ayman on 21 March 2025</p>
                  </div>
                </div>
                <div className={`${styles.infoTopic} ${styles.leaveItem}`}>
                  Leave channel
                </div>
              </div>
              <div className={styles.chId}>
                <span>Channel ID : 1</span>
                <span className="align-items-center">
                  <BsCopy />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ChannelDetailsModal.propTypes = {
  channel: PropTypes.obj,
};

export default ChannelDetailsModal;
