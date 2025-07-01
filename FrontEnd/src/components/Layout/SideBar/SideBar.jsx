import { useRef } from "react";
import Icon from "../../UI/Icons/Icon/Icon";
import styles from "./SideBar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import PropTypes from "prop-types";
import SidebarLists from "./SidebarLists";
import { useDispatch, useSelector } from "react-redux";
import useResize from "../../../API/hooks/workspace/useResize";
import { openWorkspaceMenu } from "../../../API/redux_toolkit/modals/workspace/workspaceMenu";
import WorkspaceMenu from "../../UI/Modal/WorkspaceMenu/WorkspaceMenu";
import RenameWorkModal from "../../UI/Modal/RenameWorkModal/RenameWorkModal";
import DeleteConfirmModal from "../../UI/Modal/DeleteConfirmModal/DeleteConfirmModal";
import LaterSideBar from "./LaterSideBar/LaterSideBar";
import NotificationSidebarContainer from "./NotificationSidebar/NotificationSidebarContainer";

function SideBar() {
  const { workspace } = useSelector((state) => state.workspace);
  const dispatch = useDispatch();
  const isLater = location.pathname.startsWith("/later");
  const isNotifications = location.pathname.startsWith("/notifications");
  // Custom hook for resizing the sidebar
  // It returns the current width and a function to start resizing
  const sidebarRef = useRef(null);
  const initialWidth = parseInt(localStorage.getItem("sidebarWidth")) || 250;
  const { width, startResizing } = useResize(sidebarRef, initialWidth);

  function openWorkMenu(e) {
    e.stopPropagation();

    dispatch(openWorkspaceMenu(workspace));
  }

  if (isLater) return <LaterSideBar />;
  if (isNotifications) return <NotificationSidebarContainer />;


  if (!workspace)
    return (
      <div
        ref={sidebarRef}
        className={`${styles.side_bar} ${width ? styles.resizing : ""}`}
        style={{ width: `${width}px` }}
      ></div>
    );

    return (
      <>
        <div
          ref={sidebarRef}
          className={`${styles.side_bar} ${width ? styles.resizing : ""}`}
          style={{ width: `${width}px` }}
        >
          <div className={styles.side_bar_content}>
            <div className={styles.side_bar_header}>
              <div
                className={styles.side_bar_header_leftSide}
                onClick={openWorkMenu}
              >
                <span className={styles.work_name}>{workspace.name}</span>
                <span className={styles.side_bar_header_leftSide_icon}>
                  <IoIosArrowDown />
                </span>
              </div>
              <Icon className={styles.side_bar_header_icon}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Icon>
            </div>
            <SidebarLists />
          </div>
          <span className={styles.resizer} onMouseDown={startResizing} />
        </div>
        <WorkspaceMenu />
        {/* sub modal */}
        <RenameWorkModal />
        <DeleteConfirmModal />
      </>
    );
}

SideBar.propTypes = {
  width: PropTypes.any,
  onResizeStart: PropTypes.any,
  isResizable: PropTypes.any,
};

export default SideBar;
