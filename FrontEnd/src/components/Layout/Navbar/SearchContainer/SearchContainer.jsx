import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSearch } from "../../../../API/redux_toolkit/ui/searchSlice";
import styles from "./SearchContainer.module.css";
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
import { CgClose } from "react-icons/cg";
import SearchItem from "./SearchItem/SearchItem";
import useGetSidebarConvers from "../../../../API/hooks/conversation/useGetSidebarConvers";
import { useNavigate } from "react-router-dom";
import { openUserPanel } from "../../../../API/redux_toolkit/ui/chatPanelSlice";


function SearchContainer({ workspace, targetRef }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [position, setPosition] = useState(null);
  const [showClear, setShowClear] = useState(false);
  const [search_result, set_search_result] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    if (position && inputRef.current) {
      inputRef.current.focus();
    }
  }, [position]);

  function handleChange(e) {
    const q = e.target.value.trim().toLowerCase();
    setQuery(q);
    if (q) {
      setShowClear(true);
      const results = searchData
        .map((item) => {
          const name = item.name || item.userName || "";
          const lowerName = name.toLowerCase();
          if (lowerName.startsWith(q)) {
            if (item.name) return { ...item, isChannel: true };
            const conv = conversations.find((c) => c.member._id === item._id);
            return conv || null;
          }
          return null;
        })
        .filter(Boolean);

      set_search_result(results);
      setActiveIndex(0);
    } else {
      setShowClear(false);
      set_search_result([]);
    }
  }

  function handleClear() {
    inputRef.current.value = "";
    setQuery("");
    setShowClear(false);
    set_search_result([]);
  }

  const handleClose = (e) => {
    if (e.target === e.currentTarget) dispatch(closeSearch());
  };

  const expandedItems = search_result.flatMap((item) =>
    item.conversationId ? [item, item] : [item]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!expandedItems.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % expandedItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === 0 ? expandedItems.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = expandedItems[activeIndex];
        const isViewProfile = item.conversationId && activeIndex % 2 === 1;

        if (item?.isChannel) {
          dispatch(closeSearch());
          navigateTo(`/channels/${item.id}`);
        } else if (item?.conversationId) {
          dispatch(closeSearch());
          navigateTo(`/conversations/${item.conversationId}`);
          if (isViewProfile) {
            dispatch(
              openUserPanel({
                type: "userPanel",
                panel_id: item.member._id,
                page_id: item.conversationId,
              })
            );
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [expandedItems, activeIndex, dispatch, navigateTo]);

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
          <span className={styles.search_icon}>
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
              onClick={() => dispatch(closeSearch())}
            >
              <CgClose />
            </span>
          </div>
        </div>

        <div className={styles.search_items}>
          {search_result.length !== 0 ? (
            search_result.map((result, index) => {
              const baseIndex = result.conversationId ? index * 2 : index;
              return result.conversationId ? (
                <div key={index}>
                  <SearchItem
                    search_item={result}
                    isActive={activeIndex === baseIndex}
                    isViewProfile={false}
                  />
                  <SearchItem
                    search_item={result}
                    isActive={activeIndex === baseIndex + 1}
                    isViewProfile={true}
                  />
                </div>
              ) : (
                <SearchItem
                  key={index}
                  search_item={result}
                  isActive={activeIndex === index}
                />
              );
            })
          ) : query ? (
            <SearchItem noResultText={query} />
          ) : (
            <SearchItem />
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
