import { useSelector } from "react-redux";
import ThreadPanel from "../ThreadPanel/ThreadPanel";
import UserPanel from "../UserPanel/UserPanel";
import styles from "./Panel.module.css";


function Panel() {
  const { threadPanel, userPanel } = useSelector((state) => state.chatPanel);
  const selectedThread =[
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
        ]

  if (!threadPanel && !userPanel) return;
  return (
    <div className={styles.panel}>
      <ThreadPanel selectedThread={selectedThread}/>
      <UserPanel />
    </div>
  );
}

export default Panel;
