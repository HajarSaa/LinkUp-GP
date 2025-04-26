import styles from "./ChatMessage.module.css";
import MessageItem from "./MessageItem";
import PropTypes from "prop-types";
function ChatMessage({ messages }) {
  return (
    <div className={styles.messages_wrapper}>
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          isFirstMessage={index === 0}
          message={message}
        />
      ))}
    </div>
  );
}

ChatMessage.propTypes = {
  messages: PropTypes.any,
};

export default ChatMessage;
