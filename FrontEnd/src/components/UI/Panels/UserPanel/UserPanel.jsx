import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import ProfileActions from "./ProfileActions";
import ProfileAbout from "./ProfileAbout";
import styles from "./UserPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeChatPanel } from "../../../../API/redux_toolkit/ui/chatPanel";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
const ProfileCard = () => {
  const { isOpen,userData } = useSelector((state) => state.chatPanel.userPanel);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeChatPanel());
  };

  if (!isOpen) return null;

  return (
    <div className={styles.profileCard}>
      {console.log(userData)}
      {/* Header Bar with Close Button */}
      <div className={styles.profileHeader}>
        <span>Profile</span>
        <CloseIcon closeEvent={handleClose}/>
      </div>

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
    </div>
  );
};

export default ProfileCard;
