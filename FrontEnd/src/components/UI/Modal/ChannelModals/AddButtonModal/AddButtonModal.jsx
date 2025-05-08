import PropTypes from "prop-types";
import styles from "./AddButtonModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../Overlay/Overlay";
import { useEffect, useState } from "react";
import { closeAddButtonModal } from "../../../../../API/redux_toolkit/modals/addButtonModal";
import { openCreateChannel } from "../../../../../API/redux_toolkit/modals/createChannelmodalSlice";
import { useNavigate } from "react-router-dom";

const AddButtonModal = () => {
  const { isOpen, position: modalPosition } = useSelector(
    (state) => state.addButtonModal
  );
  const [position, setPosition] = useState(null);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  function handleClose(e) {
    if (e.target === e.currentTarget) dispatch(closeAddButtonModal());
  }

  function handleCreateBtn() {
    dispatch(closeAddButtonModal());
    dispatch(openCreateChannel());
  }
  function handleBrowseBtn() {
    dispatch(closeAddButtonModal());
    navigateTo("/browse-channels");
  }

  // useEffect(() => {
  //   if (isOpen && targetRef?.current) {
  //     const rect = targetRef.current.getBoundingClientRect();
  //     setPosition({
  //       top: rect.top - 80,
  //       left: rect.left + 30,
  //     });
  //   }
  // }, [isOpen, targetRef]);

  useEffect(() => {
    // لو الـ Modal مفتوح هنحدد موقع الـ Modal بناءً على الـ position اللي بعتناه
    if (isOpen && modalPosition) {
      setPosition({
        top: modalPosition.top - 20, // تعديل الـ top حسب الموقع
        left: modalPosition.left + 30, // تعديل الـ left حسب الموقع
      });
    }
  }, [isOpen, modalPosition]);

  if (!isOpen || !position || position.top === 0) return null;

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
