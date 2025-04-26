import { useDispatch } from "react-redux";
import { openChannelDetails } from "../../../../API/redux_toolkit/modals/channelDetailsSlice";
import styles from "./Header.module.css";
import { MdHeadset } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { FaHashtag } from "react-icons/fa";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { TbMessageCircleFilled } from "react-icons/tb";
import PropTypes from "prop-types";
import ChannelOptionModal from "../../../UI/Modal/channel/ChannelOptionsModal/ChannelOptionModal";
import HuddleModal from "../../../UI/Modal/channel/HuddleModal/HuddleModal";
import { openMenu } from "../../../../API/redux_toolkit/chat/channel/channelMenuSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { openHuddleModal } from "../../../../API/redux_toolkit/modals/huddleSlice";
import SmallAvatar from '../../Avatar/SmallAvatar/SmallAvatar';

function Header({ channel, user }) {
  const dispatch = useDispatch();
  const membersArray =
    channel.members.length > 6 ? channel.members.slice(0, 5) : channel.members;
  return (
    <div className={styles.channelHeader}>
      <div className="justify-content-between w-100 topPart">
        {channel && (
          <div
            className={styles.channelInfo}
            onClick={() =>
              dispatch(openChannelDetails({ channel, tab: "about" }))
            }
          >
            <span className="align-items-center">
              <FaHashtag />
            </span>
            <span>{channel.name}</span>
          </div>
        )}
        {user && (
          <div
            className={styles.userInfo}
            // onClick={() =>
            //   // dispatch(openUserDetails({ user, tab: "about" }))
            // }
          >
            <h2 className={styles.userName}>
              <span>{user.img}</span>
              <span>{user.name}</span>
            </h2>
          </div>
        )}
        <div className={styles.rightSide}>
          {channel && (
            <>
              <div
                className={styles.membersContainer}
                onClick={() =>
                  dispatch(openChannelDetails({ channel, tab: "members" }))
                }
              >
                <div className={styles.avatars}>
                  {membersArray.map((member, index) => (
                    <SmallAvatar key={index} avatrData={member} index={index} />
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
                  <span
                    className="iconsPadding align-items-center"
                    onClick={() => dispatch(openHuddleModal())}
                  >
                    <FiChevronDown className={styles.arrow} />
                  </span>
                </div>
                <HuddleModal />
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
            </>
          )}
          {user && <ChannelOptionModal user={user} />}
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
  );
}

Header.propTypes = {
  channel: PropTypes.object,
  user: PropTypes.object,
  actionFun: PropTypes.func,
};

export default Header;
