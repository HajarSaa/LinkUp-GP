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
import Spinner from "../../../../Spinner/Spinner";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { isChannelOwner } from "../../../../../../utils/channelUtils";
import InfoIcon from "../../../../Icons/InforIcon/InfoIcon";
import useLeaveChannel from "../../../../../../API/hooks/channel/useLeaveChannel";

function AboutTab() {
  const dispatch = useDispatch();
  const [tooltipText, setTooltipText] = useState("Copy channel Id");
  const [isLeaving, setIsLeaving] = useState(false);

  const { activeTab } = useSelector((state) => state.channelDetailsModal);
  const { workspace } = useSelector((state) => state.workspace);
  const { channel } = useSelector((state) => state.channel)
  const { mutate: leave_channel } = useLeaveChannel(setIsLeaving);
  const createdBy = findMemberById(workspace, channel?.createdBy);
  const createdAt = formatDateToLong(channel?.createdAt);
  const isOwner = isChannelOwner(channel, workspace);

  function handle_leave(e) {
    e.stopPropagation();
    leave_channel(channel.id, {
      onSuccess: close_leave,
    });
    console.log("leave ✔ ");
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(channel.id)
      .then(() => {
        setTooltipText("Copied");
        setTimeout(() => setTooltipText("Copy channel Id"), 2000);
      })
      .catch(() => {
        setTooltipText("try again");
      });
  };


  function close_leave() {
    dispatch(closeChannelDetails());
  }

  function rename_channel() {
    if (isOwner) {
      dispatch(openRenameModal());
    }
  }
  function edit_topic() {
    if (isOwner) {
      dispatch(openEditTopicModal());
    }
  }
  function edit_dicription() {
    if (isOwner) {
      dispatch(openDescribtionModal());
    }
  }

  if (activeTab !== "about") return null;
  return (
    <div className={styles.editContent}>
      <div className={styles.infoRow} onClick={rename_channel}>
        <div className={styles.infoTopic}>
          <div className={styles.top}>
            <span className={styles.infoTitle}>Channel name</span>
            {isOwner ? (
              <span className={styles.infoEdit}>Edit</span>
            ) : (
              <InfoIcon id="edit_ch_name" text="only owners can edit" />
            )}
          </div>
          <div className={styles.bottom}>
            <div className="align-items-center gap-3">
              <ChannelType type={channel.type} />
              <span>{channel.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoTopic} onClick={edit_topic}>
          <div className={styles.top}>
            <div className={styles.infoTitle}>Topic</div>
            {isOwner ? (
              <span className={styles.infoEdit}>Edit</span>
            ) : (
              <InfoIcon id="edit_ch_name" text="only owners can edit" />
            )}
          </div>
          <div className={styles.bottom}>
            <p>Add a topic</p>
          </div>
        </div>
        <div className={styles.infoTopic} onClick={edit_dicription}>
          <div className={styles.top}>
            <span className={styles.infoTitle}>Description</span>
            {isOwner ? (
              <span className={styles.infoEdit}>Edit</span>
            ) : (
              <InfoIcon id="edit_ch_name" text="only owners can edit" />
            )}
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
          onClick={handle_leave}
        >
          <>
            {isLeaving ? (
              <div className={styles.loading_status}>
                <Spinner width={30} height={30} color="var(--error-color)" />
              </div>
            ) : (
              <span>Leave channel</span>
            )}
          </>
        </div>
      </div>
      <div className={styles.chId}>
        <span>Channel ID : {channel.id}</span>
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
  channel: PropTypes.any,
};
