import { useSelector } from "react-redux";
import styles from "./Panel.module.css";
import ThreadPanel from "../../UI/Panels/ThreadPanel/ThreadPanel";
import UserPanel from "../../UI/Panels/UserPanel/UserPanel";

function Panel() {
  const { threadPanel, userPanel } = useSelector((state) => state.chatPanel);
  const selectedThread = [
    {
      id: 1,
      sender: "Omar",
      text: "Thanks, Ahmed!",
      timestamp: "2025-03-04T10:05:00Z",
    },
    {
      id: 2,
      sender: "Ahmed",
      text: "You're welcome!",
      timestamp: "2025-03-04T10:05:15Z",
    },
    {
      id: 3,
      sender: "Ahmed",
      text: "You're welcome!",
      timestamp: "2025-03-04T10:05:15Z",
    },
    {
      id: 4,
      sender: "Ahmed",
      text: "You're welcome!",
      timestamp: "2025-03-04T10:05:15Z",
    },
    {
      id: 5,
      sender: "Ahmed",
      text: "You're welcome!",
      timestamp: "2025-03-04T10:05:15Z",
    },
  ];
  console.log(!threadPanel && !userPanel.isOpen);

  if (!threadPanel && !userPanel.isOpen) return;
  return (
    <div className={styles.panel}>
      {console.log('opened')}
      <ThreadPanel selectedThread={selectedThread} />
      <UserPanel />
    </div>
  );
}

export default Panel;
