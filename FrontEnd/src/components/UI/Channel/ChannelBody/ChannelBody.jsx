import { useParams } from "react-router-dom";
import mockChannels from "../../../../API/services/mockChannels";
import ChatMessage from "../../../Chat/ChatMessage/ChatMessage";
import ChannelIntro from "../ChannelIntro/ChannelIntro";
import styles from "./ChannelBody.module.css";
function ChannelBody() {
  const { id } = useParams();
  const channel = mockChannels.find((ch) => ch.id === +id);

  return (
    <div className={styles.channelBody}>
      <ChannelIntro title={channel.name} />
      <ChatMessage messages={channel.messages} />
    </div>
  );
}

export default ChannelBody;
