// // import { useState } from "react";
// // import { useSelector } from "react-redux";
// // import NotificationSidebar from "./NotificationSidebar";
// // import NotificationItem from "./NotificationItem";
// // import { useGetNotifications } from "../../../../API/hooks/notifications/useGetNotifications";
// // import styles from "./NotificationSidebar.module.css";
// // import Spinner from "../../../UI/Spinner/Spinner";

// // function NotificationSidebarContainer() {
// //   const [activeTab, setActiveTab] = useState("all");

// //   const tabTypeMap = {
// //     all: "",
// //     mentions: "mention",
// //     threads: "thread",
// //     reactions: "reaction",
// //   };

// //   useGetNotifications(tabTypeMap[activeTab]);

// //   const all = useSelector((state) => state.notifications.all);
// //   const mentions = useSelector((state) => state.notifications.mentions);
// //   const threads = useSelector((state) => state.notifications.reply);
// //   const reactions = useSelector((state) => state.notifications.reactions);
// //   const loading = useSelector((state) => state.notifications.loading);
// //   const error = useSelector((state) => state.notifications.error);

// //   const notificationsByTab = {
// //     all,
// //     mentions,
// //     threads,
// //     reactions,
// //   };

// //   const filtered = notificationsByTab[activeTab];

// //   return (
// //     <div className={styles.wrapper}>
// //       <NotificationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

// //       <div className={styles.content}>
// //         {loading ? (
// //           <div className={styles.placeholder}>
// //             <Spinner width={60} height={60} />
// //           </div>
// //         ) : error ? (
// //           <div className={styles.placeholder}>
// //             <p>{error}</p>
// //           </div>
// //         ) : filtered?.length === 0 ? (
// //           <div className={styles.placeholder}>No notifications.</div>
// //         ) : (
// //           filtered.map((notif) => (
// //             <NotificationItem key={notif._id} notification={notif} />
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default NotificationSidebarContainer;


// import { useState } from "react";
// import { useSelector } from "react-redux";
// import NotificationSidebar from "./NotificationSidebar";
// import NotificationItem from "./NotificationItem";
// import { useGetNotifications } from "../../../../API/hooks/notifications/useGetNotifications";
// import styles from "./NotificationSidebar.module.css";
// import Spinner from "../../../UI/Spinner/Spinner";

// function NotificationSidebarContainer() {
//   const [activeTab, setActiveTab] = useState("all");

//   const tabTypeMap = {
//     all: "",
//     mentions: "mention",
//     threads: "thread",
//     reactions: "reaction",
//   };

//   useGetNotifications(tabTypeMap[activeTab]);

//   const all = useSelector((state) => state.notifications.all);
//   const mentions = useSelector((state) => state.notifications.mentions);
//   const threads = useSelector((state) => state.notifications.threads); // ✅ التعديل هنا
//   const reactions = useSelector((state) => state.notifications.reactions);
//   const loading = useSelector((state) => state.notifications.loading);
//   const error = useSelector((state) => state.notifications.error);

//   const notificationsByTab = {
//     all,
//     mentions,
//     threads,
//     reactions,
//   };

//   const filtered = notificationsByTab[activeTab];

//   return (
//     <div className={styles.wrapper}>
//       <NotificationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className={styles.content}>
//         {loading ? (
//           <div className={styles.placeholder}>
//             <Spinner width={60} height={60} />
//           </div>
//         ) : error ? (
//           <div className={styles.placeholder}>
//             <p>{error}</p>
//           </div>
//         ) : filtered?.length === 0 ? (
//           <div className={styles.placeholder}>No notifications.</div>
//         ) : (
//           filtered.map((notif) => (
//             <NotificationItem key={notif._id} notification={notif} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default NotificationSidebarContainer;


import { useState } from "react";
import NotificationSidebar from "./NotificationSidebar";
import NotificationItem from "./NotificationItem";
import styles from "./NotificationSidebar.module.css";
import mockNotifications from "./mockNotifications";

function NotificationSidebarContainer() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = {
    all: mockNotifications,
    mentions: mockNotifications.filter((n) => n.type === "mention"),
    threads: mockNotifications.filter((n) => n.type === "reply"),
    reactions: mockNotifications.filter((n) => n.type === "reaction"),
  }[activeTab];

  return (
    <div className={styles.wrapper}>
      <NotificationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.content}>
        {filtered.length === 0 ? (
          <div className={styles.placeholder}>No notifications.</div>
        ) : (
          filtered.map((notif) => (
            <NotificationItem key={notif._id} notification={notif} />
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationSidebarContainer;
