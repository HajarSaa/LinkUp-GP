import { useSelector } from "react-redux";
import styles from "./TypingIndicator.module.css";
import PropTypes from "prop-types";
import { selectTypingUsersByRoom } from "../../../API/redux_toolkit/selectore/typingSelectors";


const TypingIndicator = ({ roomId }) => {
  const typingUsers = useSelector(selectTypingUsersByRoom(roomId));
  // const typingUsers = useSelector(
  //   (state) => state.typing.typingUsers[roomId] || []
  // );

  const members = useSelector(
    (state) => state.workspace.workspace?.members || []
  );

  if (typingUsers.length === 0) return null;

  return (
    <div className={styles.container}>
      {typingUsers.map((id) => {
        const user = members.find((m) => m._id === id);
        if (!user) return null;

        return (
          <div key={id} className={styles.typingItem}>
            <img
              src={user.photo}
              alt={user.name}
              className={styles.avatar}
            />
            <span className={styles.text}>
              <strong>{user.userName}</strong> is typing
              <span className={styles.dots}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

TypingIndicator.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default TypingIndicator;
