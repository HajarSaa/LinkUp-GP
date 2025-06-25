import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { closeSearch } from "../../../../API/redux_toolkit/ui/searchSlice";
import styles from "./SearchContainer.module.css";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { CgClose } from "react-icons/cg";
import SearchItem from "./SearchItem/SearchItem";

function SearchContainer({ workspace, targetRef }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [position, setPosition] = useState(null);
  const [showClear, setShowClear] = useState(false);

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

  function handleChange(e) {
    if (e.target.value.trim()) setShowClear(true);
    else setShowClear(false);
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
                  clear
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
          <SearchItem channel={true} />
          <SearchItem member={true} />
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
