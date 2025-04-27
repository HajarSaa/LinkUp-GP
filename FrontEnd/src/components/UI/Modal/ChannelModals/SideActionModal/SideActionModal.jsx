import PropTypes from "prop-types";
import styles from "./SideActionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeConvActionModal } from "../../../../../API/redux_toolkit/modals/convActionModal";
import { IoIosArrowForward } from "react-icons/io";
import Overlay from "../Overlay/Overlay";
import { useEffect, useState } from "react";

const SideActionModal = ({ createClick, manageClcik, targetRef }) => {
  const isOpen = useSelector((state) => state.convActionModal.isOpen);
  const dispatch = useDispatch();

  function handleClose(e) {
    if (e.target === e.currentTarget) dispatch(closeConvActionModal());
  }

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5, // أسفل العنصر مع هامش 5px
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
          <li className={styles.item} onClick={createClick}>
            <span>Create</span>
            <span className={`align-items-center`}>
              <IoIosArrowForward />
            </span>
          </li>
          <hr className="divider" />
          <li className={styles.item} onClick={manageClcik}>
            <span>Manage</span>
            <span className={`align-items-center`}>
              <IoIosArrowForward />
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

SideActionModal.propTypes = {
  createClick: PropTypes.func,
  manageClcik: PropTypes.func,
  targetRef: PropTypes.any,
};

export default SideActionModal;
