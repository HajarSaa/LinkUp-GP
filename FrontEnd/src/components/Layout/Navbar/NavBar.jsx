import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import styles from "./NavBar.module.css";
import { LuClock3 } from "react-icons/lu";
import { FiHelpCircle } from "react-icons/fi";

import { IoIosSearch } from "react-icons/io";
import Icon from "../../UI/Icons/Icon/Icon";
import { useSelector } from "react-redux";

function NavBar() {
  const { workspace } = useSelector((state) => state.workspace);
  if (!workspace) return <div className={styles.nav_bar}></div>;
  return (
    <div className={styles.nav_bar}>
      <div className={styles.nav_bar_left_empty}></div>
      <div className={styles.nav_bar_container}>
        <div className={styles.nav_bar_left_side}>
          <Icon>
            <FaArrowLeft />
          </Icon>
          <Icon>
            <FaArrowRight />
          </Icon>
          <Icon>
            <LuClock3 />
          </Icon>
        </div>
        <div className={styles.nav_bar_search}>
          <span className={styles.nav_bar_search_text}>Search</span>
          <span>
            <IoIosSearch />
          </span>
        </div>
      </div>
      <div className={styles.nav_bar_right}>
        <Icon>
          <FiHelpCircle />
        </Icon>
      </div>
    </div>
  );
}

export default NavBar;
