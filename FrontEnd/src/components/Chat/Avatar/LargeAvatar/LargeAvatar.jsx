import { useDispatch } from 'react-redux';
import { openProfilePanel } from '../../../../API/redux/chat/channel/profilePanelSlice';
import styles from './LargeAvatar.module.css'
import PropTypes from 'prop-types';
function LargeAvatar({ userObject }) {
  const dispatch = useDispatch()
  return (
    <div className={styles.avatar}>
      <img
        src={userObject.avatar}
        alt={userObject.name}
        title={userObject.name}
        onClick={() => dispatch(openProfilePanel(userObject))}
      />
    </div>
  );
}
LargeAvatar.propTypes = {
  userObject : PropTypes.obj,
};

export default LargeAvatar