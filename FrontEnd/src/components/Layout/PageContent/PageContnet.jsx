import PropTypes from "prop-types";
import styles from "./PageContent.module.css";
import Panel from "../Panel/Panel";
import useResizableLayout from "../../../API/hooks/useResizableLayout";
import { useSelector } from "react-redux";

function PageContent({ children }) {
  const { isResizable } = useSelector((state) => state.resizableLayout);

  const { panelWidth, handleResizeStart } = useResizableLayout(
    300,
    250,
    isResizable
  );
  return (
    <div className={styles.page}>
      <div className={styles.page_content}>{children}</div>
      <Panel
        width={panelWidth}
        onResizeStart={handleResizeStart}
        isResizable={true}
      />
    </div>
  );
}

PageContent.propTypes = {
  children: PropTypes.any,
};

export default PageContent;
