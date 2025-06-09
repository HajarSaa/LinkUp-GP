import ChannelType from "../ChannelType/ChannelType";
import styles from "./ChannelAuth.module.css";

function PrivateChAuth() {
  return (
    <div className={styles.private_auth}>
      <ChannelType type={"private"} />
      <span>You do not have access to this channel</span>
    </div>
  );
}

export default PrivateChAuth;
