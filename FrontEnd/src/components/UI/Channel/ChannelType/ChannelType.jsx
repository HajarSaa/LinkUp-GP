import PropTypes from 'prop-types'
import styles from './ChannelType.module.css'
import { FaHashtag, FaLock } from 'react-icons/fa6';

function ChannelType({type , className}) {
  return (
    <span className={`${className} ${styles.type_style}`}>
      {type === "public" ? <FaHashtag /> : <FaLock />}
    </span>
  );
}

ChannelType.propTypes = {
  type: PropTypes.string,
  className: PropTypes.any,
};

export default ChannelType