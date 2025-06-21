import styles from "./MainLayout.module.css";
import NavBar from "../../components/Layout/Navbar/NavBar";
import WorkBar from "../../components/Layout/Workbar/WorkBar";
import SideBar from "../../components/Layout/SideBar/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import CreateChannelModal from "../../components/UI/Modal/ChannelModals/CreateChannelModal/CreateChannelModal";
import InviteWorkModal from "../../components/UI/Modal/InviteWorkModal/InviteWorkModal";
import useCurrentWorkspace from "../../API/hooks/workspace/useCurrentWorkspace";
import { useSelector } from "react-redux";
import InviteChannelModal from "../../components/UI/Modal/ChannelModals/InviteChannelModal/InviteChannelModal";
import SetStatusModal from "../../components/UI/Modal/SetStatusModal/SetStatus";
import useSocketConnection from "../../API/sockets/useSocketConnection"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import {fetchWorkspaceMembers, fetchOnlineUsers } from "../../API/sockets/handlers/workspaceHandler";
function MainLayout() {
  const location = useLocation();
  const isBrowseChannels = location.pathname === "/browse-channels";

  useCurrentWorkspace();
  const { workspace } = useSelector((state) => state.workspace);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("selectedWorkspaceId") ||
      !localStorage.getItem("logged_user_data")
    )
      navigate("/login");
  })
  useSocketConnection();
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
        <InviteWorkModal />
        <InviteChannelModal />
        <SetStatusModal />

      </div>
      {/* Only for test */}
        {/* <button onClick={() => {
          fetchWorkspaceMembers(workspace._id, (res) => {
            console.log("📋 Members:", res.members);
          });
        }}>Get Members</button>

        <button onClick={() => {
          fetchOnlineUsers(workspace._id, (res) => {
            console.log("🟢 Online:", res.onlineUsers);
          });
        }}>Get Online</button> */}
    </div>
  );
}

export default MainLayout;
