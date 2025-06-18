// // import styles from "./User.module.css";
// // import PropTypes from "prop-types";

// // function UserStatus({ status }) {
// //   // status can be 'Online', 'Offline', 'Away'
// //   return (
// //     // <span
// //     //   className={` ${styles.user_status} ${
// //     //     status === "online"
// //     //       ? styles.online
// //     //       : status === "away"
// //     //       ? styles.away
// //     //       : status === "busy"
// //     //       ? styles.busy
// //     //       : styles.offline
// //     //   }`}
// //     // ></span>

// //         <span
// //       className={` ${styles.user_status} ${
// //         status === "online"
// //           ? styles.online
// //           : status === "away"
// //           ? styles.away
// //           : status === "busy"
// //           ? styles.busy
// //           : styles.offline
// //       }`}
// //     ></span>
// //   );
// // }

// // export default UserStatus;
// // UserStatus.propTypes = {
// //   status: PropTypes.string.isRequired,
// // };

// import { useSelector } from "react-redux";
// import styles from "./User.module.css";
// import PropTypes from "prop-types";

// function UserStatus({ userId }) {
//   const userStatuses = useSelector((state) => state.workspace.userStatuses);
//   const userData = userStatuses[userId];

//   const status = userData?.status || "offline";
//   const customStatus = userData?.customStatus;

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
//       title={
//         customStatus?.text
//           ? `${status} - ${customStatus.emoji || ""} ${customStatus.text}`
//           : status
//       }
//     ></span>
//   );
// }

// UserStatus.propTypes = {
//   userId: PropTypes.string.isRequired,
// };

// export default UserStatus;


import { useSelector } from "react-redux";
import styles from "./User.module.css";
import PropTypes from "prop-types";

function UserStatus({ userId, status: propStatus, customStatus: propCustomStatus }) {
  // ✅ استخدم useSelector بشكل ثابت
  const userStatuses = useSelector((state) => state.workspace.userStatuses);

  let status = propStatus || "offline";
  let customStatus = propCustomStatus;

  // ✅ بعدين نفلتر أو نعدّل على حسب userId
  if (userId && userStatuses?.[userId]) {
    status = userStatuses[userId].status || "offline";
    customStatus = userStatuses[userId].customStatus;
  }

  return (
    <span
      className={`${styles.user_status} ${
        status === "online"
          ? styles.online
          : status === "away"
          ? styles.away
          : status === "busy"
          ? styles.busy
          : styles.offline
      }`}
      title={
        customStatus?.text
          ? `${status} - ${customStatus.emoji || ""} ${customStatus.text}`
          : status
      }
    ></span>
  );
}

UserStatus.propTypes = {
  userId: PropTypes.string,
  status: PropTypes.string,
  customStatus: PropTypes.object,
};

export default UserStatus;
