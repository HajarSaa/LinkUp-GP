import styles from "./MainLayout.module.css";
import NavBar from "../../components/Layout/Navbar/NavBar";
import WorkBar from "../../components/Layout/Workbar/WorkBar";
import SideBar from "../../components/Layout/SideBar/SideBar";
import { Outlet, useLocation} from "react-router-dom";
import CreateChannelModal from "../../components/UI/Modal/ChannelModals/CreateChannelModal/CreateChannelModal";
import InviteWorkModal from "../../components/UI/Modal/InviteWorkModal/InviteWorkModal";
import useCurrentWorkspace from "../../API/hooks/workspace/useCurrentWorkspace";
import { useSelector } from "react-redux";
import InviteChannelModal from "../../components/UI/Modal/ChannelModals/InviteChannelModal/InviteChannelModal";
import SetStatusModal from "../../components/UI/Modal/SetStatusModal/SetStatus";
// import { useEffect } from "react";
// import socket from "../../API/sockets/socketService";

function MainLayout() {
  const location = useLocation();
  const isBrowseChannels = location.pathname === "/browse-channels";
  // const { id: page_id } = useParams();

  useCurrentWorkspace();
  const { workspace } = useSelector((state) => state.workspace);

  // useEffect(() => {
  //   socket.emit("join", { roomId: page_id, type: "channel" });

  //   socket.on("newMessage", (message) => {
  //     console.log("وصلت رسالة:", message);
  //   });

  //   return () => {

  //     socket.emit("leave", { roomId: page_id });

  //     socket.off("newMessage");
  //   };
  // }, [page_id]);

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
    </div>
  );
}

export default MainLayout;
