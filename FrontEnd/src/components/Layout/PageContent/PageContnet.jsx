import PropTypes from "prop-types";
import styles from "./PageContent.module.css";
import Panel from "../Panel/Panel";

function PageContent({ children }) {
  return (
    <div className={styles.page}>
      <div className={styles.page_content}>{children}</div>
      <Panel  />
    </div>
  );
}

PageContent.propTypes = {
  children: PropTypes.any,
};

export default PageContent;
