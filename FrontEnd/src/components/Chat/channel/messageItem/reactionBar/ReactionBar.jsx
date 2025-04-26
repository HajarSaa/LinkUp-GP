import { FaCheckSquare } from "react-icons/fa";
import { PiEyeBold} from "react-icons/pi";
import { LuSmilePlus } from "react-icons/lu";
import { LiaEqualsSolid } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import styles from "./ReactionBar.module.css";

const ReactionBar = () => {
  return (
    <div className={styles.reactionBar}>
      <FaCheckSquare className={styles.icon} />
      <PiEyeBold className={styles.icon} />
      {/* <PiHandClappingBold className={styles.icon} /> */}
      <LuSmilePlus className={styles.icon} />
      <LiaEqualsSolid className={styles.icon} />
      <BiRepost className={styles.icon} />
      <FaRegBookmark className={styles.icon} />
      <IoMdMore className={styles.icon} />
    </div>
  );
};

export default ReactionBar;
