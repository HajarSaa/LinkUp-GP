import styles from "./ChatMessage.module.css";
import { GoChevronRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { openThreadPanel } from "../../../API/redux_toolkit/ui/chatPanelSlice";
import PropTypes from "prop-types";
import UserImage from "../../UI/User/UserImage";
import { findMemberById } from "../../../utils/workspaceUtils";

function MessageThreads({ threadData }) {
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state.workspace);
  const usersImage = threadData.participants
    .slice(-3)
    .map((member_id) => {
      const member_data = findMemberById(workspace, member_id);
      return member_data.photo;
    });

  function openThreads() {
    console.log(threadData);
    dispatch(openThreadPanel());
  }

  return (
    <div className={styles.threadWrapper} onClick={openThreads}>
      <div className={styles.thread}>
        <div className={styles.thread_users}>
          {usersImage.map((userImage, index) => (
            <div key={index} className={styles.thread_user}>
              <UserImage src={userImage} alt="thread_member" />
            </div>
          ))}
        </div>
        <div className={styles.thread_rightSide}>
          <div>
            <span className={styles.thread_counts}>{`${
              threadData.count
            } replie${threadData.count === 1 ? "" : "s"}`}</span>
            {/* <span className={styles.thread_time}>Today at 19:40</span> */}
            <span className={styles.viewThread}>View thread</span>
          </div>
          <span className={styles.thread_icon}>
            <GoChevronRight />
          </span>
        </div>
      </div>
    </div>
  );
}
MessageThreads.propTypes = {
  threadData: PropTypes.object,
};

export default MessageThreads;
