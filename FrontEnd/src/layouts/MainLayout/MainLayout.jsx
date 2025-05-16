/* eslint-disable no-unused-vars */
import styles from "./MainLayout.module.css";
import NavBar from "../../components/Layout/Navbar/NavBar";
import WorkBar from "../../components/Layout/Workbar/WorkBar";
import SideBar from "../../components/Layout/SideBar/SideBar";
import Panel from "../../components/Layout/Panel/Panel";
import useResizableLayout from "../../API/hooks/useResizableLayout";
import { Outlet } from "react-router-dom";
import useCurrentWork from "../../API/hooks/useCurrentWork";
import { useDispatch, useSelector } from "react-redux";
import {
  disableResizing,
  enableResizing,
} from "../../API/redux_toolkit/ui/resizeSlice";
import { useEffect } from "react";

function MainLayout() {
  const { isResizable } = useSelector((state) => state.resizableLayout);
  const dispatch = useDispatch();

  const isBrowseChannels = location.pathname === "/browse-channels";
  const { sidebarWidth, panelWidth, containerRef, handleResizeStart } =
    useResizableLayout(300, 250, isResizable);

  const { loading , workspace } = useCurrentWork();

  useEffect(() => {
    if (loading) {
      dispatch(disableResizing());
    } else {
      dispatch(enableResizing());
    }
  }, [loading, dispatch]);

  return (
    <div className={styles.main_layout}>
      <NavBar />
      <div className={styles.workspace_wrapper}>
        <WorkBar />
        {isBrowseChannels ? (
          <div className={styles.workspace_content_wrapper}>
            {!loading && <Outlet />}
          </div>
        ) : (
          <div className={styles.workspace_content_wrapper}>
            <div className={styles.workspace_content} ref={containerRef}>
              <SideBar
                width={sidebarWidth}
                onResizeStart={handleResizeStart}
                isResizable={isResizable}
              />
              <div className={styles.main_content}>
                {workspace && <Outlet />}
              </div>
              <Panel
                width={panelWidth}
                onResizeStart={handleResizeStart}
                isResizable={isResizable}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
