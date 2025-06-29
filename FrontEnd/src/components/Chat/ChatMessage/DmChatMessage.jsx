/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./ChatMessage.module.css";
import { useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
  const { conversMedia } = useSelector((state) => state.conversMedia);
  const { mutate: toggleThisReact } = useToggleReaction();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const targetMessageId = new URLSearchParams(search).get("later_message");
  const searchedMessageId = new URLSearchParams(search).get("searched_message");
  const pinnedMessageId = new URLSearchParams(search).get("pinned_message");

  const hasScrolledToSpecialMessage = useRef(false); // 🟢 جديد

  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetConversMessages(convers_id);

  const messagesEndRef = useRef(null);
  const isInitialLoad = useRef(true);
  const prevScrollHeightRef = useRef(0);

  // 🔄 حذف الـ params بعد 2 ثانية
  useEffect(() => {
    const hasQuery = targetMessageId || searchedMessageId || pinnedMessageId;
    if (!hasQuery) return;

    const timeout = setTimeout(() => {
      const newSearchParams = new URLSearchParams(search);
      if (targetMessageId) newSearchParams.delete("later_message");
      if (searchedMessageId) newSearchParams.delete("searched_message");
      if (pinnedMessageId) newSearchParams.delete("pinned_message");

      navigate(
        {
          pathname,
          search: newSearchParams.toString(),
        },
        { replace: true }
      );
    }, 2000);

    return () => clearTimeout(timeout);
  }, [
    targetMessageId,
    searchedMessageId,
    pinnedMessageId,
    search,
    pathname,
    navigate,
  ]);

  // Scroll عند تحميل رسائل أقدم
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop < 150 && hasNextPage && !isFetchingNextPage) {
        prevScrollHeightRef.current = container.scrollHeight;
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, containerRef]);

  // Scroll تلقائي لنهاية الرسائل (لو مفيش messageId مستهدف)
  useEffect(() => {
    if (
      messages?.length &&
      isInitialLoad.current &&
      !targetMessageId &&
      !pinnedMessageId &&
      !searchedMessageId &&
      !hasScrolledToSpecialMessage.current
    ) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      isInitialLoad.current = false;
    }
  }, [messages, targetMessageId, pinnedMessageId, searchedMessageId]);

  // 🌀 دالة reusable للـ scroll لأي messageId
  const scrollToMessage = async (messageId) => {
    const MAX_TRIES = 20;
    let tries = 0;

    while (tries < MAX_TRIES) {
      const element = document.getElementById(`message-${messageId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });

        if (element.parentElement) {
          element.parentElement.classList.add(styles.highlight);
          setTimeout(() => {
            element.parentElement.classList.remove(styles.highlight);
          }, 2000);
        } else {
          element.classList.add(styles.highlight);
          setTimeout(() => {
            element.classList.remove(styles.highlight);
          }, 2000);
        }

        hasScrolledToSpecialMessage.current = true;
        break;
      }

      if (!hasNextPage || isFetchingNextPage) break;

      await fetchNextPage();
      tries++;
    }
  };

  useEffect(() => {
    if (targetMessageId && messages?.length) {
      scrollToMessage(targetMessageId);
    }
  }, [targetMessageId, messages]);

  useEffect(() => {
    if (searchedMessageId && messages?.length) {
      scrollToMessage(searchedMessageId);
    }
  }, [searchedMessageId, messages]);

  useEffect(() => {
    if (pinnedMessageId && messages?.length) {
      scrollToMessage(pinnedMessageId);
    }
  }, [pinnedMessageId, messages]);

  // تصحيح مكان السكول بعد تحميل قديم
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
            emoji: emojiData.imageUrl,
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
