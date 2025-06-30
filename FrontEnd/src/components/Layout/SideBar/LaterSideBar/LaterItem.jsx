import { useSelector } from "react-redux";
import styles from "./LaterSideBar.module.css";
import PropTypes from "prop-types";
import { findMemberById } from "../../../../utils/workspaceUtils";
import UserImage from "../../../UI/User/UserImage";
import useGetSidebarConvers from "../../../../API/hooks/conversation/useGetSidebarConvers";
import ChannelType from "../../../UI/Channel/ChannelType/ChannelType";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiBookmark } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import useToggleLaterItem from "../../../../API/hooks/Later/useToggleLaterItem";
import { LuClock3 } from "react-icons/lu";
import { MdDone } from "react-icons/md";

const LaterItem = ({ laterData }) => {
  const { workspace } = useSelector((state) => state.workspace);
  const member = findMemberById(workspace, laterData.userProfile);
  const conversations = useGetSidebarConvers(workspace);
  const navigate = useNavigate();
  const { mutate: toggleLater } = useToggleLaterItem();

  let source = null;
  if (laterData?.message?.channelId)
    source = workspace.channels.find(
      (channel) => channel.id === laterData?.message?.channelId
    );
  else if (laterData?.message?.conversationId)
    source = conversations.find(
      (convers) => convers.conversationId === laterData?.message?.conversationId
    );

  const source_name = laterData?.message?.channelId ? (
    <div>
      <ChannelType type={source.type} />
      <span>{source.name}</span>
    </div>
  ) : source?.isMe ? (
    "Your chat"
  ) : (
    source?.member?.userName + " chat"
  );

  function handleNavigate() {
    if (laterData?.message?.channelId)
      navigate(
        `later/channels/${laterData?.message?.channelId}?later_message=${laterData?.message._id}`
      );
    else if (laterData?.message?.conversationId)
      navigate(
        `later/conversations/${laterData?.message?.conversationId}?later_message=${laterData?.message._id}`
      );
  }
  function handleRemoveLater() {
    toggleLater(laterData?.message._id);
  }
  function handleSetReminder() {
    console.log('remind')
  }
  function handleComplete() {
    console.log("complete");
  }

  return (
    <div className={styles.item} onClick={handleNavigate}>
      <div className={styles.tags}>
        {laterData.tag && <div className={styles.tag}>{laterData.tag}</div>}
        <div className={styles.message_source}>in {source_name}</div>
      </div>
      <div className={styles.item_header}>
        <div className={styles.avatar}>
          <UserImage src={member?.photo} />
        </div>
        <div className={styles.item_texts}>
          <span className={styles.username}>{member?.userName}</span>
          <span className={styles.message}>{laterData?.message?.content}</span>
        </div>
      </div>

      {/* Hover Actions */}
      <div className={styles.item_actions} onClick={(e) => e.stopPropagation()}>
        <span
          className={styles.action_icon}
          data-tooltip-id={"complete_later"}
          data-tooltip-content={"Mark as Complete"}
          onClick={handleComplete}
        >
          <MdDone />
        </span>
        <Tooltip
          id={"complete_later"}
          place={"top"}
          className={`custom-tooltip`}
        />
        <span
          className={styles.action_icon}
          data-tooltip-id={"remind_later"}
          data-tooltip-content={"Set reminder"}
          onClick={handleSetReminder}
        >
          <LuClock3 />
        </span>
        <Tooltip
          id={"remind_later"}
          place={"top"}
          className={`custom-tooltip`}
        />
        <span
          className={`${styles.action_icon} ${styles.remove}`}
          data-tooltip-id={"delete_later"}
          data-tooltip-content={"Remove"}
          onClick={handleRemoveLater}
        >
          <FiTrash2 />
        </span>
        <Tooltip
          id={"delete_later"}
          place={"top"}
          className={`custom-tooltip`}
        />
      </div>
    </div>
  );
};

LaterItem.propTypes = {
  laterData: PropTypes.any.isRequired,
};

export default LaterItem;
