import { useSelector } from "react-redux";
import ChannelHeader from "../../../components/Chat/channel/ChannelHeader/ChannelHeader";
import MessagesList from "../../../components/Chat/channel/MessageList/MessageList";
import MessageInput from "../../../components/Chat/channel/messageInput/MessageInput";
import styles from "./ChannelView.module.css";

const ChannelView = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector((state) => state.messages[activeChannel] || []);

  if (!activeChannel) {
    return <div className={styles.emptyState}>اختر قناة لعرض محتواها</div>;
  }

  return (
    <div className={styles.container}>
      <ChannelHeader />
      <MessagesList messages={messages} />
      <MessageInput />
    </div>
  );
};

export default ChannelView;
