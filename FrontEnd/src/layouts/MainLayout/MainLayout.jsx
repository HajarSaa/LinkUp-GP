import styles from "./MainLayout.module.css";
import NavBar from "../../components/Layout/Navbar/NavBar";
import WorkBar from "../../components/Layout/Workbar/WorkBar";
import SideBar from "../../components/Layout/SideBar/SideBar";
import { Outlet, useLocation} from "react-router-dom";
import CreateChannelModal from "../../components/UI/Modal/ChannelModals/CreateChannelModal/CreateChannelModal";
import InvitePeopleModal from "../../components/UI/Modal/InvitePeopleModal/InvitePeopleModal";
import useCurrentWorkspace from "../../API/hooks/useCurrentWorkspace";


function MainLayout() {
  const location = useLocation();
  const isBrowseChannels = location.pathname === "/browse-channels";

  const {data} = useCurrentWorkspace();
  const workspace = data?.workspace;


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
