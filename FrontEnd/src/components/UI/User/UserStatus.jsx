import styles from "./User.module.css";
import PropTypes from "prop-types";

function UserStatus({ status }) {
  // status can be 'Online', 'Offline', 'Away'
  console.log(status);
  return (
    // <span
    //   className={` ${styles.user_status} ${
    //     status === "online"
    //       ? styles.online
    //       : status === "away"
    //       ? styles.away
    //       : status === "busy"
    //       ? styles.busy
    //       : styles.offline
    //   }`}
    // ></span>

        <span
      className={` ${styles.user_status} ${
        status === "online" ? styles.online : styles.offline
      }`}
    ></span>
  );
}

export default UserStatus;
UserStatus.propTypes = {
  status: PropTypes.string.isRequired,
};


// import { useSelector } from "react-redux";
// import PropTypes from "prop-types";
// import styles from "./User.module.css";

// function UserStatus({ userId }) {
//   const onlineUsers = useSelector((state) => state.workspace.onlineUsers);

//   const status = onlineUsers.includes(userId) ? "online" : "offline";

//   return (
//     <span
//       className={` ${styles.user_status} ${
//         status === "online" ? styles.online : styles.offline
//       }`}
//     ></span>
//   );
// }

// UserStatus.propTypes = {
//   userId: PropTypes.string.isRequired,
// };

// export default UserStatus;