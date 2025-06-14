import styles from './User.module.css'
import UserStatus from './UserStatus';
import PropTypes from 'prop-types';

function UserStatusDot({ status }) {
  return (
    <span className={styles.statusDot}>
      <UserStatus status={status} />
    </span>
  );
}
UserStatusDot.propTypes = {
  status: PropTypes.any.isRequired,
};

export default UserStatusDot