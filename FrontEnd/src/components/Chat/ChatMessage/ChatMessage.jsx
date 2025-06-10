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

  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetChannelMessages(channel_id);

  const messagesEndRef = useRef(null);
  const isInitialLoad = useRef(true);
  const prevScrollHeightRef = useRef(0);

  // Infinite scroll لما نقرّب من أول رسالة
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop < 150 && hasNextPage && !isFetchingNextPage) {
        // نحفظ السكول هايت قبل الفتش علشان نرجع مكاننا بعد التحميل
        prevScrollHeightRef.current = container.scrollHeight;
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, containerRef]);

  // اول مره هفتح الصفحه يوقفني عند اخر رسالة
  useEffect(() => {
    if (messages?.length && isInitialLoad.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      isInitialLoad.current = false;
    }
  }, [messages]);

  // بعد تحميل الرسائل القديمة، نحافظ على مكان المستخدم
  useEffect(() => {
    const container = containerRef?.current;
    if (!container || isInitialLoad.current || isFetchingNextPage) return;

    const newScrollHeight = container.scrollHeight;
    const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
    container.scrollTop = container.scrollTop + scrollDiff;
  }, [messages, isFetchingNextPage, containerRef]);

  return (
    <div className={styles.messages_wrapper}>
      {isFetchingNextPage && (
        <div className={styles.loading}>Loading History ...</div>
      )}
      {messages
        ?.slice(0)
        .reverse()
        .map((message) => (
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
