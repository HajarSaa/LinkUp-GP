/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import styles from "./AddButtonModal.module.css";
import {useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openCreateChannel } from "../../../../../API/redux_toolkit/modals/modalsSlice";

const AddButtonModal = ({ isOpen, targetRef, parentList, onClose }) => {
  const [position, setPosition] = useState(null);
  const modalRef = useRef(null);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  function handleCreateBtn() {
    dispatch(openCreateChannel());
    if (onClose) onClose();
  }

  function handleBrowseBtn() {
    navigateTo("/browse-channels");
    if (onClose) onClose();
  }

  useLayoutEffect(() => {
    if (isOpen && targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();

      const modalHeight = modalRef.current?.offsetHeight || 100;

      setPosition({
        top: rect.top + window.scrollY - modalHeight - 8,
        left: rect.left + window.scrollX + 50,
      });
    }
  }, [isOpen, targetRef]);

  function handleClose(e) {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  }

  if (!isOpen || !position) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose}>
        <div
          ref={modalRef}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          style={{
            top: position.top,
            left: position.left,
            position: "absolute",
            zIndex: 1000,
          }}
        >
          <ul className={styles.list}>
            <li
              className={styles.item}
              onClick={handleCreateBtn}
            >
              <span>Create a new channel</span>
            </li>
            <li className={styles.item} onClick={handleBrowseBtn}>
              <span>Browse channels</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

AddButtonModal.propTypes = {
  isOpen: PropTypes.bool,
  targetRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  parentList: PropTypes.any,
  onClose: PropTypes.func,
};

export default AddButtonModal;
