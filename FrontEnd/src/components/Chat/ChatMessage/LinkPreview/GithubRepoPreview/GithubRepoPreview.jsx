import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { GoStar, GoRepoForked } from "react-icons/go";
// import { SiGithub } from "react-icons/si";
import styles from "./GithubRepoPreview.module.css";

const GithubRepoPreview = ({ data, onDismiss }) => {
  const {
    title,
    url,
    stars,
    forks,
    languages,
    owner,
  } = data;

  return (
    <div className={styles.previewWrapper}>
      <button className={styles.outsideDismiss} onClick={onDismiss}>
        <IoClose size={20} />
      </button>
      <div className={styles.previewCard}>
        {/* <SiGithub/> 
        <span>
          GitHub - {title}
        </span>
        <span>
          Contribute to {title} development by creating an account on GitHub. 
        </span> */}
        <div className={styles.repoContent}>
          <div className={styles.repoHeader}>
          <div className={styles.repoPath}>
            {/* <a href={`https://github.com/${owner.username}`} target="_blank" rel="noreferrer" className={styles.owner}>
              {owner.username}
              </a>
              <span> / </span> */}
            <a href={url} target="_blank" rel="noreferrer">
              <strong>{title}</strong>
            </a>
          </div>
          <img
            src={owner.avatar}
            alt={owner.username}
            className={styles.avatar}
          />
        </div>

        {/* <p className={styles.description}>{description}</p> */}

        <div className={styles.repoStats}>
          <div className={styles.stat}>
            <GoStar size={14} /> {stars}
          </div>
          <div className={styles.stat}>
            <GoRepoForked size={14} /> {forks}
          </div>
          {/* {license && <div className={styles.stat}>{license}</div>} */}
          {languages && <div className={styles.stat}>{languages}</div>}
        </div>
        </div>
      </div>
    </div>
  );
};

GithubRepoPreview.propTypes = {
  data: PropTypes.object.isRequired,
  onDismiss: PropTypes.func,
};

export default GithubRepoPreview;
