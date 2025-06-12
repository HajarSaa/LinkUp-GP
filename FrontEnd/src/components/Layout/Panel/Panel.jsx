import { useSelector } from "react-redux";
import styles from "./Panel.module.css";
import ThreadPanel from "../../UI/Panels/ThreadPanel/ThreadPanel";
import UserPanel from "../../UI/Panels/UserPanel/UserPanel";

function Panel() {
  const { threadPanel, userPanel } = useSelector((state) => state.chatPanel);

  if (!threadPanel.isOpen && !userPanel.isOpen) return;
  return (
    <div className={styles.panel}>
      <ThreadPanel />
      <UserPanel />
    </div>
  );
}

export default Panel;
