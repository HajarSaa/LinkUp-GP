import { useState } from "react";
import styles from "./UserDM.module.css";
import { TbMessageCircleFilled } from "react-icons/tb";
import { LuMessageCircle } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { IoLayers } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import IconDropdown from "../Dropdown/IconDropdown";
import MoreDropdown from "../Dropdown/MoreDropdown";
import { FiHeadphones } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { FiFileText } from "react-icons/fi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BsLightning } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";
import UserModal from "../Modal/UserModal/UserModal";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "../User/UserImage";
import { openUserDetailsModal } from "../../../API/redux_toolkit/modals/convers/userDetailsModal";
import { openUserPanel } from "../../../API/redux_toolkit/ui/chatPanelSlice";
import { useParams } from "react-router-dom";
// import SetStatusModal from "../Modal/SetStatusModal/SetStatus";
const Navbar = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const receiver = useSelector((state) => state.convers.chatMate);
  const dispath = useDispatch();
  const { id } = useParams();

  const menuItems = [
    {
      id: "messages",
      label: "Messages",
      icon: <LuMessageCircle />,
      activeIcon: <TbMessageCircleFilled />,
    },
    {
      id: "weekly",
      label: "Weekly Sync",
      icon: <FaRegFileAlt />,
      activeIcon: <FaRegFileAlt />,
    },
    {
      id: "files",
      label: "Files",
      icon: <FiLayers />,
      activeIcon: <IoLayers />,
    },
  ];

  const moreMenuItems = [
    {
      label: "Open conversation details",
      clickAction: () => {
        dispath(openUserDetailsModal(receiver));
      },
    },
    {
      label: "View full profile",
      clickAction: () => {
        dispath(
          openUserPanel({
            type: "userPanel",
            panel_id: receiver.id || receiver._id,
            page_id: id,
          })
        );
      },
    },
    { label: "Add to VIP" },
    { label: "Star conversation" },
    { label: "Move conversation" },
    { label: "Copy" },
    { label: "Search in conversation" },
    { label: "Open in new window" },
    { label: "Hide", isDanger: true },
  ];
  const huddleItems = [
    { label: "Start Huddle", icon: <FiHeadphones /> },
    { label: "Join Huddle", icon: <IoIosLink /> },
  ];
  const PlusItems = [
    { label: "Canvas", icon: <FiFileText /> },
    { label: "List", icon: <LiaClipboardListSolid /> },
    { label: "Workflow", icon: <BsLightning /> },
    { label: "Bookmark", icon: <IoBookmarkOutline /> },
  ];
  return (
    <>
      <div className={styles.navbar}>
        {/* 🟢 Profile Section */}
        <div className={styles.upBar}>
          <div
            className={styles.profileSection}
            onClick={() => {
              dispath(openUserDetailsModal(receiver));
            }}
          >
            <div className={styles.userbar_image}>
              <UserImage src={receiver?.photo} alt={receiver?.userName} />
            </div>
            <span className={styles.profileName}>{receiver?.userName}</span>
          </div>
          {/* 🟢 Right Section */}
          <div className={styles.rightSection}>
            <IconDropdown
              icon={<FiHeadphones />}
              label=""
              items={huddleItems}
            />
            <MoreDropdown items={moreMenuItems} />
          </div>
        </div>

        {/* 🟢 Navigation Tabs */}
        <div className={styles.tabs}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.tabButton} ${
                activeTab === item.id ? styles.active : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {activeTab === item.id ? item.activeIcon : item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          {/* ✅ Plus Button */}
          <IconDropdown icon={<IoMdAdd />} label="" items={PlusItems} />
        </div>
        {/* <SetStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
      </div>
      <UserModal />
    </>
  );
};

export default Navbar;

// import { useState } from "react";
// import ProfileEditModal from "./ProfileEditModal";

// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
//       <ProfileEditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userData={userData} />
//     </div>
//   );
// };

// export default App;
