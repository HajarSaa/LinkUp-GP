import styles from "./ChatMessage.module.css";
import MessageItem from "./MessageItem";
import PropTypes from "prop-types";
// import DateDivider from "../DateDivider/DateDivider";
import React, { useEffect, useRef } from "react";

function ChatMessage({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <div className={styles.messages_wrapper}>
      {messages
        ?.slice()
        .reverse()
        .map((message, index) => (
          <React.Fragment key={index}>
            {/* <DateDivider date={message.timestamp} /> */}
            <MessageItem key={index} message={message} />
          </React.Fragment>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

ChatMessage.propTypes = {
  messages: PropTypes.any,
};

export default ChatMessage;
