// EmptyState.jsx
import PropTypes from "prop-types";
import styles from "./ChannelIntro.module.css";

function EmptyState({ title, description, actions }) {
  return (
    <div className={styles.empty_state}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {actions && (
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <button
              key={index}
              className={styles.action_button}
              onClick={action.onClick}
            >
              {action.icon && (
                <span className={styles.icon}>{action.icon}</span>
              )}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      icon: PropTypes.node,
    })
  ),
};

export default EmptyState;
