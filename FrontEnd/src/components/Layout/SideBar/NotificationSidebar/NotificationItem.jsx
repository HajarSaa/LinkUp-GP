// import styles from "./NotificationItem.module.css";
// import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
// import { findMemberById } from "../../../../utils/workspaceUtils";
// import UserImage from "../../../UI/User/UserImage";
// import { useNavigate } from "react-router-dom";
// import { GoMention, GoReply, GoThumbsup } from "react-icons/go";
// import { formatDistanceToNow } from "date-fns";

// const NotificationItem = ({ notification }) => {
//   const { workspace } = useSelector((state) => state.workspace);
//   const navigate = useNavigate();

//   const member = findMemberById(workspace, notification.triggeredBy);
//   const message = notification.messageId;
//   const isUnread = !notification.isRead;

//   const typeIcon = {
//     mention: <GoMention size={16} />,
//     thread: <GoReply size={16} />,
//     reaction: <GoThumbsup size={16} />,
//   }[notification.type];

//   const source = message.channelId
//     ? workspace.channels.find((ch) => ch.id === message.channelId)?.name
//     : "Direct Message";

//   const handleNavigate = () => {
//     if (message.channelId)
//       navigate(`/notifications/channels/${message.channelId}?notif_message=${message._id}`);
//     else if (message.conversationId)
//       navigate(`/notifications/conversations/${message.conversationId}?notif_message=${message._id}`);
//   };

//   return (
//     <div
//       className={`${styles.item} ${isUnread ? styles.unread : ""}`}
//       onClick={handleNavigate}
//     >
//       <div className={styles.avatar}>
//         <UserImage src={member?.photo} />
//       </div>

//       <div className={styles.content}>
//         <div className={styles.header}>
//           <span className={styles.icon}>{typeIcon}</span>
//           <span className={styles.username}>{member?.userName}</span>
//           <span className={styles.time}>
//             {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
//           </span>
//         </div>

//         <div className={styles.message}>{message?.content}</div>

//         <div className={styles.meta}>
//           <span>in</span>
//           <span className={styles.source}>{source}</span>
//         </div>
//       </div>

//       {isUnread && <div className={styles.unreadDot} />}
//     </div>
//   );
// };

// NotificationItem.propTypes = {
//   notification: PropTypes.object.isRequired,
// };

// export default NotificationItem;


import styles from "./NotificationItem.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { findMemberById } from "../../../../utils/workspaceUtils";
import UserImage from "../../../UI/User/UserImage";
import { useNavigate } from "react-router-dom";
import { GoMention, GoReply, GoThumbsup } from "react-icons/go";
import { formatDistanceToNow } from "date-fns";

const NotificationItem = ({ notification }) => {
  const { workspace } = useSelector((state) => state.workspace);
  const navigate = useNavigate();

  const message = notification.messageId;
  const isUnread = !notification.isRead;

  // fallback لو workspace مش موجود
  const member = workspace ? findMemberById(workspace, notification.triggeredBy) : null;

  // نوع الإشعار
  const typeIcon = {
    mention: <GoMention size={16} />,
    thread: <GoReply size={16} />,
    reaction: <GoThumbsup size={16} />,
  }[notification.type];

  // اسم المصدر (channel أو DM)
  let source = "Direct Message";
  if (message?.channelId && workspace?.channels) {
    const channel = workspace.channels.find((ch) => ch.id === message.channelId);
    if (channel) source = channel.name;
    else source = "Unknown Channel";
  }

  const handleNavigate = () => {
    if (message?.channelId) {
      navigate(`/notifications/channels/${message.channelId}?notif_message=${message._id}`);
    } else if (message?.conversationId) {
      navigate(`/notifications/conversations/${message.conversationId}?notif_message=${message._id}`);
    }
  };

  return (
    <div
      className={`${styles.item} ${isUnread ? styles.unread : ""}`}
      onClick={handleNavigate}
    >
      <div className={styles.avatar}>
        <UserImage src={member?.photo} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.icon}>{typeIcon}</span>
          <span className={styles.username}>{member?.userName || "Unknown User"}</span>
          <span className={styles.time}>
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </span>
        </div>

        <div className={styles.message}>{message?.content || "No content"}</div>

        <div className={styles.meta}>
          <span>in</span>
          <span className={styles.source}>{source}</span>
        </div>
      </div>

      {isUnread && <div className={styles.unreadDot} />}
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default NotificationItem;
