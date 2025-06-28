import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import styles from "./GithubUserPreview.module.css";

const GithubUserPreview = ({ data, onDismiss }) => {
  const { name, username, public_repos } = data;

  return (
    <div className={styles.previewWrapper}>
      <button className={styles.outsideDismiss} onClick={onDismiss}>
        <IoClose size={20} />
      </button>
      <div className={styles.previewCard}>
        <div className={styles.repoHeader}>
          <span className={styles.repoPath}>
            <a href={`https://github.com/${username}`}>
              <strong>{name || username} - overview</strong>
            </a>
          </span>
        </div>
        <div className={styles.repoStats}>
          {public_repos !== undefined && (
            <span className={styles.stat}>
              {username}{" "}has {public_repos} repos. Follow their code on GitHub
            </span>
          )}
          
        </div>
      </div>
    </div>
  );
};

GithubUserPreview.propTypes = {
  data: PropTypes.object.isRequired,
  onDismiss: PropTypes.func,
};

export default GithubUserPreview;
