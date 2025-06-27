import { useSelector } from "react-redux";
import styles from "./SearchComponents.module.css";
import { useEffect, useRef } from "react";
import MessageItem from "../../Chat/ChatMessage/MessageItem";

function SearchResult() {
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

  if (messages.length === 0) return null;
  return (
    <div className={styles.browse_channel_list} ref={scrollRef}>
      <div className={styles.channel_list_container}>
        {console.log(messages)}
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
