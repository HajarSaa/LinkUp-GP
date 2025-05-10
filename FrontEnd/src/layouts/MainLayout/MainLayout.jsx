/* eslint-disable no-unused-vars */
import styles from "./MainLayout.module.css";
import NavBar from "../../components/Layout/Navbar/NavBar";
import WorkBar from "../../components/Layout/Workbar/WorkBar";
import SideBar from "../../components/Layout/SideBar/SideBar";
import Panel from "../../components/Layout/Panel/Panel";
import useResizableLayout from "../../API/hooks/useResizableLayout";
import { Outlet } from "react-router-dom";
import useCurrentWork from "../../API/hooks/useCurrentWork";

function MainLayout() {
  const isResizable = true;
  const isBrowseChannels = location.pathname === "/browse-channels";
  const { sidebarWidth, panelWidth, containerRef, handleResizeStart } =
    useResizableLayout(300, 250, isResizable);

  const {loading, error } = useCurrentWork();

  if (loading) return <div>Fteching Workspace Data ...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className={styles.main_layout}>
      <NavBar />
      <div className={styles.workspace_wrapper}>
        <WorkBar />
        {isBrowseChannels ? (
          <div className={styles.workspace_content_wrapper}>
            <Outlet />
          </div>
        ) : (
          <div className={styles.workspace_content_wrapper}>
            <div className={styles.workspace_content} ref={containerRef}>
              <SideBar
                width={sidebarWidth}
                onResizeStart={handleResizeStart}
                isResizable={isResizable}
              />
              <Outlet />
              {/* <Panel
                width={panelWidth}
                onResizeStart={handleResizeStart}
                isResizable={isResizable}
              /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
