import { useSelector } from "react-redux";
import styles from "./LaterSideBar.module.css";
import PropTypes from "prop-types";
import { findMemberById } from "../../../../utils/workspaceUtils";
import UserImage from "../../../UI/User/UserImage";
import useGetSidebarConvers from "../../../../API/hooks/conversation/useGetSidebarConvers";
import ChannelType from "../../../UI/Channel/ChannelType/ChannelType";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiBookmark } from "react-icons/fi";

const LaterItem = ({ laterData }) => {
  const { workspace } = useSelector((state) => state.workspace);
  const member = findMemberById(workspace, laterData.userProfile);
  const conversations = useGetSidebarConvers(workspace);
  const navigate = useNavigate();

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
        <span className={styles.action_icon}>
          <FiEdit title="Edit" />
        </span>
        <span className={styles.action_icon}>
          <FiTrash2 title="Delete" />
        </span>
        <span className={styles.action_icon}>
          <FiBookmark title="Pin" />
        </span>
      </div>
    </div>
  );
};

LaterItem.propTypes = {
  laterData: PropTypes.any.isRequired,
};

export default LaterItem;
