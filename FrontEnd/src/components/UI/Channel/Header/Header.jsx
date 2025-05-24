import { useDispatch, useSelector } from "react-redux";
import { openChannelDetails } from "../../../../API/redux_toolkit/modals/channelDetailsSlice";
import styles from "./Header.module.css";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { TbMessageCircleFilled } from "react-icons/tb";
import PropTypes from "prop-types";
import ChannelOptionModal from "../../../UI/Modal/ChannelModals/ChannelOptionsModal/ChannelOptionModal";
import { openMenu } from "../../../../API/redux_toolkit/chat/channel/channelMenuSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import ChannelDetailsModal from "../../Modal/ChannelModals/ChannelDetailsModal/ChannelDetailsModal";
import NotificationsModal from "../../Modal/ChannelModals/NotifiactionModal/NotificationsModal";
import ChannelType from "../ChannelType/ChannelType";
import { BiSolidUser } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { MdHeadset } from "react-icons/md";

function Header() {
  const dispatch = useDispatch();
  const {channel} = useSelector((state) => state.channel);

  if (!channel) return;
  return (
    <>
      <div className={styles.channelHeader}>
        <div className="justify-content-between w-100 topPart">
          <div
            className={styles.channel_name}
            onClick={() =>
              dispatch(openChannelDetails({ channel, tab: "about" }))
            }
          >
            <ChannelType type={channel.type} />
            <span>{channel.name}</span>
          </div>
          <div className={styles.rightSide}>
            <div
              className={styles.membersContainer}
              onClick={() =>
                dispatch(openChannelDetails({ channel, tab: "members" }))
              }
            >
              <div className={styles.avatars}>
                {channel.members.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className={styles.avatar}
                    style={{ zIndex: `${100 - index}` }}
                  >
                    {/* <img src={member.avatar} alt={member.name} /> */}
                    <div className={styles.avatar_icon}>
                      <BiSolidUser />
                    </div>
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
              <ChannelOptionModal channel={channel} />
            </div>
          </div>
        </div>
        <div className={`w-100 align-items-center ${styles.bottomPart}`}>
          <div className={`${styles.tab} ${styles.activeTab}`}>
            <span className="align-items-center rotateY-180">
              <TbMessageCircleFilled />
            </span>
            <span>Messages</span>
          </div>
          <div className={styles.tab}>
            <span className="align-items-center">
              <RiStickyNoteAddLine />
            </span>
            <span>Add canvas</span>
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

Header.propTypes = {
  channel: PropTypes.object,
  user: PropTypes.object,
  actionFun: PropTypes.func,
};

export default Header;
