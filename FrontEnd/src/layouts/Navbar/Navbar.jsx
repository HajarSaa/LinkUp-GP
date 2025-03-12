import styles from "./Navbar.module.css";
import ClockIcon from "../../assets/icons/clock.svg";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import SearchIcon from "../../assets/icons/search.svg";
import UserIcon from "../../assets/icons/user.svg";
function Navbar() {
  return (
    <div className={styles.Navbar}>
      <div className={styles.Navbar__left}>
        <img
          src={ArrowLeftIcon}
          alt="arrow-left"
          className={styles.icons_left}
        />
        <img
          src={ArrowRightIcon}
          alt="arrow-right"
          className={styles.icons_left}
        />
        <img src={ClockIcon} alt="clock-icon" className={styles.icons_left} />
      </div>
      <div className={styles.Navbar__search}>
        <input placeholder="Search here..." />
        <img src={SearchIcon} alt="search-icon" />
      </div>
      <div className={styles.Navbar__right}>
        <img
          src={UserIcon}
          alt="User Avatar"
          className={styles.Navbar__avatar}
        />
      </div>
    </div>
  );
}

export default Navbar;
