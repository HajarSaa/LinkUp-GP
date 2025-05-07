import { getWorkBackground } from "../../../utils/getWorkBackground";
import { getRandomColorFromPalette } from "../../../utils/randomColor";
import { BiSolidUser } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./Landing.module.css";
import PropTypes from "prop-types";

function WorkspaceItem({ workspace }) {
  const work_title = getWorkBackground(workspace?.name || "workspace name");
  const work_background = getRandomColorFromPalette();

  return (
    <div className={styles.workspaceItem}>
      <div className={styles.workspaceItem_leftSide}>
        <div className={styles.workspaceImage}>
          {workspace?.image ? (
            <img src={workspace?.image.src} />
          ) : (
            <span style={{ backgroundColor: work_background }}>
              {work_title}
            </span>
          )}
        </div>
        <div className={styles.workspace_details}>
          <div className={styles.workspace_details_name}>
            <strong>{workspace.name}</strong>
          </div>
          <div className={styles.workspace_details_members}>
            <div className={styles.workspace_details_members_imgs}>
              {workspace.members.slice(0, 5).map((member, index) => (
                <span key={index} className={styles.member_image}>
                  <BiSolidUser className={styles.member_image_avatar} />
                </span>
                // <img
                //   key={index}
                //   src={member.image}
                //   alt={member.name}
                //   className={styles.member_image}
                // />
              ))}
            </div>

            <span>
              {workspace.members.length}{" "}
              {workspace.members.length === 1 ? "member" : "members"}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.workspaceItem_rightSide}>
        <span>Open</span>
        <span>
          <FaArrowRight />
        </span>
      </div>
    </div>
  );
}

WorkspaceItem.propTypes = {
  workspace: PropTypes.object,
};

export default WorkspaceItem;
