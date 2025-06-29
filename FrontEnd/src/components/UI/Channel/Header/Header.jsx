/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  openChannelDetails,
  openEditTopicModal,
} from "../../../../API/redux_toolkit/modals/channelDetailsSlice";
import styles from "./Header.module.css";
import { TbMessageCircleFilled } from "react-icons/tb";
import ChannelOptionModal from "../../../UI/Modal/ChannelModals/ChannelOptionsModal/ChannelOptionModal";
import { openMenu } from "../../../../API/redux_toolkit/modals/channel/channelMenuSlice";
import { BsLightning, BsPinAngle, BsPinAngleFill, BsThreeDotsVertical } from "react-icons/bs";
import ChannelDetailsModal from "../../Modal/ChannelModals/ChannelDetailsModal/ChannelDetailsModal";
import NotificationsModal from "../../Modal/ChannelModals/NotifiactionModal/NotificationsModal";
import ChannelType from "../ChannelType/ChannelType";
import { FiChevronDown, FiFileText, FiLayers } from "react-icons/fi";
import { MdHeadset } from "react-icons/md";
import { getMembersData } from "../../../../utils/workspaceUtils";
import UserImage from "../../User/UserImage";
import IconDropdown from "../../Dropdown/IconDropdown";
import { IoMdAdd } from "react-icons/io";
import { LuMessageCircle } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";
import { IoBookmarkOutline, IoLayers } from "react-icons/io5";
import { useState } from "react";
import { LiaClipboardListSolid } from "react-icons/lia";
import PropTypes from "prop-types";
import { isChannelOwner } from "../../../../utils/channelUtils";
import TopicModal from "../../Modal/ChannelModals/editModals/TopicModal";
import RenameChannelModal from "../../Modal/ChannelModals/editModals/RenameChannelModal";
import DescriptionModal from "../../Modal/ChannelModals/editModals/DescriptionModal";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import { useNavigate } from "react-router-dom";
import { GiPin } from "react-icons/gi";

function Header({ activeTab, setActiveTab }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workspace } = useSelector((state) => state.workspace);
  const channel = useSelector((state) => state.channel.channel);
  const members = getMembersData(channel, workspace);
  const isOwner = isChannelOwner(channel, workspace);
  const isLater = location.pathname.startsWith("/later");
  const menuItems = [
    {
      id: "messages",
      label: "Messages",
      icon: <LuMessageCircle />,
      activeIcon: <TbMessageCircleFilled />,
    },
    // {
    //   id: "weekly",
    //   label: "Weekly Sync",
    //   icon: <FaRegFileAlt />,
    //   activeIcon: <FaRegFileAlt />,
    // },
    {
      id: "files",
      label: "Files",
      icon: <FiLayers />,
      activeIcon: <IoLayers />,
    },
    {
      id: "pins",
      label: "Pins",
      icon: <BsPinAngle />,
      activeIcon: <BsPinAngleFill />,
    },
  ];
  const PlusItems = [
    { label: "Canvas", icon: <FiFileText /> },
    { label: "List", icon: <LiaClipboardListSolid /> },
    { label: "Workflow", icon: <BsLightning /> },
    { label: "Bookmark", icon: <IoBookmarkOutline /> },
  ];

  function editTopic() {
    if (isOwner) {
      dispatch(openEditTopicModal());
    }
  }

  if (!channel) return;
  return (
    <>
      <div className={styles.channelHeader}>
        <div className={styles.header}>
          <div className={styles.channel_info}>
            <div
              className={styles.channel_name}
              onClick={() => dispatch(openChannelDetails({ tab: "about" }))}
            >
              <ChannelType type={channel.type} />
              <span>{channel.name}</span>
            </div>
            {channel.topic && (
              <div className={styles.channel_topic} onClick={editTopic}>
                <span>{channel.topic}</span>
                {isOwner && <span className={styles.infoEdit}>Edit</span>}
              </div>
            )}
          </div>
          <div className={styles.rightSide}>
            <div
              className={styles.membersContainer}
              onClick={() => dispatch(openChannelDetails({ tab: "members" }))}
            >
              <div className={styles.avatars}>
                {members.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className={styles.avatar}
                    style={{ zIndex: `${100 - index}` }}
                  >
                    <UserImage src={member.photo} alt={member.name} />
                  </div>
                ))}
              </div>
              <span className={styles.memberCount}>
                {channel.members.length.toLocaleString()}
              </span>
            </div>
            <div className={styles.huddle}>
              <div className={styles.huddleButton}>
                <span className={styles.icon}>
                  <MdHeadset />
                </span>
                <span className="iconsPadding align-items-center">
                  <FiChevronDown className={styles.arrow} />
                </span>
              </div>
            </div>
            <div className={styles.menu}>
              <div
                className={styles.menuButton}
                onClick={() => dispatch(openMenu())}
              >
                <BsThreeDotsVertical />
              </div>
              <ChannelOptionModal />
            </div>
            {isLater && <CloseIcon closeEvent={()=>navigate("/later")} />}
          </div>
        </div>
        <div className={`w-100 align-items-center ${styles.bottomPart}`}>
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
        </div>
      </div>
      <NotificationsModal />
      <ChannelDetailsModal />
      {/* modals */}
      <TopicModal channelName={channel?.name} defaultTopic={channel?.topic} />
      <RenameChannelModal channelName={channel?.name} type={channel?.type} />
      <DescriptionModal defaultDescription={channel?.description} />
    </>
  );
}
Header.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Header;
