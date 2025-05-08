import styles from "./ChatMessage.module.css";
import MessageItem from "./MessageItem";
import PropTypes from "prop-types";
import DateDivider from "../DateDivider/DateDivider";
import React from "react";
function ChatMessage({ messages }) {
  return (
    <div className={styles.messages_wrapper}>
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          <DateDivider date={message.timestamp} />
          <MessageItem
            key={index}
            isFirstMessage={index === 0}
            message={message}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

ChatMessage.propTypes = {
  messages: PropTypes.any,
};

export default ChatMessage;
