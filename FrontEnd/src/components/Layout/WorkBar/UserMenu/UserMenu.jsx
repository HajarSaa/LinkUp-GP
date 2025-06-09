import styles from "./UserMenu.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findMemberByUserId } from "../../../../utils/workspaceUtils";
import UserImage from "../../../UI/User/UserImage";
import UserStatus from "../../../UI/User/UserStatus";
import { openSetStatusModal } from "../../../../API/redux_toolkit/modals/userProfile/setStatusSlice";
import { closeUserMenuModal } from "../../../../API/redux_toolkit/modals/userProfile/userMenuSlice";

function UserMenu() {
  const { isOpen } = useSelector((state) => state.userMenu);
  const [hoverPause, setHoverPause] = useState(false);
  const { workspace } = useSelector((state) => state.workspace);
  const loggin_user = findMemberByUserId(workspace);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    // navigate("/user-conversations");
  };
  const handleOpenStatusModal = () => {
    dispatch(closeUserMenuModal());
    dispatch(openSetStatusModal());
  };

  const handleSignOut = () => {
    navigate("/login");
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
              <span>{loggin_user?.status}</span>
              <UserStatus status={loggin_user?.status} />
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
        <div className={styles.option} onClick={handleProfileClick}>
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
