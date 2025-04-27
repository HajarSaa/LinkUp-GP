import styles from "./ChatMessage.module.css";
import MessageItem from "./MessageItem";
import PropTypes from "prop-types";
import DateDivider from "../DateDivider/DateDivider";
function ChatMessage({ messages }) {
  return (
    <div className={styles.messages_wrapper}>
      {messages.map((message, index) => (
        <>
          <DateDivider date={message.timestamp} />
          <MessageItem
            key={index}
            isFirstMessage={index === 0}
            message={message}
          />
        </>
      ))}
    </div>
  );
}

ChatMessage.propTypes = {
  messages: PropTypes.any,
};

export default ChatMessage;
