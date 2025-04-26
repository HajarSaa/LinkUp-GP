import { FaPlus } from "react-icons/fa";
import styles from "./AddButton.module.css";
import AddButtonModal from "../../../components/UI/Modal/channel/AddButtonModal/AddButtonModal";
import PropTypes from "prop-types";
import { useRef } from "react";
function AddButton({ clickEvent, text }) {
  const addBtnRef = useRef(null);
  return (
    <>
      <div
        className={`sideBarButton sideBarHover`}
        onClick={(e) => {
          e.stopPropagation();
          clickEvent();
        }}
        ref={addBtnRef}
      >
        <span className="hovered iconsPadding align-items-center">
          <FaPlus />
        </span>
        <span className={`${styles.text} iconsPadding`}>{text}</span>
      </div>
      <AddButtonModal targetRef={addBtnRef} />
    </>
  );
}
AddButton.propTypes = {
  clickEvent: PropTypes.func,
  text: PropTypes.string,
};

export default AddButton;
