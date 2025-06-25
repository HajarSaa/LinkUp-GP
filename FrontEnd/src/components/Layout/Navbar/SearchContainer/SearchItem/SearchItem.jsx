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

function SearchItem({ search_item }) {
  const { workspace } = useSelector((state) => state.workspace);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const isChannel = search_item?.isChannel;
  const isMember = search_item?.conversationId;

  function handleChannelNavigate() {
    dispatch(closeSearch());
    navigateTo(`/channels/${search_item?.id}`);
  }
  function handleConversNavigate() {
    dispatch(closeSearch());
    navigateTo(`/conversations/${search_item?.conversationId}`);
  }
  function handleUserProfileNavigate() {
    dispatch(closeSearch());
    navigateTo(`/conversations/${search_item?.conversationId}`);
    dispatch(
      dispatch(
        openUserPanel({
          type: "userPanel",
          panel_id: search_item?.member._id,
          page_id: search_item?.conversationId,
        })
      )
    );
  }

  if (!search_item)
    return (
      <div className={`${styles.search_item} ${styles.contact_item}`}>
        <div className={styles.search_item_left_icon_ch}>
          <span className={styles.member_icon}>
            <MdManageSearch />
          </span>
        </div>
        <span>Find in {workspace.name} Workspace</span>
      </div>
    );

  if (isMember)
    return (
      <>
        <div
          className={`${styles.search_item} ${styles.contact_item}`}
          onClick={handleConversNavigate}
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
        <div
          className={`${styles.search_item} ${styles.contact_item}`}
          onClick={handleUserProfileNavigate}
        >
          <span className={styles.member_icon}>
            <PiArrowBendDownRight />
          </span>
          <span className={styles.member_icon}>
            <FcContacts />
          </span>
          <span>View profile</span>
        </div>
      </>
    );
  if (isChannel)
    return (
      <div
        className={`${styles.search_item} ${styles.contact_item}`}
        onClick={handleChannelNavigate}
      >
        <div className={styles.search_item_left_icon_ch}>
          {" "}
          <ChannelType type={search_item.type} />
        </div>
        <span>{search_item.name}</span>
      </div>
    );
}
SearchItem.propTypes = {
  search_item: PropTypes.any,
};

export default SearchItem;
