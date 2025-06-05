import { useSelector } from "react-redux";
import ChatMessage from "../../../Chat/ChatMessage/ChatMessage";
import ChannelIntro from "../ChannelIntro/ChannelIntro";
import styles from "./ChannelBody.module.css";
import PropTypes from 'prop-types'
import { useRef } from "react";
function ChannelBody() {
  const channel = useSelector((state) => state.channel.channel);
  const body_ref = useRef()
  return (
    <div className={styles.channelBody} ref={body_ref}>
      <ChannelIntro title={channel?.name} />
      <ChatMessage containerRef={body_ref} />
    </div>
  );
}

ChannelBody.propTypes = {
  channel: PropTypes.any,
};

export default ChannelBody;
