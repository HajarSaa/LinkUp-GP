import { FaArrowRight } from "react-icons/fa6";
import styles from "./WorkspaceItems.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getWorkLabel } from "../../../../utils/workspaceUtils";
import { clearWorkspace } from "../../../../API/redux_toolkit/api_data/workspaceSlice";
import UserImage from "../../User/UserImage";
import { closeWorkspaceItemsModal } from "../../../../API/redux_toolkit/modals/workspace/workspacesItems";

function WorkspaceItem({ workspace }) {
  const work_title = getWorkLabel(workspace?.name || "workspace name");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (work_id) => {
    if (localStorage.getItem("selectedWorkspaceId"))
      localStorage.removeItem("selectedWorkspaceId");
    dispatch(clearWorkspace());

    if (localStorage.getItem("logged_user_data"))
      localStorage.removeItem("logged_user_data");

    localStorage.setItem("selectedWorkspaceId", work_id);


      navigate(`/`);
      dispatch(closeWorkspaceItemsModal());
  };

  return (
    <div
      className={styles.workspaceItem}
      onClick={() => {
        handleClick(workspace.id);
      }}
    >
      <div className={styles.workspaceItem_leftSide}>
        <div className={styles.workspaceImage}>
          {workspace?.image ? (
            <img src={workspace?.image.src} />
          ) : (
            <span>{work_title}</span>
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
                  <UserImage src={member?.photo} alt="" />
                </span>
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
  userData: PropTypes.object,
};

export default WorkspaceItem;
