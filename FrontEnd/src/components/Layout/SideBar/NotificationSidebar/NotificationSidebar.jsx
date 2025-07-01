// // src/components/Sidebar/NotificationSidebar.jsx
// import { NavLink, useLocation } from "react-router-dom";
// import { FaBell, FaAt, FaComments, FaSmile } from "react-icons/fa";
// import styles from "./NotificationSidebar.module.css";

// const tabs = [
//   { name: "All", icon: <FaBell />, path: "/notifications" },
//   { name: "Mentions", icon: <FaAt />, path: "/notifications/mentions" },
//   { name: "Threads", icon: <FaComments />, path: "/notifications/threads" },
//   { name: "Reactions", icon: <FaSmile />, path: "/notifications/reactions" },
// ];

// function NotificationSidebar() {
//   const location = useLocation();

//   return (
//     <div className={styles.sidebar_container}>
//       <h3 className={styles.title}>Notifications</h3>
//       <ul className={styles.tab_list}>
//         {tabs.map((tab) => (
//           <li key={tab.name}>
//             <NavLink
//               to={tab.path}
//               className={({ isActive }) =>
//                 isActive || location.pathname === tab.path
//                   ? styles.active_tab
//                   : styles.tab_link
//               }
//             >
//               <span className={styles.icon}>{tab.icon}</span>
//               <span className={styles.text}>{tab.name}</span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default NotificationSidebar;


// import PropTypes from "prop-types";
// import { FaBell, FaAt, FaComments, FaSmile } from "react-icons/fa";
// import styles from "./NotificationSidebar.module.css";

// const tabs = [
//   { name: "All", icon: <FaBell />, key: "all" },
//   { name: "Mentions", icon: <FaAt />, key: "mentions" },
//   { name: "Threads", icon: <FaComments />, key: "threads" },
//   { name: "Reactions", icon: <FaSmile />, key: "reactions" },
// ];

// function NotificationSidebar({ activeTab, setActiveTab }) {
//   return (
//     <div className={styles.sidebar_container}>
//       <h3 className={styles.title}>Notifications</h3>
//       <ul className={styles.tab_list}>
//         {tabs.map((tab) => (
//           <li key={tab.key}>
//             <div
//               className={
//                 activeTab === tab.key
//                   ? styles.active_tab
//                   : styles.tab_link
//               }
//               onClick={() => setActiveTab(tab.key)}
//             >
//               <span className={styles.icon}>{tab.icon}</span>
//               <span className={styles.text}>{tab.name}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// NotificationSidebar.propTypes = {
//   activeTab: PropTypes.string.isRequired,
//   setActiveTab: PropTypes.func.isRequired,
// };

// export default NotificationSidebar;


import PropTypes from "prop-types";
import { FaBell, FaAt, FaComments, FaSmile } from "react-icons/fa";
import styles from "./NotificationSidebar.module.css";

const tabs = [
  { name: "All", icon: <FaBell />, key: "all" },
  { name: "Mentions", icon: <FaAt />, key: "mentions" },
  { name: "Threads", icon: <FaComments />, key: "threads" },
  { name: "Reactions", icon: <FaSmile />, key: "reactions" },
];

function NotificationSidebar({ activeTab, setActiveTab }) {
  return (
    <div className={styles.sidebar_container}>
      <h3 className={styles.title}>Notifications</h3>
      <ul className={styles.tab_list}>
        {tabs.map((tab) => (
          <li key={tab.key}>
            <div
              className={`${styles.tab} ${activeTab === tab.key ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className={styles.icon}>{tab.icon}</span>
              <span className={styles.text}>{tab.name}</span>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

NotificationSidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default NotificationSidebar;
