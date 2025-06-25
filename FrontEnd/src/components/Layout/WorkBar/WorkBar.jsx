import { useState, useEffect, useRef } from "react";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineMessage,
  AiFillMessage,
  AiOutlineBell,
  AiFillBell,
} from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { GoBookmarkFill } from "react-icons/go";
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
import UserStatusDot from "../../UI/User/UserStatusDot";

function WorkBar() {
  const menuRef = useRef(null);
  const navigateTo = useNavigate();
  const { workspace } = useSelector((state) => state.workspace);
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();

  const loggin_user = findMemberByUserId(workspace);

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

  if (!workspace || !loggin_user) {
    return <div className={styles.work_bar}></div>;
  }

  const work_label = getWorkLabel(workspace?.name || "workspace name");
  const main_channel =
    workspace.channels?.find((channel) => channel.required) ||
    workspace?.channels[0];

  const sidebarItems = [
    {
      label: "Home",
      iconOutline: <AiOutlineHome />,
      iconFill: <AiFillHome />,
      navigation: `/channels/${main_channel?.id}`,
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
      iconOutline: <CiBookmark />,
      iconFill: <GoBookmarkFill />,
      navigation: "/later",
    },
    {
      label: "More",
      iconOutline: <IoIosMore />,
      iconFill: <IoIosMore />,
    },
  ];

  return (
    <div className={styles.work_bar}>
      <div className={styles.work_label}>{work_label}</div>

      <div className={styles.icons}>
        {sidebarItems.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className={`${styles.iconWrapper} ${
                isActive ? styles.active : ""
              }`}
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
      </div>

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
          <UserStatusDot userId={loggin_user?.user} />
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
export default WorkBar;
