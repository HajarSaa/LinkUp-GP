import PropTypes from "prop-types";
import { FiHelpCircle } from "react-icons/fi";
import styles from "./InfoIcon.module.css";
import { Tooltip } from "react-tooltip";

function InfoIcon({ className, place = "top", text, id }) {
  return (
    <>
      <span
        className={`${styles.info_icon} ${className}`}
        data-tooltip-id={id}
        data-tooltip-content={text}
      >
        <FiHelpCircle />
      </span>
      <Tooltip id={id} place={place} className={`custom-tooltip`} />
    </>
  );
}

InfoIcon.propTypes = {
  className: PropTypes.string,
  place: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default InfoIcon;
