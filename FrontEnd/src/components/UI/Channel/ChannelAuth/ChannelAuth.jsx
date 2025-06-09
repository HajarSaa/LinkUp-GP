import { useDispatch } from "react-redux";
import { openChannelDetails } from "../../../../API/redux_toolkit/modals/channelDetailsSlice";
import ChannelType from "../ChannelType/ChannelType";
import styles from "./ChannelAuth.module.css";
import PropTypes from "prop-types";
import useJoinChannel from "../../../../API/hooks/channel/useJoinChannel";
import Spinner from "../../Spinner/Spinner";

function ChannelAuth({ channel }) {
  const dispatch = useDispatch();
  const join_channel = useJoinChannel();

  function handle_join_channel(e) {
    e.stopPropagation();
    join_channel.mutate(channel.id);
  }
  return (
    <div className={styles.channel_auth}>
      <div className={styles.auth_container}>
        <div className={styles.channel_name}>
          <ChannelType type={channel?.type} />
          <span>{channel?.name}</span>
        </div>
        <div className={styles.btns}>
          <button
            className={styles.details}
            onClick={() => dispatch(openChannelDetails({ tab: "about" }))}
          >
            Details
          </button>
          <button className={styles.join} onClick={handle_join_channel}>
            {join_channel.isPending ? (
              <Spinner width={20} height={20} color="var(--primary-color)" />
            ) : (
              "Join channel"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

ChannelAuth.propTypes = {
  channel: PropTypes.any,
};

export default ChannelAuth;
