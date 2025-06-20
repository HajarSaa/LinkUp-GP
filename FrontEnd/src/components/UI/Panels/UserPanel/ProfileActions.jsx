import styles from "./UserPanel.module.css";
import { LuMessageCircle } from "react-icons/lu";
import IconDropdown from "../../Dropdown/IconDropdown";
import MoreDropdown from "../../Dropdown/MoreDropdown";
import { FiHeadphones } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import Button from "../../Buttons/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { openSetStatusModal } from "../../../../API/redux_toolkit/modals/userProfile/setStatusSlice";

const ProfileActions = () => {
  const userProfile = useSelector((state) => state.userProfile.data);
  const dispatch = useDispatch();

  function handleOpen() {
    dispatch(openSetStatusModal(userProfile));
  }
  const moreMenuItems = [
    { label: "Copy display name: @user" },
    { label: "Share contact" },
    { label: "View files" },
    { label: "Copy member ID" },
    { label: "Copy link to profile" },
    { label: "Hide user", isDanger: true },
  ];
  const items = [
    { label: "Start Huddle", icon: <FiHeadphones /> },
    { label: "Join Huddle", icon: <IoIosLink /> },
  ];
  return (
    <div className={styles.profileActions}>
      {userProfile?.isMe ? (
        <button className={styles.button} onClick={handleOpen}>
          Set Status
        </button>
      ) : (
        <>
          <Button className={styles.button} icon={<LuMessageCircle />}>
            Message
          </Button>

          <IconDropdown icon={<FiHeadphones />} label="Huddle" items={items} />
        </>
      )}
      <MoreDropdown items={moreMenuItems} />
    </div>
  );
};

export default ProfileActions;
