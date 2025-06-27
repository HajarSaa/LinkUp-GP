import { useSelector } from "react-redux";
import styles from "./SearchComponents.module.css";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MessageItem from "../../Chat/ChatMessage/MessageItem";
import Spinner from "../Spinner/Spinner";

function SearchResult({ isLoading, query }) {
  const scrollRef = useRef();
  const { messages } = useSelector((state) => state.searchData);
  console.log(useSelector((state) => state.searchData));

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
              <div key={index} className={styles.search_message}>
                <MessageItem
                  message={message}
                  isSearchResult={true}
                  media={message?.attachments}
                />
              </div>
            ))
          ) : (
            <div className={styles.not_found}>{`"${query}" not found in any message`}</div>
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
