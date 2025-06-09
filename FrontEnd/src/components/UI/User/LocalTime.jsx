import useFormattedTime from "../../../API/hooks/global/useFormattedTime";
import styles from './User.module.css';

function LocalTime() {
  const time = useFormattedTime();
  return <p className={styles.time}>{time} Local time</p>;
}

export default LocalTime;
