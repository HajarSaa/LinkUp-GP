/* eslint-disable no-unused-vars */
import styles from "./MainLayout.module.css";
import EmptyNavBar from "../../components/Layout/Navbar/EmptyNavBar";
import EmptyWorkBar from "../../components/Layout/Workbar/EmptyWorkBar";
import EmptySideBar from "../../components/Layout/SideBar/EmptySideBar";
import useResizableLayout from "../../API/hooks/useResizableLayout";
import { Outlet } from "react-router-dom";

function EmptyLayout() {
  const isResizable = false;
  const { sidebarWidth, panelWidth, containerRef, handleResizeStart } =
    useResizableLayout(300, 250, isResizable);

  return (
    <div className={styles.main_layout}>
      <EmptyNavBar />
      <div className={styles.workspace_wrapper}>
        <EmptyWorkBar />
        <div className={styles.workspace_content_wrapper}>
          <div className={styles.workspace_content} ref={containerRef}>
            <EmptySideBar
              width={sidebarWidth}
              onResizeStart={handleResizeStart}
              isResizable={isResizable}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyLayout;
