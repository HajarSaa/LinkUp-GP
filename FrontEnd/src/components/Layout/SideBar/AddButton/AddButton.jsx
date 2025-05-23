import { FaPlus } from "react-icons/fa";
import styles from "./AddButton.module.css";
import PropTypes from "prop-types";
import AddButtonModal from "../../../UI/Modal/ChannelModals/AddButtonModal/AddButtonModal";
import { useRef, useState } from "react";
import { openInvitePeople } from "../../../../API/redux_toolkit/modals/modalsSlice";
import { useDispatch } from "react-redux";

function AddButton({ text, type }) {
  const [openModal, setOpenModal] = useState(false);
  const btnRef = useRef();
  const dispatch = useDispatch();

  function handleClick() {
    if (type === 'channel') setOpenModal(true);
    else dispatch(openInvitePeople())
  }

  return (
    <>
      <div className={styles.add_button} ref={btnRef} onClick={handleClick}>
        <span className={styles.icon}>
          <FaPlus />
        </span>
        <span className={styles.add_button_text}>{text}</span>
      </div>

      {type === "channel" && (
        <AddButtonModal
          isOpen={openModal}
          targetRef={btnRef}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}

AddButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default AddButton;
