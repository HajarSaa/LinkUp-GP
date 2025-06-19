// import styles from "./User.module.css";
// import PropTypes from "prop-types";

// function UserStatus({ status }) {
//   // status can be 'Online', 'Offline', 'Away'
//   return (
//     <span
//       className={` ${styles.user_status} ${
//         status === "online"
//           ? styles.online
//           : status === "away"
//           ? styles.away
//           : status === "busy"
//           ? styles.busy
//           : styles.offline
//       }`}
//     ></span>
//   );
// }

// export default UserStatus;
// UserStatus.propTypes = {
//   status: PropTypes.string.isRequired,
// };

// import styles from "./User.module.css";
// import PropTypes from "prop-types";
// function UserStatus({ status, customStatus }) {
//   const finalStatus = status === "offline" ? "offline" : status;

//   return (
//     <div className={styles.statusWrapper}>
//       <span
//         className={`${styles.user_status} ${
//           finalStatus === "online"
//             ? styles.online
//             : finalStatus === "away"
//             ? styles.away
//             : finalStatus === "busy"
//             ? styles.busy
//             : styles.offline
//         }`}
//       />
//       {customStatus?.emoji && customStatus?.text && (
//         <span className={styles.customStatusText}>
//           {customStatus.emoji} {customStatus.text}
//         </span>
//       )}
//     </div>
//   );
// }
// UserStatus.propTypes = {
//   status: PropTypes.string.isRequired,
//   customStatus: PropTypes.object,
// };


import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./User.module.css";

function UserStatus({ userId }) {
  const onlineUsers = useSelector((state) => state.workspace.onlineUsers);

  // تحديد الحالة بناءً على وجود userId في onlineUsers
  const status = onlineUsers.includes(userId) ? "online" : "offline";

  return (
    <span
      className={` ${styles.user_status} ${
        status === "online" ? styles.online : styles.offline
      }`}
    ></span>
  );
}

UserStatus.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserStatus;