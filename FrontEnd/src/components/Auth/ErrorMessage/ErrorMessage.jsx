import styles from './ErrorMessage.module.css'
import PropTypes from 'prop-types'

function ErrorMessage({message}) {
  return <p className={styles.error_message}>{message}</p>;
}

ErrorMessage.propTypes = {
  message: PropTypes.any,
};

export default ErrorMessage