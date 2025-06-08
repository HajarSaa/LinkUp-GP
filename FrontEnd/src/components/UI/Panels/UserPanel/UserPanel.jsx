import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileActions from "./ProfileActions";
import ProfileContact from "./ProfileContact";
import styles from "./UserPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeChatPanel } from "../../../../API/redux_toolkit/ui/chatPanelSlice";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import useGetUserProfile from "../../../../API/hooks/userProfile/useGetUserProfile";
import Spinner from "../../Spinner/Spinner";
import { useParams } from "react-router-dom";
import ProfileEditModal from "../../Modal/EditProfileModal/EditProfile";
import EditContact from "../../Modal/EditContactModal/EditContact";
import EditStartDate from "../../Modal/EditStartDateModal/EditStartDate";
import ProfileAbout from "./ProfileAbout";
import UploadProfilePhotoModal from "../../Modal/UploadProfilePhotoModal/UploadProfilePhoto";

const UserPanel = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userProfile = useSelector((state) => state.userProfile.data);
  const { isOpen, userData: user_id } = useSelector(
    (state) => state.chatPanel.userPanel
  );
  const { isLoading, isError, error } = useGetUserProfile(user_id);

  const handleClose = () => {
    dispatch(closeChatPanel({ type: "userPanel", page_id: id }));
  };

  if (!isOpen) return null;
  return (
    <>
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
                <ProfileContact />
                <ProfileAbout />
              </>
            )}
          </div>
        )}
      </div>
      {/* User panel Modals */}
      <ProfileEditModal />
      <EditContact />
      <EditStartDate />
      <UploadProfilePhotoModal />
    </>
  );
};

export default UserPanel;
