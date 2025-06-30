import { useDispatch, useSelector } from "react-redux";
import styles from "./ChannelDetailsModal.module.css";
import { setActiveTab } from "../../../../../API/redux_toolkit/modals/channelDetailsSlice";

function Tabsbar() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.channelDetailsModal);
  return (
    <div className={styles.tabs}>
      {["about", "members", "integrations", "settings"].map((tab) => (
        <div
          key={tab}
          className={activeTab === tab ? styles.activeTab : ""}
          onClick={() => dispatch(setActiveTab(tab))}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </div>
      ))}
    </div>
  );
}

export default Tabsbar;
