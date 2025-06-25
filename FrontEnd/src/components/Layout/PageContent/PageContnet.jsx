import PropTypes from "prop-types";
import styles from "./PageContent.module.css";
import { useSelector } from "react-redux";

function PageContent({ children }) {
  const {isRecording} = useSelector((state)=>state.recording)
  return (
    <div className={styles.page}>
      {isRecording && <div className={styles.record_overlay}></div>}
      {children}
    </div>
  );
}

PageContent.propTypes = {
  children: PropTypes.any,
};

export default PageContent;
