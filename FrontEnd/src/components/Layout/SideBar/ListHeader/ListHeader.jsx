import { useState } from "react";
import PropTypes from "prop-types";
import { FaCaretDown, FaCaretRight, FaChevronDown } from "react-icons/fa";
import styles from "./ListHeader.module.css";
import Icon from "../../../UI/Icons/Icon/Icon";
import { IoMdAdd } from "react-icons/io";

const ListHeader = ({
  isAnyChannelActive,
  onToggle,
  headerText,
  handleAdd,
  isDms = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    if (!isAnyChannelActive) {
      setIsOpen((prev) => !prev);
      onToggle(!isOpen);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <span onClick={handleToggle}>
          {isOpen || isAnyChannelActive ? (
            <Icon>
              <FaCaretDown />
            </Icon>
          ) : (
            <Icon>
              <FaCaretRight />
            </Icon>
          )}
        </span>
        <div className={styles.right_side}>
          <Icon className={styles.liste_header_name} onClick={handleToggle}>
            <span className={styles.header_name}>{headerText}</span>
            <span>
              <FaChevronDown />
            </span>
          </Icon>
        </div>
        {isDms && (
          <Icon className={styles.header_add_btn} onClick={handleAdd}>
            <IoMdAdd />
          </Icon>
        )}
      </div>
    </>
  );
};

ListHeader.propTypes = {
  isAnyChannelActive: PropTypes.bool,
  onToggle: PropTypes.func,
  onAddChannel: PropTypes.func,
  headerText: PropTypes.any,
  handleAdd: PropTypes.func,
  isDms: PropTypes.bool,
};

export default ListHeader;
