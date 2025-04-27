import styles from "./BrowseChannels.module.css";
import { FaLock, FaHashtag, FaChevronDown, FaCheck } from "react-icons/fa";

import mockChannels from "../../../API/services/mockChannels";
import { BsDot } from "react-icons/bs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openCreateChannel } from "../../../API/redux_toolkit/modals/createChannelmodalSlice";
import SearchInput from "../../../components/UI/InputField/SearchInput/SearchInput";
import ContentPage from "../ContentPage/ContentPage";
// import { useState } from "react";

const BrowseChannels = () => {
  const isJoin = true;
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  return (
    <ContentPage>
      <div className={styles.container}>
        <div className={`${styles.browesHeader} justify-content-between`}>
          <h2>All channels</h2>
          <button
            className={styles.createBtn}
            onClick={() => dispatch(openCreateChannel())}
          >
            Create Channel
          </button>
        </div>

        <SearchInput />

        <div className={styles.filters}>
          <div>
            <span>All channels</span>{" "}
            <span className={`${styles.filterIcon} align-items-center`}>
              <FaChevronDown />
            </span>
          </div>
          <div>
            <span>Any channel type</span>{" "}
            <span className={`${styles.filterIcon} align-items-center`}>
              <FaChevronDown />
            </span>
          </div>
          <div>
            <span>Workspaces</span>{" "}
            <span className={`${styles.filterIcon} align-items-center`}>
              <FaChevronDown />
            </span>
          </div>
          <div>
            <span>Organisations</span>{" "}
            <span className={`${styles.filterIcon} align-items-center`}>
              <FaChevronDown />
            </span>
          </div>
          <div>
            <span>A to Z</span>{" "}
            <span className={`${styles.filterIcon} align-items-center`}>
              <FaChevronDown />
            </span>
          </div>
        </div>

        <div className={styles.channelContainer}>
          {mockChannels.map((channel) => (
            <div key={channel.id} className={styles.channelItem}>
              <div className={styles.header}>
                <div className={styles.headerText}>
                  <div className={styles.channelName}>
                    {channel.isPrivate ? <FaLock /> : <FaHashtag />}{" "}
                    {channel.name}
                  </div>
                  <span className={styles.viewChannel}>View Channel</span>
                </div>
                <div className={styles.buttonGroups}>
                  <button>Open in Home</button>
                  <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {isHovered ? "Leave" : "Joined"}
                  </button>
                </div>
              </div>
              <div className={styles.channelInfo}>
                <div
                  className={`${styles.status} ${
                    isJoin ? styles.joined : styles.leaved
                  }`}
                >
                  <FaCheck className={styles.joinedIcon} />
                  <span>Joined</span>
                  <BsDot />
                </div>
                <span className="align-items-center">
                  {channel.members.length} member
                  {channel.members.length > 1 ? "s" : ""}
                </span>
                {channel.description && (
                  <p className="align-items-center">
                    <BsDot />
                    {channel.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentPage>
  );
};

export default BrowseChannels;
