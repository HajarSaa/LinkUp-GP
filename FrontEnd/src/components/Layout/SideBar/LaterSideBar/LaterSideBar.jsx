import { useSelector } from "react-redux";
import Icon from "../../../UI/Icons/Icon/Icon";
import styles from "./../SideBar.module.css";
import laterStyle from "./LaterSideBar.module.css";
import { MdAdd, MdOutlineFilterList } from "react-icons/md";

function LaterSideBar() {
  const { workspace } = useSelector((state) => state.workspace);

  if (!workspace) return <div className={`${laterStyle.later_side_bar}`}></div>;

  return (
    <>
      <div className={`${laterStyle.later_side_bar} `}>
        <div className={styles.side_bar_content}>
          <div className={styles.side_bar_header}>
            <div className={styles.side_bar_header_leftSide}>
              <span className={styles.work_name}>Later</span>
            </div>
            <div className={laterStyle.right_icons}>
              <Icon className={styles.side_bar_header_icon}>
                <MdOutlineFilterList />
              </Icon>
              <Icon className={styles.side_bar_header_icon}>
                <MdAdd />
              </Icon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LaterSideBar;
