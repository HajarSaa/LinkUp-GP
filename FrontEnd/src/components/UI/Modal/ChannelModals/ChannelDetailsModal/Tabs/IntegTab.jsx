import styles from "../ChannelDetailsModal.module.css";
import DetailsButton from "../../../../Buttons/DetailsButton/DetailsButton";
import { useSelector } from "react-redux";

function IntegTab() {
  const { activeTab } = useSelector((state) => state.channelDetailsModal);

  if (activeTab !== "integrations") return null;
    return (
      <div className={styles.integTabContent}>
        <div className={styles.integTab}>
          <div className={styles.intLeft}>
            <span className="align-items-center f-bold">Apps</span>
            <p>
              Bring the tools that you need into this channel to pull reports,
              start calls, file tickets and more.
            </p>
            <div className={styles.btnContainer}>
              <DetailsButton>Add an app</DetailsButton>
            </div>
          </div>
          <div className={styles.intImg}>
            <img src="/public/assets/images/integrations.png" alt="intImage" />
          </div>
        </div>
      </div>
    );
}

export default IntegTab;
