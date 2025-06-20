import styles from "./UserMenu.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findMemberByUserId } from "../../../../utils/workspaceUtils";
import UserImage from "../../../UI/User/UserImage";
import UserStatus from "../../../UI/User/UserStatus";
import { openSetStatusModal } from "../../../../API/redux_toolkit/modals/userProfile/setStatusSlice";
import { closeUserMenuModal } from "../../../../API/redux_toolkit/modals/userProfile/userMenuSlice";
import { openUserPanel } from "../../../../API/redux_toolkit/ui/chatPanelSlice";
import { removeAllPanels } from "../../../../utils/panelUtils";
import socket from "../../../../API/sockets/socketService";
import { clearWorkspace } from "../../../../API/redux_toolkit/api_data/workspaceSlice";
function UserMenu() {
  const { isOpen } = useSelector((state) => state.userMenu);
  const [hoverPause, setHoverPause] = useState(false);
  const { workspace } = useSelector((state) => state.workspace);
  const loggin_user = findMemberByUserId(workspace);
  const { id: page_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.workspace.onlineUsers);
  const userStatus = onlineUsers.includes(loggin_user?.user)
    ? "online"
    : "offline";
  const show_profile = () => {
    dispatch(openUserPanel({ panel_id: loggin_user._id, page_id: page_id }));
    dispatch(closeUserMenuModal());
  };
  const handleOpenStatusModal = () => {
    dispatch(closeUserMenuModal());
    dispatch(openSetStatusModal());
  };

  const handleSignOut = () => {
  if (workspace?._id) {
    socket.emit("leaveWorkspace", { workspaceId: workspace._id }, () => {
      console.log("👋 Left workspace emitted");

      removeAllPanels();
      dispatch(closeUserMenuModal());
      dispatch(clearWorkspace());
      navigate("/login");
    });
  } else {
    console.warn("⚠️ No workspace ID found on sign out");
    removeAllPanels();
    dispatch(closeUserMenuModal());
    dispatch(clearWorkspace());
    navigate("/login");
  }
};


  if (!isOpen) return null;
  return (
    <div className={styles.dropdown}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <UserImage src={loggin_user?.photo} alt={loggin_user?.userName} />
        </div>
        <div className={styles.profile_info}>
          <span>{loggin_user?.userName}</span>
          <div className={styles.user_status}>
            <span>{userStatus}</span>
            <UserStatus userId={loggin_user?.user} />
            {/* <span>{loggin_user?.status}</span>
            <UserStatus status={loggin_user?.status} /> */}
          </div>
        </div>
      </div>
      <div className={styles.option} onClick={handleOpenStatusModal}>
        Update your status
      </div>
      <div className={styles.option}>Set yourself as away</div>
      <div
        className={styles.option}
        onMouseEnter={() => setHoverPause(true)}
        onMouseLeave={() => setHoverPause(false)}
      >
        Pause notifications
        <IoIosArrowForward size={14} className={styles.arrowIcon} />
        {hoverPause && (
          <div className={styles.subDropdown}>
            <div className={styles.subOption}>For 30 minutes</div>
            <div className={styles.subOption}>For 1 hour</div>
            <div className={styles.subOption}>For 2 hours</div>
            <div className={styles.subOption}>Until tomorrow</div>
            <div className={styles.subOption}>Until next week</div>
            <div className={styles.subOption}>Custom...</div>
          </div>
        )}
      </div>
      <div className={styles.option} onClick={show_profile}>
        Profile
      </div>
      <div className={styles.option}>Preferences</div>
      <div className={styles.option} onClick={handleSignOut}>
        Sign out :)
      </div>
    </div>
  );
}

export default UserMenu;
