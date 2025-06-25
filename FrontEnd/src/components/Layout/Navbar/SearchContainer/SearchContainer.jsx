import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeSearch } from "../../../../API/redux_toolkit/ui/searchSlice";
import styles from "./SearchContainer.module.css";
import PropTypes from "prop-types";
import { useCallback } from "react";

function SearchContainer({ workspace, targetRef }) {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(null);

  const updatePosition = useCallback(() => {
    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
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
        <input
          className={styles.search_input}
          type="text"
          placeholder={`Find in #${workspace?.slug || "workspace"}`}
        />
        <div className={styles.search_items}>
          <div className={styles.search_item}>Result 1</div>
          <div className={styles.search_item}>Result 2</div>
          <div className={styles.search_item}>Result 3</div>
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
