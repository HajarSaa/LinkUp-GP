import { useSelector } from "react-redux";
import styles from "./SearchComponents.module.css";
import ChannelItem from "./ChannelItem";
import { useEffect, useRef } from "react";

function ChannelsList() {
  const scrollRef = useRef();
  const { SearchComponentss } = useSelector((state) => state.SearchComponentss);


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


  if (SearchComponentss.length === 0) return null
    return (
      <div className={styles.browse_channel_list} ref={scrollRef}>
        <div className={styles.channel_list_container}>
          {SearchComponentss.map((channel) => (
            <ChannelItem key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    );
}

export default ChannelsList;
