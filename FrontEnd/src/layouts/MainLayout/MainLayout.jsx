import styles from "./MainLayout.module.css";
import NavBar from "../../components/Layout/Navbar/NavBar";
import WorkBar from "../../components/Layout/Workbar/WorkBar";
import SideBar from "../../components/Layout/SideBar/SideBar";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  disableResizing,
  enableResizing,
} from "../../API/redux_toolkit/ui/resizeSlice";
import { useEffect } from "react";
import CreateChannelModal from "../../components/UI/Modal/ChannelModals/CreateChannelModal/CreateChannelModal";
import InvitePeopleModal from "../../components/UI/Modal/InvitePeopleModal/InvitePeopleModal";
import useCurrentWorkspace from "../../API/hooks/useCurrentWorkspace";
import { setWorkspace } from "../../API/redux_toolkit/api_data/workspaceSlice";

function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isBrowseChannels = location.pathname === "/browse-channels";

  const { isLoading, data, isError, error } = useCurrentWorkspace();
  const workspace = data?.workspace;

  // Handle success (data loaded)
  useEffect(() => {
    if (data?.workspace) {
      dispatch(setWorkspace(data.workspace));
    }
  }, [data, dispatch]);

  // Handle error (fetch failed)
  useEffect(() => {
    if (isError) {
      console.log("Error fetching workspace:", error);
      navigate("/workspaces-landing");
    }
  }, [isError, error, navigate]);

  useEffect(() => {
    if (isLoading) {
      dispatch(disableResizing());
    } else {
      dispatch(enableResizing());
    }
  }, [isLoading, dispatch]);

  return (
    <div className={styles.main_layout}>
      <NavBar />
      <div className={styles.workspace_wrapper}>
        <WorkBar />
        {isBrowseChannels ? (
          <div className={styles.workspace_content_wrapper}>
            <div className={styles.full_content}>{workspace && <Outlet />}</div>
          </div>
        ) : (
          <div className={styles.workspace_content_wrapper}>
            <div className={styles.workspace_content}>
              <SideBar />
              <div className={styles.main_content}>
                {workspace && <Outlet />}
              </div>
            </div>
          </div>
        )}
        {/* Modals */}
        {/* Channel Modals */}
        <CreateChannelModal />
        <InvitePeopleModal />
      </div>
    </div>
  );
}

export default MainLayout;
