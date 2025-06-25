import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSearch } from "../../../../API/redux_toolkit/ui/searchSlice";
import styles from "./SearchContainer.module.css";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { CgClose } from "react-icons/cg";
import SearchItem from "./SearchItem/SearchItem";
import useGetSidebarConvers from "../../../../API/hooks/conversation/useGetSidebarConvers";
import { MdManageSearch } from "react-icons/md";

function SearchContainer({ workspace, targetRef }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [position, setPosition] = useState(null);
  const [showClear, setShowClear] = useState(false);
  // search
  const [search_result, set_search_result] = useState([]);
  const { browseChannels } = useSelector((state) => state.browseChannels);
  const members = workspace.members;
  const searchData = [...browseChannels, ...members];
  const conversations = useGetSidebarConvers(workspace);

  const updatePosition = useCallback(() => {
    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX - 10,
        width: rect.width + 20,
      });
    }
  }, [targetRef]);

  useEffect(() => {
    const timer = setTimeout(updatePosition, 0);
    window.addEventListener("resize", updatePosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  // focus the input filed
  useEffect(() => {
    if (position && inputRef.current) {
      inputRef.current.focus();
    }
  }, [position]);

  // search method
  function handleChange(e) {
    const query = e.target.value.trim().toLowerCase();
    if (query) {
      setShowClear(true);

      const results = searchData
        .map((item) => {
          const name = item.name || item.userName || "";
          const lowerName = name.toLowerCase();

          // لو الاسم بيبدأ باللي اكتب
          if (lowerName.startsWith(query)) {
            if (item.name) {
              // دا channel
              return { ...item, isChannel: true };
            } else {
              // دا member → دور عليه جوه conversations
              const conv = conversations.find((c) => c.member._id === item._id);
              return conv ? conv : null;
            }
          }

          return null;
        })
        .filter(Boolean); // شيل الـ nulls

      set_search_result(results);
    } else {
      setShowClear(false);
      set_search_result([]);
    }
  }

  function handleClear() {
    inputRef.current.value = "";
    setShowClear(false);
  }

  const handleClose = (e) => {
    if (e.target === e.currentTarget) dispatch(closeSearch());
  };

  if (!position) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div
        className={styles.search_input_container}
        style={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
        }}
      >
        <div className={styles.search_box}>
          <span className={`${styles.search_icon}`}>
            <CiSearch />
          </span>
          <input
            ref={inputRef}
            id="work_search"
            className={styles.search_input}
            type="text"
            placeholder={`Find in #${workspace?.slug || "workspace"}`}
            onInput={handleChange}
          />
          <div className={styles.right_icons}>
            {showClear && (
              <>
                <span className={styles.clear_text} onClick={handleClear}>
                  Clear
                </span>
                <span className={styles.divider}></span>
              </>
            )}
            <span
              className={`${styles.search_icon} ${styles.close_icon}`}
              onClick={() => {
                dispatch(closeSearch());
              }}
            >
              <CgClose />
            </span>
          </div>
        </div>
        <div className={styles.search_items}>
          {search_result.length !== 0 ? (
            <>
              {search_result.map((result, index) => (
                <SearchItem key={index} search_item={result} />
              ))}
            </>
          ) : (
            <SearchItem  />
          )}
        </div>
      </div>
    </>
  );
}

SearchContainer.propTypes = {
  workspace: PropTypes.any,
  targetRef: PropTypes.object.isRequired,
};

export default SearchContainer;
