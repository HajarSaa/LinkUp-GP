import {useState } from "react";
import ListHeader from "../ListHeader/ListHeader";
import styles from "./List.module.css";
import AddButton from "../AddButton/AddButton.jsx";
import PropTypes from 'prop-types'

const List = ({ children, buttonText, headerText}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (openState) => {
    setIsOpen(openState);
  };


  return (
    <div className={styles.sidebar_list}>
      <ListHeader onToggle={handleToggle} headerText={headerText} />
      {isOpen ? (
        <>
          {children}
          <AddButton text={buttonText} />
        </>
      ) : null}
    </div>
  );
};

List.propTypes = {
  children: PropTypes.any,
  buttonText: PropTypes.any,
  headerText: PropTypes.any,
  click_event: PropTypes.any,
};

export default List;
