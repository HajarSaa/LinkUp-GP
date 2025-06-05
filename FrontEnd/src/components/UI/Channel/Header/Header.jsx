import { useDispatch, useSelector} from "react-redux";
import { openChannelDetails } from "../../../../API/redux_toolkit/modals/channelDetailsSlice";
import styles from "./Header.module.css";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import {TbMessageFilled } from "react-icons/tb";
import ChannelOptionModal from "../../../UI/Modal/ChannelModals/ChannelOptionsModal/ChannelOptionModal";
import { openMenu } from "../../../../API/redux_toolkit/chat/channel/channelMenuSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import ChannelDetailsModal from "../../Modal/ChannelModals/ChannelDetailsModal/ChannelDetailsModal";
import NotificationsModal from "../../Modal/ChannelModals/NotifiactionModal/NotificationsModal";
import ChannelType from "../ChannelType/ChannelType";
import { FiChevronDown } from "react-icons/fi";
import { MdHeadset } from "react-icons/md";
import { getMembersData } from "../../../../utils/workspaceUtils";
import UserImage from "../../User/UserImage";

function Header() {
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state.workspace)
  const channel = useSelector((state) => state.channel.channel);
  const members = getMembersData(channel, workspace);
  if (!channel) return;
  return (
    <>
      <div className={styles.channelHeader}>
        <div className="justify-content-between w-100 topPart">
          <div
            className={styles.channel_name}
            onClick={() =>
              dispatch(openChannelDetails({tab: "about" }))
            }
          >
            <ChannelType type={channel.type} />
            <span>{channel.name}</span>
          </div>
          <div className={styles.rightSide}>
            <div
              className={styles.membersContainer}
              onClick={() =>
                dispatch(openChannelDetails({tab: "members" }))
              }
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
          </div>
        </div>
        <div className={`w-100 align-items-center ${styles.bottomPart}`}>
          <div className={`${styles.tab} ${styles.activeTab}`}>
            <span className="align-items-center">
              <TbMessageFilled />
            </span>
            <span className={styles.tab_text}>Messages</span>
          </div>
          <div className={styles.tab}>
            <span className="align-items-center">
              <RiStickyNoteAddLine />
            </span>
            <span className={styles.tab_text}>Add canvas</span>
          </div>
          <span className={styles.plus}>
            <AiOutlinePlus />
          </span>
        </div>
      </div>
      <NotificationsModal />
      <ChannelDetailsModal />
    </>
  );
}


export default Header;
