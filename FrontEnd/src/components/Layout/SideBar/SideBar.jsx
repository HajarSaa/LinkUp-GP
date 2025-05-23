import { useRef } from "react";
import Icon from "../../UI/Icons/Icon/Icon";
import styles from "./SideBar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import PropTypes from "prop-types";
import SidebarLists from "./SidebarLists";
import { useSelector } from "react-redux";
import useResize from "../../../API/hooks/useResize";

function SideBar() {
  const { workspace } = useSelector((state) => state.workspace);
  const initialWidth = parseInt(localStorage.getItem("sidebarWidth")) || 250;
  const sidebarRef = useRef(null);
  const { width, startResizing } = useResize(sidebarRef, initialWidth);

  if (!workspace)
    return (
      <div
        ref={sidebarRef}
        className={`${styles.side_bar} ${width ? styles.resizing : ""}`}
        style={{ width: `${width}px` }}
      ></div>
    );

  return (
    <div
      ref={sidebarRef}
      className={`${styles.side_bar} ${width ? styles.resizing : ""}`}
      style={{ width: `${width}px` }}
    >
      <div className={styles.side_bar_content}>
        <div className={styles.side_bar_header}>
          <div className={styles.side_bar_header_leftSide}>
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
  );
}

SideBar.propTypes = {
  width: PropTypes.any,
  onResizeStart: PropTypes.any,
  isResizable: PropTypes.any,
};

export default SideBar;
