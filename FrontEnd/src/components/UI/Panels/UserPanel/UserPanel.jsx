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
  const { isOpen, userData:user_id } = useSelector(
    (state) => state.chatPanel.userPanel
  );
  const {
    isLoading,
    isError,
    error,
  } = useGetUserProfile(user_id);


  const handleClose = () => {
    dispatch(closeChatPanel());
  };


  if (!isOpen || !userProfile) return null;
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <span>Profile</span>
        <CloseIcon closeEvent={handleClose} />
      </div>

      <div className={styles.panel_body}>
        {isLoading ? (
          <div className={styles.status}>
            <Spinner width={50} height={50} color="var(--primary-color)" />
          </div>
        ) : isError ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
            <ProfileImage />
            <ProfileInfo
              name="User"
              jobTitle="Backend Developer"
              gender="He/Him"
              status="Away"
              localTime="6:20 AM local time"
            />
            <ProfileActions />
            <ProfileAbout emailAddress="user@gmail.com" phone="01012345678" />
          </>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
