import { useState } from "react";
import ListHeader from "../ListHeader/ListHeader";
import styles from "./List.module.css";

import PropTypes from "prop-types";

const List = ({ children, headerText, handleAdd, isDms }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (openState) => {
    setIsOpen(openState);
  };

  return (
    <div className={styles.sidebar_list}>
      <ListHeader
        onToggle={handleToggle}
        headerText={headerText}
        isDms={isDms}
        handleAdd={handleAdd}
      />
      {isOpen ? <>{children}</> : null}
    </div>
  );
};

List.propTypes = {
  children: PropTypes.any,
  buttonText: PropTypes.any,
  headerText: PropTypes.any,
  handleAdd: PropTypes.any,
  isDms: PropTypes.bool,
};

export default List;
