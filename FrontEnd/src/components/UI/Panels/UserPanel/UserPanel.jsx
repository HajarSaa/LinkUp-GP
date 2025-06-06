import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileActions from "./ProfileActions";
import ProfileAbout from "./ProfileAbout";
import styles from "./UserPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeChatPanel } from "../../../../API/redux_toolkit/ui/chatPanel";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import useGetUserProfile from "../../../../API/hooks/userProfile/useGetUserProfile";
import Spinner from "../../Spinner/Spinner";

const UserPanel = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile.data);
  const { isOpen, userData: user_id } = useSelector(
    (state) => state.chatPanel.userPanel
  );
  const { isLoading, isError, error } = useGetUserProfile(user_id);

  const handleClose = () => {
    dispatch(closeChatPanel());
  };

  if (!isOpen) return null;
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <span>Profile</span>
        <CloseIcon closeEvent={handleClose} />
      </div>

      {userProfile && (
        <div className={styles.panel_body}>
          {isLoading ? (
            <div className={styles.fetching_status}>
              <Spinner width={50} height={50} color="var(--primary-color)" />
            </div>
          ) : isError ? (
            <div className={styles.fetching_error}>{error}</div>
          ) : (
            <>
              <ProfileImage />
              <ProfileInfo />
              <ProfileActions />
              <ProfileAbout/>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPanel;
