import styles from "./User.module.css";
import PropTypes from "prop-types";

function UserStatus({ status }) {
  // status can be 'Online', 'Offline', 'Away'
  return (
    <span
      className={` ${styles.user_status} ${
        status === "online"
          ? styles.online
          : status === "away"
          ? styles.away
          : status === "busy"
          ? styles.busy
          : styles.offline
      }`}
    ></span>
  );
}

export default UserStatus;
UserStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
