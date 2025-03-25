import { useParams } from "react-router-dom";
import mockChannels from "../../../API/services/mockChannels";
import styles from "./Channel.module.css";
import Header from "../../../components/Chat/channel/header/Header";
import DateDivider from "../../../components/Chat/channel/dateDivider/DateDivider";
import MessageItem from "../../../components/Chat/channel/messageItem/MessageItem";
import MessageInput from "../../../components/Chat/channel/messageInput/MessageInput";
import ThreadPanel from "../../../components/Chat/channel/threadPanel/ThreadPanel";
import { useSelector } from "react-redux";
import ProfilePanel from "../../../components/Chat/channel/profilePanel/ProfilePanel";

const Channel = () => {
  const { id } = useParams();
  const channel = mockChannels.find((ch) => ch.id === +id);
  const selectedThread = useSelector((state) => state.threads.selectedThread);
  const { isOpen: isProfilePanelOpen } = useSelector((state) => state.profilePanel);


  if (!channel) {
    return <div className={styles.channelContainer}>Channel not found</div>;
  }


  return (
    <div className={styles.mainContentContainer}>
      <div className={styles.channelContainer}>
        <Header channel={channel} />
        {/* Messages*/}
        <div className={styles.messageContainer}>
          {channel.messages.map((message) => (
            <div key={message.id}>
              <DateDivider date={message.timestamp} />
              <MessageItem key={message.id} message={message} channel={channel} />
            </div>
          ))}
        </div>
        <MessageInput />
      </div>
      {/* pannel will appears hear */}
      <div className={`${styles.detailsPanel} ${selectedThread ? styles.showPanel : ""}`}>
        {selectedThread && <ThreadPanel message={selectedThread} channel={channel} />}
      </div>
      <div className={`${styles.detailsPanel} ${isProfilePanelOpen ? styles.showPanel : ""}`}>
        {isProfilePanelOpen && <ProfilePanel />}
      </div>
    </div>
  );
};

export default Channel;
