import PropTypes from "prop-types";
import styles from "./AddButtonModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../../Overlay/Overlay";
import { useEffect, useState } from "react";
import { closeAddButtonModal } from "../../../../../API/redux/modals/addButtonModal";
import { openCreateChannel } from "../../../../../API/redux/modals/createChannelmodalSlice";
import { useNavigate } from "react-router-dom";

const AddButtonModal = ({ targetRef }) => {
  const { isOpen } = useSelector((state) => state.addButtonModal);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  function handleClose(e) {
    if (e.target === e.currentTarget) dispatch(closeAddButtonModal());
  }
  function handleCreateBtn() {
    dispatch(closeAddButtonModal());
    dispatch(openCreateChannel());
  }
  function handleBrowseBtn() {
    dispatch(closeAddButtonModal())
    navigateTo("channels");
  }

  useEffect(() => {
    if (isOpen && targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 80,
        left: rect.left + 30,
      });
    }
  }, [isOpen, targetRef]);

  if (!isOpen || position.top === 0) return null;

  return (
    <>
      <Overlay closeOverlay={handleClose} />
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ top: position.top, left: position.left }}
      >
        <ul className={styles.list}>
          <li className={styles.item} onClick={handleCreateBtn}>
            <span>Create a new channel</span>
          </li>
          <li className={styles.item} onClick={handleBrowseBtn}>
            <span>Browse channels</span>
          </li>
        </ul>
      </div>
    </>
  );
};

AddButtonModal.propTypes = {
  targetRef: PropTypes.any,
};

export default AddButtonModal;
