import { PiArrowBendDownRight } from "react-icons/pi";
import styles from "./SearchItem.module.css";
import { FcContacts } from "react-icons/fc";
import PropTypes from "prop-types";
import ChannelType from "../../../../UI/Channel/ChannelType/ChannelType";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openUserPanel } from "../../../../../API/redux_toolkit/ui/chatPanelSlice";
import UserStatus from "../../../../UI/User/UserStatus";
import UserImage from "../../../../UI/User/UserImage";
import { MdManageSearch } from "react-icons/md";
import { closeSearch } from "../../../../../API/redux_toolkit/ui/searchSlice";
import { CiSearch } from "react-icons/ci";

function SearchItem({
  search_item,
  isActive = false,
  isViewProfile = false,
  noResultText = "",
}) {
  const { workspace } = useSelector((state) => state.workspace);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const itemClass = `${styles.search_item} ${styles.contact_item} ${
    isActive ? styles.active : ""
  }`;

  if (!search_item && noResultText) {
    const itemClass = `${styles.search_item} ${styles.contact_item} ${
      isActive ? styles.active : ""
    }`;
    return (
      <div
        className={itemClass}
        onClick={() => {
          dispatch(closeSearch());
          navigateTo(`/search?${noResultText}`);
          // ممكن تضيف هنا أكشن زي: createChannel(noResultText) لو حبيت
        }}
      >
        <div className={styles.search_item_left_icon_ch}>
          <span className={styles.member_icon}>
            <CiSearch />
          </span>
        </div>
        <span>
          <strong>{noResultText}</strong>
        </span>
      </div>
    );
  }


  if (!search_item) {
    return (
      <div className={styles.search_item}>
        <div className={styles.search_item_left_icon_ch}>
          <span className={styles.member_icon}>
            <MdManageSearch />
          </span>
        </div>
        <span>Search in {workspace.name} Workspace</span>
      </div>
    );
  }

  const isChannel = search_item?.isChannel;
  const isMember = search_item?.conversationId;

  const handleChannelNavigate = () => {
    dispatch(closeSearch());
    navigateTo(`/channels/${search_item?.id}`);
  };

  const handleConversNavigate = () => {
    dispatch(closeSearch());
    navigateTo(`/conversations/${search_item?.conversationId}`);
  };

  const handleUserProfileNavigate = () => {
    dispatch(closeSearch());
    navigateTo(`/conversations/${search_item?.conversationId}`);
    dispatch(
      openUserPanel({
        type: "userPanel",
        panel_id: search_item?.member._id,
        page_id: search_item?.conversationId,
      })
    );
  };

  if (isMember) {
    return isViewProfile ? (
      <div className={itemClass} onClick={handleUserProfileNavigate}>
        <span className={styles.member_icon}>
          <PiArrowBendDownRight />
        </span>
        <span className={styles.member_icon}>
          <FcContacts />
        </span>
        <span>View profile</span>
      </div>
    ) : (
      <div className={itemClass} onClick={handleConversNavigate}>
        <div className={styles.search_item_left_icon}>
          <UserImage
            src={search_item.member.photo}
            alt={search_item.member.userName}
          />
        </div>
        <div className={styles.user_data}>
          <span>
            {search_item.member.userName}
            {search_item.isMe && " ( You )"}
          </span>
          <UserStatus userId={search_item.member._id} />
          {search_item.member.about && <span>{search_item.member.about}</span>}
        </div>
      </div>
    );
  }

  if (isChannel) {
    return (
      <div className={itemClass} onClick={handleChannelNavigate}>
        <div className={styles.search_item_left_icon_ch}>
          <ChannelType type={search_item.type} />
        </div>
        <span>{search_item.name}</span>
      </div>
    );
  }

  return null;
}

SearchItem.propTypes = {
  search_item: PropTypes.any,
  isActive: PropTypes.bool,
  isViewProfile: PropTypes.bool,
  noResultText: PropTypes.string,
};

export default SearchItem;
