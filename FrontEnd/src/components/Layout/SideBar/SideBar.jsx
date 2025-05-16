import Icon from "../../UI/Icons/Icon/Icon";
import Resizer from "../Resizer/Resizer";
import styles from "./SideBar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
// import List from "./List/List";
// import ChannelList from "./ChannelList/ChannelList";
import PropTypes from "prop-types";
// import DmsList from "./DmsList/DmsList";
// import { useDispatch } from "react-redux";
// import { openAddButtonModal } from "../../../API/redux_toolkit/modals/addButtonModal";
import SidebarLists from "./SidebarLists";
import { useSelector } from "react-redux";

function SideBar() {
  const { workspace } = useSelector((state) => state.workspace);

  if (!workspace)
    return <div className={styles.side_bar}></div>;
  return (
    <div className={styles.side_bar}>
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
      <Resizer position={{ right: 0 }} />
    </div>
  );
}

SideBar.propTypes = {
  width: PropTypes.any,
  onResizeStart: PropTypes.any,
  isResizable: PropTypes.any,
};

export default SideBar;
