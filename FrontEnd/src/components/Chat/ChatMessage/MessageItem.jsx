// import styles from "./ChatMessage.module.css";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";
// import MessageActions from "./MessageActions";
// import MessageThreads from "./MessageThreads";
// import { openUserPanel } from "../../../API/redux_toolkit/ui/chatPanelSlice";
// import {
//   findMemberById,
//   findMemberByUserId,
// } from "../../../utils/workspaceUtils";
// import { formatTimeTo12Hour } from "../../../utils/formatedDate";
// import UserImage from "../../UI/User/UserImage";
// import { useParams } from "react-router-dom";
// import MessageMenu from "../MessageMenu/MessageMenu";
// import { openMessageMenuModal } from "../../../API/redux_toolkit/modals/chat/messageMenu";
// import { calculateSafePosition } from "../../../utils/modalsUtils";
// import { getAttachedFiles } from "../../../utils/mediaUtils";
// import AttachmentRenderer from "../../UI/Media/Attachments/AttachmentRender";
// import Reactions from "../Reactions/Reactions";


// const MessageItem = ({
//   message,
//   isInThreadPanel = false,
//   isThreadParent = false,
//   media
// }) => {

//   const [messageHover, setMessageHover] = useState(false);
//   const dispatch = useDispatch();
//   const { id: page_id } = useParams();
//   const { workspace } = useSelector((state) => state.workspace);
//   const sender = findMemberById(workspace, message?.createdBy);
//   const loggin_user = findMemberByUserId(workspace);
//   const isMessageSender = sender._id === loggin_user._id;
//   const message_time = formatTimeTo12Hour(message?.createdAt);
//   const { activeMessageId } = useSelector((state) => state.messageMenu);
//   const { messageId, isEditing } = useSelector((state) => state.editMessage);
//   const messageFiles = getAttachedFiles(message, media);
//   const threadData = {
//     count: message?.threadCount,
//     participants: message?.threadParticipants,
//     id: message?._id,
//     lastRepliedAt: message?.lastRepliedAt,
//   };
//   const editingMessage = messageId === message._id;

//   // Functions
//   function openProfile() {
//     dispatch(
//       openUserPanel({
//         type: "userPanel",
//         panel_id: sender.id || sender._id,
//         page_id: page_id,
//       })
//     );
//   }

//   const handelOpenMenu = (e, message_id) => {
//     e.preventDefault();
//     const menuWidth = 240;
//     const padding = 0;
//     const position = calculateSafePosition(e, menuWidth, null, padding);
//     dispatch(
//       openMessageMenuModal({
//         position: position,
//         activeMessageId: message_id,
//         isSender: isMessageSender,
//         isInThread: isInThreadPanel,
//       })
//     );
//   };


//   return (
//     <>
//       <div
//         className={`${styles.message_container} ${
//           activeMessageId === message._id && styles.active
//         } ${editingMessage && isEditing ? styles.editingMessage : ""}`}
//         onMouseEnter={() => setMessageHover(true)}
//         onMouseLeave={() => setMessageHover(false)}
//         onContextMenu={(e) => {
//           handelOpenMenu(e, message._id);
//         }}
//       >
//         <div className={styles.message} id={`message-${message._id}`}>
//           {/* Sender Data => name , image */}
//           <div className={styles.message_leftSide}>
//             <div className={styles.profileWrapper} onClick={openProfile}>
//               <UserImage src={sender.photo} alt={sender.userName} />
//             </div>
//           </div>
//           <div className={styles.message_rightSide}>
//             <div className={styles.message_content}>
//               <div className={styles.message_info}>
//                 <div className={styles.message_sender} onClick={openProfile}>
//                   {sender.userName}
//                 </div>
//                 <div className={styles.message_time}>{message_time}</div>
//               </div>
//               {/* Text content container */}
//               <div className={styles.msg_edit}>
//                 <div
//                   className={styles.message_text}
//                   id={`message-content-${message._id}`}
//                 >
//                   {message.content}
//                 </div>

//                 {message.edited && (
//                   <div className={styles.edited}>
//                     <span className={styles.edited_label}>(edited)</span>
//                   </div>
//                 )}
//               </div>

//               {/* Media Container */}
//               {messageFiles.length > 0 && (
//                 <div className={styles.attachments}>
//                   <AttachmentRenderer files={messageFiles} />
//                 </div>
//               )}
//             </div>
//             {/* Reactions */}
//             <Reactions messageId={message._id} />
//           </div>
//         </div>
//         {/* Menu Actions => forward , later , more , .... */}
//         <MessageActions
//           isThread={isInThreadPanel}
//           message={message}
//           messageHover={messageHover}
//           isThreadParent={isThreadParent}
//           threadData={threadData}
//           parentMessage={message}
//           isSender={isMessageSender}
//         />
//         {/* Message Threads */}
//         {message?.threadCount !== 0 && !isInThreadPanel && (
//           <MessageThreads threadData={threadData} parentMessage={message} />
//         )}
//       </div>
//       <MessageMenu createdAt={message?.createdAt} />
//     </>
//   );
// };

// MessageItem.propTypes = {
//   isFirstMessage: PropTypes.bool,
//   message: PropTypes.object,
//   isInThreadPanel: PropTypes.bool,
//   isThreadParent: PropTypes.bool,
//   media: PropTypes.any,
// };

// export default MessageItem;


