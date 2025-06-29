import { useSelector } from "react-redux";
import styles from "./ChatMessage.module.css";
import MessageItem from "./MessageItem";
import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGetChannelMessages from "../../../API/hooks/messages/useGetChannelMessage";
import { selectMessagesByChannel } from "../../../API/redux_toolkit/selectore/channelMessagesSelectors";
import DateDivider from "../DateDivider/DateDivider";
import EmojiPicker from "../../UI/EmojiPicker/EmojiPicker";
import useToggleReaction from "../../../API/hooks/reactions/useToggleReaction";

function ChatMessage({ containerRef }) {
  const { id: channel_id } = useParams();
  const messages = useSelector((state) =>
    selectMessagesByChannel(state, channel_id)
  );
  const { channelMedia } = useSelector((state) => state.channelMedia);
  const { mutate: toggleThisReact } = useToggleReaction();
  // const toggleThisReact = useToggleReaction();

  const { search } = useLocation();
  const targetMessageId = new URLSearchParams(search).get("later_message");
  const searchedMessageId = new URLSearchParams(search).get("searched_message");
  const pinnedMessageId = new URLSearchParams(search).get("pinned_message");

  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetChannelMessages(channel_id);

  const messagesEndRef = useRef(null);
  const isInitialLoad = useRef(true);
  const prevScrollHeightRef = useRef(0);

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
    if (messages?.length && isInitialLoad.current && !targetMessageId && !pinnedMessageId && !searchedMessageId) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      isInitialLoad.current = false;
    }
  }, [messages, targetMessageId, pinnedMessageId, searchedMessageId]);

  // scroll for later message
  useEffect(() => {
    if (!targetMessageId || !messages?.length) return;

    const tryScrollToTarget = async () => {
      const MAX_TRIES = 20;
      let tries = 0;

      while (tries < MAX_TRIES) {
        const element = document.getElementById(`message-${targetMessageId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          element.classList.add(styles.highlight);

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

  //scroll for searched message
  useEffect(() => {
    if (!searchedMessageId || !messages?.length) return;

    const tryScrollToSearchedMessage = async () => {
      const MAX_TRIES = 20;
      let tries = 0;

      while (tries < MAX_TRIES) {
        const element = document.getElementById(`message-${searchedMessageId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          if (element.parentElement) {
            element.parentElement.classList.add(styles.highlight);
            setTimeout(() => {
              element.parentElement.classList.remove(styles.highlight);
            }, 2000);
          }

          break;
        }

        if (!hasNextPage || isFetchingNextPage) break;

        await fetchNextPage();
        tries++;
      }
    };

    tryScrollToSearchedMessage();
  }, [
    searchedMessageId,
    messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);
  //scroll for pinned message
  useEffect(() => {
    if (!pinnedMessageId || !messages?.length) return;

    const tryScrollToSearchedMessage = async () => {
      const MAX_TRIES = 20;
      let tries = 0;

      while (tries < MAX_TRIES) {
        const element = document.getElementById(`message-${pinnedMessageId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          if (element.parentElement) {
            element.parentElement.classList.add(styles.highlight);
            setTimeout(() => {
              element.parentElement.classList.remove(styles.highlight);
            }, 2000);
          }

          break;
        }

        if (!hasNextPage || isFetchingNextPage) break;

        await fetchNextPage();
        tries++;
      }
    };

    tryScrollToSearchedMessage();
  }, [
    pinnedMessageId,
    messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

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
                media={channelMedia}
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

ChatMessage.propTypes = {
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default ChatMessage;
