import PropTypes from "prop-types";
import styles from "./PageContent.module.css";


function PageContent({children}) {
  return (
    <div className={styles.page_content}>
      {children}
    </div>
  );
}

PageContent.propTypes = {
  children:PropTypes.any,
}

export default PageContent;
