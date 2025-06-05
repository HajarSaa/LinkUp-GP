import styles from './User.module.css'
import PropTypes from 'prop-types';

function UserImage({ src, alt }) {
  return (
    <img className={styles.user_img} src={src} alt={alt} loading='lazy' />
  );
}

export default UserImage
UserImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};