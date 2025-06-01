import { useSelector } from "react-redux";
import styles from "./ChatMessage.module.css";
import MessageItem from "./MessageItem";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGetChannelMessages from "../../../API/hooks/messages/useGetChannelMessage";
import { selectMessagesByChannel } from "../../../API/redux_toolkit/selectore/channelMessagesSelectors";

function ChatMessage({ containerRef }) {
  const { id: channel_id } = useParams();
  const messages = useSelector((state) =>
    selectMessagesByChannel(state, channel_id)
  );
  console.log(messages)
  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetChannelMessages(channel_id);
  const messagesEndRef = useRef(null);

  // Infinite scroll لما نقرّب من أول رسالة
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop < 150 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, containerRef]);

  return (
    <div className={styles.messages_wrapper}>
      {isFetchingNextPage && (
        <div className={styles.loading}>Loading History ...</div>
      )}
      {messages?.slice(0).reverse().map((message) => (
        <React.Fragment key={message._id}>
          {/* <DateDivider date={message.createdAt} /> */}
          <MessageItem message={message} />
        </React.Fragment>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

ChatMessage.propTypes = {
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default ChatMessage;
