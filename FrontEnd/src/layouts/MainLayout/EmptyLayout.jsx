
import styles from "./MainLayout.module.css";
import EmptyNavBar from "../../components/Layout/Navbar/EmptyNavBar";
import EmptyWorkBar from "../../components/Layout/Workbar/EmptyWorkBar";
import EmptySideBar from "../../components/Layout/SideBar/EmptySideBar";
import { Outlet } from "react-router-dom";

function EmptyLayout() {
  return (
    <div className={styles.main_layout}>
      <EmptyNavBar />
      <div className={styles.workspace_wrapper}>
        <EmptyWorkBar />
        <div className={styles.workspace_content_wrapper}>
          <div className={styles.workspace_content}>
            <EmptySideBar  />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyLayout;
