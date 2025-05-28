import { useDispatch, useSelector } from "react-redux";
import {
  closeChannelDetails,
  openDescribtionModal,
  openEditTopicModal,
  openRenameModal,
} from "../../../../../../API/redux_toolkit/modals/channelDetailsSlice";
import styles from "../ChannelDetailsModal.module.css";
import ChannelType from "../../../../Channel/ChannelType/ChannelType";
import PropTypes from "prop-types";
import { findMemberById } from "../../../../../../utils/workspaceUtils";
import { formatDateToLong } from "../../../../../../utils/formatedDate";
import { BsCopy } from "react-icons/bs";
import Spinner from "../../../../../../routes/Spinner/Spinner";
import useLeaveChannel from "../../../../../../API/hooks/useLeaveChannel";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function AboutTab({ channelData }) {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.channelDetailsModal);
  const { workspace } = useSelector((state) => state.workspace);
  const { leaveChannel, loading, error, success } = useLeaveChannel();
  const createdBy = findMemberById(workspace, channelData?.createdBy);
  const createdAt = formatDateToLong(channelData?.createdAt);
  const [tooltipText, setTooltipText] = useState("Copy channel Id");

  const handleLeaveChannel = () => {
    leaveChannel(channelData.id);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(channelData.id)
      .then(() => {
        setTooltipText("Copied");
        setTimeout(() => setTooltipText("Copy channel Id"), 2000);
      })
      .catch(() => {
        console.log("فشل النسخ ❌");
      });
  };

  useEffect(() => {
    if (success) {
      dispatch(closeChannelDetails());
    }
  }, [success, dispatch]);

  if (activeTab !== "about") return null
    return (
      <div className={styles.editContent}>
        <div
          className={styles.infoRow}
          onClick={() => dispatch(openRenameModal())}
        >
          <div className={styles.infoTopic}>
            <div className={styles.top}>
              <span className={styles.infoTitle}>Channel name</span>
              <span className={styles.infoEdit}>Edit</span>
            </div>
            <div className={styles.bottom}>
              <div className="align-items-center gap-3">
                <ChannelType type={channelData.type} />
                <span>{channelData.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div
            className={styles.infoTopic}
            onClick={() => dispatch(openEditTopicModal())}
          >
            <div className={styles.top}>
              <div className={styles.infoTitle}>Topic</div>
              <span className={styles.infoEdit}>Edit</span>
            </div>
            <div className={styles.bottom}>
              <p>Add a topic</p>
            </div>
          </div>
          <div
            className={styles.infoTopic}
            onClick={() => dispatch(openDescribtionModal())}
          >
            <div className={styles.top}>
              <span className={styles.infoTitle}>Description</span>
              <span className={styles.infoEdit}>Edit</span>
            </div>
            <div className={styles.bottom}>
              <p>Add a description</p>
            </div>
          </div>
          <div className={styles.infoTopic}>
            <div className={styles.bottom}>
              <span className={styles.infoTitle}>Created by</span>
              <p>
                {createdBy?.userName} on {createdAt}
              </p>
            </div>
          </div>
          <div
            className={`${styles.infoTopic} ${styles.leaveItem}`}
            onClick={handleLeaveChannel}
          >
            {!error ? (
              <>
                {loading ? (
                  <div className={styles.loading_status}>
                    <Spinner
                      width={20}
                      height={20}
                      color="var(--error-color)"
                    />
                  </div>
                ) : (
                  <span>Leave channel</span>
                )}
              </>
            ) : (
              <span>{error.message}</span>
            )}
          </div>
        </div>
        <div className={styles.chId}>
          <span>Channel ID : {channelData.id}</span>
          <span
            className={styles.chId_icon}
            onClick={handleCopy}
            data-tooltip-id="copy-tooltip"
            data-tooltip-content={tooltipText}
          >
            <BsCopy />
          </span>
          <Tooltip
            id="copy-tooltip"
            place="top"
            className={`custom-tooltip ${
              tooltipText === "Copied" ? "tooltip-success" : ""
            }`}
          />
        </div>
      </div>
    );
}

export default AboutTab;

AboutTab.propTypes = {
  channelData: PropTypes.any,
};
