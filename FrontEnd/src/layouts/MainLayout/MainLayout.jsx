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
import useSocketConnection from "../../API/sockets/useSocketConnection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useBrowseChannels from "../../API/hooks/channel/useBrowseChannels";
// import {fetchWorkspaceMembers, fetchOnlineUsers } from "../../API/sockets/handlers/workspaceHandler";
function MainLayout() {
  const location = useLocation();
  const isBrowseChannels = location.pathname === "/browse-channels";
  const isSearchPage = location.pathname === "/search";
  const { workspace } = useSelector((state) => state.workspace);
  const channels = workspace?.channels;
  const navigate = useNavigate();
  // custom hooks
  useCurrentWorkspace();
  useSocketConnection();
  useBrowseChannels();

  // useEffect(() => {
  //   if (
  //     !localStorage.getItem("selectedWorkspaceId") ||
  //     !localStorage.getItem("logged_user_data")
  //   )
  //     navigate("/login");
  // });

  // navigate to main channel in main page
  useEffect(() => {
    const isOnRoot = location.pathname === "/";
    if (isOnRoot && channels?.length > 0) {
      const requiredChannel = channels.find((ch) => ch.required === true);
      if (requiredChannel) {
        navigate(`/channels/${requiredChannel._id}`, { replace: true });
      }
    }
  }, [location.pathname, channels, navigate]);

  return (
    <div className={styles.main_layout}>
      <NavBar />
      <div className={styles.workspace_wrapper}>
        <WorkBar />
        {
          (isBrowseChannels|| isSearchPage) ? (
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
