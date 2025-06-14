import { useState, useEffect, useRef } from "react";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineMessage,
  AiFillMessage,
  AiOutlineBell,
  AiFillBell,
  AiOutlineClockCircle,
  AiFillClockCircle,
} from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import UserMenu from "./UserMenu/UserMenu";
import styles from "./Workbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  findMemberByUserId,
  getWorkLabel,
} from "../../../utils/workspaceUtils";
import UserImage from "../../UI/User/UserImage";
import { useNavigate } from "react-router-dom";
import {
  closeUserMenuModal,
  openUserMenuModal,
} from "../../../API/redux_toolkit/modals/userProfile/userMenuSlice";
import UserStatus from "../../UI/User/UserStatus";

function WorkBar() {
  const menuRef = useRef(null);
  const navigateTo = useNavigate();
  const { workspace } = useSelector((state) => state.workspace);
  const [activeIndex, setActiveIndex] = useState(null);
  const work_label = getWorkLabel(workspace?.name || "workspace name");
  const loggin_user = findMemberByUserId(workspace);
  const main_channel = workspace?.channels[0];
  const dispatch = useDispatch();

  const sidebarItems = [
    {
      label: "Home",
      iconOutline: <AiOutlineHome />,
      iconFill: <AiFillHome />,
      navigation: main_channel?.id ? `/channels/${main_channel?.id}` : "/",
    },
    {
      label: "DMs",
      iconOutline: <AiOutlineMessage />,
      iconFill: <AiFillMessage />,
    },
    {
      label: "Activity",
      iconOutline: <AiOutlineBell />,
      iconFill: <AiFillBell />,
    },
    {
      label: "Later",
      iconOutline: <AiOutlineClockCircle />,
      iconFill: <AiFillClockCircle />,
    },
    {
      label: "More",
      iconOutline: <IoIosMore />,
      iconFill: <IoIosMore />,
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(closeUserMenuModal());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  function handleClick(index, navigation) {
    setActiveIndex(index);
    if (navigation) navigateTo(navigation);
  }

  if (!workspace) return <div className={styles.work_bar}></div>;

  return (
    <div className={styles.work_bar}>
      <div className={styles.work_label}>{work_label}</div>
      {sidebarItems.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            className={`${styles.iconWrapper} ${isActive ? styles.active : ""}`}
            onClick={() => {
              handleClick(index, item.navigation);
            }}
          >
            <div className={styles.icon}>
              {isActive ? item.iconFill : item.iconOutline}
            </div>
            <span className={styles.label}>{item.label}</span>
          </div>
        );
      })}

      <div className={styles.bottomSection}>
        <div className={styles.iconButton}>
          <FaPlus />
        </div>
        <div className={styles.profileWrapper} ref={menuRef}>
          <div
            className={styles.profilePhotoPlaceholder}
            onClick={() => dispatch(openUserMenuModal())}
          >
            <UserImage src={loggin_user.photo} alt={loggin_user.userName} />
          </div>
          <span className={styles.statusDot}>
            <UserStatus status={loggin_user.status} />
          </span>
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

export default WorkBar;
