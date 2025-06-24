import styles from "./ChatMessage.module.css";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { selectMessagesByConvers } from "../../../API/redux_toolkit/selectore/conversMessagesSelectors";
import useToggleReaction from "../../../API/hooks/reactions/useToggleReaction";
import useGetConversMessages from "../../../API/hooks/messages/useGetConversMessages";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import EmojiPicker from "../../UI/EmojiPicker/EmojiPicker";
import MessageItem from "../ChatMessage/MessageItem";
import DateDivider from "../DateDivider/DateDivider";

function DmChatMessage({ containerRef }) {
  const { id: convers_id } = useParams();
  const messages = useSelector((state) =>
    selectMessagesByConvers(state, convers_id)
  );
  const { mutate: toggleThisReact } = useToggleReaction();
  const { search } = useLocation();
  const targetMessageId = new URLSearchParams(search).get("later_message");
    const { conversMedia } = useSelector((state) => state.conversMedia);
  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetConversMessages(convers_id);

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
    if (messages?.length && isInitialLoad.current && !targetMessageId) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      isInitialLoad.current = false;
    }
  }, [messages, targetMessageId]);

  // روح لل later message
  useEffect(() => {
    if (!targetMessageId || !messages?.length) return;

    const tryScrollToTarget = async () => {
      const MAX_TRIES = 20;
      let tries = 0;

      while (tries < MAX_TRIES) {
        const element = document.getElementById(`message-${targetMessageId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          // ✨ أضف الكلاس
          element.classList.add(styles.highlight);

          // ⏱️ شيل الكلاس بعد 2 ثانية
          setTimeout(() => {
            element.classList.remove(styles.highlight);
          }, 2000);

          break;
        }

        if (!hasNextPage || isFetchingNextPage) break;

        await fetchNextPage();
        tries++;
      }
    };

    tryScrollToTarget();
  }, [
    targetMessageId,
    messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  // بعد تحميل الرسائل القديمة، نحافظ على مكان المستخدم
  useEffect(() => {
    const container = containerRef?.current;
    if (!container || isInitialLoad.current || isFetchingNextPage) return;

    const newScrollHeight = container.scrollHeight;
    const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
    container.scrollTop = container.scrollTop + scrollDiff;
  }, [messages, isFetchingNextPage, containerRef]);

  return (
    <>
      <div className={styles.messages_wrapper}>
        {isFetchingNextPage && (
          <div className={styles.loading}>Loading History ...</div>
        )}
        {messages
          ?.slice(0)
          .reverse()
          .map((message) => (
            <React.Fragment key={message._id}>
              <DateDivider date={message.createdAt} />
              <MessageItem
                isInThreadPanel={false}
                message={message}
                media={conversMedia}
              />
            </React.Fragment>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <EmojiPicker
        onSelect={(emojiData, messageId) => {
          toggleThisReact({
            messageId,
            emoji: emojiData.imageUrl, // this best to show the same shape
            // emoji: emojiData.emoji, // this best for fast show but not the same shape
          });
        }}
      />
    </>
  );
}

export default DmChatMessage;

DmChatMessage.propTypes = {
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
