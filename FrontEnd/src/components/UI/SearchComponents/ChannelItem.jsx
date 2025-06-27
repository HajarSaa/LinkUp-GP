import { FaCheck } from "react-icons/fa";
import styles from "./SearchComponents.module.css";
import PropTypes from "prop-types";
import { BsDot } from "react-icons/bs";
import ChannelType from "../Channel/ChannelType/ChannelType";
import { useState } from "react";
import { findMemberByUserId } from "../../../utils/workspaceUtils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLeaveChannel from "../../../API/hooks/channel/useLeaveChannel";
import Spinner from "../Spinner/Spinner";
import useJoinChannel from "../../../API/hooks/channel/useJoinChannel";
import InfoIcon from "../Icons/InforIcon/InfoIcon";

function ChannelItem({ channel }) {
  const [joined_text, set_joined_text] = useState("Joined");
  const navigateTo = useNavigate();
  const { workspace } = useSelector((state) => state.workspace);
  const me = findMemberByUserId(workspace);
  const isJoin = channel.members.includes(me._id);

  // query
  const leave_channel = useLeaveChannel();
  const join_channel = useJoinChannel();

  function navgigate_to_channel() {
    navigateTo(`/channels/${channel.id}`);
  }

  function handle_leave(e) {
    e.stopPropagation();
    leave_channel.mutate(channel.id);
  }

  function handle_join(e) {
    e.stopPropagation();
    join_channel.mutate(channel.id);
  }
  return (
    <div className={styles.channelItem} onClick={navgigate_to_channel}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.channelName}>
            <ChannelType type={channel.type} /> <span>{channel.name}</span>
          </div>
          <span className={styles.viewChannel}>View Channel</span>
          {channel?.required && (
            <div className={`${styles.viewChannel} ${styles.req_ifo}`}>
              <span>Required</span>
              <InfoIcon
                place="right"
                text="Required Channel at every workspace"
                id="req-channel"
              />
            </div>
          )}
        </div>
        {!channel?.required && (
          <div className={styles.buttonGroups}>
            <button
              className={styles.buttonGroups_btn}
              onClick={navgigate_to_channel}
            >
              Open in Home
            </button>
            <button
              className={`${styles.buttonGroups_btn} ${styles.toggle_join}`}
              onMouseEnter={() => set_joined_text("Leave")}
              onMouseLeave={() => set_joined_text("Joined")}
              onClick={isJoin ? handle_leave : handle_join}
            >
              {leave_channel.isPending || join_channel.isPending ? (
                <Spinner width={20} height={20} color="var(--primary-color)" />
              ) : isJoin ? (
                joined_text
              ) : (
                "Join"
              )}
            </button>
          </div>
        )}
      </div>
      <div className={styles.channelInfo}>
        {isJoin && (
          <div className={`${styles.status} ${styles.joined}`}>
            <FaCheck className={styles.joinedIcon} />
            <span>Joined</span>
            <BsDot />
          </div>
        )}
        <span className={styles.channelInfo_text}>
          {channel.members.length} member
          {channel.members.length > 1 ? "s" : ""}
        </span>
        {channel.description && (
          <p className={styles.channelInfo_text}>
            <BsDot />
            {channel.description}
          </p>
        )}
      </div>
    </div>
  );
}
ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
};

export default ChannelItem;
