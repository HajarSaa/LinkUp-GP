import styles from './FullPageContent.module.css'
import PropTypes from 'prop-types';

function FullPageContent({children}) {
  return (
    <div className={styles.full_page_content}>
      {children}
    </div>
  );
}

FullPageContent.propTypes = {
  children:PropTypes.any,
}

export default FullPageContent;