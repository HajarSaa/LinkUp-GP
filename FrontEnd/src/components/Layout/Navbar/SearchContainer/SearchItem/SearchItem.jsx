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

function SearchItem({
  search_item,
  isActive = false,
  isViewProfile = false,
  noResultText,
}) {
  const { workspace } = useSelector((state) => state.workspace);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const itemClass = `${styles.search_item} ${styles.contact_item} ${
    isActive ? styles.active : ""
  }`;

  if (noResultText) {
    return (
      <div className={itemClass}>
        <div className={styles.search_item_left_icon_ch}>
          <span className={styles.member_icon}>
            <MdManageSearch />
          </span>
        </div>
        <span>
          No results for &quot;<strong>{noResultText}</strong>&quot;
        </span>
      </div>
    );
  }

  if (!search_item)
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

  if (search_item.conversationId) {
    if (isViewProfile) {
      return (
        <div
          className={itemClass}
          onClick={() => {
            dispatch(closeSearch());
            navigateTo(`/conversations/${search_item.conversationId}`);
            dispatch(
              openUserPanel({
                type: "userPanel",
                panel_id: search_item.member._id,
                page_id: search_item.conversationId,
              })
            );
          }}
        >
          <span className={styles.member_icon}>
            <PiArrowBendDownRight />
          </span>
          <span className={styles.member_icon}>
            <FcContacts />
          </span>
          <span>View profile</span>
        </div>
      );
    } else {
      return (
        <div
          className={itemClass}
          onClick={() => {
            dispatch(closeSearch());
            navigateTo(`/conversations/${search_item.conversationId}`);
          }}
        >
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
            {search_item.member.about && (
              <span>{search_item.member.about}</span>
            )}
          </div>
        </div>
      );
    }
  }

  if (search_item.isChannel) {
    return (
      <div
        className={itemClass}
        onClick={() => {
          dispatch(closeSearch());
          navigateTo(`/channels/${search_item.id}`);
        }}
      >
        <div className={styles.search_item_left_icon_ch}>
          <ChannelType type={search_item.type} />
        </div>
        <span>{search_item.name}</span>
      </div>
    );
  }
}

SearchItem.propTypes = {
  search_item: PropTypes.any,
  isActive: PropTypes.bool,
  isViewProfile: PropTypes.bool,
  noResultText: PropTypes.string,
};

export default SearchItem;
