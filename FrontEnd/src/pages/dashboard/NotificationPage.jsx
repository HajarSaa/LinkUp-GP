import { Outlet, useLocation } from "react-router-dom";
import styles from "./dashboard.module.css";
import avatar from "./../../../public/assets/notificationImage.svg";
import PageContent from "../../components/Layout/PageContent/PageContnet";

function NotificationPage() {
  const location = useLocation();
  const isNotificationRoot = location.pathname === "/notifications";

  return (
    <PageContent>
      <div className={styles.page_content}>
        <div className={styles.later_page}>
          {isNotificationRoot ? <img src={avatar} alt="notifications" /> : <Outlet />}
        </div>
      </div>
    </PageContent>
  );
}

export default NotificationPage;
