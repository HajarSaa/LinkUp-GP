/* eslint-disable no-unused-vars */
// import styles from "./Sidebar.module.css";
// import SidebarOption from "../SidebarOptions/SidebarOption";
// import CreateIcon from "../../assets/icons/new-message.svg";
// import ThreadsIcon from "../../assets/icons/thread.svg";
// import MentionIcon from "../../assets/icons/mention.svg";
// import SendIcon from "../../assets/icons/send-outline.svg";
// import CanvasIcon from "../../assets/icons/canvases.svg";
// import ConnectIcon from "../../assets/icons/connect.svg";
// import FilesIcon from "../../assets/icons/files.svg";
// import MoreIcon from "../../assets/icons/more.svg";
// import CaretDownIcon from "../../assets/icons/caret-down.svg";
// import HashtagIcon from "../../assets/icons/hashtag-thin.svg";
// import PlusIcon from "../../assets/icons/plus.svg";
// import UserIcon from "../../assets/icons/user.svg";
// import BotIcon from "../../assets/icons/bot.svg";
// function Sidebar() {
//   return (
//     <div className={styles.sidebar}>
//       <div className={styles.sidebar__Navbar}>
//         <div className={styles.sidebar__info}>
//           <h2>Web development</h2>
//           {/* <h3>
//             <FiberManualRecordIcon />
//             Guest User
//           </h3> */}
//         </div>
//         <img
//           src={CreateIcon}
//           alt="Crete-workspace icon"
//           className={styles.create_icon}
//         />
//       </div>

//       <SidebarOption Icon={ThreadsIcon} title="threads" />
//       <SidebarOption Icon={MentionIcon} title="Mentions & reactions " />
//       <SidebarOption Icon={SendIcon} title="Drafts & sent" />
//       <SidebarOption Icon={CanvasIcon} title="Canvases" />
//       <SidebarOption Icon={ConnectIcon} title="Link-UP connect" />
//       <SidebarOption Icon={FilesIcon} title="Files" />
//       <SidebarOption Icon={MoreIcon} title="More" />
//       <hr />
//       <SidebarOption Icon={CaretDownIcon} title="Channels" />
//       <SidebarOption Icon={HashtagIcon} title="01-announcements" />
//       <SidebarOption Icon={HashtagIcon} title="02-community" />
//       <SidebarOption Icon={HashtagIcon} title="03-talk-random" />
//       <SidebarOption Icon={PlusIcon} title="Add channel" />
//       <hr />
//       <SidebarOption Icon={CaretDownIcon} title="Direct messages" />
//       <SidebarOption Icon={UserIcon} title="User" />
//       <SidebarOption Icon={UserIcon} title="User" />
//       <SidebarOption Icon={PlusIcon} title="Add coworkers" />
//       <hr />
//       <SidebarOption Icon={CaretDownIcon} title="Apps" />
//       <SidebarOption Icon={BotIcon} title="Link-UPbot" />
//       <SidebarOption Icon={BotIcon} title="Google drive" />
//       <SidebarOption Icon={BotIcon} title="Simple poll" />
//       <SidebarOption Icon={PlusIcon} title="Add apps" />
//     </div>
//   );
// }

// export default Sidebar;

import styles from "./Sidebar.module.css";
import CreateIcon from "../../assets/icons/new-message.svg";
import ThreadsIcon from "../../assets/icons/thread.svg";
import MentionIcon from "../../assets/icons/mention.svg";
import SendIcon from "../../assets/icons/send-outline.svg";
import CanvasIcon from "../../assets/icons/canvases.svg";
import ConnectIcon from "../../assets/icons/connect.svg";
import FilesIcon from "../../assets/icons/files.svg";
import MoreIcon from "../../assets/icons/more.svg";
import CaretDownIcon from "../../assets/icons/caret-down.svg";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import PlusIcon from "../../assets/icons/plus.svg";
import UserIcon from "../../assets/icons/user.svg";
import BotIcon from "../../assets/icons/bot.svg";
import mockChannels from "../../API/services/mockChannels";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChannelMenu,
  openChannelMenu,
} from "../../API/redux_toolkit/chat/channel/addChannelMenuSlice";
import ChannelItem from "../../components/Chat/channel/SideBar/ChannelItem/ChannelItem";
import ChannelsList from "../../components/Chat/channel/SideBar/ChannelList/ChannelList";
function Sidebar() {
  const dispatch = useDispatch();
  const [showChannels, setShowChannels] = useState(true);
  const channelsRef = useRef(null);
  const toggleChannels = () => setShowChannels(!showChannels);
  //
  const isMenuOpen = useSelector((state) => state.addChannelMenu.isOpen);
  //

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      dispatch(closeChannelMenu());
    }
  }


  return (
    <div className={`${styles.sidebar} ${isMenuOpen ? styles.unScroll : ""}`}>
      <div className={styles.sidebar__Navbar}>
        <div className={styles.sidebar__info}>
          <h2>Web development</h2>
          {/* <h3>
            <FiberManualRecordIcon />
            Guest User
          </h3> */}
          <img
            src={CreateIcon}
            alt="Crete-workspace icon"
            className={styles.create_icon}
          />
        </div>
      </div>
      <div className={styles.sidebarOption}>
        <img src={ThreadsIcon} alt="threads" className={styles.icon} />
        <h3>threads</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img
          src={MentionIcon}
          alt="Mentions & reactions"
          className={styles.icon}
        />
        <h3>Mentions & reactions</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={SendIcon} alt="Drafts & sent" className={styles.icon} />
        <h3>Drafts & sent</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={CanvasIcon} alt="Canvases" className={styles.icon} />
        <h3>Canvases</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={ConnectIcon} alt="Link-UP connect" className={styles.icon} />
        <h3>Link-UP connect</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={FilesIcon} alt="Files" className={styles.icon} />
        <h3>Files</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={MoreIcon} alt="More" className={styles.icon} />
        <h3>More</h3>
      </div>

      <hr />
      <ChannelsList />
      <hr />

      <div className={styles.sidebarOption}>
        <img
          src={CaretDownIcon}
          alt="Direct messages"
          className={styles.icon}
        />
        <h3>Direct messages</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={UserIcon} alt="User" className={styles.icon} />
        <h3>User</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={UserIcon} alt="User" className={styles.icon} />
        <h3>User</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={PlusIcon} alt="Add coworkers" className={styles.icon} />
        <h3>Add coworkers</h3>
      </div>

      <hr />

      <div className={styles.sidebarOption}>
        <img src={CaretDownIcon} alt="Apps" className={styles.icon} />
        <h3>Apps</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={BotIcon} alt="Link-UPbot" className={styles.icon} />
        <h3>Link-UPbot</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={BotIcon} alt="Google drive" className={styles.icon} />
        <h3>Google drive</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={BotIcon} alt="Simple poll" className={styles.icon} />
        <h3>Simple poll</h3>
      </div>
      <div className={styles.sidebarOption}>
        <img src={PlusIcon} alt="Add apps" className={styles.icon} />
        <h3>Add apps</h3>
      </div>
      {isMenuOpen && (
        <div className={styles.overlay} onClick={handleClose}></div>
      )}
    </div>
  );
}

export default Sidebar;
