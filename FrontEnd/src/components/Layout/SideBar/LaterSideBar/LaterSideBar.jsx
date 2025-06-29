import { useSelector } from "react-redux";
import Icon from "../../../UI/Icons/Icon/Icon";
import styles from "./../SideBar.module.css";
import laterStyle from "./LaterSideBar.module.css";
import { MdAdd, MdOutlineFilterList } from "react-icons/md";
import { useState } from "react";
import LaterItem from "./LaterItem";
import useGetLaterItems from "../../../../API/hooks/Later/useGetLaterItems";
import Spinner from "../../../UI/Spinner/Spinner";

function LaterSideBar() {
  const { workspace } = useSelector((state) => state.workspace);
  const [activeTab, setActiveTab] = useState("inProgress");
  const { data: later_items, isLoading, isError, error } = useGetLaterItems();
  // console.log(later_items);
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
          <div className={laterStyle.tabs_container}>
            <div
              className={`${laterStyle.tab} ${
                activeTab === "inProgress" ? laterStyle.active : ""
              }`}
              onClick={() => setActiveTab("inProgress")}
            >
              In progress <span className={laterStyle.tab_count}>2</span>
            </div>
            <div
              className={`${laterStyle.tab} ${
                activeTab === "Archived" ? laterStyle.active : ""
              }`}
              onClick={() => setActiveTab("Archived")}
            >
              Archived
            </div>
            <div
              className={`${laterStyle.tab} ${
                activeTab === "Completed" ? laterStyle.active : ""
              }`}
              onClick={() => setActiveTab("Completed")}
            >
              Completed
            </div>
          </div>
          <div className={laterStyle.content}>
            {activeTab === "inProgress" && (
              <>
                {isError ? (
                  <div className={laterStyle.placeholder}>
                    <p className={laterStyle.error_message}>{error}</p>
                  </div>
                ) : isLoading ? (
                  <div className={laterStyle.placeholder}>
                    <Spinner
                      width={60}
                      height={60}
                      color="var(--secondary-color)"
                    />
                  </div>
                ) : (
                  <>
                    {later_items.map((later_item, index) => (
                      <LaterItem key={index} laterData={later_item} />
                    ))}
                  </>
                )}
              </>
            )}

            {activeTab === "Archived" && (
              <div className={laterStyle.placeholder}>No archived items</div>
            )}

            {activeTab === "Completed" && (
              <div className={laterStyle.placeholder}>No completed items</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LaterSideBar;
