import styles from './User.module.css'
import UserStatus from './UserStatus';
import PropTypes from 'prop-types';

function UserStatusDot({ userId }) {
  return (
    <span className={styles.statusDot}>
      <UserStatus userId={userId} />
    </span>
  );
}
UserStatusDot.propTypes = {
  userId: PropTypes.any.isRequired,
};

export default UserStatusDot