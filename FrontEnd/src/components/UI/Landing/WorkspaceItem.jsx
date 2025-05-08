import styles from "./Landing.module.css";
import PropTypes from "prop-types";

function WorkspaceItem({ workspace }) {
  return (
    <div className={styles.workspaceItem_container}>
      <div className={styles.workspaceItem}>
        <div className={styles.workspaceItem_leftSide}>
          <div className={styles.workspaceImage}></div>
          <div className={styles.workspace_details}>
            <strong>{workspace.name}</strong>
            <br />
            <span>
              {workspace.members}{" "}
              {workspace.members === 1 ? "member" : "members"}
            </span>
          </div>
        </div>
        <div className={styles.arrow}>&rarr;</div>
      </div>
      <hr className={styles.divider} />
    </div>
  );
}

WorkspaceItem.propTypes = {
  workspace: PropTypes.object,
};

export default WorkspaceItem;
