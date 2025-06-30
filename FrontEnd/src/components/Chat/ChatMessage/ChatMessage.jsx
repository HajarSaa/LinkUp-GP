/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import styles from "./ChatMessage.module.css";
import MessageItem from "./MessageItem";
import  { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGetChannelMessages from "../../../API/hooks/messages/useGetChannelMessage";
import { selectMessagesByChannel } from "../../../API/redux_toolkit/selectore/channelMessagesSelectors";
import DateDivider from "../DateDivider/DateDivider";
import EmojiPicker from "../../UI/EmojiPicker/EmojiPicker";
import useToggleReaction from "../../../API/hooks/reactions/useToggleReaction";
import dayjs from "dayjs";

function ChatMessage({ containerRef }) {
  const { id: channel_id } = useParams();
  const messages = useSelector((state) =>
    selectMessagesByChannel(state, channel_id)
  );
  const { channelMedia } = useSelector((state) => state.channelMedia);
  const { mutate: toggleThisReact } = useToggleReaction();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const targetMessageId = new URLSearchParams(search).get("later_message");
  const searchedMessageId = new URLSearchParams(search).get("searched_message");
  const pinnedMessageId = new URLSearchParams(search).get("pinned_message");

  const hasScrolledToSpecialMessage = useRef(false); // 🟢 جديدة
  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetChannelMessages(channel_id);

  const messagesEndRef = useRef(null);
  const isInitialLoad = useRef(true);
  const prevScrollHeightRef = useRef(0);

  // 🔄 حذف الـ params بعد 2 ثانية بدون تأثير على الـ scroll
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
    navigate,
    pathname,
  ]);

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

  useEffect(() => {
    if (
      messages?.length &&
      isInitialLoad.current &&
      !targetMessageId &&
      !pinnedMessageId &&
      !searchedMessageId &&
      !hasScrolledToSpecialMessage.current // 🛑 منع الـ scroll التلقائي
    ) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      isInitialLoad.current = false;
    }
  }, [messages, targetMessageId, pinnedMessageId, searchedMessageId]);

  // reusable scroll function
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

        hasScrolledToSpecialMessage.current = true; // ✅ نمنع scroll تاني
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
        {(() => {
          const rendered = [];
          let lastDate = null;

          messages
            ?.slice(0)
            .reverse()
            .forEach((message) => {
              const messageDate = dayjs(message.createdAt).format("YYYY-MM-DD");

              const shouldShowDateDivider = messageDate !== lastDate;
              if (shouldShowDateDivider) {
                rendered.push(
                  <DateDivider
                    key={`divider-${messageDate}`}
                    date={message.createdAt}
                  />
                );
                lastDate = messageDate;
              }

              rendered.push(
                <MessageItem
                  key={message._id}
                  isInThreadPanel={false}
                  message={message}
                  media={channelMedia}
                />
              );
            });

          return rendered;
        })()}

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

ChatMessage.propTypes = {
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default ChatMessage;
