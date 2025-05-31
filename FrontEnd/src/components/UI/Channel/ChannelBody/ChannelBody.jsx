import { useSelector } from "react-redux";
import ChatMessage from "../../../Chat/ChatMessage/ChatMessage";
import ChannelIntro from "../ChannelIntro/ChannelIntro";
import styles from "./ChannelBody.module.css";
import PropTypes from 'prop-types'
function ChannelBody() {
  const channel = useSelector((state) => state.channel.channel);
  return (
    <div className={styles.channelBody}>
      <ChannelIntro title={channel?.name} />
      <ChatMessage messages={channel?.messages} />
    </div>
  );
}

ChannelBody.propTypes = {
  channel: PropTypes.any,
};

export default ChannelBody;
