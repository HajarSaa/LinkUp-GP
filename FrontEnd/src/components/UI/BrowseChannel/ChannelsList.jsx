import { useSelector } from "react-redux";
import styles from "./BrowseChannel.module.css";
import ChannelItem from "./ChannelItem";
import { useEffect, useRef } from "react";

function ChannelsList() {
  const scrollRef = useRef();
  const { browseChannels } = useSelector((state) => state.browseChannels);


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


  if (browseChannels.length === 0) return null
    return (
      <div className={styles.browse_channel_list} ref={scrollRef}>
        <div className={styles.channel_list_container}>
          {browseChannels.map((channel) => (
            <ChannelItem key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    );
}

export default ChannelsList;
