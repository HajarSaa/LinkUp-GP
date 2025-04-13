/* eslint-disable react/prop-types */
import Threads from "../threads/Threads";
import styles from "./MessageItem.module.css";
import { MdOutlineAddReaction } from "react-icons/md";
import LargeAvatar from "../../Avatar/LargeAvatar/LargeAvatar";

const MessageItem = ({ message, channel }) => {
  const sender = channel.members.find((m) => m.name === message.sender);

  return (
    <div className={styles.messageItem}>
      {/* Message Text & sender */}
      <div className={styles.header}>
        <LargeAvatar userObject={sender}/>
        <div className={styles.messageContent}>
          <div>
            <span className={styles.username}>{message.sender}</span>
            <span className={styles.time}>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          {/* first message */}
          <p className={styles.text}>{message.text}</p>
        </div>
      </div>
      <div className={styles.otherMessage}>
        <div className={`${styles.info} vis-hidden`}>time</div>
        <div className={styles.messageContent}>
          {/* 👇 Attachement */}
          {message.attachments && message.attachments.length > 0 && (
            <div className={styles.attachments}>
              {message.attachments.map((attachment, index) => (
                <div key={index} className={styles.attachment}>
                  {attachment.type === "image" ? (
                    <img
                      src={attachment.url}
                      alt="attachment"
                      className={styles.attachmentImage}
                    />
                  ) : (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.attachmentLink}
                    >
                      {attachment.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Reactions */}
          <div className={styles.reactions}>
            {message.reactions?.map((reaction, index) => (
              <span key={index} className={styles.reaction}>
                {reaction.emoji} {reaction.count}
              </span>
            ))}
            <span className={styles.addrReact}>
              <MdOutlineAddReaction />
            </span>
          </div>
          {/* Theads*/}
          <Threads message={message} channel={channel} />
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
