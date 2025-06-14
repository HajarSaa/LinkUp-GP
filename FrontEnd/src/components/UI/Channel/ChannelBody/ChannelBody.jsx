import { useSelector } from "react-redux";
import ChatMessage from "../../../Chat/ChatMessage/ChatMessage";
import ChannelIntro from "../ChannelIntro/ChannelIntro";
import styles from "./ChannelBody.module.css";
import PropTypes from "prop-types";
import { useRef } from "react";
import { isAChannelMember } from "../../../../utils/channelUtils";
function ChannelBody() {
  const { workspace } = useSelector((state) => state.workspace);
  const channel = useSelector((state) => state.channel.channel);
  const isMember =
    channel && workspace ? isAChannelMember(workspace, channel) : false;
  const body_ref = useRef();
  return (
    <div className={styles.channelBody} ref={body_ref}>
      <ChannelIntro channel={channel} />
      {isMember && <ChatMessage containerRef={body_ref} />}
    </div>
  );
}

ChannelBody.propTypes = {
  channel: PropTypes.any,
};

export default ChannelBody;
