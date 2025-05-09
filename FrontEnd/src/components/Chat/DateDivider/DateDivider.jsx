/* eslint-disable react/prop-types */

import formatDate from "../../../utils/formatedDate";
import styles from "./DateDivider.module.css";

const DateDivider = ({ date }) => {
  return (
    <div className={styles.dateDivider}>
      <span className={styles.dateText}>{formatDate(date)}</span>
    </div>
  );
};

export default DateDivider;
