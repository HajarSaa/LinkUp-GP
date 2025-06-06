import { useSelector } from "react-redux";
import styles from "./BrowseChannel.module.css";
import ChannelItem from "./ChannelItem";
import { findMemberByUserId } from "../../../utils/workspaceUtils";
import { useEffect, useRef } from "react";

function ChannelsList() {
  const scrollRef = useRef();
  const { workspace } = useSelector((state) => state.workspace);
  const me = findMemberByUserId(workspace);
  const channels = workspace.channels.filter((channel) => {
    if (channel.type === "public") return true;
    return channel.members.includes(me._id);
  });

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
    <div className={styles.browse_channel_list} ref={scrollRef}>
      <div className={styles.channel_list_container}>
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
}

export default ChannelsList;
