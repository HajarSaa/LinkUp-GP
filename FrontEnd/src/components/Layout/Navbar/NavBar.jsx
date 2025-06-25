import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import styles from "./NavBar.module.css";
import { LuClock3 } from "react-icons/lu";
import { FiHelpCircle } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import Icon from "../../UI/Icons/Icon/Icon";
import { useSelector, useDispatch } from "react-redux";
import { openSearch } from "../../../API/redux_toolkit/ui/searchSlice";
import { useRef } from "react";
import SearchContainer from "./SearchContainer/SearchContainer";
// Removed invalid top-level useSelector hook call

function NavBar() {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const { workspace } = useSelector((state) => state.workspace);
  const { isSearchOpen } = useSelector((state) => state.search);

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

        <div
          ref={searchRef}
          className={styles.nav_bar_search}
          onClick={() => dispatch(openSearch())}
        >
          <span className={styles.nav_bar_search_text}>
            Search in {workspace.name}
          </span>
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

      {isSearchOpen && (
        <SearchContainer workspace={workspace} targetRef={searchRef} />
      )}
    </div>
  );
}

export default NavBar;
