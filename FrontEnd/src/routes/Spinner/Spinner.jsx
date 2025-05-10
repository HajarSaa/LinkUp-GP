import styles from "./Spinner.module.css";
import PropTypes from "prop-types";

const Spinner = ({
  height = 30,
  width = 30,
  color = "blue",
  secondaryColor = "#ccc",
  border = 2,
}) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: width,
        height: height,
        borderColor:`${color} ${secondaryColor} ${secondaryColor}`,
        borderWidth: `${border}px`,
      }}
    />
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  secondaryColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  border: PropTypes.number,
};

export default Spinner;
