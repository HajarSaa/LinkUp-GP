/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { openChannelDetails } from "../../../../API/redux/chat/channel/channelDetailsSlice";
import styles from "./Header.module.css";
import ChannelMenu from "./channelMenu/ChannelMenu";
import { MdHeadset } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

function Header({ channel }) {
  const dispatch = useDispatch();
  const membersArray = channel.members.length > 6 ? channel.members.slice(0, 5) : channel.members
  return (
    <div className={styles.channelHeader}>
      <div className={styles.channelInfo}
        onClick={() => dispatch(openChannelDetails({ channel, tab: "about" }))}
      >
        <h2 className={styles.channelName}># {channel.name}</h2>
        <p className={styles.channelDescription}>{channel.description}</p>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.membersContainer}
          onClick={() => dispatch(openChannelDetails({ channel, tab: "members" }))}>
          <div className={styles.avatars}>
            {membersArray.map((member, index) => (
              <div key={index}
                className={styles.avatar}
                style={{ zIndex: `${100 - index}` }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className={styles.avatarImg}
                />
              </div>

            ))}
          </div>
          <span className={styles.memberCount}>
            {channel.members.length.toLocaleString()}
          </span>
        </div>
        <div className={styles.huddleButton}>
          <MdHeadset className={styles.icon} />
          <FiChevronDown className={styles.arrow} />
        </div>
        <ChannelMenu channel={channel} />
      </div>
    </div>
  );
}

export default Header;