import styles from "./ChatMessage.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import MessageActions from "./MessageActions";
import MessageThreads from "./MessageThreads";
import { openUserPanel } from "../../../API/redux_toolkit/ui/chatPanelSlice";
import {
  findMemberById,
  findMemberByUserId,
} from "../../../utils/workspaceUtils";
import { formatTimeTo12Hour } from "../../../utils/formatedDate";
import UserImage from "../../UI/User/UserImage";
import { useParams } from "react-router-dom";
import MessageMenu from "../MessageMenu/MessageMenu";
import { openMessageMenuModal } from "../../../API/redux_toolkit/modals/chat/messageMenu";
import { calculateSafePosition } from "../../../utils/modalsUtils";
import { getAttachedFiles } from "../../../utils/mediaUtils";
import AttachmentRenderer from "../../UI/Media/Attachments/AttachmentRender";
import Reactions from "../Reactions/Reactions";
import LinkPreview from "./LinkPreview/LinkPreview";

const MessageItem = ({
  message,
  isInThreadPanel = false,
  isThreadParent = false,
  media
}) => {
  const [messageHover, setMessageHover] = useState(false);
  const [dismissedLinks, setDismissedLinks] = useState([]);
  const dispatch = useDispatch();
  const { id: page_id } = useParams();
  const { workspace } = useSelector((state) => state.workspace);
  const sender = findMemberById(workspace, message?.createdBy);
  const loggin_user = findMemberByUserId(workspace);
  const isMessageSender = sender._id === loggin_user._id;
  const message_time = formatTimeTo12Hour(message?.createdAt);
  const { activeMessageId } = useSelector((state) => state.messageMenu);
  const { messageId, isEditing } = useSelector((state) => state.editMessage);
  const messageFiles = getAttachedFiles(message, media);
  const threadData = {
    count: message?.threadCount,
    participants: message?.threadParticipants,
    id: message?._id,
    lastRepliedAt: message?.lastRepliedAt,
  };
  const editingMessage = messageId === message._id;

  function openProfile() {
    dispatch(
      openUserPanel({
        type: "userPanel",
        panel_id: sender.id || sender._id,
        page_id: page_id,
      })
    );
  }

  const handelOpenMenu = (e, message_id) => {
    e.preventDefault();
    const menuWidth = 240;
    const padding = 0;
    const position = calculateSafePosition(e, menuWidth, null, padding);
    dispatch(
      openMessageMenuModal({
        position: position,
        activeMessageId: message_id,
        isSender: isMessageSender,
        isInThread: isInThreadPanel,
      })
    );
  };

  const handleDismiss = (url) => {
    setDismissedLinks((prev) => [...prev, url]);
  };

  const shouldRenderAsPureLink = (message) => {
    return (
      message.metadata?.links?.length === 1 &&
      message.content?.trim() === message.metadata.links[0].url
    );
  };

  return (
    <>
      <div
        className={`${styles.message_container} ${
          activeMessageId === message._id && styles.active
        } ${editingMessage && isEditing ? styles.editingMessage : ""}`}
        onMouseEnter={() => setMessageHover(true)}
        onMouseLeave={() => setMessageHover(false)}
        onContextMenu={(e) => {
          handelOpenMenu(e, message._id);
        }}
      >
        <div className={styles.message} id={`message-${message._id}`}>
          <div className={styles.message_leftSide}>
            <div className={styles.profileWrapper} onClick={openProfile}>
              <UserImage src={sender.photo} alt={sender.userName} />
            </div>
          </div>

          <div className={styles.message_rightSide}>
            <div className={styles.message_content}>
              <div className={styles.message_info}>
                <div className={styles.message_sender} onClick={openProfile}>
                  {sender.userName}
                </div>
                <div className={styles.message_time}>{message_time}</div>
              </div>

              <div className={styles.msg_edit}>
                <div
                  className={styles.message_text}
                  id={`message-content-${message._id}`}
                >
                  {shouldRenderAsPureLink(message) ? (
                    <a
                      href={message.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.pureLink}
                    >
                      {message.content}
                    </a>
                  ) : (
                    message.content
                  )}
                </div>

                {message.edited && (
                  <div className={styles.edited}>
                    <span className={styles.edited_label}>(edited)</span>
                  </div>
                )}
              </div>

              {/* ✅ Preview is outside message_text, to appear under it */}
              {message.metadata?.links?.length > 0 &&
                message.metadata.links
                  .filter((link) => !dismissedLinks.includes(link.url))
                  .map((link) => (
                    <LinkPreview
                      key={link.url}
                      data={link}
                      onDismiss={() => handleDismiss(link.url)}
                    />
                  ))}

              {messageFiles.length > 0 && (
                <div className={styles.attachments}>
                  <AttachmentRenderer files={messageFiles} />
                </div>
              )}
            </div>

            <Reactions messageId={message._id} />
          </div>
        </div>

        <MessageActions
          isThread={isInThreadPanel}
          message={message}
          messageHover={messageHover}
          isThreadParent={isThreadParent}
          threadData={threadData}
          parentMessage={message}
          isSender={isMessageSender}
        />

        {message?.threadCount !== 0 && !isInThreadPanel && (
          <MessageThreads threadData={threadData} parentMessage={message} />
        )}
      </div>

      <MessageMenu createdAt={message?.createdAt} />
    </>
  );
};

MessageItem.propTypes = {
  isFirstMessage: PropTypes.bool,
  message: PropTypes.object,
  isInThreadPanel: PropTypes.bool,
  isThreadParent: PropTypes.bool,
  media: PropTypes.any,
};

export default MessageItem;
