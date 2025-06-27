import { useSelector } from "react-redux";
import styles from "./SearchComponents.module.css";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MessageItem from "../../Chat/ChatMessage/MessageItem";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { findMemberById } from "../../../utils/workspaceUtils";

function SearchResult({ isLoading, query }) {
  const scrollRef = useRef();
  const navigate = useNavigate();
  const { messages } = useSelector((state) => state.searchData);
  const logged_user_data = JSON.parse(localStorage.getItem("logged_user_data"));
  const myMemberId = logged_user_data.memberId;
  const {workspace} = useSelector((state)=>state.workspace)

  const handleNavigateToMessage = (message) => {
    const { _id: messageId, channelId, conversationId } = message;

    if (channelId) {
      navigate(`/channels/${channelId._id}?searched_message=${messageId}`);
    } else if (conversationId) {
      navigate(
        `/conversations/${conversationId._id}?searched_message=${messageId}`
      );
    }
  };

  // handle scrolling border
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollTop > 20) {
        el.classList.add(styles.scrolled);
      } else {
        el.classList.remove(styles.scrolled);
      }
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.search_list} ref={scrollRef}>
      {isLoading ? (
        <div className={styles.status}>
          <Spinner
            width={80}
            height={80}
            border={3}
            color="var(--primary-color)"
          />
        </div>
      ) : (
        <div className={styles.search_list_container}>
          {messages.length !== 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={styles.search_message}
                onClick={() => {
                  handleNavigateToMessage(message);
                }}
              >
                <MessageItem
                  message={message}
                  isSearchResult={true}
                  media={message?.attachments}
                  from={
                    message.channelId
                      ? message.channelId.name
                      : (() => {
                          const oneId =
                            message.conversationId?.memberOneId?._id;
                          const twoId =
                            message.conversationId?.memberTwoId?._id;
                          const otherMemberId =
                            oneId === myMemberId ? twoId : oneId;
                          return findMemberById(workspace, otherMemberId)
                            ?.userName;
                        })()
                  }
                />
              </div>
            ))
          ) : (
            <div
              className={styles.not_found}
            >{`"${query}" not found in any message`}</div>
          )}
        </div>
      )}
    </div>
  );
}

SearchResult.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
};

export default SearchResult;
