import { FaLink } from "react-icons/fa";
import styles from "./HuddleModal.module.css";
import { MdHeadset } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../../Overlay/Overlay";
import { closeHuddleModal } from "../../../../../API/redux/modals/huddleSlice";

const MoreOptionsModal = () => {
  const dispatch = useDispatch();
  const isHuddelOpen = useSelector((state) => state.huddleModal.isOpen);
  function handleClose(e) {
    if (e.target === e.currentTarget)
      dispatch(closeHuddleModal())
  }

  if (!isHuddelOpen) return;

  return (
    <>
      <Overlay closeOverlay={handleClose} />
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.option}>
          <span className={styles.icon}>
            <MdHeadset />
          </span>
          <span>Start huddle</span>
        </div>
        <div className={styles.option}>
          <span className={styles.icon}>
            <FaLink />
          </span>
          <span>Copy huddle link</span>
        </div>
      </div>
    </>
  );
};

export default MoreOptionsModal;
