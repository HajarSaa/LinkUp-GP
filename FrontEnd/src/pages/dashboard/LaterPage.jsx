import { Outlet, useLocation } from "react-router-dom";
import styles from "./dashboard.module.css";
import avatar from "/assets/laterImage.svg";
import PageContent from "../../components/Layout/PageContent/PageContnet";

function LaterPage() {
  const location = useLocation();
  const isLaterRoot = location.pathname === "/later";

  return (
    <PageContent>
      <div className={styles.page_content}>
        <div className={styles.later_page}>
          {isLaterRoot ? <img src={avatar} alt="later" /> : <Outlet />}
        </div>
      </div>
    </PageContent>
  );
}

export default LaterPage;
